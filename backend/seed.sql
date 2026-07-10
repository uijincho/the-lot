TRUNCATE corps CASCADE;

INSERT INTO corps (id, name, location, audition_date, audition_location, website_url, instruments, requirements, corps_class, created_at) VALUES

-- ── WORLD CLASS ──────────────────────────────────────────────────────────────

(
  gen_random_uuid(), 'Blue Devils', 'Concord, CA', NULL, 'Concord, CA',
  'http://www.bluedevils.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025 Finish: 4th (Finals, 95.788). The most-decorated corps in DCI history with 20+ World Championship titles. Known for jazz-forward, conceptually bold programming and immaculate execution — the benchmark for artistry and visual cleanliness. BDPA also fields Blue Devils B and C (Open Class) as a full developmental pipeline. Auditions center on the Concord/Bay Area; strong video pre-screen culture. Very competitive audition pool. Confirm details at bluedevils.org.',
  'World', NOW()
),
(
  gen_random_uuid(), 'Bluecoats', 'Canton, OH', NULL, 'Canton, OH; Dallas, TX; Atlanta, GA; Southern CA',
  'http://www.bluecoats.com',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025 Finish: 2nd (Finals, 98.250) — topped Prelims and Semifinals. 2024 World Champions. Known as "The Bloo" for innovative, boundary-pushing design, staging, and electronics. A title contender and fan favorite for creative risk-taking. Auditions/camps based in Canton/northeast Ohio; video submissions accepted. Confirm at bluecoats.com.',
  'World', NOW()
),
(
  gen_random_uuid(), 'Boston Crusaders', 'Boston, MA', NULL, 'San Antonio, TX; Dallas, TX; Houston, TX; Indianapolis, IN',
  'http://www.bostoncrusaders.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025 Finish: 1st — World Champions (98.425), Best Brass, Best Color Guard. Won their first title in the corps'' 85th year with the production "Boom." One of the oldest continuously operating corps (founded 1940), known for an aggressive brass sound and dramatic productions. Auditions/camps in the greater Boston/New England area; video auditions accepted. Confirm at bostoncrusaders.org.',
  'World', NOW()
),
(
  gen_random_uuid(), 'Santa Clara Vanguard', 'Santa Clara, CA', NULL, 'Santa Clara, CA; Dallas, TX; Moscow, ID',
  'http://www.scvanguard.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025 Finish: 3rd (Finals, 96.700). Multiple-time World Champions (through 2018). Iconic for theatrical, cinematic productions and a distinctive brass/visual identity — the "Bottle Dance" is legendary. Returned to the top three after organizational restructuring. Auditions/camps in the Santa Clara/Bay Area; video pre-screens common. Confirm at scvanguard.org.',
  'World', NOW()
),
(
  gen_random_uuid(), 'Carolina Crown', 'Fort Mill, SC', NULL, 'Fort Mill, SC; Dallas, TX; Indianapolis, IN; Austin, TX',
  'http://www.carolinacrown.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Contrabass', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025 Finish: 5th (Finals, 94.800). 2013 World Champions. Renowned for lush, virtuosic brass — frequently cited as among the best in the activity — and emotive, musically driven design. Home facility is called the "Crownlands" in Fort Mill, SC. Large audition pool; video submissions accepted. Confirm at carolinacrown.org.',
  'World', NOW()
),
(
  gen_random_uuid(), 'Phantom Regiment', 'Rockford, IL', NULL, 'Rockford, IL; Atlanta, GA; Austin, TX; Dallas, TX; Houston, TX; Indianapolis, IN; Irvine, CA; Kansas City, MO; Mililani, HI',
  'http://www.regiment.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025 Finish: 6th (Finals, 94.300). World Champions in 1996 (co) and 2008. Known for symphonic, classically inspired repertoire, storytelling, and a powerful romantic brass sound. Famous for dramatic literature-based shows including the celebrated "Spartacus" era. Auditions/camps in the Rockford, IL region; video auditions accepted. Confirm at regiment.org.',
  'World', NOW()
),
(
  gen_random_uuid(), 'The Mandarins', 'Sacramento, CA', NULL, 'Sacramento, CA; Dallas, TX; San Antonio, TX; Indianapolis, IN',
  'http://www.mandarins.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025 Finish: 7th (Finals, 92.825) — back-to-back 7th place finishes. Known for intense, cinematic, often dark and dramatic productions with strong storytelling and a hard-edged competitive drive. Grew from a Sacramento community organization into a national finalist over the 2010s and 2020s. Auditions/camps in the Sacramento, CA area; video submissions accepted. Confirm at mandarins.org.',
  'World', NOW()
),
(
  gen_random_uuid(), 'Blue Stars', 'La Crosse, WI', NULL, 'La Crosse, WI; Lebanon, IN',
  'http://www.bluestars.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025 Finish: 8th (Finals, 91.175). A heritage Wisconsin corps that rebuilt into a consistent finalist since re-entering World Class in 2006. Known for clean, energetic, audience-friendly programming and steady well-rounded execution. Auditions/camps in the La Crosse, WI region; video auditions accepted. Confirm at bluestars.org.',
  'World', NOW()
),
(
  gen_random_uuid(), 'The Cavaliers', 'Rosemont, IL', NULL, 'Rosemont, IL; Chicago, IL',
  'http://www.cavaliers.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025 Finish: 9th (Finals, 90.800). Seven World Championships (1992, 1995, 2000–2002, 2004, 2006) — one of the most decorated corps historically. "The Green Machine," famous for precision drill, geometric visual design, and clean marching fundamentals. Entering a new design era after a rebuilding period. Auditions/camps in the Chicago/Rosemont, IL area; video auditions accepted. Confirm at cavaliers.org.',
  'World', NOW()
),
(
  gen_random_uuid(), 'Troopers', 'Casper, WY', NULL, 'Casper, WY; Indianapolis, IN',
  'http://www.troopersdrumcorps.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025 Finish: 10th (Finals, 90.050). "America''s Corps" — one of DCI''s oldest and most beloved corps. Iconic Western/patriotic identity with the "Sunburst" formation and cavalry-inspired uniforms. Founded 1957 in Casper, WY; strong tradition and audience connection. Video auditions especially important given the remote home base. Confirm at troopersdrumcorps.org.',
  'World', NOW()
),
(
  gen_random_uuid(), 'Colts', 'Dubuque, IA', NULL, 'Kokomo, IN; Oskaloosa, IA; Orlando, FL; Houston, TX',
  'http://www.colts.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025 Finish: 11th (Finals, 88.050). A tradition-rich Midwest organization with a full youth pipeline (Colt Cadets feeder corps). Known for approachable, uplifting, well-crafted shows and a strong community/education mission. Auditions/camps in the Dubuque, IA area; video auditions accepted. Confirm at colts.org.',
  'World', NOW()
),
(
  gen_random_uuid(), 'Blue Knights', 'Denver, CO', NULL, 'Denver, CO',
  'http://www.ascendperformingarts.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025 Finish: 12th (Finals, 87.450) — came back strong after missing Finals in 2024. Under Ascend Performing Arts. Recognized for innovative, avant-garde, contemporary visual and musical design; artistically adventurous programming. Auditions/camps in the Denver, CO metro area; video auditions accepted. Confirm at ascendperformingarts.org.',
  'World', NOW()
),
(
  gen_random_uuid(), 'Spirit of Atlanta', 'Atlanta, GA', NULL, 'Atlanta, GA; Jacksonville, AL; Cullowhee, NC; Moore, OK; Knoxville, TN',
  'https://www.spiritofatlanta.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025 Finish: 13th (Semifinals, 86.800 — just outside Finals). A heritage corps founded 1976, finalist 20+ times. Famous for a big, soulful "Southern" brass sound and performances evoking the culture of the American South. Passionate alumni base. Auditions/camps in the Atlanta, GA area; video auditions accepted. Confirm at spiritofatlanta.org.',
  'World', NOW()
),
(
  gen_random_uuid(), 'Madison Scouts', 'Madison, WI', NULL, 'Madison, WI',
  'http://www.madisonscouts.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025 Finish: 14th (Semifinals, 85.350). World Champions in 1975 and 1988. Historically known for high-energy, crowd-igniting brass and showmanship — one of DCI''s most emotionally iconic names. Opened membership to all genders in recent years. Fervent fanbase. Auditions/camps in the Madison, WI area; video auditions accepted. Confirm at madisonscouts.org.',
  'World', NOW()
),
(
  gen_random_uuid(), 'Pacific Crest', 'City of Industry, CA', NULL, 'City of Industry, CA',
  'http://www.pacific-crest.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025 Finish: 15th (Semifinals, 84.825). A Southern California program (greater LA) that has grown into a consistent upper-mid competitor. Known in recent years for productions honoring notable women and for accessible, thematically rich design. Auditions/camps in the City of Industry/greater LA area; video auditions accepted. Confirm at pacific-crest.org.',
  'World', NOW()
),
(
  gen_random_uuid(), 'Music City', 'Nashville, TN', NULL, 'Nashville, TN',
  'https://musiccityyouth.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025 Finish: 16th (Semifinals, 83.838) — broke back into World Class Semifinals for first time since 2013. A rising Nashville program founded 2007 building toward becoming a consistent finalist; strong regional identity in a music-rich city. On an upward trajectory. Auditions/camps in the Nashville, TN area; video auditions accepted. Confirm at musiccityyouth.org.',
  'World', NOW()
),
(
  gen_random_uuid(), 'The Academy', 'Tempe, AZ', NULL, 'Tempe, AZ; Henderson, NV; Houston, TX',
  'https://www.arizonaacademy.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025 Finish: 17th (Semifinals, 83.313). Founded 2001; won Division II/Open Class gold in 2006 and reached first World Class Finals in 2016. Strong educational mission; known for polished, student-development-focused programming out of the Phoenix/Tempe, AZ area. Video auditions accepted. Confirm at arizonaacademy.org.',
  'World', NOW()
),
(
  gen_random_uuid(), 'Crossmen', 'San Antonio, TX', NULL, 'San Antonio, TX; Houston, TX; Austin, TX; Dallas, TX',
  'http://www.crossmen.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025 Finish: 18th (Semifinals, 82.225). Founded 1974 in Philadelphia; relocated to San Antonio in 2007. A DCI finalist 25+ times with a signature crossed-sabres heritage. Known for strong brass and guard with ambitions to return to Finals. Auditions/camps in the San Antonio, TX area; video auditions accepted. Confirm at crossmen.org.',
  'World', NOW()
),
(
  gen_random_uuid(), 'Genesis', 'Austin, TX', NULL, 'Austin, TX',
  'http://www.genesisdbc.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025 Finish: 19th (Semifinals, 77.700). Founded 2013 in Open Class; moved to World Class in 2017. Three-time Open Class World Championship bronze medalist before moving up. A younger, growing Texas program with an educational focus and building competitive momentum. Auditions/camps in the Austin, TX area; video auditions accepted. Confirm at genesisdbc.org.',
  'World', NOW()
),
(
  gen_random_uuid(), 'Seattle Cascades', 'Seattle, WA', NULL, 'Seattle, WA; Vernonia, OR',
  'http://www.seattlecascades.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025 Finish: 20th (Semifinals, 77.050). The Pacific Northwest''s flagship World Class corps with lineage tracing to 1957. Rebuilding and stabilizing its competitive standing; passionate regional following. Video auditions especially helpful given the geographically isolated home base. Auditions/camps in the Seattle, WA area. Confirm at seattlecascades.org.',
  'World', NOW()
),
(
  gen_random_uuid(), 'Spartans', 'Nashua, NH', NULL, 'Nashua, NH',
  'http://www.spartansdbc.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025: Open Class Champions (82.150) and 19th at combined World Championship Prelims (81.725). 2024 Open Class Champions. One of the oldest active corps (founded 1955); New England''s flagship youth corps. Strong educational mission and consistent Open Class success; now classified at the World Class level and competing on the combined World Championship track. Auditions/camps in the Nashua, NH/New England area; video auditions accepted. Confirm at spartansdbc.org.',
  'World', NOW()
),

-- ── OPEN CLASS ───────────────────────────────────────────────────────────────

(
  gen_random_uuid(), 'Gold', 'San Diego, CA', NULL, 'San Diego, CA; Arcadia, CA',
  'http://golddrumcorps.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025: 2nd in Open Class (80.875); 20th at combined World Class Prelims (79.975). A perennial Open Class medal contender and leading Southern California program. Founded 2010 with a strong educational mission and consistent top-3 competitive results. Auditions/camps in the San Diego, CA area; video auditions accepted. Confirm at golddrumcorps.org.',
  'Open', NOW()
),
(
  gen_random_uuid(), 'The Battalion', 'Salt Lake City, UT', NULL, 'Salt Lake City, UT',
  'http://www.battalioncorps.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025: 3rd in Open Class (79.750); 21st at combined World Class Prelims (78.500). The Intermountain West''s growing Open Class program founded 2015. Military/tactical-inspired identity with a strong developmental focus; consistently a top-5 Open Class contender. Auditions/camps in the Salt Lake City, UT area; video auditions accepted. Confirm at battalioncorps.org.',
  'Open', NOW()
),
(
  gen_random_uuid(), 'Columbians', 'Pasco, WA', NULL, 'Pasco, WA',
  'http://www.columbiansdrumcorps.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025: 4th in Open Class (77.775); 25th at combined World Class Prelims (74.750). A Pacific Northwest Open Class corps with deep regional roots in the Tri-Cities, WA area. Strong community/education focus. Auditions/camps in the Pasco/Tri-Cities, WA area; video auditions accepted. Confirm at columbiansdrumcorps.org.',
  'Open', NOW()
),
(
  gen_random_uuid(), 'River City Rhythm', 'Anoka, MN', NULL, 'Anoka, MN; Waseca, MN',
  'http://rivercityrhythm.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025: 5th in Open Class (76.300); 26th at combined World Class Prelims (73.700). A Minnesota performing-arts organization (also active in WGI/indoor) founded 2011. Strong youth-development mission serving the Twin Cities metro area. Auditions/camps in the Anoka/Twin Cities, MN area; video auditions accepted. Confirm at rivercityrhythm.org.',
  'Open', NOW()
),
(
  gen_random_uuid(), '7th Regiment', 'New London, CT', NULL, 'New London, CT',
  'http://www.7thregiment.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025: 6th in Open Class (74.225); 27th at combined World Class Prelims (72.375). A New England Open Class program founded 2013 with a strong educational mission; also hosts regional DCI events. Consistent Open Class competitor and semifinalist. Auditions/camps in the New London, CT area; video auditions accepted. Confirm at 7thregiment.org.',
  'Open', NOW()
),
(
  gen_random_uuid(), 'Raiders', 'Princeton, NJ', NULL, 'Princeton, NJ; Salem, NJ',
  'http://www.raidersdbc.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025: 7th in Open Class (73.750); 28th at combined World Class Prelims (72.200). A heritage New Jersey corps founded 1963 with strong tradition and a youth-development focus. A long-running Open Class competitor in the Northeast. Auditions/camps in the Princeton/central NJ area; video auditions accepted. Confirm at raidersdbc.org.',
  'Open', NOW()
),
(
  gen_random_uuid(), 'Colt Cadets', 'Dubuque, IA', NULL, 'Dubuque, IA',
  'http://www.colts.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025: 8th in Open Class (71.050); 29th at combined World Class Prelims (70.550). The developmental feeder corps to the World Class Colts, under the Colts Youth Organization in Dubuque, IA. Emphasis on education and first-year touring experience; a common entry point for younger performers heading toward the World Class corps. Confirm at colts.org.',
  'Open', NOW()
),
(
  gen_random_uuid(), 'Les Stentors', 'Sherbrooke, QC', NULL, 'Sherbrooke, QC',
  'http://www.stentors.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  '2025: 9th in Open Class (68.350); 30th at combined World Class Prelims (67.375). Canada''s primary Open Class DCI representative. A French-Canadian (Quebec) youth corps offering the DCI touring experience to Canadian performers. Auditions/camps in the Sherbrooke, QC area; video auditions accepted; materials available in French and English. Confirm at stentors.org.',
  'Open', NOW()
),
(
  gen_random_uuid(), 'Blue Devils B', 'Concord, CA', NULL, 'Concord, CA; Milpitas, CA; Westlake Village, CA; Pomona, CA',
  'http://www.bluedevils.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'One of the most successful Open Class corps historically, with numerous Open Class titles. The Blue Devils'' primary developmental corps — carries the BD design and technique standard and is a top pathway toward the World Class corps. Shares the BDPA audition process (bluedevils.org); video pre-screens common. Strong competition for spots given the BD reputation.',
  'Open', NOW()
),
(
  gen_random_uuid(), 'Blue Devils C', 'Concord, CA', NULL, 'Fairfield, CA; Concord, CA',
  'http://www.bluedevils.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'The youngest entry-level tier of the Blue Devils Performing Arts pipeline. Developmental corps for younger Bay Area performers; provides age-appropriate first experiences below BD B and the World Class corps. A common first step into the BDPA organization. Auditions/camps in the Concord, CA area. Confirm at bluedevils.org.',
  'Open', NOW()
),
(
  gen_random_uuid(), 'Guardians', 'McKinney, TX', NULL, 'McKinney, TX; Dallas, TX; San Antonio, TX',
  'http://www.guardiansdbc.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'A North Texas Open Class corps (McKinney/Dallas area) with an educational mission. Founded 2007; a regular Open Class competitor in the Dallas-Fort Worth region providing touring opportunities to Texas performers. Video auditions accepted. Confirm at guardiansdbc.org.',
  'Open', NOW()
),
(
  gen_random_uuid(), 'Golden Empire', 'Bakersfield, CA', NULL, 'Bakersfield, CA',
  'http://www.geperformingarts.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'A Central Valley California performing-arts organization providing Open Class touring for regional youth in the Bakersfield, CA area. Offers DCI competition access to performers in a region with few local corps options. Video auditions accepted. Confirm at geperformingarts.org.',
  'Open', NOW()
),
(
  gen_random_uuid(), 'Impulse', 'Buena Park, CA', NULL, 'Buena Park, CA',
  'http://www.impulseyoutharts.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'A Southern California Open Class corps based in Buena Park (Orange County / greater LA area). Education-first mission; a strong option for Southern California performers looking for an Open Class entry into DCI. Video auditions accepted. Confirm at impulseyoutharts.org.',
  'Open', NOW()
),
(
  gen_random_uuid(), 'Heat Wave', 'Tampa, FL', NULL, 'Tampa, FL',
  'https://www.heat-wave.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'Florida''s Open Class DCI representative, based in the Tampa Bay area. Offers Open Class touring opportunities to Florida and Southeast performers in a region with limited corps access. Video auditions accepted. Confirm at heat-wave.org.',
  'Open', NOW()
),
(
  gen_random_uuid(), 'Gems', 'Boise, ID', NULL, 'Boise, ID',
  'https://www.boisegems.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'An Idaho-based Open Class corps providing DCI competition access in the Intermountain West. Serves a region with few corps options; strong community mission for Boise and surrounding area youth. Video auditions accepted. Confirm at boisegems.org.',
  'Open', NOW()
),
(
  gen_random_uuid(), 'Arsenal', 'El Paso, TX', NULL, 'El Paso, TX',
  'https://www.arsenaldbc.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'A West Texas Open Class corps based in El Paso, expanding DCI access in the Southwest border region. Provides touring opportunities to performers in an area with limited corps options. Video auditions accepted. Confirm at arsenaldbc.org.',
  'Open', NOW()
),
(
  gen_random_uuid(), 'Eclipse', 'Indianapolis, IN', NULL, 'Indianapolis, IN',
  'https://eclipsedbc.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'An Indianapolis-based Open Class corps with an education-first mission. Located at the heart of the DCI community in the city that hosts the World Championships. A newer competitor with a strong community foundation. Video auditions accepted. Confirm at eclipsedbc.org.',
  'Open', NOW()
),
(
  gen_random_uuid(), 'Memphis Blues', 'Memphis, TN', NULL, 'Memphis, TN',
  'https://www.memphisbluesdc.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'A Memphis-based corps that made its Open Class debut in 2025. Growing the activity in the Mid-South with a strong regional musical identity in America''s blues capital. New/developmental Open Class competitor building toward consistent competition. Video auditions accepted. Confirm at memphisbluesdc.org.',
  'Open', NOW()
),
(
  gen_random_uuid(), 'Zephyrus', 'Tulsa, OK', NULL, 'Tulsa, OK',
  'https://www.zephyrusarts.org',
  ARRAY['Trumpet', 'Mellophone', 'Baritone', 'Tuba', 'Snare', 'Tenor', 'Bass Drum', 'Front Ensemble', 'Color Guard'],
  'A Tulsa-based youth arts organization that made its DCI Open Class debut in 2025, expanding the activity in Oklahoma. A new/developmental competitor building a foundation in the South-Central region. Video auditions accepted. Confirm at zephyrusarts.org.',
  'Open', NOW()
);
