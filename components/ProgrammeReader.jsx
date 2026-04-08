'use client';

import { useState, useEffect } from 'react';

export default function ProgrammeReader(props) {
  const [Reader, setReader] = useState(null);

  useEffect(() => {
    // Only import pdfjs-dist after we're safely in the browser
    import('./ProgrammeReaderInner').then(mod => {
      setReader(() => mod.default);
    });
  }, []);

  if (!Reader) {
    return (
      <div className="w-full">
        <div className="w-full h-[70vh] bg-[#0a0a0a] animate-pulse flex items-center justify-center">
          <p className="text-white/40 text-sm tracking-widest uppercase">Loading programme…</p>
        </div>
      </div>
    );
  }

  return <Reader {...props} />;
}