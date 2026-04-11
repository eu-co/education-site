import { getConcertArchive } from '@/lib/data';
import ItalyPageClient from './ItalyPageClient';

export const metadata = {
  title: 'A Night in Italy — EUCO × Roma Tre Orchestra',
  description: 'A celebration of Italian classical music and opera, in partnership with the Italian Institute for Culture in Edinburgh.',
};

async function getItalyConcert() {
  const concerts = await getConcertArchive();
  return concerts.find(c => c.Title?.includes('Night in Italy')) || null;
}

// ─── EDITORIAL PHOTOS ───────────────────────────────────────────────────────
// Place images in /public/images/italian-concert/
const PHOTOS = Array.from({ length: 12 }, (_, i) => `/images/italian-concert/ItalianConcert-${i + 1}.jpg`);

// ─── PROGRAMME ──────────────────────────────────────────────────────────────
const programme = [
  {
    composer: 'Giuseppe Verdi',
    piece: 'Prelude from La Traviata',
    ensemble: 'EUCO',
    note: 'A heart-wrenching orchestral prelude that foreshadows the tragic love story of Violetta.',
    essay: `Verdi composed La Traviata in 1853, basing it on Alexandre Dumas' novel La Dame aux Camélias. The Prelude is extraordinary in its restraint — high, pianissimo divided strings open the opera with a melody of fragile, almost unbearable tenderness. This is the music of Violetta's final illness, heard before we ever meet her. It is one of Verdi's most daring structural choices: to begin an opera with its ending.

The melody returns in the third act as Violetta reads Germont's letter, and by then we understand its full weight. Tonight we hear it as a standalone piece — a miniature tone poem of love, sacrifice, and the inevitability of loss.`,
  },
  {
    composer: 'Ottorino Respighi',
    piece: 'Trittico Botticelliano',
    ensemble: 'EUCO',
    note: 'Three luminous movements inspired by the paintings of Sandro Botticelli.',
    essay: `Respighi's Trittico Botticelliano (1927) is a triptych of orchestral movements, each a musical response to one of Botticelli's most celebrated paintings. Where Respighi's Roman trilogy (Pines, Fountains, Festivals) is vast and cinematic, the Trittico is intimate and jewel-like, scored for chamber orchestra.

I. La Primavera — Botticelli's Allegory of Spring becomes a gently swaying pastoral, with woodwind melodies that intertwine like the figures in the painting. Respighi captures not the mythological narrative but the quality of light — the soft, diffused glow of a Florentine spring.

II. L'Adorazione dei Magi — The Adoration of the Magi is rendered as a solemn processional. A noble theme in the brass gives way to tender string writing, evoking the reverence and stillness at the centre of Botticelli's crowded composition.

III. La Nascita di Venere — The Birth of Venus is the most luminous of the three. Shimmering strings and delicate harp arpeggios suggest the sea foam from which Venus emerges. The movement builds to a radiant climax before dissolving back into the texture of the waves.`,
  },
  {
    composer: 'Pietro Mascagni',
    piece: 'Intermezzo from Cavalleria Rusticana',
    ensemble: 'EUCO',
    note: 'One of the most famous orchestral interludes ever written.',
    essay: `The Intermezzo from Cavalleria Rusticana is perhaps the most recognisable three minutes in all of opera. Mascagni composed the one-act opera in 1890 for a competition — and won, launching his career overnight. The Intermezzo sits between the two halves of the drama, a moment of devastating calm before the violent conclusion.

Scored for strings and organ (tonight with full orchestra), the melody rises with an almost unbearable simplicity. It has been used in countless films — most memorably in The Godfather Part III and Raging Bull — but its power is undiminished by familiarity. In the context of the opera, it represents the last moment of peace in a story hurtling towards tragedy.`,
  },
  {
    composer: 'Gaetano Donizetti',
    piece: 'Selections from Lucia di Lammermoor',
    ensemble: 'Roma Tre Orchestra',
    note: 'Based on Sir Walter Scott\'s novel — a bridge between Italian opera and Scottish literature.',
    essay: `Donizetti's Lucia di Lammermoor (1835) is the supreme example of Italian bel canto opera, and its connection to Scotland runs deep. The libretto is based on Sir Walter Scott's 1819 novel The Bride of Lammermoor, set in the Lammermuir Hills of East Lothian — barely an hour's drive from this concert hall.

The story of Lucy Ashton, forced into a marriage against her will with catastrophic consequences, gave Donizetti some of his most inspired music. The famous Mad Scene, in which Lucia appears covered in blood having murdered her bridegroom, is one of the supreme tests of the coloratura soprano voice.

Tonight the Roma Tre Orchestra brings selections from this masterpiece back to Scottish soil — a fitting tribute to the literary and musical bonds between Italy and Scotland that this entire evening celebrates.`,
  },
];

export default async function ANightInItalyPage() {
  const concert = await getItalyConcert();
  const allPhotos = PHOTOS;

  return <ItalyPageClient programme={programme} photos={allPhotos} concert={concert} />;
}