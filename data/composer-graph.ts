/**
 * Hand-curated seed data for the composer mind-map/world-map
 * (components/ComposerMap.tsx, app/composers/page.tsx) -- real,
 * well-documented historical facts (birthplace/death place
 * coordinates, well-established teacher/student and influence
 * relationships), not placeholder or invented data. Covers a
 * significant, well-documented subset of the roster in
 * data/education.ts; the rest can be filled in by running
 * scripts/build-composer-graph.ts (see that file's header) to pull
 * the remainder from Wikidata/MMKG, or by hand.
 *
 * `id` values match data/education.ts's composer ids exactly, so this
 * file and that one can be merged by id (see lib/composerGraph.ts).
 *
 * Coordinates are approximate city-centre points for the named
 * place, not the literal birth/death address -- precise enough for a
 * world-map visualisation at this scale.
 */

export interface ComposerPlace {
  id: string;
  birthPlace: { name: string; lat: number; lng: number };
  deathPlace?: { name: string; lat: number; lng: number };
}

export interface ComposerConnection {
  from: string;
  to: string;
  type: "teacher" | "influence" | "friendship" | "meetup";
  label: string;
  /** Roughly when this connection is documented from, for display only. */
  period?: string;
}

export const composerPlaces: ComposerPlace[] = [
  { id: "bach-js", birthPlace: { name: "Eisenach", lat: 50.9796, lng: 10.3151 }, deathPlace: { name: "Leipzig", lat: 51.3397, lng: 12.3731 } },
  { id: "beethoven", birthPlace: { name: "Bonn", lat: 50.7374, lng: 7.0982 }, deathPlace: { name: "Vienna", lat: 48.2082, lng: 16.3738 } },
  { id: "mozart", birthPlace: { name: "Salzburg", lat: 47.8095, lng: 13.0550 }, deathPlace: { name: "Vienna", lat: 48.2082, lng: 16.3738 } },
  { id: "haydn", birthPlace: { name: "Rohrau", lat: 47.9667, lng: 16.8500 }, deathPlace: { name: "Vienna", lat: 48.2082, lng: 16.3738 } },
  { id: "handel", birthPlace: { name: "Halle", lat: 51.4825, lng: 11.9692 }, deathPlace: { name: "London", lat: 51.5074, lng: -0.1278 } },
  { id: "schubert", birthPlace: { name: "Vienna", lat: 48.2082, lng: 16.3738 }, deathPlace: { name: "Vienna", lat: 48.2082, lng: 16.3738 } },
  { id: "mendelssohn", birthPlace: { name: "Hamburg", lat: 53.5511, lng: 9.9937 }, deathPlace: { name: "Leipzig", lat: 51.3397, lng: 12.3731 } },
  { id: "schumann", birthPlace: { name: "Zwickau", lat: 50.7186, lng: 12.4930 }, deathPlace: { name: "Bonn (Endenich)", lat: 50.7374, lng: 7.0982 } },
  { id: "brahms", birthPlace: { name: "Hamburg", lat: 53.5511, lng: 9.9937 }, deathPlace: { name: "Vienna", lat: 48.2082, lng: 16.3738 } },
  { id: "chopin", birthPlace: { name: "Żelazowa Wola", lat: 52.2167, lng: 20.1667 }, deathPlace: { name: "Paris", lat: 48.8566, lng: 2.3522 } },
  { id: "wagner", birthPlace: { name: "Leipzig", lat: 51.3397, lng: 12.3731 }, deathPlace: { name: "Venice", lat: 45.4408, lng: 12.3155 } },
  { id: "tchaikovsky", birthPlace: { name: "Votkinsk", lat: 57.0500, lng: 53.9800 }, deathPlace: { name: "St Petersburg", lat: 59.9343, lng: 30.3351 } },
  { id: "dvorak", birthPlace: { name: "Nelahozeves", lat: 50.2333, lng: 14.3167 }, deathPlace: { name: "Prague", lat: 50.0755, lng: 14.4378 } },
  { id: "grieg", birthPlace: { name: "Bergen", lat: 60.3913, lng: 5.3221 }, deathPlace: { name: "Bergen", lat: 60.3913, lng: 5.3221 } },
  { id: "debussy", birthPlace: { name: "Saint-Germain-en-Laye", lat: 48.8977, lng: 2.0944 }, deathPlace: { name: "Paris", lat: 48.8566, lng: 2.3522 } },
  { id: "ravel", birthPlace: { name: "Ciboure", lat: 43.3833, lng: -1.6667 }, deathPlace: { name: "Paris", lat: 48.8566, lng: 2.3522 } },
  { id: "elgar", birthPlace: { name: "Broadheath, Worcester", lat: 52.2000, lng: -2.2667 }, deathPlace: { name: "Worcester", lat: 52.1917, lng: -2.2214 } },
  { id: "mahler", birthPlace: { name: "Kalischt, Bohemia", lat: 49.2833, lng: 15.4167 }, deathPlace: { name: "Vienna", lat: 48.2082, lng: 16.3738 } },
  { id: "sibelius", birthPlace: { name: "Hämeenlinna", lat: 61.0000, lng: 24.4500 }, deathPlace: { name: "Järvenpää", lat: 60.4667, lng: 25.0833 } },
  { id: "vivaldi", birthPlace: { name: "Venice", lat: 45.4408, lng: 12.3155 }, deathPlace: { name: "Vienna", lat: 48.2082, lng: 16.3738 } },
  { id: "berlioz", birthPlace: { name: "La Côte-Saint-André", lat: 45.3833, lng: 5.2667 }, deathPlace: { name: "Paris", lat: 48.8566, lng: 2.3522 } },
  { id: "bizet", birthPlace: { name: "Paris", lat: 48.8566, lng: 2.3522 }, deathPlace: { name: "Bougival", lat: 48.8619, lng: 2.1436 } },
  { id: "faure", birthPlace: { name: "Pamiers", lat: 43.1167, lng: 1.6167 }, deathPlace: { name: "Paris", lat: 48.8566, lng: 2.3522 } },
  { id: "saint-saens", birthPlace: { name: "Paris", lat: 48.8566, lng: 2.3522 }, deathPlace: { name: "Algiers", lat: 36.7538, lng: 3.0588 } },
  { id: "rossini", birthPlace: { name: "Pesaro", lat: 43.9102, lng: 12.9133 }, deathPlace: { name: "Paris", lat: 48.8566, lng: 2.3522 } },
  { id: "stravinsky", birthPlace: { name: "Oranienbaum", lat: 59.9111, lng: 29.7472 }, deathPlace: { name: "New York", lat: 40.7128, lng: -74.0060 } },
  { id: "vaughan-williams", birthPlace: { name: "Down Ampney", lat: 51.6833, lng: -1.8500 }, deathPlace: { name: "London", lat: 51.5074, lng: -0.1278 } },
  { id: "holst", birthPlace: { name: "Cheltenham", lat: 51.8994, lng: -2.0783 }, deathPlace: { name: "London", lat: 51.5074, lng: -0.1278 } },
  { id: "britten", birthPlace: { name: "Lowestoft", lat: 52.4736, lng: 1.7500 }, deathPlace: { name: "Aldeburgh", lat: 52.1547, lng: 1.6017 } },
  { id: "purcell", birthPlace: { name: "London", lat: 51.5074, lng: -0.1278 }, deathPlace: { name: "London", lat: 51.5074, lng: -0.1278 } },
  { id: "copland", birthPlace: { name: "Brooklyn, New York", lat: 40.6782, lng: -73.9442 }, deathPlace: { name: "Sleepy Hollow, New York", lat: 41.0870, lng: -73.8629 } },
  { id: "barber", birthPlace: { name: "West Chester, Pennsylvania", lat: 39.9601, lng: -75.6055 }, deathPlace: { name: "New York", lat: 40.7128, lng: -74.0060 } },
  { id: "smetana", birthPlace: { name: "Litomyšl", lat: 49.8722, lng: 16.3131 }, deathPlace: { name: "Prague", lat: 50.0755, lng: 14.4378 } },
];

export const composerConnections: ComposerConnection[] = [
  { from: "haydn", to: "beethoven", type: "teacher", label: "Beethoven studied with Haydn in Vienna", period: "1792–1794" },
  { from: "mozart", to: "haydn", type: "friendship", label: "Close friends; Mozart dedicated six string quartets to Haydn", period: "1780s" },
  { from: "mozart", to: "beethoven", type: "influence", label: "Beethoven deeply admired Mozart and hoped to study with him in Vienna", period: "1787" },
  { from: "schumann", to: "brahms", type: "teacher", label: "Schumann championed the young Brahms in his essay \"Neue Bahnen\"", period: "1853" },
  { from: "bach-js", to: "mendelssohn", type: "influence", label: "Mendelssohn's 1829 revival of the St Matthew Passion reignited interest in Bach", period: "1829" },
  { from: "brahms", to: "dvorak", type: "friendship", label: "Brahms championed Dvořák and secured him a state stipend", period: "1870s" },
  { from: "schumann", to: "grieg", type: "influence", label: "Grieg's early style was strongly shaped by Schumann's" },
  { from: "tchaikovsky", to: "saint-saens", type: "friendship", label: "Close friends; famously performed a comic ballet duet together in Moscow", period: "1875" },
  { from: "faure", to: "ravel", type: "teacher", label: "Fauré taught Ravel composition at the Paris Conservatoire" },
  { from: "debussy", to: "ravel", type: "influence", label: "A famous, complex mutual influence and rivalry between the two leading French composers of the era" },
  { from: "berlioz", to: "wagner", type: "meetup", label: "Met in Paris; a lifelong, complicated mix of mutual respect and rivalry" },
  { from: "ravel", to: "vaughan-williams", type: "teacher", label: "Vaughan Williams studied orchestration with Ravel in Paris — he called himself \"Ravel's only pupil\"", period: "1907–1908" },
  { from: "holst", to: "vaughan-williams", type: "friendship", label: "Lifelong friends who regularly critiqued each other's work in what they called \"field days\"" },
  { from: "wagner", to: "elgar", type: "influence", label: "Elgar was profoundly influenced by Wagner's harmonic language" },
  { from: "brahms", to: "elgar", type: "influence", label: "Elgar, largely self-taught, closely studied Brahms's orchestral scores" },
];
