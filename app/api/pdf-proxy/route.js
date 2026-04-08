// =============================================================================
// app/api/pdf-proxy/route.js — Proxies Google Drive PDFs to avoid CORS blocks
// =============================================================================
// react-pdf cannot fetch from drive.google.com directly because Google doesn't
// send Access-Control-Allow-Origin headers. This tiny route fetches the PDF
// server-side and pipes it back to the browser with the correct content-type.
//
// Usage:  /api/pdf-proxy?url=https://drive.google.com/uc?export=download&id=XXX
// =============================================================================

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pdfUrl = searchParams.get('url');

  if (!pdfUrl) {
    return new Response('Missing ?url= parameter', { status: 400 });
  }

  try {
    // Follow redirects (Google Drive often 302s)
    const res = await fetch(pdfUrl, { redirect: 'follow' });

    if (!res.ok) {
      return new Response(`Upstream returned ${res.status}`, { status: 502 });
    }

    const pdfBuffer = await res.arrayBuffer();

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    console.error('PDF proxy error:', err);
    return new Response('Failed to fetch PDF', { status: 502 });
  }
}