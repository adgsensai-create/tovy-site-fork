import type { Faq } from "./site";
import type { ProofItem } from "./locations";

export interface ServicePage {
  slug: string;
  shortName: string; // used on cards and in nav
  title: string; // 60 chars or less, brand added by template
  description: string; // 155 chars or less
  eyebrow: string;
  h1: string;
  tagline: string;
  heroImage: string;
  heroAlt: string;
  cardBlurb: string; // may contain {town}
  intro: { heading: string; paragraphs: string[] }[];
  includes?: { heading: string; items: { label: string; text: string }[] };
  why: { heading: string; items: { title: string; body: string }[] };
  pricing: { heading: string; text: string };
  faqs: Faq[];
  proof: ProofItem[];
  related: { label: string; href: string }[];
  cta: { heading: string; text: string; button: string };
  serviceType: string;
  hasOwnPage?: boolean; // a static route under src/app/sessions/<slug> renders this service
}

const pricingNote =
  "Every package includes professionally edited images in a private online gallery with full print rights. Sessions within 10 miles of Skokie carry no travel fee.";

export const services: Record<string, ServicePage> = {
  "newborn-photography": {
    slug: "newborn-photography",
    hasOwnPage: true,
    shortName: "Newborn Sessions",
    title: "Skokie Newborn Photographer, North Shore",
    description:
      "In-home newborn photography in Skokie, Evanston, Wilmette and Chicago's North Shore. Gentle, natural light sessions, baby-led timing. From $200.",
    eyebrow: "Skokie and Chicago North Shore",
    h1: "Newborn Photography",
    tagline: "The tiny details you will want to remember forever.",
    heroImage: "/photos/parents-newborn-window.jpg",
    heroAlt: "In-home newborn photographer Skokie, parents holding newborn by window light",
    cardBlurb: "Gentle, in-home newborn photography for {town} families welcoming a new baby.",
    intro: [
      {
        heading: "What a newborn session feels like",
        paragraphs: [
          "Your baby just got here. Everything is new, a little chaotic, and completely beautiful. The last thing you need is to pack a diaper bag and drive across town for photos.",
          "That's why I come to you. I'll show up at your home in Skokie, Evanston, Wilmette, or anywhere on the North Shore with everything I need. You stay in your pajamas if you want. Your baby stays comfortable in the space they already know. And I work around their schedule: feeding breaks, diaper changes, nap time. None of it is a problem. All of it is expected.",
          "The result? Photos that feel exactly like those first days actually feel. Quiet, warm, and full of a love so big it surprises you.",
        ],
      },
      {
        heading: "The best time for newborn photos",
        paragraphs: [
          "The sweet spot is 5 to 14 days old. During this window, babies are sleepier, curlier, and still have that brand-new softness that disappears faster than you'd think. I can gently pose them in those tucked, cozy positions that look so natural because they just spent nine months like that.",
          "That said, if your baby is three weeks old and you haven't booked yet, don't panic. We can absolutely still do a beautiful session. It just might look a little different, and that's perfectly fine.",
          "I recommend reaching out during your third trimester so we can get a tentative date on the calendar. Once your baby arrives, we'll confirm the real date together.",
        ],
      },
    ],
    includes: {
      heading: "What you get",
      items: [
        { label: "In-home session", text: "I come to you, no studio needed" },
        { label: "Baby-led timing", text: "we follow your newborn's cues, not a shot list" },
        { label: "Gentle, natural posing", text: "no props, no forced positions, just your baby being brand new" },
        { label: "Family and sibling photos", text: "we'll capture the whole crew together" },
        { label: "Detail shots", text: "tiny toes, curled fingers, that impossibly soft skin" },
        { label: "Professionally edited images", text: "delivered in a private online gallery" },
        { label: "Full print rights", text: "print whatever you want, wherever you want" },
      ],
    },
    why: {
      heading: "What makes in-home newborn photos work",
      items: [
        {
          title: "Dark rooms are the number one worry, and the easiest fix.",
          body: "Nearly every home has one window with enough light. I find it, turn off the overhead lights so skin tones stay true, and work within a few feet of it. Your living room does not need to be bright. One window does.",
        },
        {
          title: "The 5 to 14 day window closes fast.",
          body: "That is why I hold a tentative date during your third trimester instead of waiting for the birth announcement. If baby arrives early or late, we shift.",
        },
        {
          title: "Safety comes before any pose.",
          body: "No props, no balancing, no stacked positions. Every pose is one your baby can hold on their own on a safe surface, with a parent always within reach.",
        },
        {
          title: "Siblings need their own plan.",
          body: "A toddler meeting the camera and a new baby on the same afternoon is a lot. I photograph sibling and family frames first while everyone is fresh, then let the big kid go play while we do the quiet baby details.",
        },
        {
          title: "Feeding and fussing are part of the session, not interruptions.",
          body: "I book newborn sessions with generous time so a feed or a diaper change never means we run out of light or patience.",
        },
      ],
    },
    pricing: {
      heading: "Newborn session pricing",
      text: `Sessions start at $200 for a mini session and go up to $500 for a full session with extended coverage and more edited images. ${pricingNote}`,
    },
    faqs: [
      {
        question: "When should I book my newborn session?",
        answer:
          "Book during your third trimester, ideally around 30 to 34 weeks. We'll set a tentative date based on your due date, then confirm once your baby arrives. The best window for photos is 5 to 14 days old.",
      },
      {
        question: "How much does newborn photography cost in the Chicago area?",
        answer:
          "My newborn sessions run from $200 to $500 depending on length and the number of edited images. Published Chicago cost guides put typical newborn sessions anywhere from a few hundred dollars for a mini session to well over $1,000 for studio packages with products, so an in-home lifestyle session is usually the more affordable route.",
      },
      {
        question: "Do I need to have a clean house?",
        answer:
          "No. I only need a small area near a window with good natural light. I'll move things around if needed. Your home doesn't need to be magazine-ready. It needs to be yours.",
      },
      {
        question: "What if my baby won't sleep or is fussy?",
        answer:
          "That's completely normal and expected. We go at your baby's pace. If they need to eat, we pause. If they need to be held, we adjust. Some of my favorite images come from those wide-awake, curious moments.",
      },
      {
        question: "Can we include siblings and family photos?",
        answer:
          "Absolutely. I always build in ample time for family shots and sibling photos. These are some of the most meaningful images from a newborn session.",
      },
      {
        question: "How long does the session last?",
        answer:
          "Newborn sessions typically run 1.5 to 2 hours depending on the baby's mood. There's no clock running. We take whatever time we need.",
      },
      {
        question: "Where do you photograph newborn sessions?",
        answer:
          "Primarily in-home throughout Skokie, Evanston, Wilmette, Lincolnwood, and the greater North Shore. Your baby is most comfortable at home, and the photos feel more personal and authentic.",
      },
    ],
    proof: [
      {
        title: "In-home newborn session in Skokie",
        href: "/gallery/newborn/cooper-family-welcome-baby-billie",
        blurb: "Baby Billie at home with her family by the window light.",
      },
      {
        title: "Downtown Chicago newborn session",
        href: "/gallery/newborn/nemsick-family-welcome-baby-henry",
        blurb: "Baby Henry at home in the city, sibling included.",
      },
      {
        title: "In-home newborn lifestyle session",
        href: "/gallery/newborn/hoffman-family-welcome-baby-ava",
        blurb: "Baby Ava's first days at home.",
      },
    ],
    related: [
      { label: "View the Newborn Gallery", href: "/gallery/newborn" },
      { label: "When to Book Newborn Photos", href: "/blog/when-to-book-newborn-photos-what-to-expect" },
      { label: "Maternity Photography", href: "/sessions/maternity-photography" },
      { label: "Sessions and Pricing", href: "/sessions" },
    ],
    cta: {
      heading: "Ready to capture these first days?",
      text: "I'd love to hear about your growing family and start planning your session. Reach out during your pregnancy or after delivery so we can save your spot.",
      button: "Let's Talk",
    },
    serviceType: "Newborn Photography",
  },

  "family-photography": {
    slug: "family-photography",
    hasOwnPage: true,
    shortName: "Family Sessions",
    title: "Skokie Family Photographer, North Shore",
    description:
      "Natural, relaxed family photography in Skokie, Evanston, Wilmette and Chicago's North Shore. Outdoor and in-home sessions in natural light. From $200.",
    eyebrow: "Skokie and Chicago North Shore",
    h1: "Family Photography",
    tagline: "Real moments with the people who matter most.",
    heroImage: "/photos/family-plaza-swinging.jpg",
    heroAlt: "Skokie family photographer, parents swinging toddler during outdoor family session",
    cardBlurb: "Capture your family's real connection at {town} parks, in your backyard, or at home.",
    intro: [
      {
        heading: "What a family session actually looks like",
        paragraphs: [
          "Nobody stands in a line and says cheese.",
          "A session with me looks like your family being your family: walking through a park, sitting on a blanket, kids running ahead, someone tickling someone, everyone laughing. I guide you gently (\"walk toward me,\" \"whisper something silly to each other\") but I never force a pose that doesn't feel like you.",
          "I photograph families throughout Skokie, Evanston, Wilmette, and the North Shore. At parks you already love, in your own backyard, or inside your home where the real life happens. The location should feel natural to your family, not like a backdrop you drove an hour to find.",
          "The photos you get back? They look like your family on your best day.",
        ],
      },
      {
        heading: "Every kind of family",
        paragraphs: [
          "Whether it's just the three of you or a four-generation gathering at grandma's house, family sessions are designed to be flexible. I regularly photograph growing families with young kids, extended families and multigenerational groups, couples without kids who want beautiful portraits together, siblings with all their chaotic energy, and families going through transitions who want to freeze a moment in time.",
          "Your family doesn't need to be \"picture perfect.\" They need to be present. I'll handle the rest.",
        ],
      },
    ],
    includes: {
      heading: "How family sessions work",
      items: [
        { label: "Outdoor sessions", text: "parks throughout the North Shore offer incredible backdrops. I know the best spots in Skokie (Emily Oaks Nature Center, Laramie Park), Evanston, Wilmette, and beyond. Golden hour, that warm light about an hour before sunset, makes everything glow." },
        { label: "In-home sessions", text: "some of my favorite family photos happen on the couch, in the kitchen, or on the front porch. These sessions capture the everyday moments that feel ordinary now and priceless later." },
        { label: "Wardrobe guidance", text: "for Classic and Full sessions, I'll help you coordinate outfits before the session so everything looks intentional without looking overdone. Think warm neutrals, soft textures, nothing too matchy." },
      ],
    },
    why: {
      heading: "What makes family photos work",
      items: [
        {
          title: "Midday sun is the fastest way to squinting and shadows.",
          body: "I schedule outdoor sessions in the last hour or so before sunset, or the first hour after sunrise for early risers, and I pick spots with open shade for the rare midday slot.",
        },
        {
          title: "Toddlers have about twenty good minutes.",
          body: "So we use them first. Family and sibling frames happen at the start, and the rest of the session is built around walking, playing and following their lead.",
        },
        {
          title: "Matching outfits flatten everyone.",
          body: "Coordinated colors and mixed textures photograph far better than identical shirts. Classic and Full sessions include wardrobe help so nobody has to guess.",
        },
        {
          title: "Popular parks are crowded when the light is best.",
          body: "I know the quiet corners of the busy parks and the underused ones, and I will suggest a weekday evening when weekends are packed.",
        },
        {
          title: "Some parks need a photography permit.",
          body: "The Chicago Botanic Garden, the Cook County forest preserves and some lakefront parks have rules for professional sessions. I check before we book so the day stays simple.",
        },
      ],
    },
    pricing: {
      heading: "Family session pricing",
      text: `Sessions start at $200 for a 30-minute mini session, perfect for seasonal updates and quick family portraits. The Classic session ($325, 60 minutes) is the most popular choice for families who want more relaxed coverage and time to capture real moments. The Full session ($500, 90 minutes) is ideal for extended families and multigenerational groups. ${pricingNote}`,
    },
    faqs: [
      {
        question: "What should we wear for family photos?",
        answer:
          "Coordinate, don't match. Pick 2 to 3 complementary colors in soft, warm tones: cream, olive, rust, navy, mustard. Avoid logos, neon, and all-white (it reflects light and washes everyone out). I provide wardrobe guidance with Classic and Full sessions.",
      },
      {
        question: "How much do family photos cost?",
        answer:
          "My family sessions run from $200 for a 30-minute mini to $500 for a 90-minute full session, with edited images and print rights included. Published 2026 cost guides put a typical professional family session in the United States somewhere between about $300 and $750, with big-city studios often higher.",
      },
      {
        question: "My kids won't sit still. Is that okay?",
        answer:
          "That's the best-case scenario. I don't need kids to sit still. I need them to be themselves. Running, climbing, laughing, refusing to cooperate and then suddenly hugging their sibling? That's the good stuff.",
      },
      {
        question: "When is the best time for outdoor family photos?",
        answer:
          "Golden hour, about 60 to 90 minutes before sunset. The light is warm, soft, and flattering for everyone. I'll suggest the ideal time based on the season and your session date.",
      },
      {
        question: "How far in advance should I book?",
        answer:
          "For fall sessions (the most popular), I recommend booking in August or early September. For other seasons, 2 to 3 weeks ahead usually works. Holiday card sessions should be booked by early October.",
      },
      {
        question: "Where do you shoot family sessions?",
        answer:
          "Throughout Skokie, Evanston, Wilmette, Lincolnwood, and the broader North Shore. I have favorite spots in each area, but I'm also happy to photograph at a location that's meaningful to your family.",
      },
      {
        question: "Can I include our dog?",
        answer: "Yes! Pets are absolutely welcome. They're part of the family.",
      },
    ],
    proof: [
      {
        title: "Outdoor family session at the Skokie Public Library",
        href: "/gallery/family/glickman-family-skokie-library",
        blurb: "A relaxed outdoor session in the heart of Skokie.",
      },
      {
        title: "In-home family session in West Rogers Park",
        href: "/gallery/family/west-rogers-park-9-month-family-session",
        blurb: "A nine-month milestone at home, right where the everyday happens.",
      },
      {
        title: "Family session at Keay Nature Center in Wilmette",
        href: "/gallery/family/keay-nature-center-wilmette-family-session",
        blurb: "Wooded paths and a family that let the kids lead the way.",
      },
    ],
    related: [
      { label: "View the Family Gallery", href: "/gallery/family" },
      { label: "What to Wear for Family Photos", href: "/blog/what-to-wear-family-photo-session" },
      { label: "Family Photo Locations in Skokie", href: "/blog/best-family-photo-locations-skokie-north-shore" },
      { label: "Planning a Fall Family Photoshoot", href: "/blog/fall-family-photos-guide" },
      { label: "Mini Sessions", href: "/sessions/mini-sessions" },
      { label: "Planning a Fall Family Photoshoot", href: "/blog/fall-family-photos-guide" },
    ],
    cta: {
      heading: "Let's plan your family session",
      text: "Tell me about your family and what kind of session feels right. I'll help you pick the perfect time, location, and package.",
      button: "Get in Touch",
    },
    serviceType: "Family Photography",
  },

  "maternity-photography": {
    slug: "maternity-photography",
    shortName: "Maternity Sessions",
    title: "Skokie Maternity Photographer, North Shore",
    description:
      "Natural light maternity photography in Skokie, Evanston, Wilmette and Chicago's North Shore. In-home or outdoor, partner and kids welcome. From $200.",
    eyebrow: "Skokie and Chicago North Shore",
    h1: "Maternity Photography",
    tagline: "The waiting, the wonder, and the two of you before you become three.",
    heroImage: "/photos/family-bed-portrait.jpg",
    heroAlt: "Chicago North Shore maternity photographer, relaxed in-home natural light session",
    cardBlurb: "Relaxed maternity photos at home or outdoors around {town}, with your partner and kids if you like.",
    intro: [
      {
        heading: "What a maternity session feels like",
        paragraphs: [
          "A maternity session with me is not a studio production. It is an hour of slowing down. We walk, we sit, your partner rests a hand on your belly, your toddler climbs into your lap, and I photograph the way you already are with each other.",
          "I photograph maternity sessions outdoors at golden hour in parks around Skokie, Evanston, Wilmette and the North Shore, and at home for parents who want something quieter and more personal. Both work beautifully. The choice usually comes down to how you feel and what you want to remember.",
          "These photos become the first chapter of your baby's story. Many families pair a maternity session with a newborn session a few months later so the two galleries belong together.",
        ],
      },
      {
        heading: "When to book maternity photos",
        paragraphs: [
          "The best window is 28 to 34 weeks. You are visibly pregnant, still comfortable moving around, and far enough from your due date that a surprise early arrival is unlikely. If you are expecting twins or have been told to expect an early delivery, we aim earlier.",
          "Reach out around 20 weeks so we can hold a date that fits the season you want. Spring blossoms, summer golden hour, fall color and cozy winter at-home sessions each have their own feel.",
        ],
      },
    ],
    includes: {
      heading: "What you get",
      items: [
        { label: "Outdoor or in-home", text: "a North Shore park at golden hour or the quiet of your own home" },
        { label: "Partner and kids included", text: "this is a family session too, if you want it to be" },
        { label: "Wardrobe guidance", text: "for Classic and Full sessions, help choosing dresses and colors that move and photograph well" },
        { label: "Gentle direction", text: "simple prompts, no stiff poses" },
        { label: "Professionally edited images", text: "delivered in a private online gallery" },
        { label: "Full print rights", text: "print whatever you want, wherever you want" },
      ],
    },
    why: {
      heading: "What makes maternity photos work",
      items: [
        {
          title: "Comfort decides everything in the third trimester.",
          body: "Long walks, stairs down to a beach and standing in the sun for an hour are harder at 34 weeks. I plan short distances, places to sit, and a pace that follows you.",
        },
        {
          title: "Flowing fabric photographs better than fitted.",
          body: "Long dresses in soft, warm colors move in the wind and show the shape you want to remember. I will send suggestions and you never have to buy anything new.",
        },
        {
          title: "Golden hour is short in fall and winter.",
          body: "By November, sunset is before 5 pm and the warm light lasts about 45 minutes. For late-year sessions I often suggest an in-home session by a big window instead.",
        },
        {
          title: "Toddlers make it real, and they need a plan.",
          body: "If a big sibling is joining, we photograph the family frames first, then let them play while we do the quiet belly-and-partner photos.",
        },
      ],
    },
    pricing: {
      heading: "Maternity session pricing",
      text: `Maternity sessions use the same packages as every other session: $200 for a 30-minute mini, $325 for a 60-minute Classic, and $500 for a 90-minute Full session. ${pricingNote} Ask about pairing a maternity and newborn session.`,
    },
    faqs: [
      {
        question: "When is the best time for maternity photos?",
        answer:
          "Between 28 and 34 weeks. You are clearly showing, still comfortable, and unlikely to deliver before the session. For twins or an expected early delivery, aim for 26 to 30 weeks.",
      },
      {
        question: "How much does a maternity photographer cost in Chicago?",
        answer:
          "My maternity sessions run from $200 to $500 with edited images and print rights included. Published 2026 cost guides put most professional Chicago maternity sessions between about $500 and $1,200, and the national average between $250 and $700, so a natural light session at home or in a park is the affordable route. See my maternity photoshoot cost guide for the full breakdown.",
      },
      {
        question: "What should I wear for maternity photos?",
        answer:
          "A long, flowing dress in a soft warm color is the easiest choice. Fitted ribbed dresses also work well. Avoid busy patterns, logos and pure white. Partners look best in solid neutrals that complement the dress.",
      },
      {
        question: "Can my partner and kids be in the photos?",
        answer:
          "Yes, and I encourage it. A maternity session is really a family session with a belly in it. We will do frames of just you, you and your partner, and the whole family.",
      },
      {
        question: "Should I do maternity photos at home or outdoors?",
        answer:
          "Outdoors at golden hour gives you soft light and open space. At home gives you privacy, comfort and the nursery. If you are unsure, tell me what season it is and how you are feeling and I will recommend one.",
      },
      {
        question: "Where do you photograph maternity sessions?",
        answer:
          "Throughout Skokie, Evanston, Wilmette, Lincolnwood, Glenview, Northbrook and the North Shore, outdoors or in your home. Sessions within 10 miles of Skokie carry no travel fee.",
      },
    ],
    proof: [
      {
        title: "In-home newborn session in Skokie",
        href: "/gallery/newborn/cooper-family-welcome-baby-billie",
        blurb: "Where a maternity session leads: baby Billie at home a few weeks later.",
      },
      {
        title: "Garfield Park Conservatory engagement session",
        href: "/gallery/milestone/garfield-park-conservatory-engagement",
        blurb: "Greenery and soft indoor light, a favorite setting for couples in any season.",
      },
      {
        title: "In-home family session in West Rogers Park",
        href: "/gallery/family/west-rogers-park-9-month-family-session",
        blurb: "The kind of window light an in-home maternity session is built on.",
      },
    ],
    related: [
      { label: "Maternity Photos: When to Book and What to Wear", href: "/blog/maternity-photos-when-to-book-what-to-wear" },
      { label: "Newborn Photography", href: "/sessions/newborn-photography" },
      { label: "Sessions and Pricing", href: "/sessions" },
    ],
    cta: {
      heading: "Ready to plan your maternity session?",
      text: "Tell me your due date and the season you have in mind. I will suggest timing, a location and a package, and we can hold your newborn date at the same time.",
      button: "Let's Talk",
    },
    serviceType: "Maternity Photography",
  },

  "milestone-photography": {
    slug: "milestone-photography",
    shortName: "Milestone Sessions",
    title: "Baby Milestone Photographer, Skokie",
    description:
      "Baby milestone, first birthday and cake smash photography in Skokie and Chicago's North Shore. Sitter sessions, first year, graduations. From $200.",
    eyebrow: "Skokie and Chicago North Shore",
    h1: "Milestone Photography",
    tagline: "Birthdays, first steps, first haircuts, and everything worth pausing for.",
    heroImage: "/photos/birthday-cake-candles.jpg",
    heroAlt: "Milestone birthday photographer Chicago North Shore, child with birthday cake and candles",
    cardBlurb: "Birthdays, baby's first year, graduations and celebrations photographed in {town} or at home.",
    intro: [
      {
        heading: "What a milestone session feels like",
        paragraphs: [
          "Milestones are the moments you swear you will remember and then somehow blur together. The first time they sit up. The cake they demolished. The graduation gown that was too long. A milestone session is a short, relaxed session built around one of those moments, at home or at a favorite spot nearby.",
          "I photograph baby milestone sessions at 3, 6, 9 and 12 months, first birthdays and cake smashes, upsherins and first haircuts, graduations, engagements and holiday sessions throughout Skokie, Evanston, Wilmette and Chicago's North Shore.",
        ],
      },
      {
        heading: "Baby's first year",
        paragraphs: [
          "The first year moves fastest of all. Many families book a newborn session and then come back at six months, when baby can sit and smile, and at one year for the cake. Photographed in the same home with the same light, those galleries become a record of a whole year.",
          "Sitter sessions at 6 to 9 months are my favorite. Baby is sturdy enough to sit, delighted by everything, and not yet fast enough to crawl out of frame.",
        ],
      },
    ],
    includes: {
      heading: "What you get",
      items: [
        { label: "At home or on location", text: "your living room, backyard, or a nearby park" },
        { label: "Family frames too", text: "parents and siblings are always included" },
        { label: "Real celebrations", text: "cake, candles, balloons and the mess that comes with them" },
        { label: "Professionally edited images", text: "delivered in a private online gallery" },
        { label: "Full print rights", text: "print whatever you want, wherever you want" },
      ],
    },
    why: {
      heading: "What makes milestone photos work",
      items: [
        {
          title: "Babies have a schedule, and we follow it.",
          body: "A six-month session at nap time is a session of tears. I book around your baby's best window of the day, usually the hour after a morning nap and a feed.",
        },
        {
          title: "Cake smashes are messy, quick and worth planning.",
          body: "We do the clean portraits first, then bring out the cake. A plain cake with soft frosting photographs best. I bring a drop cloth, and a bath afterward is part of the plan.",
        },
        {
          title: "First-year sessions look best in the same light.",
          body: "If we photographed your newborn session by the nursery window, we come back to it. The consistency is what makes a first-year set feel like a story.",
        },
        {
          title: "Graduations and ceremonies have a clock.",
          body: "For Northwestern graduations and school events I photograph the portraits before or after the ceremony crowd, at a spot we choose in advance.",
        },
      ],
    },
    pricing: {
      heading: "Milestone session pricing",
      text: `Most milestone sessions fit the $200 mini (30 minutes) or the $325 Classic (60 minutes). Cake smashes and celebrations with extended family usually suit the Classic. ${pricingNote}`,
    },
    faqs: [
      {
        question: "What ages are best for baby milestone photos?",
        answer:
          "Newborn (5 to 14 days), 3 months for smiles, 6 to 9 months for sitting up, and 12 months for the first birthday and cake smash. Any of those alone is lovely. Together they tell the whole first year.",
      },
      {
        question: "How much does a first birthday or cake smash session cost?",
        answer:
          "A first birthday or cake smash session is usually the $200 mini or the $325 Classic session, with edited images and print rights included. You provide the cake and I bring the rest.",
      },
      {
        question: "Do you photograph upsherins and first haircuts?",
        answer:
          "Yes. I have photographed an upsherin and third birthday celebration and love the mix of ceremony, family and a very brave three-year-old. Event pricing depends on length, so tell me the plan and I will send a quote.",
      },
      {
        question: "Can milestone photos be taken at home?",
        answer:
          "Yes, and for babies I usually recommend it. Home means naps on schedule, favorite toys within reach, and photos in the space they are growing up in.",
      },
      {
        question: "Do you photograph graduations and engagements?",
        answer:
          "Yes. Graduation portraits around Evanston and the North Shore, and engagement sessions in Chicago and the suburbs, both use the same packages as every other session.",
      },
    ],
    proof: [
      {
        title: "In-home family session in West Rogers Park",
        href: "/gallery/family/west-rogers-park-9-month-family-session",
        blurb: "A nine-month milestone photographed at home.",
      },
      {
        title: "Birthday party and first haircut celebration",
        href: "/gallery/milestone/shilo-3rd-birthday-upshirin",
        blurb: "Shilo's third birthday and upsherin.",
      },
      {
        title: "Garfield Park Conservatory engagement session",
        href: "/gallery/milestone/garfield-park-conservatory-engagement",
        blurb: "An engagement session in the greenery of the conservatory.",
      },
    ],
    related: [
      { label: "View the Milestone Gallery", href: "/gallery/milestone" },
      { label: "Newborn Photography", href: "/sessions/newborn-photography" },
      { label: "Engagement Photography", href: "/sessions/engagement-photography" },
      { label: "Sessions and Pricing", href: "/sessions" },
    ],
    cta: {
      heading: "Which moment are we marking?",
      text: "Tell me the milestone and the date, and I will suggest a session that fits it.",
      button: "Get in Touch",
    },
    serviceType: "Milestone Photography",
  },

  "engagement-photography": {
    slug: "engagement-photography",
    hasOwnPage: true,
    shortName: "Engagement Sessions",
    title: "Chicago North Shore Engagement Photographer",
    description:
      "Relaxed engagement photography in Chicago and the North Shore. Garfield Park Conservatory, lakefront and park sessions in natural light. From $200.",
    eyebrow: "Chicago and the North Shore",
    h1: "Engagement Photography",
    tagline: "The two of you, before the whirlwind.",
    heroImage: "/photos/hero-engagement-lift.jpg",
    heroAlt: "Chicago engagement photographer, couple laughing during natural light engagement session",
    cardBlurb: "Relaxed engagement sessions in Chicago parks, the lakefront, or a spot near {town} that means something to you.",
    intro: [
      {
        heading: "What an engagement session feels like",
        paragraphs: [
          "An engagement session is an hour of walking, talking and being a little silly together while I photograph what that looks like from a few steps away. No stiff poses. A few simple prompts. The photos end up looking like the two of you on a good day, which is the point.",
          "I photograph engagement sessions throughout Chicago and the North Shore: the Garfield Park Conservatory, the lakefront beaches in Evanston and Wilmette, the Skokie Lagoons, and the parks and neighborhoods where your story actually happened.",
        ],
      },
      {
        heading: "Choosing a location",
        paragraphs: [
          "The best engagement locations have two things: good light and some meaning. A conservatory gives you greenery in any season and shelter from Chicago weather. A beach at golden hour gives you sky and water. Your own neighborhood gives you the coffee shop, the street and the front steps you will actually remember.",
          "If you want ideas, I keep a running list of favorite engagement spots on the North Shore and in the city.",
        ],
      },
    ],
    includes: {
      heading: "What you get",
      items: [
        { label: "One or two locations", text: "a conservatory, a beach, a park or your neighborhood" },
        { label: "Wardrobe guidance", text: "help choosing outfits that photograph well together" },
        { label: "Gentle direction", text: "prompts instead of poses" },
        { label: "Professionally edited images", text: "delivered in a private online gallery" },
        { label: "Full print rights", text: "for save-the-dates, prints and anything else" },
      ],
    },
    why: {
      heading: "What makes engagement photos work",
      items: [
        {
          title: "Chicago weather is the biggest variable.",
          body: "Indoor and sheltered locations like the Garfield Park Conservatory take the wind and the cold out of the plan. For outdoor sessions I build in a rain date.",
        },
        {
          title: "Some locations require a permit.",
          body: "The Garfield Park Conservatory, the Chicago Botanic Garden and several Chicago Park District sites have photography permit rules. I check what applies before we book.",
        },
        {
          title: "Two outfits beat one.",
          body: "A casual look and a dressier look, with a quick change between locations, gives you a gallery that works for save-the-dates and for framing.",
        },
        {
          title: "Golden hour on the lakefront lasts about an hour.",
          body: "We start about 90 minutes before sunset so we have the warm light and a few minutes of blue afterward.",
        },
      ],
    },
    pricing: {
      heading: "Engagement session pricing",
      text: `Engagement sessions use the standard packages: $200 for a 30-minute mini, $325 for a 60-minute Classic (the most popular for couples), and $500 for a 90-minute Full session with two locations. ${pricingNote}`,
    },
    faqs: [
      {
        question: "How much does an engagement photographer cost in Chicago?",
        answer:
          "My engagement sessions run from $200 to $500 with edited images and print rights included. Published Chicago guides show a wide range, from a few hundred dollars for a short session to well over $1,000 when bundled with wedding coverage.",
      },
      {
        question: "Where are the best engagement photo locations in Chicago and the North Shore?",
        answer:
          "The Garfield Park Conservatory for greenery in any season, Lighthouse Beach in Evanston and Gillson Park in Wilmette for the lake, the Skokie Lagoons for still water and trees, and Chicago neighborhoods that mean something to you.",
      },
      {
        question: "When should we book an engagement session?",
        answer:
          "Two to four weeks ahead for most of the year, and earlier for fall. If you want the photos for save-the-dates, plan the session at least two months before you need to send them.",
      },
      {
        question: "What should we wear for engagement photos?",
        answer:
          "Coordinate rather than match. Soft, warm solids and a little texture photograph best. Bring a second outfit if we are doing two locations.",
      },
      {
        question: "Do you photograph weddings?",
        answer:
          "My focus is families, newborns, milestones and celebrations. Engagement sessions and small family celebrations are a good fit. For full wedding day coverage, ask and I will tell you honestly whether it suits what you are planning.",
      },
    ],
    proof: [
      {
        title: "Garfield Park Conservatory engagement session",
        href: "/gallery/milestone/garfield-park-conservatory-engagement",
        blurb: "Greenery, soft light and a couple who forgot the camera was there.",
      },
      {
        title: "Family session at Keay Nature Center in Wilmette",
        href: "/gallery/family/keay-nature-center-wilmette-family-session",
        blurb: "The kind of wooded North Shore light that works for couples too.",
      },
      {
        title: "Outdoor family session at the Skokie Public Library",
        href: "/gallery/family/glickman-family-skokie-library",
        blurb: "Relaxed, walking-style direction in the heart of Skokie.",
      },
    ],
    related: [
      { label: "Garfield Park Conservatory Engagement Photos", href: "/blog/garfield-park-conservatory-engagement-photos-chicago" },
      { label: "Best Engagement Photo Locations on the North Shore", href: "/blog/engagement-photo-locations-north-shore-chicago" },
      { label: "Sessions and Pricing", href: "/sessions" },
    ],
    cta: {
      heading: "Ready to plan your engagement session?",
      text: "Tell me a little about the two of you and where you would like to be photographed. I will suggest timing, a location and a package.",
      button: "Let's Talk",
    },
    serviceType: "Engagement Photography",
  },

  "mini-sessions": {
    slug: "mini-sessions",
    shortName: "Mini Sessions",
    title: "Family Mini Sessions, Skokie North Shore",
    description:
      "30-minute family mini sessions in Skokie, Evanston, Wilmette and Chicago's North Shore. Fall, holiday and spring minis in natural light. $200.",
    eyebrow: "Skokie and Chicago North Shore",
    h1: "Mini Sessions",
    tagline: "Thirty minutes, one location, photos you will actually print.",
    heroImage: "/photos/family-walking-playful.jpg",
    heroAlt: "Family mini session Skokie, family walking and laughing outdoors in natural light",
    cardBlurb: "A 30-minute session at a {town} park or at home. Perfect for holiday cards and yearly updates.",
    intro: [
      {
        heading: "What a mini session is",
        paragraphs: [
          "A mini session is a 30-minute session at one location with 10 edited images. It is the right choice when you want updated family photos without making a whole afternoon of it: a holiday card, a yearly update, a quick set with grandparents in town, or a milestone that does not need a full session.",
          "Minis are photographed the same way as every session: natural light, gentle direction, real moments. The only difference is the length.",
        ],
      },
      {
        heading: "Seasonal mini sessions",
        paragraphs: [
          "Fall minis in October, when the North Shore turns gold, are the most popular sessions of the year and fill first. Holiday minis in November are timed for card printing. Spring minis in May catch the blossoms, and summer minis at the lakefront are the easiest to schedule.",
          "Watch the blog and Instagram for seasonal dates, or book a mini any time of year at a park near you or at home.",
        ],
      },
    ],
    includes: {
      heading: "What you get",
      items: [
        { label: "30-minute session", text: "at one location within 10 miles of Skokie" },
        { label: "10 edited digital images", text: "in a private online gallery" },
        { label: "Full print rights", text: "for cards, prints and sharing" },
        { label: "Location suggestions", text: "I will recommend a spot that fits the season and your family" },
      ],
    },
    why: {
      heading: "What makes mini sessions work",
      items: [
        {
          title: "Thirty minutes is enough only if the plan is tight.",
          body: "I choose the exact spot and the exact light before you arrive, so we spend the time on your family rather than on scouting.",
        },
        {
          title: "Minis are not the right fit for every family.",
          body: "A newborn, a shy toddler who needs time to warm up, or a group of twelve usually does better with a Classic session. I will tell you honestly which one to book.",
        },
        {
          title: "Fall dates go in August.",
          body: "The peak color window on the North Shore is only two or three weeks. If you want October minis, book in August.",
        },
        {
          title: "Holiday cards need a deadline.",
          body: "Galleries are delivered within 2 to 3 weeks. For cards that mail in early December, book your mini by early November.",
        },
      ],
    },
    pricing: {
      heading: "Mini session pricing",
      text: `Mini sessions are $200 for 30 minutes at one location with 10 edited images. ${pricingNote} Need more time or more images? The Classic session is $325 for 60 minutes and 20 images.`,
    },
    faqs: [
      {
        question: "How much is a family mini session?",
        answer:
          "$200 for a 30-minute session at one location with 10 edited digital images, an online gallery and full print rights. There is no travel fee within 10 miles of Skokie.",
      },
      {
        question: "Where are mini sessions held?",
        answer:
          "At parks throughout Skokie, Evanston, Wilmette, Lincolnwood and the North Shore, or at your home. For seasonal minis I announce a location and date. Otherwise we pick a spot together.",
      },
      {
        question: "Are mini sessions good for newborns?",
        answer:
          "Usually not. Newborn sessions need feeding breaks and unhurried time, so I recommend the Classic or Full session for a new baby.",
      },
      {
        question: "How many people can be in a mini session?",
        answer:
          "Immediate family works best. For extended family or groups larger than six, book a Classic or Full session so everyone gets their frames.",
      },
      {
        question: "When will we get our photos?",
        answer:
          "Your edited gallery is delivered within 2 to 3 weeks. If you are on a holiday card deadline, tell me when you book and I will plan around it.",
      },
    ],
    proof: [
      {
        title: "Outdoor family session at the Skokie Public Library",
        href: "/gallery/family/glickman-family-skokie-library",
        blurb: "Short, relaxed and full of movement.",
      },
      {
        title: "Family session at Keay Nature Center in Wilmette",
        href: "/gallery/family/keay-nature-center-wilmette-family-session",
        blurb: "Wooded paths and dappled light.",
      },
      {
        title: "In-home family session in West Rogers Park",
        href: "/gallery/family/west-rogers-park-9-month-family-session",
        blurb: "Minis work at home too.",
      },
    ],
    related: [
      { label: "Family Photography", href: "/sessions/family-photography" },
      { label: "Best Family Photo Locations in Skokie", href: "/blog/best-family-photo-locations-skokie-north-shore" },
      { label: "Sessions and Pricing", href: "/sessions" },
    ],
    cta: {
      heading: "Ready for a quick, beautiful update?",
      text: "Tell me the season and the area you have in mind and I will suggest a mini session date and location.",
      button: "Book a Mini",
    },
    serviceType: "Family Photography",
  },

  "bar-mitzvah-photography": {
    slug: "bar-mitzvah-photography",
    shortName: "Bar and Bat Mitzvahs",
    title: "Bar Mitzvah Photographer, Skokie and Chicago",
    description:
      "Bar Mitzvah, Bat Mitzvah, upsherin and bris photography in Skokie and Chicago's North Shore. Relaxed, respectful event coverage. Custom quotes.",
    eyebrow: "Skokie and Chicago North Shore",
    h1: "Bar and Bat Mitzvah Photography",
    tagline: "Every detail and every real feeling, so it all comes rushing back.",
    heroImage: "/photos/bar-mitzvah-torah.jpg",
    heroAlt: "Bar Mitzvah photographer Skokie, boy reading from the Torah during the ceremony",
    cardBlurb: "Bar and Bat Mitzvahs, upsherins, brises and family celebrations in {town} and nearby.",
    intro: [
      {
        heading: "What celebration coverage feels like",
        paragraphs: [
          "Bar Mitzvahs, Bat Mitzvahs, upsherins, brises, celebrations big and small. I blend in, keep the energy fun, and capture every detail and real feeling so when you look back, it all comes rushing right back.",
          "I live in Skokie and photograph celebrations throughout Skokie, Lincolnwood, West Rogers Park, Evanston and the North Shore. I know the rhythm of a Shabbat morning service, when photography is welcome and when it is not, and how to work quietly in a sanctuary and joyfully at a kiddush.",
        ],
      },
      {
        heading: "How coverage usually works",
        paragraphs: [
          "Most families ask for one of three things: a portrait session before the big day at the synagogue or a favorite spot, coverage of a weekday ceremony where photography is permitted, or coverage of the party. Many combine a pre-day portrait session with party coverage when Shabbat rules mean no photos during the service itself.",
          "Every event is different, so coverage is quoted per event. Tell me the date, the venue and the schedule and I will send a clear quote.",
        ],
      },
    ],
    includes: {
      heading: "What you get",
      items: [
        { label: "Pre-event portraits", text: "the honoree and the family at the synagogue, at home or outdoors" },
        { label: "Ceremony coverage", text: "where and when photography is permitted" },
        { label: "Celebration coverage", text: "candle lighting, hora, speeches, the dance floor and the details" },
        { label: "Family groupings", text: "a planned list so nobody is missed" },
        { label: "Professionally edited images", text: "delivered in a private online gallery" },
        { label: "Full print rights", text: "for albums, prints and sharing" },
      ],
    },
    why: {
      heading: "What makes Bar and Bat Mitzvah photos work",
      items: [
        {
          title: "Shabbat changes the plan, and that is expected.",
          body: "When the service is on Shabbat, I photograph a portrait session earlier in the week and the celebration afterward. Some synagogues allow a short, quiet rehearsal photo session on the bimah. I will ask.",
        },
        {
          title: "Family groupings need a list.",
          body: "Grandparents, out-of-town cousins, the honoree's friends. We build a short list in advance and get those frames early, before the party pulls everyone away.",
        },
        {
          title: "Synagogue light is dim and mixed.",
          body: "Sanctuaries and social halls are often lit warm and low. I work with it rather than against it, without flash during anything sacred.",
        },
        {
          title: "The honoree is a nervous kid, not a model.",
          body: "I give them space, keep direction simple, and photograph the real moments: the tallit going on, the last look at the parsha, the exhale afterward.",
        },
      ],
    },
    pricing: {
      heading: "Event pricing",
      text: "Celebrations are quoted per event based on the hours of coverage and the schedule. Pre-event portrait sessions use the standard session packages, starting at $200. Send me the date and the plan and I will reply with a quote.",
    },
    faqs: [
      {
        question: "How much does a Bar Mitzvah photographer cost in Chicago?",
        answer:
          "I quote each event on the hours of coverage and the schedule. Published Chicago guides put typical Bar and Bat Mitzvah photography between roughly $900 for a short ceremony-and-portraits package and $2,500 or more for a full day, so a clear plan is the best way to get an accurate number.",
      },
      {
        question: "Can you photograph the service on Shabbat?",
        answer:
          "That depends on your synagogue. Many do not allow photography during a Shabbat service. In that case we do a portrait session on a weekday, sometimes on the bimah with the rabbi's permission, and I cover the celebration afterward.",
      },
      {
        question: "Do you photograph upsherins and brises?",
        answer:
          "Yes. I have photographed an upsherin and third birthday and love these smaller family ceremonies. They are usually a Classic or Full session rather than a full event quote.",
      },
      {
        question: "How far in advance should we book?",
        answer:
          "As soon as you have the date and the venue, ideally three to six months ahead. Spring and fall weekends fill first.",
      },
      {
        question: "Where do you photograph celebrations?",
        answer:
          "Skokie, Lincolnwood, West Rogers Park, Evanston, Wilmette, Northbrook and throughout Chicago's North Shore. Sessions within 10 miles of Skokie carry no travel fee.",
      },
    ],
    proof: [
      {
        title: "Bar Mitzvah at the synagogue",
        href: "/gallery/event/stolberg-bar-mitzvah-noam",
        blurb: "Noam's Bar Mitzvah, from the tallit to the celebration.",
      },
      {
        title: "Birthday party and first haircut celebration",
        href: "/gallery/milestone/shilo-3rd-birthday-upshirin",
        blurb: "Shilo's third birthday and upsherin.",
      },
      {
        title: "In-home newborn session in Skokie",
        href: "/gallery/newborn/cooper-family-welcome-baby-billie",
        blurb: "Family photography at home in Skokie.",
      },
    ],
    related: [
      { label: "View the Event Gallery", href: "/gallery/event" },
      { label: "Milestone Photography", href: "/sessions/milestone-photography" },
      { label: "Sessions and Pricing", href: "/sessions" },
    ],
    cta: {
      heading: "Planning a celebration?",
      text: "Send me the date, the venue and a rough schedule and I will reply with a quote and a plan for the photos.",
      button: "Request a Quote",
    },
    serviceType: "Event Photography",
  },
  "proposal-photography": {
    slug: "proposal-photography",
    shortName: "Proposal Photography",
    title: "Chicago Proposal Photographer, Skokie and North Shore",
    description:
      "Surprise proposal photographer in Chicago and the North Shore. Hidden and ready at the spot you choose, then a short portrait session after the yes. From $200.",
    eyebrow: "Chicago and the North Shore",
    h1: "Proposal Photography",
    tagline: "The question, the answer, and the first minute of forever.",
    heroImage: "/photos/hero-engagement-lift.jpg",
    heroAlt: "Chicago proposal photographer, couple celebrating after a surprise proposal in natural light",
    cardBlurb: "Surprise proposal coverage in Chicago or near {town}, hidden until the yes, with portraits right after.",
    intro: [
      {
        heading: "How a surprise proposal session works",
        paragraphs: [
          "You tell me the spot, the plan and the timing. I arrive early, blend in with a long lens from a distance, and photograph the walk up, the kneel, the reaction and the first hug without anyone knowing I am there. Once the answer is yes, I step out, say congratulations, and we spend twenty or thirty minutes on relaxed portraits while you are both still glowing.",
          "I photograph proposals throughout Chicago and the North Shore: the lakefront in Evanston and Wilmette, the Chicago Riverwalk and skyline spots, the Garfield Park Conservatory, quiet park corners in Skokie and Glenview, and the places that already mean something to the two of you.",
          "Proposal coverage uses the same packages as an engagement session, starting at $200, and every package includes edited images in a private gallery with full print rights.",
        ],
      },
      {
        heading: "Choosing where to propose",
        paragraphs: [
          "The best proposal spots have three things: a clear place for you to stand, somewhere natural for me to be, and good light at the time you plan to arrive. A bench under a tree, the end of a pier, a garden path with a bend in it. Wide open lawns and crowded plazas make hiding harder and the photos busier.",
          "If you want ideas, I keep a short list of favorite spots on the North Shore and in the city, and I will scout the exact location before the day.",
        ],
      },
    ],
    includes: {
      heading: "What you get",
      items: [
        { label: "A plan in advance", text: "a scouted spot, an exact mark for where to stand, a backup for weather, and a signal if the timing changes" },
        { label: "Hidden coverage", text: "the approach, the kneel, the reaction and the first embrace, photographed from a distance" },
        { label: "Portraits after the yes", text: "twenty to thirty minutes of relaxed photos of the two of you, ring included" },
        { label: "Fast sneak peek", text: "a few edited images within a couple of days so you can share the news" },
        { label: "Professionally edited images", text: "delivered in a private online gallery" },
        { label: "Full print rights", text: "for announcements, save-the-dates and prints" },
      ],
    },
    why: {
      heading: "What makes proposal photos work",
      items: [
        {
          title: "The biggest giveaway is a change in your routine.",
          body: "If you never take sunset walks and suddenly insist on one, your partner will wonder. Build the proposal into something you would plausibly do anyway: a dinner reservation nearby, a walk you take often, a visit to a place you both like.",
        },
        {
          title: "Too hidden is as bad as not hidden.",
          body: "A photographer buried behind a tree misses the kneel and the face. I stay concealed on the approach and then work in the open once you are down on one knee, because by then nobody is looking at me.",
        },
        {
          title: "Timing drifts, and that is planned for.",
          body: "I arrive early and expect you anywhere from ten minutes early to ten minutes late. We agree on a small signal, like a text or a hand in a pocket, so I know the moment is close.",
        },
        {
          title: "Chicago weather needs a plan B.",
          body: "For outdoor proposals I hold a covered backup nearby and a rain date. The Garfield Park Conservatory and the Lincoln Park Conservatory are good all-weather choices.",
        },
        {
          title: "Some places require a permit.",
          body: "The Chicago Botanic Garden, the conservatories and several Chicago Park District sites have photography rules. I check what applies before we lock the spot.",
        },
      ],
    },
    pricing: {
      heading: "Proposal photography pricing",
      text: `Proposal coverage uses the standard packages: $200 for a 30-minute mini, $325 for a 60-minute Classic, which is the usual choice because it covers the wait, the moment and the portraits, and $500 for a 90-minute Full session with a second location. ${pricingNote}`,
    },
    faqs: [
      {
        question: "How much does a proposal photographer cost in Chicago?",
        answer:
          "My proposal coverage runs from $200 to $500 with edited images and print rights included. Published Chicago guides put standalone engagement and proposal sessions with an experienced photographer at roughly $450 to $1,200, so a natural light session with me is on the affordable end.",
      },
      {
        question: "How do you stay hidden during a proposal?",
        answer:
          "I scout the spot in advance, arrive early, and photograph from a distance with a long lens while looking like anyone else in the park. Once you are on one knee I move closer, because at that point nobody is watching me.",
      },
      {
        question: "What if my partner arrives early or late?",
        answer:
          "That is expected. I plan for a window of about twenty minutes around the agreed time, and we set up a simple signal so I know when you are close.",
      },
      {
        question: "Can we do photos right after the proposal?",
        answer:
          "Yes, and I recommend it. A short portrait session right after the yes gives you relaxed, happy photos of the two of you and the ring while the moment is still real.",
      },
      {
        question: "Where are the best places to propose in Chicago and the North Shore?",
        answer:
          "The lakefront at sunset in Evanston or Wilmette, the Chicago Riverwalk, the Garfield Park Conservatory for an indoor option, and quiet garden paths or benches in North Shore parks. The best spot is one that already means something to you.",
      },
      {
        question: "How far in advance should I book a proposal photographer?",
        answer:
          "Two to four weeks is usually enough. If the date is fixed to a trip or an anniversary, book as soon as you know it, and earlier for spring and fall weekends.",
      },
    ],
    proof: [
      {
        title: "Garfield Park Conservatory engagement session",
        href: "/gallery/milestone/garfield-park-conservatory-engagement",
        blurb: "The kind of greenery and soft light that works for a proposal in any season.",
      },
      {
        title: "Family session at Keay Nature Center in Wilmette",
        href: "/gallery/family/keay-nature-center-wilmette-family-session",
        blurb: "Wooded North Shore paths with natural places to wait unseen.",
      },
      {
        title: "Outdoor family session at the Skokie Public Library",
        href: "/gallery/family/glickman-family-skokie-library",
        blurb: "Relaxed, walking-style direction after the big moment.",
      },
    ],
    related: [
      { label: "Engagement Photography", href: "/sessions/engagement-photography" },
      { label: "Best Engagement Photo Locations on the North Shore", href: "/blog/engagement-photo-locations-north-shore-chicago" },
      { label: "Garfield Park Conservatory Engagement Photos", href: "/blog/garfield-park-conservatory-engagement-photos-chicago" },
      { label: "Sessions and Pricing", href: "/sessions" },
    ],
    cta: {
      heading: "Planning a proposal?",
      text: "Tell me the date, the place you have in mind and how you picture it. I will suggest the exact spot, the timing and a package, and keep the secret.",
      button: "Plan It With Me",
    },
    serviceType: "Proposal Photography",
  },

  "extended-family-photography": {
    slug: "extended-family-photography",
    shortName: "Extended Family Sessions",
    title: "Extended Family Photographer, Skokie and North Shore",
    description:
      "Extended family and large family photoshoots in Skokie and Chicago's North Shore. Grandparents, cousins, multigenerational groups, at a park or at home. $500 Full session.",
    eyebrow: "Skokie and Chicago North Shore",
    h1: "Extended Family Photography",
    tagline: "Everyone in one frame, and then the small groups that matter just as much.",
    heroImage: "/photos/family-walking-playful.jpg",
    heroAlt: "Extended family photographer North Shore, multigenerational family walking together outdoors in natural light",
    cardBlurb: "Large family and multigenerational sessions near {town}, with everyone together and every smaller group covered.",
    intro: [
      {
        heading: "What an extended family session looks like",
        paragraphs: [
          "Extended family sessions are for the times everyone is in town: grandparents visiting, cousins together for a holiday, a reunion, a milestone birthday. We start with the whole group while everyone is fresh, then work through the smaller groupings that families actually frame: each household, the grandparents with every grandchild, the siblings, the cousins.",
          "I photograph large family groups outdoors at North Shore parks and beaches, in backyards, and inside homes when the group fits. Sessions are natural light and gently guided, so the photos look like your family on a good day rather than a line-up.",
          "Extended family sessions are the 90-minute Full session, $500, with 30 edited images and full print rights included. Groups of six or fewer usually fit the 60-minute Classic.",
        ],
      },
      {
        heading: "Planning the groupings",
        paragraphs: [
          "Before the session we make a short list of the groups you want, from the whole family down to each pair of siblings. That list is the difference between a relaxed session and one where someone realizes on the drive home that there is no photo of grandma with the baby.",
          "Ten to twelve groupings fit comfortably in a Full session with time left for candid moments and for the kids to run.",
        ],
      },
    ],
    includes: {
      heading: "What you get",
      items: [
        { label: "A grouping list in advance", text: "so nobody is missed and nobody waits around" },
        { label: "The whole group first", text: "while toddlers and grandparents are both at their best" },
        { label: "Every household on its own", text: "each family gets its own set of photos in the same gallery" },
        { label: "Candid time", text: "kids running, cousins piling on, the moments that only happen when everyone is together" },
        { label: "Wardrobe guidance", text: "a simple palette so twelve people look coordinated without matching" },
        { label: "Professionally edited images", text: "30 in a private online gallery with full print rights" },
      ],
    },
    why: {
      heading: "What makes large family photos work",
      items: [
        {
          title: "The whole-group photo has about ten good minutes.",
          body: "Toddlers, teenagers and grandparents all have limited patience, so the full group is photographed first, at the best light and before anyone is tired.",
        },
        {
          title: "Big groups need open shade and even light.",
          body: "Twelve people across a frame means the light has to be even from end to end. I pick tree lines and golden hour rather than dappled light or midday sun.",
        },
        {
          title: "A palette beats matching shirts.",
          body: "Two or three coordinated colors in soft, warm tones look like one family. Identical outfits flatten everyone. I send a palette in advance.",
        },
        {
          title: "Location matters more when mobility varies.",
          body: "A short walk from parking, a place to sit, and no stairs make a big difference for grandparents and for parents with a baby. I plan for the least mobile person first.",
        },
        {
          title: "Home is often the best studio.",
          body: "For a holiday or a visit, the living room, the porch and the backyard are where the real photos are. In-home extended family sessions work when the space has one bright room.",
        },
      ],
    },
    pricing: {
      heading: "Extended family session pricing",
      text: `Most extended family and multigenerational sessions are the $500 Full session: 90 minutes, one location and 30 edited images. Smaller groups of six or fewer usually fit the $325 Classic. ${pricingNote}`,
    },
    faqs: [
      {
        question: "How much does an extended family photoshoot cost?",
        answer:
          "My extended family sessions are $500 for the 90-minute Full session with 30 edited images and full print rights. Published 2026 cost guides put typical professional family sessions in the United States between about $300 and $750, and large groups with multiple households usually sit toward the top of that.",
      },
      {
        question: "How many people can be in an extended family session?",
        answer:
          "There is no hard limit. Groups of ten to twenty are common. The Full session gives enough time for the whole group plus ten to twelve smaller groupings.",
      },
      {
        question: "What should a large family wear for photos?",
        answer:
          "Pick a palette of two or three soft, warm colors and let each household choose within it. Avoid logos, neon and everyone in white. I send wardrobe guidance before the session.",
      },
      {
        question: "Where do you photograph extended family sessions?",
        answer:
          "At parks and beaches in Skokie, Evanston, Wilmette, Glenview, Northbrook and across the North Shore, or at a family home. Sessions within 10 miles of Skokie carry no travel fee.",
      },
      {
        question: "Can each family get their own photos from the session?",
        answer:
          "Yes. Every household gets its own grouping in the session, and the whole gallery is shared so each family can download and print what they want.",
      },
    ],
    proof: [
      {
        title: "Outdoor family session at the Skokie Public Library",
        href: "/gallery/family/glickman-family-skokie-library",
        blurb: "Relaxed outdoor direction in the heart of Skokie.",
      },
      {
        title: "Family session at Keay Nature Center in Wilmette",
        href: "/gallery/family/keay-nature-center-wilmette-family-session",
        blurb: "Wooded paths and even light, the kind of spot that works for big groups.",
      },
      {
        title: "In-home family session in West Rogers Park",
        href: "/gallery/family/west-rogers-park-9-month-family-session",
        blurb: "What an at-home session looks like when the family gathers.",
      },
    ],
    related: [
      { label: "Family Photography", href: "/sessions/family-photography" },
      { label: "What to Wear for Family Photos", href: "/blog/what-to-wear-family-photo-session" },
      { label: "Best Family Photo Locations in Skokie", href: "/blog/best-family-photo-locations-skokie-north-shore" },
      { label: "Sessions and Pricing", href: "/sessions" },
    ],
    cta: {
      heading: "Is everyone going to be in town?",
      text: "Tell me the dates, roughly how many people, and whether grandparents or a new baby are part of the group. I will suggest a location, a start time and the grouping list.",
      button: "Plan the Session",
    },
    serviceType: "Family Photography",
  },

  "maternity-and-newborn-photography": {
    slug: "maternity-and-newborn-photography",
    shortName: "Maternity + Newborn",
    title: "Maternity and Newborn Photography, Skokie North Shore",
    description:
      "Book maternity and newborn photography together in Skokie and Chicago's North Shore. Same photographer, same natural light, one story from bump to baby. From $200 each.",
    eyebrow: "Skokie and Chicago North Shore",
    h1: "Maternity and Newborn Photography",
    tagline: "The waiting and the arrival, photographed as one story.",
    heroImage: "/photos/parents-newborn-window.jpg",
    heroAlt: "Maternity and newborn photography Skokie, parents holding their newborn by the window at home",
    cardBlurb: "Pair a maternity session with an in-home newborn session near {town} so both galleries belong together.",
    intro: [
      {
        heading: "Why book maternity and newborn photos together",
        paragraphs: [
          "Booking maternity and newborn photography together means one photographer, one style, and two galleries that belong to each other: you in your third trimester, and then your baby in the same home a few weeks later. It also means your newborn date is held before the baby arrives, which is the part most parents forget until it is too late.",
          "The maternity session happens between 28 and 34 weeks, outdoors at golden hour or at home. The newborn session happens at home when your baby is about 5 to 14 days old. Both are natural light, both are gently guided, and both include your partner and any older kids.",
          "There is no separate bundle price. Each session uses the standard packages starting at $200, so you choose the length that fits each stage, and I hold both dates when you book the first.",
        ],
      },
      {
        heading: "How the two sessions fit together",
        paragraphs: [
          "For most families it looks like this: reach out around 20 weeks, photograph the maternity session around 30 to 32 weeks, and hold a tentative newborn date around your due date. When the baby arrives, we confirm the real date within a day or two.",
          "Photographing both in your home, by the same window, makes the two galleries read as chapters of one story. Many families come back at six months and one year for the same reason.",
        ],
      },
    ],
    includes: {
      heading: "What you get",
      items: [
        { label: "Two sessions, one photographer", text: "the same calm approach and the same editing style across both galleries" },
        { label: "Your newborn date held early", text: "a tentative date around your due date, confirmed once the baby is here" },
        { label: "Outdoor or in-home maternity", text: "a North Shore park at golden hour, or the quiet of your own home" },
        { label: "In-home newborn session", text: "window light, baby-led timing, siblings and family included" },
        { label: "Wardrobe guidance", text: "for Classic and Full sessions at both stages" },
        { label: "Professionally edited images", text: "in private online galleries with full print rights" },
      ],
    },
    why: {
      heading: "What makes a maternity and newborn pairing work",
      items: [
        {
          title: "The newborn window is the part that gets missed.",
          body: "Parents book the maternity session and mean to book the newborn one later. Then the baby comes early, or the first two weeks vanish. Holding the date at the maternity booking solves it.",
        },
        {
          title: "Same light, same home, same story.",
          body: "A maternity portrait by the nursery window and a newborn portrait by the same window a month later belong on the same wall. I plan the maternity session with the newborn session in mind.",
        },
        {
          title: "Due dates move, and so does the plan.",
          body: "If the baby arrives early or late, the newborn date shifts with it. There is no penalty and no scramble.",
        },
        {
          title: "Older siblings need a role in both.",
          body: "A toddler kissing the belly in October and holding the baby in November is the pair of photos families frame first. I plan both sessions around that.",
        },
      ],
    },
    pricing: {
      heading: "Maternity and newborn pricing",
      text: `Each session uses the standard packages: $200 for a 30-minute mini, $325 for a 60-minute Classic, and $500 for a 90-minute Full session. Most families choose the Classic for maternity and the Classic or Full for the newborn session. ${pricingNote}`,
    },
    faqs: [
      {
        question: "Do you offer a maternity and newborn package?",
        answer:
          "I book the two sessions together with the same packages rather than a separate bundle price. The value is in holding your newborn date early and having one photographer and one style across both galleries. Ask when you reach out and I will plan both.",
      },
      {
        question: "When should I book maternity and newborn photos?",
        answer:
          "Reach out around 20 weeks. The maternity session happens between 28 and 34 weeks, and I hold a tentative newborn date around your due date that we confirm once the baby arrives.",
      },
      {
        question: "How much do maternity and newborn sessions cost together?",
        answer:
          "Each session runs from $200 to $500 depending on length, so two Classic sessions are $650 and a Classic maternity with a Full newborn session is $825. Edited images and print rights are included in every package.",
      },
      {
        question: "Can both sessions happen at home?",
        answer:
          "Yes. An in-home maternity session by a big window followed by a newborn session at the same window is one of my favorite pairings, especially in late fall and winter when golden hour is short.",
      },
      {
        question: "Where do you photograph maternity and newborn sessions?",
        answer:
          "Throughout Skokie, Evanston, Wilmette, Lincolnwood, Glenview, Northbrook and Chicago's North Shore. Sessions within 10 miles of Skokie carry no travel fee.",
      },
    ],
    proof: [
      {
        title: "In-home newborn session in Skokie",
        href: "/gallery/newborn/cooper-family-welcome-baby-billie",
        blurb: "Baby Billie at home by the window light.",
      },
      {
        title: "Downtown Chicago newborn session",
        href: "/gallery/newborn/nemsick-family-welcome-baby-henry",
        blurb: "Baby Henry at home in the city, sibling included.",
      },
      {
        title: "In-home newborn lifestyle session",
        href: "/gallery/newborn/hoffman-family-welcome-baby-ava",
        blurb: "Baby Ava's first days at home.",
      },
    ],
    related: [
      { label: "Maternity Photography", href: "/sessions/maternity-photography" },
      { label: "Newborn Photography", href: "/sessions/newborn-photography" },
      { label: "When to Take Maternity Photos", href: "/blog/maternity-photos-when-to-book-what-to-wear" },
      { label: "When to Book Newborn Photos", href: "/blog/when-to-book-newborn-photos-what-to-expect" },
    ],
    cta: {
      heading: "Expecting?",
      text: "Tell me your due date and the season you have in mind. I will suggest maternity timing, hold a newborn date, and plan both sessions in one note.",
      button: "Hold Both Dates",
    },
    serviceType: "Maternity Photography",
  },
};

export const serviceSlugs = Object.keys(services);
// Slugs rendered by the dynamic /sessions/[service] route.
export const dynamicServiceSlugs = serviceSlugs.filter((s) => !services[s].hasOwnPage);

export function getService(slug: string): ServicePage | undefined {
  return services[slug];
}
