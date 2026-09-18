import type { GalleryImage } from "@/components/GalleryGrid";

export type { GalleryImage };

export interface Shoot {
  slug: string;
  title: string;
  category: string;
  coverImage: string | null; // null = placeholder
  description: string;
  images: GalleryImage[];
}

export const categories = ["Newborn", "Family", "Milestone", "Event"];

// ——— SHOOTS DATA ———
// Each shoot is a separate session Gabi has done.
// Images will be replaced with real photos as Gabi provides them.

export const shoots: Shoot[] = [
  // — Family Shoots —
  {
    slug: "keay-nature-center-wilmette-family-session",
    title: "Family Photography in Wilmette: Keay Nature Center Session",
    category: "Family",
    coverImage: "/photos/keay-nature-center-wilmette-family-session/cover-family.jpg",
    description: "Wooded trails, golden light, and a family that came to have fun. Keay Nature Center in Wilmette did the rest.",
    images: [
      { src: "/photos/keay-nature-center-wilmette-family-session/01.jpg", alt: "Wilmette family photographer at Keay Nature Center — family of four cheek to cheek under green canopy in summer light" },
      { src: "/photos/keay-nature-center-wilmette-family-session/02.jpg", alt: "Family of four cuddling on white blanket in tall prairie grasses during Wilmette outdoor family photo session" },
      { src: "/photos/keay-nature-center-wilmette-family-session/03.jpg", alt: "Mom kissing toddler son while big sister kisses too — candid Keay Nature Center family session in Wilmette" },
      { src: "/photos/keay-nature-center-wilmette-family-session/04.jpg", alt: "Family of four laughing with toddler daughter on dad's shoulders during a Wilmette outdoor family session" },
      { src: "/photos/keay-nature-center-wilmette-family-session/05.jpg", alt: "Playful family of four by a wooden split rail fence at Keay Nature Learning Center in Wilmette" },
      { src: "/photos/keay-nature-center-wilmette-family-session/06.jpg", alt: "Family of four walking together holding hands across a green clearing during a Wilmette family photo session" },
      { src: "/photos/keay-nature-center-wilmette-family-session/07.jpg", alt: "Parents lifting toddler son and daughter into the air during a joyful Keay Nature Center family session in Wilmette" },
      { src: "/photos/keay-nature-center-wilmette-family-session/08.jpg", alt: "Family of four seated on white blanket among tall grasses during a North Shore outdoor family session in Wilmette" },
      { src: "/photos/keay-nature-center-wilmette-family-session/09.jpg", alt: "Mom in eyelet white dress hugging toddler son in green park setting at Keay Nature Center" },
      { src: "/photos/keay-nature-center-wilmette-family-session/10.jpg", alt: "Family of four laughing together in a sunny clearing during a Wilmette family photography session" },
      { src: "/photos/keay-nature-center-wilmette-family-session/11.jpg", alt: "Parents holding their two kids beside a young tree at Keay Nature Learning Center in Wilmette" },
      { src: "/photos/keay-nature-center-wilmette-family-session/12.jpg", alt: "Dad in white tee holding smiling daughter in floral dress during an outdoor family session in Wilmette" },
      { src: "/photos/keay-nature-center-wilmette-family-session/13.jpg", alt: "Mom lifting toddler son above her against a leafy green canopy during Keay Nature Center family photos" },
      { src: "/photos/keay-nature-center-wilmette-family-session/14.jpg", alt: "Dad lifting toddler son for a playful kiss by the pond at Keay Nature Center in Wilmette" },
      { src: "/photos/keay-nature-center-wilmette-family-session/15.jpg", alt: "Mom holding daughter upside down in a playful candid moment during a Wilmette family photo session" },
      { src: "/photos/keay-nature-center-wilmette-family-session/16.jpg", alt: "Parents walking hand in hand along a grassy path at Keay Nature Center in Wilmette" },
      { src: "/photos/keay-nature-center-wilmette-family-session/17.jpg", alt: "Mom and daughter swinging on a low tree branch in the woods at Keay Nature Center" },
      { src: "/photos/keay-nature-center-wilmette-family-session/18.jpg", alt: "Mom and daughter walking hand in hand across a wooden bridge at Keay Nature Learning Center in Wilmette" },
      { src: "/photos/keay-nature-center-wilmette-family-session/19.jpg", alt: "Mom lifting toddler daughter above her in a quiet woodland clearing at Keay Nature Center" },
      { src: "/photos/keay-nature-center-wilmette-family-session/20.jpg", alt: "Young girl in floral dress running barefoot through tall grasses at Keay Nature Center in Wilmette" },
      { src: "/photos/keay-nature-center-wilmette-family-session/21.jpg", alt: "Toddler boy in blue romper exploring a park bench at Keay Nature Learning Center in Wilmette" },
      { src: "/photos/keay-nature-center-wilmette-family-session/22.jpg", alt: "Playful candid of young girl peeking through her floral dress in the grass during a Wilmette family session" },
      { src: "/photos/keay-nature-center-wilmette-family-session/23.jpg", alt: "Black and white moment of mom kissing daughter outdoors during a Wilmette family photo session" },
      { src: "/photos/keay-nature-center-wilmette-family-session/24.jpg", alt: "Joyful black and white moment of mom kissing laughing daughter at Keay Nature Center in Wilmette" },
      { src: "/photos/keay-nature-center-wilmette-family-session/25.jpg", alt: "Black and white detail of young girl resting on a quilted blanket with mom's hand stroking her hair" },
      { src: "/photos/keay-nature-center-wilmette-family-session/26.jpg", alt: "Black and white moment of big sister kissing baby brother on a blanket outdoors at Keay Nature Center" },
      { src: "/photos/keay-nature-center-wilmette-family-session/27.jpg", alt: "Mom in eyelet dress smiling while hugging toddler son during a Keay Nature Center family session in Wilmette" },
    ],
  },

  {
    slug: "west-rogers-park-9-month-family-session",
    title: "In-Home Family Session in West Rogers Park",
    category: "Family",
    coverImage: "/photos/west-rogers-park-9-month-family/cover-home.jpg",
    description: "A cozy in-home family session in West Rogers Park celebrating a baby's 9 month milestone with cuddles, play, and beautiful natural light.",
    images: [
      { src: "/photos/west-rogers-park-9-month-family/09.jpg", alt: "Parent holding 9 month old baby during a lifestyle family photo session at home" },
      { src: "/photos/west-rogers-park-9-month-family/08.jpg", alt: "Natural light baby portrait from an in-home family session in West Rogers Park" },
      { src: "/photos/west-rogers-park-9-month-family/07.jpg", alt: "Baby playing at home during a West Rogers Park family photography session" },
      { src: "/photos/west-rogers-park-9-month-family/04.jpg", alt: "Parent and baby connection during natural light in-home family photography in West Rogers Park" },
      { src: "/photos/west-rogers-park-9-month-family/13.jpg", alt: "9 month old baby peeking through crib slats with a stuffed toy during an in-home milestone session" },
      { src: "/photos/west-rogers-park-9-month-family/12.jpg", alt: "Laughing baby while being tickled by a parent during a lifestyle family photography session at home" },
      { src: "/photos/west-rogers-park-9-month-family/11.jpg", alt: "Smiling 9 month old baby sitting on a knit blanket during an in-home family session in West Rogers Park" },
      { src: "/photos/west-rogers-park-9-month-family/01.jpg", alt: "9 month old baby smiling during an in-home family photography session in West Rogers Park Chicago" },
      { src: "/photos/west-rogers-park-9-month-family/02.jpg", alt: "Laughing baby during a cozy at-home family photo session in West Rogers Park" },
      { src: "/photos/west-rogers-park-9-month-family/03.jpg", alt: "Lifestyle baby portrait from a 9 month milestone family session at home in West Rogers Park" },
      { src: "/photos/west-rogers-park-9-month-family/05.jpg", alt: "9 month baby milestone portrait in a warm neutral home setting in West Rogers Park" },
      { src: "/photos/west-rogers-park-9-month-family/06.jpg", alt: "Candid family moment with a 9 month old baby during an in-home lifestyle session in Chicago" },
      { src: "/photos/west-rogers-park-9-month-family/10.jpg", alt: "West Rogers Park family portrait with baby during a cozy in-home milestone session" },
      { src: "/photos/west-rogers-park-9-month-family/14.jpg", alt: "Parent reaching for baby through crib slats during a tender at-home family photography moment" },
      { src: "/photos/west-rogers-park-9-month-family/15.jpg", alt: "Parents lifting their baby above the couch during a playful in-home family session in West Rogers Park" },
      { src: "/photos/west-rogers-park-9-month-family/16.jpg", alt: "Father playing with 9 month old baby on the floor during a candid lifestyle family photo session" },
      { src: "/photos/west-rogers-park-9-month-family/17.jpg", alt: "Father holding smiling baby for a natural light family portrait in West Rogers Park Chicago" },
      { src: "/photos/west-rogers-park-9-month-family/18.jpg", alt: "Parents kissing their 9 month old baby during an in-home family photography session in West Rogers Park" },
    ],
  },

  {
    slug: "glickman-family-skokie-library",
    title: "Outdoor Family Session — Natural Light",
    category: "Family",
    coverImage: "/photos/glickman-family/05-family-walking-plaza.jpg",
    description: "Inside the stacks and outside on the library grounds, an afternoon full of giggles and exploration.",
    images: [
      { src: "/photos/glickman-family/05-family-walking-plaza.jpg", alt: "Parents swinging toddler between them on brick plaza — playful family session" },
      { src: "/photos/glickman-family/04-family-sculpture.jpg", alt: "Family portrait by sculpture outside Skokie Library — outdoor family photography" },
      { src: "/photos/glickman-family/12-family-library-reading.jpg", alt: "Family reading together in library aisle — Skokie Public Library family session" },
      { src: "/photos/glickman-family/06-sister-holding-brother.jpg", alt: "Big sister carrying baby brother outside the library — sibling photography" },
      { src: "/photos/glickman-family/02-dad-baby-silhouette.jpg", alt: "Father holding baby up in window silhouette — artistic family portrait" },
      { src: "/photos/glickman-family/03-mom-son-playing.jpg", alt: "Mother swinging son outside the library — candid family moment" },
      { src: "/photos/glickman-family/01-kids-peeking-books.jpg", alt: "Three kids peeking between library books — playful family photography Skokie" },
      { src: "/photos/glickman-family/08-mom-daughter-hug.jpg", alt: "Mother and daughter hugging outside Skokie Library — mom and daughter portrait" },
      { src: "/photos/glickman-family/11-toddler-hugging-mom.jpg", alt: "Toddler hugging mom in library — tender family moment" },
      { src: "/photos/glickman-family/10-siblings-portrait.jpg", alt: "Sister and brother portrait by window — natural light sibling photography" },
      { src: "/photos/glickman-family/07-toddler-standing.jpg", alt: "Toddler standing and smiling on blue carpet — child portrait" },
      { src: "/photos/glickman-family/09-boys-smiling-sister.jpg", alt: "Two brothers smiling at sister in library — candid sibling moment" },
      { src: "/photos/glickman-family/13-dad-son-stairs.jpg", alt: "Father and son walking down library stairs — overhead family photography" },
    ],
  },

  // — Newborn Shoots —
  {
    slug: "sweet-baby-girl-newborn-skokie",
    title: "Newborn Photography in Skokie: Sweet Baby Girl Session",
    category: "Newborn",
    coverImage: "/photos/sweet-baby-girl-newborn-skokie/cover-tree.jpg",
    description: "A natural light newborn session in Skokie capturing soft in-home portraits, outdoor family moments, and quiet nursery scenes with a sweet baby girl and her parents.",
    images: [
      { src: "/photos/sweet-baby-girl-newborn-skokie/01.jpg", alt: "Skokie newborn photographer outdoor session — young parents holding baby girl by tree and hedge in summer light" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/02.jpg", alt: "Studio newborn family portrait in Skokie — smiling mom and dad with sleeping baby girl in floral romper" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/03.jpg", alt: "Skokie newborn photography — parents forehead to forehead holding baby girl between them in soft natural light" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/04.jpg", alt: "Dad kissing newborn baby girl's head during a Skokie studio newborn session with backlit window light" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/05.jpg", alt: "In-home newborn lifestyle moment — mom holding baby girl in nursery glider above a floral rug in Skokie" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/06.jpg", alt: "Skokie newborn family portrait — young parents cheek to cheek smiling with baby girl in floral romper" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/07.jpg", alt: "Outdoor newborn session in Skokie — parents holding baby girl against green ivy hedge in summer light" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/08.jpg", alt: "Lifestyle newborn session in the nursery — family of three on cream glider with floral rug in Skokie" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/09.jpg", alt: "Black and white newborn family photo framed through floral mirror — Skokie in-home newborn photography" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/10.jpg", alt: "Tender newborn family portrait — parents resting cheeks together holding baby girl in studio light" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/11.jpg", alt: "Mom kissing newborn baby girl's head during a soft natural light studio session in Skokie" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/12.jpg", alt: "Outdoor newborn portrait — parents looking down at baby girl together during a summer session in Skokie" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/13.jpg", alt: "Skokie newborn family session under a tree — parents seated on grass holding baby girl on mom's lap" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/14.jpg", alt: "Newborn baby girl asleep in parent's hand during a studio session — gentle newborn portrait" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/15.jpg", alt: "Newborn baby girl close-up with floral bow headband during a Skokie newborn session" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/16.jpg", alt: "Newborn baby girl resting on parent's forearm in floral outfit — soft natural light detail photo" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/17.jpg", alt: "New mom holding her sleeping newborn baby girl during a Skokie studio newborn session" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/18.jpg", alt: "Skokie newborn photography — smiling new mom holding baby girl in front of soft white backdrop" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/19.jpg", alt: "New dad holding baby girl in the nursery during an in-home newborn lifestyle session in Skokie" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/20.jpg", alt: "Black and white outdoor newborn portrait — mom laughing while holding baby girl under a tree in Skokie" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/21.jpg", alt: "Newborn baby feet detail in black and white — Skokie newborn photography detail shot" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/22.jpg", alt: "Candid outdoor newborn moment — baby girl crying in parent's arms during a summer Skokie session" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/23.jpg", alt: "Sleeping newborn baby girl in black and white — gentle close-up from a Skokie studio session" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/24.jpg", alt: "Dad in side profile kissing newborn baby girl's forehead during a soft window-light studio session in Skokie" },
      { src: "/photos/sweet-baby-girl-newborn-skokie/25.jpg", alt: "Black and white detail photo — parents' hands and wedding rings cradling newborn baby girl" },
    ],
  },

  {
    slug: "cooper-family-welcome-baby-billie",
    title: "In-Home Newborn Session — Skokie",
    category: "Newborn",
    coverImage: "/photos/cooper-family/12-parents-newborn-window.jpg",
    description: "A cozy in-home newborn session — the whole family meeting their newest addition.",
    images: [
      { src: "/photos/cooper-family/12-parents-newborn-window.jpg", alt: "Parents holding newborn by window — natural light newborn photography" },
      { src: "/photos/cooper-family/06-siblings-baby.jpg", alt: "Big sisters smiling with newborn baby — sibling newborn photography" },
      { src: "/photos/cooper-family/15-mom-kissing-baby-hand.jpg", alt: "Mother kissing newborn baby's hand — tender newborn photography" },
      { src: "/photos/cooper-family/07-family-bed.jpg", alt: "Whole family together on bed with newborn — lifestyle family photography" },
      { src: "/photos/cooper-family/01-mom-baby-bed.jpg", alt: "Mother gazing at newborn baby on bed — intimate newborn moment" },
      { src: "/photos/cooper-family/03-parents-baby-closeup.jpg", alt: "Parents looking at baby between them — newborn family moment" },
      { src: "/photos/cooper-family/04-baby-headband-portrait.jpg", alt: "Newborn baby portrait with floral headband — gentle newborn photography" },
      { src: "/photos/cooper-family/08-dad-daughter-stairs.jpg", alt: "Father helping daughter walk down stairs — lifestyle family moment" },
      { src: "/photos/cooper-family/09-parents-baby-bed.jpg", alt: "Parents watching newborn on bed — in-home newborn session" },
      { src: "/photos/cooper-family/14-sister-holding-baby.jpg", alt: "Toddler sister meeting newborn baby — sibling first moments" },
      { src: "/photos/cooper-family/16-sisters-holding-baby-playhouse.jpg", alt: "Sisters holding newborn in front of playhouse — sibling newborn photography" },
      { src: "/photos/cooper-family/10-mom-baby-lying.jpg", alt: "Mother lying with newborn on bed — intimate newborn photography" },
      { src: "/photos/cooper-family/13-baby-pink-blanket.jpg", alt: "Newborn baby sleeping under pink blanket — peaceful newborn portrait" },
      { src: "/photos/cooper-family/02-sisters-bed.jpg", alt: "Two sisters laughing on bed — lifestyle sibling photography" },
      { src: "/photos/cooper-family/11-sisters-jumping-bed.jpg", alt: "Sisters jumping on bed — playful childhood photography" },
      { src: "/photos/cooper-family/05-baby-feet.jpg", alt: "Newborn baby feet in white onesie — detail newborn photography" },
    ],
  },

  {
    slug: "nemsick-family-welcome-baby-henry",
    title: "Downtown Chicago Newborn Session",
    category: "Newborn",
    coverImage: "/photos/nemsick-family/06-dad-baby-window.jpg",
    description: "A dreamy downtown session with city skyline views and baby Henry at one month old.",
    images: [
      { src: "/photos/nemsick-family/06-dad-baby-window.jpg", alt: "Father holding newborn by window with city skyline — downtown newborn photography" },
      { src: "/photos/nemsick-family/04-baby-skyline-window.jpg", alt: "Newborn held by parents with city skyline — urban newborn photography" },
      { src: "/photos/nemsick-family/03-baby-sleeping-blue.jpg", alt: "Newborn baby sleeping in blue knit outfit — peaceful baby portrait" },
      { src: "/photos/nemsick-family/13-parents-baby-closeup.jpg", alt: "Parents looking down at newborn baby — intimate family moment" },
      { src: "/photos/nemsick-family/11-mom-baby-window.jpg", alt: "Mother holding baby by window with city view — lifestyle newborn session" },
      { src: "/photos/nemsick-family/10-dad-holding-baby.jpg", alt: "Father cradling sleeping newborn — dad and baby portrait" },
      { src: "/photos/nemsick-family/09-parents-feeding.jpg", alt: "Parents feeding newborn baby on bed — candid lifestyle newborn photography" },
      { src: "/photos/nemsick-family/07-parents-baby-between.jpg", alt: "Baby sleeping between parents — newborn family portrait" },
      { src: "/photos/nemsick-family/12-baby-mom-lap.jpg", alt: "Newborn baby in blue outfit on mother's lap — lifestyle newborn" },
      { src: "/photos/nemsick-family/01-baby-hands-face-blue.jpg", alt: "Baby covering face with tiny hands — adorable newborn detail" },
      { src: "/photos/nemsick-family/05-baby-hand-bw.jpg", alt: "Baby hand gripping parent's finger — black and white newborn detail" },
      { src: "/photos/nemsick-family/02-baby-hand-pacifier.jpg", alt: "Newborn hand close-up with pacifier — baby detail photography" },
      { src: "/photos/nemsick-family/08-baby-feet-dad.jpg", alt: "Tiny baby feet in father's hands — newborn detail photography" },
    ],
  },

  {
    slug: "hoffman-family-welcome-baby-ava",
    title: "In-Home Newborn Lifestyle Session",
    category: "Newborn",
    coverImage: "/photos/hoffman-family/08-parents-baby-window.jpg",
    description: "Warm neutrals, big sibling energy, and tiny baby Ava at just two weeks old.",
    images: [
      { src: "/photos/hoffman-family/08-parents-baby-window.jpg", alt: "Parents holding newborn between them by window — intimate newborn photography" },
      { src: "/photos/hoffman-family/04-dad-baby-window.jpg", alt: "Father gazing at newborn by window — dad and baby portrait" },
      { src: "/photos/hoffman-family/01-three-kids-blanket.jpg", alt: "Three children lying together on blanket — sibling newborn photography" },
      { src: "/photos/hoffman-family/02-family-couch.jpg", alt: "Family together on couch with newborn — lifestyle family photography" },
      { src: "/photos/hoffman-family/03-siblings-holding-baby.jpg", alt: "Siblings holding newborn baby — big brother and sister portrait" },
      { src: "/photos/hoffman-family/05-sister-with-baby.jpg", alt: "Big sister lying next to newborn — tender sibling moment" },
      { src: "/photos/hoffman-family/10-dad-kissing-baby.jpg", alt: "Father kissing newborn on head — dad and baby moment" },
      { src: "/photos/hoffman-family/06-baby-swaddled-headband.jpg", alt: "Newborn baby sleeping swaddled with gold headband — baby portrait" },
      { src: "/photos/hoffman-family/09-siblings-chair.jpg", alt: "Siblings holding baby in chair — newborn family photography" },
      { src: "/photos/hoffman-family/11-siblings-kissing.jpg", alt: "Brother kissing sister on cheek — playful sibling photography" },
      { src: "/photos/hoffman-family/13-family-couch-portrait.jpg", alt: "Full family portrait on couch with newborn — family photography" },
      { src: "/photos/hoffman-family/12-siblings-with-baby-floor.jpg", alt: "Siblings sitting with newborn baby on floor — lifestyle family" },
      { src: "/photos/hoffman-family/14-baby-looking-up.jpg", alt: "Newborn baby looking up at camera — candid baby portrait" },
      { src: "/photos/hoffman-family/15-baby-cheeks-squish.jpg", alt: "Father squishing newborn's cheeks — adorable baby moment" },
      { src: "/photos/hoffman-family/07-baby-hand-bw.jpg", alt: "Newborn holding parent's finger — black and white detail" },
    ],
  },

  // — Milestone Shoots —
  {
    slug: "garfield-park-conservatory-engagement",
    title: "Garfield Park Conservatory Engagement Session",
    category: "Milestone",
    coverImage: "/photos/garfield-park-conservatory-engagement/cover-bench.jpg",
    description: "Romantic engagement photos at Garfield Park Conservatory in Chicago, with lush greenhouse light, elegant portraits, and close-up ring details.",
    images: [
      { src: "/photos/garfield-park-conservatory-engagement/01.jpg", alt: "Engaged couple posing on a bench surrounded by tropical plants at Garfield Park Conservatory in Chicago" },
      { src: "/photos/garfield-park-conservatory-engagement/02.jpg", alt: "Couple embracing under hanging flowers during a Garfield Park Conservatory engagement session" },
      { src: "/photos/garfield-park-conservatory-engagement/03.jpg", alt: "Close-up engagement ring photo held between the couple's hands at Garfield Park Conservatory" },
      { src: "/photos/garfield-park-conservatory-engagement/04.jpg", alt: "Engagement ring reaching hands detail photo with dark romantic background in Chicago conservatory" },
      { src: "/photos/garfield-park-conservatory-engagement/05.jpg", alt: "Couple walking through lush greenery during a Garfield Park Conservatory engagement photo session" },
      { src: "/photos/garfield-park-conservatory-engagement/06.jpg", alt: "Romantic engagement portrait of couple dancing beneath vines at Garfield Park Conservatory" },
      { src: "/photos/garfield-park-conservatory-engagement/07.jpg", alt: "Wide engagement portrait of the couple by the indoor pond at Garfield Park Conservatory in Chicago" },
      { src: "/photos/garfield-park-conservatory-engagement/08.jpg", alt: "Close-up of engaged couple smiling among ferns during a Chicago conservatory photo session" },
      { src: "/photos/garfield-park-conservatory-engagement/09.jpg", alt: "Bride-to-be hugging her fiance from behind with engagement ring visible in the greenhouse" },
      { src: "/photos/garfield-park-conservatory-engagement/10.jpg", alt: "Engaged couple relaxing on a garden bench with bouquet at Garfield Park Conservatory" },
      { src: "/photos/garfield-park-conservatory-engagement/11.jpg", alt: "Candid close-up of groom kissing his fiancee's hand during an engagement session in Chicago" },
      { src: "/photos/garfield-park-conservatory-engagement/12.jpg", alt: "Couple seated on a bench framed by leafy shadows inside Garfield Park Conservatory" },
      { src: "/photos/garfield-park-conservatory-engagement/13.jpg", alt: "Laughing engagement portrait with the ring visible during a Garfield Park Conservatory session" },
      { src: "/photos/garfield-park-conservatory-engagement/14.jpg", alt: "Engaged couple standing together with bouquet on conservatory steps in Chicago" },
      { src: "/photos/garfield-park-conservatory-engagement/15.jpg", alt: "Intimate engagement portrait through leafy foreground at Garfield Park Conservatory" },
      { src: "/photos/garfield-park-conservatory-engagement/16.jpg", alt: "Engagement ring detail portrait on moss-covered stone at Garfield Park Conservatory" },
    ],
  },

  {
    slug: "shilo-3rd-birthday-upshirin",
    title: "Birthday Party & First Haircut Celebration",
    category: "Milestone",
    coverImage: "/photos/shilo-upshirin-birthday/10-farm-cake-candles.jpg",
    description: "A farm-themed birthday party and Upshirin celebration — first haircut, family love, and frosting-covered smiles.",
    images: [
      { src: "/photos/shilo-upshirin-birthday/05-grandma-kiss-cake.jpg", alt: "Grandmother kissing birthday girl with cake on her face — emotional milestone photography" },
      { src: "/photos/shilo-upshirin-birthday/07-family-embrace-bw.jpg", alt: "Family embracing during Upshirin ceremony in black and white — first haircut tradition" },
      { src: "/photos/shilo-upshirin-birthday/01-first-haircut-family.jpg", alt: "Father cutting daughter's hair at Upshirin while mother holds her — first haircut ceremony" },
      { src: "/photos/shilo-upshirin-birthday/09-mom-and-shilo.jpg", alt: "Mother and daughter sharing a sweet moment together — milestone family photography" },
      { src: "/photos/shilo-upshirin-birthday/02-family-moment-reading.jpg", alt: "Parents and child sharing a joyful family moment — candid celebration photography" },
      { src: "/photos/shilo-upshirin-birthday/03-haircut-closeup.jpg", alt: "Close-up of father cutting daughter's hair during Upshirin — milestone detail" },
      { src: "/photos/shilo-upshirin-birthday/08-lock-of-hair.jpg", alt: "Grandmother holding the first lock of cut hair — Upshirin ceremony detail" },
      { src: "/photos/shilo-upshirin-birthday/04-hands-detail.jpg", alt: "Hands holding lock of hair during first haircut — intimate ceremony moment" },
      { src: "/photos/shilo-upshirin-birthday/06-scissors-detail.jpg", alt: "Mother holding scissors during Upshirin ceremony — meaningful detail shot" },
    ],
  },

  // — Event Shoots —
  {
    slug: "stolberg-bar-mitzvah-noam",
    title: "Bar Mitzvah Celebration — Synagogue Event Photography",
    category: "Event",
    coverImage: "/photos/stolberg-bar-mitzvah/01-opening-the-ark.jpg",
    description: "An NFL-themed celebration with all the tradition, pride, and joy of becoming a Bar Mitzvah.",
    images: [
      { src: "/photos/stolberg-bar-mitzvah/01-opening-the-ark.jpg", alt: "Bar Mitzvah boy opening the Torah ark — dramatic synagogue photography" },
      { src: "/photos/stolberg-bar-mitzvah/02-family-portrait-ark.jpg", alt: "Family portrait in front of the Torah ark — Bar Mitzvah family photography" },
      { src: "/photos/stolberg-bar-mitzvah/03-father-son-torah.jpg", alt: "Father and son smiling with open Torah scroll — Bar Mitzvah ceremony" },
      { src: "/photos/stolberg-bar-mitzvah/04-men-carrying-noam.jpg", alt: "Guests lifting the Bar Mitzvah boy in celebration — joyful Bar Mitzvah moment" },
      { src: "/photos/stolberg-bar-mitzvah/05-noam-holding-torah.jpg", alt: "Bar Mitzvah boy proudly holding Torah scroll — milestone portrait" },
      { src: "/photos/stolberg-bar-mitzvah/06-mom-kissing-noam.jpg", alt: "Mother kissing her son on his Bar Mitzvah day — tender family moment" },
      { src: "/photos/stolberg-bar-mitzvah/07-buttoning-suit-window.jpg", alt: "Bar Mitzvah boy buttoning suit by window — editorial getting-ready portrait" },
      { src: "/photos/stolberg-bar-mitzvah/08-reading-from-torah.jpg", alt: "Boy reading from the Torah during Bar Mitzvah ceremony — synagogue photography" },
      { src: "/photos/stolberg-bar-mitzvah/09-custom-football.jpg", alt: "Bar Mitzvah boy holding custom football — personalized event detail" },
      { src: "/photos/stolberg-bar-mitzvah/10-putting-on-tallit.jpg", alt: "Boy putting on tallit prayer shawl — Bar Mitzvah ceremony moment" },
      { src: "/photos/stolberg-bar-mitzvah/11-father-helping-son.jpg", alt: "Father helping son get ready — intimate Bar Mitzvah preparation" },
      { src: "/photos/stolberg-bar-mitzvah/12-siblings-portrait.jpg", alt: "Three siblings portrait at the synagogue — Bar Mitzvah sibling photography" },
      { src: "/photos/stolberg-bar-mitzvah/13-nfl-program-detail.jpg", alt: "Custom NFL-themed Bar Mitzvah program — creative event detail" },
      { src: "/photos/stolberg-bar-mitzvah/14-noam-gold-letters.jpg", alt: "Gold name letters on display shelf — Bar Mitzvah décor detail" },
      { src: "/photos/stolberg-bar-mitzvah/15-table-setting-detail.jpg", alt: "Monogrammed napkins and navy gold table setting — elegant event décor" },
    ],
  },
];

// ——— Helper functions ———

export function getShootsByCategory(category: string): Shoot[] {
  return shoots.filter(
    (s) => s.category.toLowerCase() === category.toLowerCase()
  );
}

export function getShootBySlug(category: string, slug: string): Shoot | undefined {
  return shoots.find(
    (s) =>
      s.category.toLowerCase() === category.toLowerCase() &&
      s.slug === slug
  );
}

export function getAllShoots(): Shoot[] {
  return shoots;
}

// Legacy compat
export function getImagesByCategory(category: string): GalleryImage[] {
  const categoryShoots = getShootsByCategory(category);
  return categoryShoots.flatMap((s) => s.images);
}
