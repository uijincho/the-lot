INSERT INTO corps (id, name, location, audition_date, audition_location, website_url, instruments, requirements, created_at) VALUES
(
  gen_random_uuid(), 'The Academy', 'Tempe, AZ', NULL, NULL,
  'https://www.arizonaacademy.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'Scaffolding entry only: verify current-season audition date, location, fees, and eligibility against the corps official site and DCI.org before insert. Confirm per-section preparation for brass, battery, front ensemble, and color guard, and confirm DCI World Class age eligibility (members must not turn 22 before the season). No season-specific data has been verified.',
  NOW()
),
(
  gen_random_uuid(), 'Blue Devils', 'Concord, CA', NULL, NULL,
  'https://www.bluedevils.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'Scaffolding entry only: verify current-season audition date, location, fees, and eligibility against the corps official site and DCI.org before insert. Confirm per-section preparation for brass, battery, front ensemble, and color guard, and DCI World Class age eligibility. This organization fields multiple ensembles, so confirm which unit an audition applies to. No season-specific data has been verified.',
  NOW()
),
(
  gen_random_uuid(), 'Blue Knights', 'Denver, CO', NULL, NULL,
  'https://www.ascendperformingarts.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'Scaffolding entry only: verify current-season audition date, location, fees, and eligibility against the corps official site and DCI.org before insert. The corps operates under the Ascend Performing Arts organization, so verify the correct audition page. Confirm per-section preparation and DCI World Class age eligibility. No season-specific data has been verified.',
  NOW()
),
(
  gen_random_uuid(), 'Blue Stars', 'La Crosse, WI', NULL, NULL,
  'https://www.bluestars.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'Scaffolding entry only: verify current-season audition date, location, fees, and eligibility against the corps official site and DCI.org before insert. Confirm per-section preparation for brass, battery, front ensemble, and color guard, whether a video pre-screen is required, and DCI World Class age eligibility. No season-specific data has been verified.',
  NOW()
),
(
  gen_random_uuid(), 'Bluecoats', 'Canton, OH', NULL, NULL,
  'https://www.bluecoats.com',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'Scaffolding entry only: verify current-season audition date, location, fees, and eligibility against the corps official site and DCI.org before insert. Confirm per-section preparation for brass, battery, front ensemble, and color guard, whether a video pre-screen is required, and DCI World Class age eligibility. No season-specific data has been verified.',
  NOW()
),
(
  gen_random_uuid(), 'Boston Crusaders', 'Boston, MA', NULL, NULL,
  'https://www.bostoncrusaders.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'Scaffolding entry only: verify current-season audition date, location, fees, and eligibility against the corps official site and DCI.org before insert. This organization also fields an Open Class corps (7th Regiment), so confirm which unit an audition applies to. Confirm per-section preparation and DCI World Class age eligibility. No season-specific data has been verified.',
  NOW()
),
(
  gen_random_uuid(), 'The Cadets', 'Allentown, PA', NULL, NULL,
  'https://www.cadets.org',
  ARRAY['Trumpet', 'Mellophone', 'Euphonium', 'Contrabass', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'Scaffolding entry only: verify current-season audition date, location, fees, and eligibility against the corps official site and DCI.org before insert. Confirm per-section preparation for brass, battery, front ensemble, and color guard, and DCI World Class age eligibility. No season-specific data has been verified.',
  NOW()
),
(
  gen_random_uuid(), 'Carolina Crown', 'Fort Mill, SC', NULL, NULL,
  'https://www.carolinacrown.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Contrabass', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'Scaffolding entry only: verify current-season audition date, location, fees, and eligibility against the corps official site and DCI.org before insert. Confirm per-section preparation for brass, battery, front ensemble, and color guard, and DCI World Class age eligibility. No season-specific data has been verified.',
  NOW()
),
(
  gen_random_uuid(), 'The Cavaliers', 'Rosemont, IL', NULL, NULL,
  'https://www.cavaliers.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'Scaffolding entry only: verify current-season audition date, location, fees, and eligibility against the corps official site and DCI.org before insert. Confirm per-section preparation, guard configuration, and DCI World Class age eligibility for the current season. No season-specific data has been verified.',
  NOW()
),
(
  gen_random_uuid(), 'Colts', 'Dubuque, IA', NULL, NULL,
  'https://www.colts.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'Scaffolding entry only: verify current-season audition date, location, fees, and eligibility against the corps official site and DCI.org before insert. This organization also fields the Colt Cadets, so confirm which unit an audition applies to. Confirm per-section preparation and DCI World Class age eligibility. No season-specific data has been verified.',
  NOW()
),
(
  gen_random_uuid(), 'Crossmen', 'San Antonio, TX', NULL, NULL,
  'https://www.crossmen.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'Scaffolding entry only: verify current-season audition date, location, fees, and eligibility against the corps official site and DCI.org before insert. Confirm per-section preparation for brass, battery, front ensemble, and color guard, and DCI World Class age eligibility. No season-specific data has been verified.',
  NOW()
),
(
  gen_random_uuid(), 'The Mandarins', 'Sacramento, CA', NULL, NULL,
  'https://www.mandarins.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'Scaffolding entry only: verify current-season audition date, location, fees, and eligibility against the corps official site and DCI.org before insert. Confirm per-section preparation for brass, battery, front ensemble, and color guard, and DCI World Class age eligibility. No season-specific data has been verified.',
  NOW()
),
(
  gen_random_uuid(), 'Madison Scouts', 'Madison, WI', NULL, NULL,
  'https://www.madisonscouts.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'Scaffolding entry only: verify current-season audition date, location, fees, and eligibility against the corps official site and DCI.org before insert. This corps membership eligibility and class status have changed over time, so verify current status on DCI.org, including whether it fields color guard. No season-specific data has been verified.',
  NOW()
),
(
  gen_random_uuid(), 'Music City', 'Nashville, TN', NULL, NULL,
  'https://www.musiccitydci.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'Scaffolding entry only: verify current-season audition date, location, fees, and eligibility against the corps official site and DCI.org before insert. Confirm per-section preparation and DCI World Class age eligibility. No season-specific data has been verified.',
  NOW()
),
(
  gen_random_uuid(), 'Pacific Crest', 'Diamond Bar, CA', NULL, NULL,
  'https://www.pacific-crest.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'Scaffolding entry only: verify current-season audition date, location, fees, and eligibility against the corps official site and DCI.org before insert. Confirm per-section preparation and DCI World Class age eligibility. No season-specific data has been verified.',
  NOW()
);