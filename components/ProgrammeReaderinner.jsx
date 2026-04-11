'use client';

import { useState, useRef, useEffect, useCallback, createContext, useContext } from 'react';

// ---------------------------------------------------------------------------
// Load pdf.js from CDN (avoids webpack bundling issues with pdfjs-dist)
// ---------------------------------------------------------------------------
//const PDFJS_VERSION = '4.4.168';
// Use pdf.js 3.x UMD build — loads via plain <script>, sets window.pdfjsLib, zero webpack involvement
const PDFJS_VERSION = '3.11.174';

function usePdfJs() {
  const [pdfjsLib, setPdfjsLib] = useState(null);

  useEffect(() => {
    if (window.pdfjsLib) {
      setPdfjsLib(window.pdfjsLib);
      return;
    }

    const onReady = () => setPdfjsLib(window.pdfjsLib);
    window.addEventListener('pdfjsReady', onReady);

    if (!document.getElementById('pdfjs-loader')) {
      const base = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/' + PDFJS_VERSION;

      const script = document.createElement('script');
      script.id = 'pdfjs-loader';
      script.src = base + '/pdf.min.js';
      script.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = base + '/pdf.worker.min.js';
          window.dispatchEvent(new Event('pdfjsReady'));
        }
      };
      document.head.appendChild(script);
    }

    return () => window.removeEventListener('pdfjsReady', onReady);
  }, []);

  return pdfjsLib;
}

// ---------------------------------------------------------------------------
// Single shared PDF document — loaded ONCE, shared via context
// ---------------------------------------------------------------------------
const PdfDocContext = createContext(null);

function PdfDocProvider({ pdfjsLib, url, children }) {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [error, setError] = useState(false);
  const loadingRef = useRef(false);

  useEffect(() => {
    if (!pdfjsLib || !url || loadingRef.current) return;
    loadingRef.current = true;

    const loadTask = pdfjsLib.getDocument({
      url,
      disableAutoFetch: false,
      disableRange: true,
    });

    loadTask.promise
      .then(pdf => setPdfDoc(pdf))
      .catch(() => setError(true));

    return () => { try { loadTask.destroy(); } catch {} };
  }, [pdfjsLib, url]);

  return (
    <PdfDocContext.Provider value={{ pdfDoc, error }}>
      {children}
    </PdfDocContext.Provider>
  );
}

function usePdfDoc() {
  return useContext(PdfDocContext);
}

// ---------------------------------------------------------------------------
// Cover hero — page 1 as cinematic header
// ---------------------------------------------------------------------------
function CoverHero({ title }) {
  const { pdfDoc } = usePdfDoc();
  const [coverSrc, setCoverSrc] = useState(null);

  useEffect(() => {
    if (!pdfDoc) return;
    let cancelled = false;

    (async () => {
      const page = await pdfDoc.getPage(1);
      const viewport = page.getViewport({ scale: 2.5 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
      if (!cancelled) setCoverSrc(canvas.toDataURL('image/jpeg', 0.92));
    })();

    return () => { cancelled = true; };
  }, [pdfDoc]);

  return (
    <div className="w-full relative min-h-[60vh] md:min-h-[70vh] overflow-hidden flex items-center justify-center bg-[#0a0a0a]">
      {coverSrc && (
        <img src={coverSrc} alt="" aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-40 blur-3xl scale-110 pointer-events-none" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-[1]" />
      <div className="relative z-10 py-8 md:py-12 flex flex-col items-center">
        {coverSrc ? (
          <img src={coverSrc} alt={`${title} — cover art`}
            className="max-h-[55vh] md:max-h-[60vh] w-auto rounded-lg shadow-2xl border border-white/10 transition-transform duration-1000 hover:scale-[1.02]" />
        ) : (
          <div className="w-[300px] md:w-[420px] h-[400px] md:h-[560px] rounded-lg bg-white/5 animate-pulse" />
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Content page — renders to canvas, fills full width, no boxing
// ---------------------------------------------------------------------------
function PdfPage({ pageNum, onBgDetected }) {
  const { pdfDoc } = usePdfDoc();
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current || !wrapperRef.current) return;
    let cancelled = false;

    (async () => {
      const page = await pdfDoc.getPage(pageNum);
      const containerWidth = wrapperRef.current.clientWidth;

      const unscaled = page.getViewport({ scale: 1 });
      const scale = (containerWidth * 2) / unscaled.width;
      const viewport = page.getViewport({ scale });

      const canvas = canvasRef.current;
      if (!canvas || cancelled) return;
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
      if (!cancelled) {
        setLoading(false);
        // Sample corner pixel to detect PDF background color
        if (onBgDetected) {
          const ctx = canvas.getContext('2d');
          const [r, g, b] = ctx.getImageData(4, 4, 1, 1).data;
          onBgDetected(`rgb(${r},${g},${b})`);
        }
      }
    })();

    return () => { cancelled = true; };
  }, [pdfDoc, pageNum]);

  // A5 ratio: 1 : 1.414
  return (
    <div ref={wrapperRef} className="w-full" style={{ backgroundColor: 'inherit' }}>
      {loading && (
        <div className="w-full animate-pulse" style={{ aspectRatio: '1 / 1.414', backgroundColor: 'inherit' }} />
      )}
      <canvas
        ref={canvasRef}
        className={loading ? 'hidden' : 'block w-full h-auto'}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main reader
// ---------------------------------------------------------------------------
export default function ProgrammeReaderInner({ pdfUrl, title }) {
  const pdfjsLib = usePdfJs();

  const proxiedUrl = pdfUrl
    ? `/api/pdf-proxy?url=${encodeURIComponent(pdfUrl)}`
    : null;

  if (!pdfUrl) {
    return <div className="text-center py-20 text-[var(--ink-muted)]">No PDF available for this programme.</div>;
  }

  return (
    <div className="w-full bg-white">
      <PdfDocProvider pdfjsLib={pdfjsLib} url={proxiedUrl}>
        <ReaderContent title={title} pdfUrl={pdfUrl} proxiedUrl={proxiedUrl} pdfjsLib={pdfjsLib} />
      </PdfDocProvider>
    </div>
  );
}

function ReaderContent({ title, pdfUrl, proxiedUrl, pdfjsLib }) {
  const { pdfDoc, error } = usePdfDoc();
  const [bgColor, setBgColor] = useState('#ffffff');

  if (error) {
    return (
      <div className="text-center py-20 px-6">
        <p className="text-[var(--ink-muted)] text-lg mb-4">Couldn&rsquo;t load this programme — the PDF may not be publicly shared.</p>
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer"
          className="inline-block px-6 py-3 border border-[var(--border)] rounded-full text-sm text-[var(--accent-text)] hover:border-[var(--accent)] transition-all">
          Open original PDF ↗
        </a>
      </div>
    );
  }

  if (!pdfjsLib || !pdfDoc) {
    return (
      <div className="w-full h-[70vh] bg-[#0a0a0a] animate-pulse flex items-center justify-center">
        <p className="text-white/40 text-sm tracking-widest uppercase">Loading programme…</p>
      </div>
    );
  }

  const numPages = pdfDoc.numPages;

  return (
    <>
      <CoverHero title={title} />

      {numPages > 1 && (
        <div className="w-full" style={{ backgroundColor: bgColor }}>
          {/* Title */}
          <div className="text-center py-10">
            <h2 className="text-3xl md:text-4xl text-[var(--ink)] mb-4">{title}</h2>
            <div className="w-16 h-px bg-[var(--accent)] mx-auto" />
          </div>

          {/* Pages — continuous, full-width, no gaps, no borders */}
          <div className="w-full max-w-[750px] mx-auto">
            {Array.from({ length: numPages - 1 }, (_, idx) => (
              <PdfPage
                key={idx + 2}
                pageNum={idx + 2}
                onBgDetected={idx === 0 ? setBgColor : undefined}
              />
            ))}
          </div>

          {/* Download */}
          <div className="text-center py-16">
            <a href={proxiedUrl} download
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] rounded-full text-sm text-[var(--ink-muted)] hover:border-[var(--accent)] hover:text-[var(--accent-text)] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download PDF
            </a>
          </div>
        </div>
      )}
    </>
  );
}