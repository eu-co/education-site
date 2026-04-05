// =============================================================================
// lib/data.js — Fetches education data from Google Sheets at build time
// =============================================================================
//
// GOOGLE SHEETS SETUP:
//   1. Create a Google Sheet with 3 tabs: "Composers", "ProgrammeNotes", "Articles"
//   2. For each tab: File → Share → Publish to web → select tab → CSV → Publish
//   3. Paste the published CSV URLs below
//
// The pieces column in the Composers sheet uses | as a delimiter:
//   "Brandenburg Concerto No. 1 | Brandenburg Concerto No. 2 | ..."
// Non-technical editors just add " | New Piece Name" to the end of the cell.
// =============================================================================

// Replace these with your actual published Google Sheet CSV URLs:
const COMPOSERS_CSV = process.env.COMPOSERS_SHEET_URL || '';
const PROGRAMME_NOTES_CSV = process.env.PROGRAMME_NOTES_SHEET_URL || '';
const ARTICLES_CSV = process.env.ARTICLES_SHEET_URL || '';

// ── CSV Parser ──────────────────────────────────────────────────────────────

function parseCSVLine(text) {
  const result = [];
  let cell = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];
    if (ch === '"') {
      if (inQuotes && next === '"') { cell += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(cell); cell = '';
    } else {
      cell += ch;
    }
  }
  result.push(cell);
  return result;
}

function parseCSV(csvText) {
  const lines = csvText.split(/\r?\n/).filter(l => l.trim());
  if (lines.length === 0) return [];
  const headers = parseCSVLine(lines[0]).map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    return headers.reduce((obj, header, i) => {
      obj[header] = values[i] ? values[i].trim() : '';
      return obj;
    }, {});
  }).filter(Boolean);
}

async function fetchSheet(url) {
  if (!url) return [];
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return parseCSV(await res.text());
  } catch {
    return [];
  }
}

// ── Fallback data (used when Google Sheet URLs aren't configured yet) ────────
// This lets the site work immediately without needing the sheets set up first.

const FALLBACK_COMPOSERS = [
  { id: 'bach-js', name: 'Johann Sebastian Bach', lifespan: '1685-1750', imageUrl: 'composerheads/jsbach.jpg', bio: 'A master of the Baroque period, whose works are renowned for their intellectual depth, technical command, and artistic beauty.', pieces: 'Brandenburg Concerto No. 1 | Brandenburg Concerto No. 3 | Violin Concerto in A Minor | Orchestral Suite No. 3 in D Major' },
  { id: 'beethoven', name: 'Ludwig van Beethoven', lifespan: '1770-1827', imageUrl: 'composerheads/beethoven.jpg', bio: 'A crucial figure in the transition between the Classical and Romantic eras.', pieces: 'Symphony No. 5 in C Minor | Symphony No. 9 "Choral" | Piano Concerto No. 5 "Emperor" | Violin Concerto in D Major' },
  { id: 'mozart', name: 'Wolfgang Amadeus Mozart', lifespan: '1756-1791', imageUrl: 'composerheads/mozart.jpg', bio: 'A prolific and influential composer of the Classical period.', pieces: 'Symphony No. 40 in G Minor | Piano Concerto No. 21 | Requiem, K. 626 | Eine kleine Nachtmusik' },
];

const FALLBACK_NOTES = [
  { id: '1', title: 'Mendelssohn\'s "Scottish" Symphony: A Musical Postcard', date: 'March 21, 2025', author: 'Ana Morris', excerpt: 'In 1829, Mendelssohn made his first visit to Britain...' },
];

const FALLBACK_ARTICLES = [
  { id: '1', title: 'A Closer Look: Ravel\'s Le Tombeau de Couperin', date: 'September 8, 2025', author: 'ActuallyRavel1919', excerpt: 'First composed during the war for piano...', youtubeEmbed: 'https://www.youtube.com/embed/jbLMhyR-UVQ', spotifyEmbed: '' },
];

// ── Public API ──────────────────────────────────────────────────────────────

export async function getComposers() {
  const data = await fetchSheet(COMPOSERS_CSV);
  const composers = data.length > 0 ? data : FALLBACK_COMPOSERS;
  
  return composers.map(c => ({
    ...c,
    piecesArray: (c.pieces || '').split('|').map(p => p.trim()).filter(Boolean),
  })).sort((a, b) => {
    const lastA = a.name.split(' ').pop();
    const lastB = b.name.split(' ').pop();
    return lastA.localeCompare(lastB);
  });
}

export async function getProgrammeNotes() {
  const data = await fetchSheet(PROGRAMME_NOTES_CSV);
  return data.length > 0 ? data : FALLBACK_NOTES;
}

export async function getArticles() {
  const data = await fetchSheet(ARTICLES_CSV);
  return data.length > 0 ? data : FALLBACK_ARTICLES;
}
