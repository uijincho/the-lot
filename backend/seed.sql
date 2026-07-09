INSERT INTO corps (id, name, location, audition_date, audition_location, website_url, instruments, requirements, created_at) VALUES
(
  gen_random_uuid(), 'Blue Devils', 'Concord, CA', '2026-11-01', 'Concord, CA',
  'https://www.bluedevils.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'Must be 18–22 years old. Bring a prepared solo, scales, and sight-reading. Colorguard should prepare a movement combination.',
  NOW()
),
(
  gen_random_uuid(), 'Bluecoats', 'Canton, OH', '2026-10-25', 'Canton, OH',
  'https://www.bluecoats.com',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'Age-outs welcome through the current eligibility year. Brass auditionees prepare a lyrical solo and technical etude. Percussion prepare rudiments and a solo.',
  NOW()
),
(
  gen_random_uuid(), 'Carolina Crown', 'Fort Mill, SC', '2026-11-08', 'Fort Mill, SC',
  'https://www.carolinacrown.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Contrabass', 'Snare', 'Tenor', 'Bass Drum', 'Pit', 'Color Guard'],
  'Open to members ages 18–22. Brass members should prepare a solo demonstrating tone quality and range. Guard members prepare flag, rifle, or sabre work.',
  NOW()
),
(
  gen_random_uuid(), 'Santa Clara Vanguard', 'Santa Clara, CA', '2026-10-18', 'Santa Clara, CA',
  'https://www.scvanguard.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Battery', 'Front Ensemble', 'Color Guard'],
  'Auditionees must be 18 by June 1 of the performance year. Brass prepare a solo and scales across full range. Percussion prepare a rudimental solo and sight-reading.',
  NOW()
),
(
  gen_random_uuid(), 'The Cadets', 'Allentown, PA', '2026-11-15', 'Allentown, PA',
  'https://www.cadets.org',
  ARRAY['Trumpet', 'Mellophone', 'Euphonium', 'Contrabass', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'Age requirement: 18–22. Brass auditions include a prepared solo, major scales, and a sight-reading excerpt. Guard auditions include flag work and a movement phrase.',
  NOW()
);
