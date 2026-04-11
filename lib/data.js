// =============================================================================
// lib/data.js — Education site data fetching
// =============================================================================
// GOOGLE SHEETS: One spreadsheet with these tabs (each published as CSV):
//   1. Composers         2. Articles
//   3. Concerts (shared with main site — same sheet, same URL)
//
// PROGRAMME NOTES:
//   The Concerts tab has a ProgrammeNotes column. If a concert has programme
//   notes, paste the Google Drive share link to the PDF there. Concerts with
//   a Drive link appear on the /programme-notes page and get a reader.
//
// CONCERT GALLERY PHOTOS:
//   The Concerts tab needs 6 image columns: Photo1, Photo2, ... Photo6
//   Each cell contains an image URL (Google Drive, external, or relative path).
//   Empty cells are skipped — a concert with 3 photos just leaves Photo4-6 blank.
//   Non-technical editors paste image URLs into the spreadsheet cells.
// =============================================================================

const SHEET_URLS = {
  composers:      process.env.COMPOSERS_SHEET_URL || '',
  articles:       process.env.ARTICLES_SHEET_URL || '',
  concerts:       process.env.CONCERTS_SHEET_URL || '',
};

// ── CSV Parser ──────────────────────────────────────────────────────────────

function parseCSVLine(text) {
  const result = []; let cell = ''; let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i], next = text[i + 1];
    if (ch === '"') { if (inQuotes && next === '"') { cell += '"'; i++; } else inQuotes = !inQuotes; }
    else if (ch === ',' && !inQuotes) { result.push(cell); cell = ''; }
    else cell += ch;
  }
  result.push(cell);
  return result;
}

function parseCSV(csvText) {
  const lines = csvText.split(/\r?\n/).filter(l => l.trim());
  if (!lines.length) return [];
  const headers = parseCSVLine(lines[0]).map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    return headers.reduce((obj, h, i) => { obj[h] = values[i]?.trim() || ''; return obj; }, {});
  }).filter(Boolean);
}

async function fetchSheet(key) {
  const url = SHEET_URLS[key];
  if (!url) return [];
  try {
    const res = await fetch(url, { cache: 'no-store' });
    return res.ok ? parseCSV(await res.text()) : [];
  } catch { return []; }
}

// ── Utilities ───────────────────────────────────────────────────────────────

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1519683109079-d5f539e1542f?q=80&w=2670&auto=format&fit=crop';

export function getCleanImageUrl(url) {
  if (!url?.trim()) return null;
  if (url.includes('drive.google.com')) {
    const m = url.match(/\/d\/(.*?)\//);
    if (m?.[1]) return `https://lh3.googleusercontent.com/d/${m[1]}`;
  }
  return url;
}

export function getRawPdfUrl(driveUrl) {
  if (!driveUrl?.trim()) return null;
  // Match the long string of characters between /d/ and /view
  const fileIdMatch = driveUrl.match(/\/d\/(.*?)\//);
  if (fileIdMatch && fileIdMatch[1]) {
    return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
  }
  return driveUrl; // Fallback just in case it's a direct link
}

// Concerts with custom pages — excluded from the [slug] dynamic route.
// Key = slug that would be generated, Value = the static route path.
export const CUSTOM_CONCERT_ROUTES = {
  'a-night-in-italy-with-r3o-march-2026': '/archive/a-night-in-italy',
};

function parseDateSafe(str) {
  if (!str) return null;
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

function generateSlug(title, dateStr) {
  const titleSlug = (title || 'concert').toLowerCase()
    .replace(/[&]/g, 'and').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
  const d = parseDateSafe(dateStr);
  if (d) {
    const month = d.toLocaleString('en', { month: 'long' }).toLowerCase();
    return `${titleSlug}-${month}-${d.getFullYear()}`;
  }
  return titleSlug;
}

// ── Fallback data ───────────────────────────────────────────────────────────

const FALLBACK_COMPOSERS = [
  { id: 'bach-js', name: 'Johann Sebastian Bach', lifespan: '1685-1750', imageUrl: 'composerheads/jsbach.jpg', bio: 'A master of the Baroque period.', pieces: 'Brandenburg Concerto No. 1 | Brandenburg Concerto No. 3' },
  { id: 'beethoven', name: 'Ludwig van Beethoven', lifespan: '1770-1827', imageUrl: 'composerheads/beethoven.jpg', bio: 'A crucial figure in the transition between Classical and Romantic eras.', pieces: 'Symphony No. 5 | Symphony No. 9 "Choral"' },
  { id: 'mozart', name: 'Wolfgang Amadeus Mozart', lifespan: '1756-1791', imageUrl: 'composerheads/mozart.jpg', bio: 'A prolific composer of the Classical period.', pieces: 'Symphony No. 40 | Requiem, K. 626' },
];

const FALLBACK_ARTICLES = [
  { id: '1', title: 'Ravel\'s Le Tombeau de Couperin', date: 'September 8, 2025', author: 'ActuallyRavel1919', excerpt: 'First composed during the war...', youtubeEmbed: 'https://www.youtube.com/embed/jbLMhyR-UVQ', spotifyEmbed: '' },
];

const FALLBACK_CONCERTS = [
  { Title: 'Mendelssohn & Bruch', Date: 'March 21, 2025', Venue: 'Reid Concert Hall', Programme: 'Mendelssohn - Symphony No. 3 "Scottish", Bruch - Violin Concerto No. 1, Vanhal - Double Bassoon Concerto', Description: 'A captivating performance featuring Mendelssohn\'s Scottish Symphony and Bruch\'s Violin Concerto.', ShowImage: '', Photo1: '', Photo2: '', Photo3: '', Photo4: '', Photo5: '', Photo6: '', ProgrammeNotes: '' },
  { Title: 'Mozart & Beethoven', Date: 'November 22, 2024', Venue: 'Reid Concert Hall', Programme: 'Mozart - Symphony 31 "Paris", Beethoven - Symphony 2, Schubert - Entr\'acte no. 3, Debussy - Petite Suite', Description: 'Mozart\'s "Paris" Symphony and Beethoven\'s Second Symphony.', ShowImage: '', Photo1: '', Photo2: '', Photo3: '', Photo4: '', Photo5: '', Photo6: '' },
];

// ── Public API ──────────────────────────────────────────────────────────────

export async function getComposers() {
  const data = await fetchSheet('composers');
  const composers = data.length > 0 ? data : FALLBACK_COMPOSERS;
  
  return composers.map(c => {
    // 1. Safely parse the location history JSON
    let parsedLocationHistory = [];
    if (c.locationHistory && c.locationHistory.trim() !== '') {
      try {
        parsedLocationHistory = JSON.parse(c.locationHistory);
      } catch (error) {
        console.error(`Invalid JSON in locationHistory for ${c.name}:`, error);
        // It stays as an empty array [] if it fails, preventing the page from crashing
      }
    }

    // 2. Return the mapped object with the new data
    return {
      ...c,
      locationHistory: parsedLocationHistory, // Added our safely parsed array
      piecesArray: (c.pieces || '').split('|').map(p => p.trim()).filter(Boolean),
    };
  }).sort((a, b) => {
    const lastA = a.name.split(' ').pop();
    const lastB = b.name.split(' ').pop();
    return lastA.localeCompare(lastB);
  });
}

export async function getArticles() {
  const data = await fetchSheet('articles');
  return data.length > 0 ? data : FALLBACK_ARTICLES;
}

export async function getConcertArchive() {
  const data = await fetchSheet('concerts');
  const concerts = data.length > 0 ? data : FALLBACK_CONCERTS;
  const today = new Date(); today.setHours(0, 0, 0, 0);

  return concerts
    .map(c => {
      const dateObj = parseDateSafe(c.Date);
      if (!dateObj) return null;
      const slug = c.Slug?.trim() || generateSlug(c.Title, c.Date);

      // Extract gallery photos (Photo1 through Photo6)
      const photos = [c.Photo1, c.Photo2, c.Photo3, c.Photo4, c.Photo5, c.Photo6]
        .map(url => getCleanImageUrl(url))
        .filter(Boolean);

      // Programme notes: the ProgrammeNotes column holds a Google Drive share link
      const programmeNotesPdfUrl = getRawPdfUrl(c.ProgrammeNotes);
      const hasProgrammeNotes = !!programmeNotesPdfUrl && c.ProgrammeNotes?.includes('drive.google.com');

      // Check if this concert has a custom page
      const customRoute = CUSTOM_CONCERT_ROUTES[slug] || null;

      return { ...c, slug, _dateObj: dateObj, _isoDate: dateObj.toISOString(), photos,
        programmeNotesPdfUrl,
        hasProgrammeNotes,
        customRoute,
      };
    })
    .filter(c => c && c._dateObj < today) // Past concerts only
    .sort((a, b) => b._dateObj - a._dateObj);
}

// Programme notes — derived from concerts that have a Drive PDF link
export async function getConcertsWithNotes() {
  const concerts = await getConcertArchive();
  return concerts.filter(c => c.hasProgrammeNotes);
}

export async function getProgrammeBySlug(slug) {
  const concerts = await getConcertsWithNotes();
  return concerts.find(c => c.slug === slug) || null;
}

export async function getConcertBySlug(slug) {
  const concerts = await getConcertArchive();
  return concerts.find(c => c.slug === slug) || null;
}

export async function getAllConcertSlugs() {
  const concerts = await getConcertArchive();
  return concerts.map(c => c.slug);
}