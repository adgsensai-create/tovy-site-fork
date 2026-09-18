import type { Faq } from "./site";
import { legacyLocationData } from "./locations-legacy";

export interface ProofItem {
  title: string;
  href: string;
  blurb: string;
}

export interface LocationPage {
  slug: string;
  name: string;
  title: string; // 60 chars or less, brand added by the layout template
  description: string; // 155 chars or less
  h1: string;
  heroLabel: string;
  intro: string[]; // two citable sentences: who, what, where
  content: string[]; // body paragraphs
  landmarks: string[];
  why: { title: string; body: string }[]; // what makes sessions here work
  faqs: Faq[];
  proof: ProofItem[];
  nearby: string[]; // slugs
  driveNote: string;
}

const proofSkokieLibrary: ProofItem = {
  title: "Outdoor family session at the Skokie Public Library",
  href: "/gallery/family/glickman-family-skokie-library",
  blurb: "A relaxed outdoor family session in the heart of Skokie, all natural light.",
};
const proofSkokieNewborn: ProofItem = {
  title: "In-home newborn session in Skokie",
  href: "/gallery/newborn/cooper-family-welcome-baby-billie",
  blurb: "Baby Billie at home with her family, photographed by the window light in their own space.",
};
const proofHoffmanNewborn: ProofItem = {
  title: "In-home newborn lifestyle session",
  href: "/gallery/newborn/hoffman-family-welcome-baby-ava",
  blurb: "Baby Ava's first days at home, all window light.",
};
const proofWilmetteKeay: ProofItem = {
  title: "Family session at Keay Nature Center in Wilmette",
  href: "/gallery/family/keay-nature-center-wilmette-family-session",
  blurb: "Wooded paths, soft light, and a family that let the kids lead the way.",
};
const proofWestRogersPark: ProofItem = {
  title: "In-home family session in West Rogers Park",
  href: "/gallery/family/west-rogers-park-9-month-family-session",
  blurb: "A nine-month milestone photographed at home, right where the everyday happens.",
};
const proofDowntownNewborn: ProofItem = {
  title: "Downtown Chicago newborn session",
  href: "/gallery/newborn/nemsick-family-welcome-baby-henry",
  blurb: "Baby Henry at home in the city, sibling included.",
};
const proofGarfield: ProofItem = {
  title: "Garfield Park Conservatory engagement session",
  href: "/gallery/milestone/garfield-park-conservatory-engagement",
  blurb: "Greenery and soft indoor light, a favorite for couples in any season.",
};
const proofBarMitzvah: ProofItem = {
  title: "Bar Mitzvah at the synagogue",
  href: "/gallery/event/stolberg-bar-mitzvah-noam",
  blurb: "Noam's Bar Mitzvah, from putting on the tallit to the celebration afterward.",
};

// FAQ builders keep answers consistent across towns while staying specific.
const faqCost = (town: string): Faq => ({
  question: `How much does a family photographer in ${town} cost?`,
  answer: `My sessions start at $200 for a 30-minute mini session and go up to $500 for a 90-minute full session. Every package includes professionally edited images in a private online gallery with full print rights. Sessions within 10 miles of Skokie carry no travel fee.`,
});
const faqInHome = (town: string): Faq => ({
  question: `Do you photograph in-home sessions in ${town}?`,
  answer: `Yes. I come to your ${town} home for newborn sessions and for family sessions whenever you would rather stay in your own space. I only need one or two spots with good window light. Your home does not need to be tidy or styled.`,
});
const faqNewbornTiming: Faq = {
  question: "When should I book newborn photos?",
  answer:
    "Reach out during your third trimester, ideally around 30 to 34 weeks, so we can hold a tentative date. The best window for newborn photos is 5 to 14 days after birth, but older newborns photograph beautifully too.",
};
const faqBestTime = (spot: string): Faq => ({
  question: `What is the best time of day for outdoor family photos in ${spot}?`,
  answer: `The last 60 to 90 minutes before sunset. The light is soft and warm, and it flatters everyone. For families with young kids I sometimes suggest the first hour after sunrise instead, when the parks are quiet and moods are fresh.`,
});
const faqBookAhead: Faq = {
  question: "How far in advance should I book?",
  answer:
    "Two to three weeks ahead works for most of the year. Fall sessions fill fastest, so for September and October dates I recommend booking in August. Holiday card sessions should be booked by early October.",
};
const faqKids: Faq = {
  question: "What if my kids will not cooperate?",
  answer:
    "That is completely normal and it is planned for. I gently guide instead of posing, we take breaks when someone needs one, and the wiggly, silly, in-between moments are usually the photos families end up framing.",
};

export const locationPages: Record<string, LocationPage> = {
  skokie: {
    slug: "skokie",
    name: "Skokie",
    title: "Skokie Family and Newborn Photographer",
    description:
      "Skokie family, newborn and milestone photographer. Natural light sessions at home or at Skokie parks. Sessions from $200 with full print rights.",
    h1: "Skokie Family Photographer",
    heroLabel: legacyLocationData.skokie.heroLabel,
    intro: [
      "Tovy Photography is a Skokie-based family, newborn and milestone photographer working in natural light, at your home or at a Skokie park.",
      "Skokie is where I live, so sessions here mean no travel fee, familiar parks, and a photographer who knows which corner of Emily Oaks glows at 6 pm.",
    ],
    content: legacyLocationData.skokie.content.filter((p) => !p.startsWith("Tovy Photography is a Skokie-based")),
    landmarks: legacyLocationData.skokie.landmarks,
    why: [
      {
        title: "Emily Oaks fills up on weekend evenings.",
        body: "It is the most popular spot in the village for good reason, and on a nice Saturday the boardwalk and meadow are busy. I schedule weekday evenings or the first hour after sunrise when we can, and I know the quieter paths on the west side when we cannot.",
      },
      {
        title: "Midday light on open lawns is unflattering.",
        body: "Laramie Park and the Sculpture Park are wide open, which is beautiful at golden hour and harsh at noon. I plan the session around the light, not the other way around.",
      },
      {
        title: "Many Skokie homes have deep rooms and smaller windows.",
        body: "That is fine. For in-home newborn sessions I work close to the brightest window, turn off the overhead lights, and sometimes move a chair or a crib a few feet. Condos, bungalows and split-levels all work.",
      },
      {
        title: "Fall in Skokie is short and booked early.",
        body: "Peak color on the Sculpture Park and the residential streets runs about two to three weeks in October. If you want fall photos, book in August.",
      },
    ],
    faqs: [
      faqCost("Skokie"),
      faqInHome("Skokie"),
      faqNewbornTiming,
      faqBestTime("Skokie"),
      {
        question: "Where are the best places for family photos in Skokie?",
        answer:
          "Emily Oaks Nature Center for woods and prairie, the Skokie Northshore Sculpture Park for open space along the canal, Laramie Park for golden hour under mature trees, and your own backyard or living room for photos that feel like your real life.",
      },
      faqBookAhead,
      faqKids,
    ],
    proof: [proofSkokieLibrary, proofSkokieNewborn, proofHoffmanNewborn],
    nearby: ["lincolnwood", "evanston", "morton-grove", "niles", "west-rogers-park"],
    driveNote: "Based in Skokie. No travel fee anywhere in the village.",
  },

  evanston: {
    slug: "evanston",
    name: "Evanston",
    title: "Evanston Family and Newborn Photographer",
    description:
      "Evanston family, newborn and maternity photographer. Lakefront, park and in-home sessions in natural light, minutes from Skokie. Sessions from $200.",
    h1: "Evanston Family Photographer",
    heroLabel: legacyLocationData.evanston.heroLabel,
    intro: [
      "Tovy Photography photographs families, newborns and expecting parents throughout Evanston, from the lakefront beaches to the tree-lined blocks of South Evanston.",
      "I am based in neighboring Skokie, about ten minutes away, so Evanston sessions carry no travel fee.",
    ],
    content: legacyLocationData.evanston.content.filter((p) => !p.startsWith("Tovy Photography serves")),
    landmarks: legacyLocationData.evanston.landmarks,
    why: [
      {
        title: "Lake Michigan wind changes everything.",
        body: "Lighthouse Beach and Clark Street Beach are stunning, but an onshore breeze turns hair, dresses and toddler moods unpredictable. I check the wind before we commit to the beach and keep Dawes Park or Ladd Arboretum as a sheltered backup.",
      },
      {
        title: "Beach parking is limited in summer.",
        body: "Evanston beaches have seasonal parking rules and fill up on warm weekends. Sunrise sessions and weekday evenings avoid the crowds, and I will tell you exactly where to park.",
      },
      {
        title: "The lakefront light is strongest at sunset.",
        body: "Because the lake is to the east, late evening light comes from behind the trees and skims across the sand. That is the look most families want from an Evanston session, and it only lasts about an hour.",
      },
      {
        title: "Northwestern's campus has its own rhythm.",
        body: "The Shakespeare Garden and the lakefill are lovely, but move-in, graduation and game days bring crowds. I steer around the campus calendar when we pick a date.",
      },
    ],
    faqs: [
      faqCost("Evanston"),
      faqInHome("Evanston"),
      {
        question: "Where are the best places for family photos in Evanston?",
        answer:
          "Lighthouse Beach for the lake and dunes, Dawes Park and the Clark Street Beach path for lakefront with shade, Ladd Arboretum for woods and a canal, and the Shakespeare Garden at Northwestern for a small, intimate garden setting.",
      },
      faqBestTime("Evanston"),
      faqNewbornTiming,
      faqBookAhead,
      faqKids,
    ],
    proof: [proofWilmetteKeay, proofSkokieNewborn, proofSkokieLibrary],
    nearby: ["skokie", "wilmette", "lincolnwood", "west-rogers-park"],
    driveNote: "About ten minutes from Skokie. No travel fee.",
  },

  lincolnwood: {
    slug: "lincolnwood",
    name: "Lincolnwood",
    title: "Lincolnwood Family and Newborn Photographer",
    description:
      "Lincolnwood family, newborn and milestone photographer. In-home and park sessions in natural light, next door to Skokie. Sessions from $200.",
    h1: "Lincolnwood Family Photographer",
    heroLabel: legacyLocationData.lincolnwood.heroLabel,
    intro: [
      "Tovy Photography is a family, newborn and milestone photographer serving Lincolnwood, IL, working in natural light at your home or at Lincolnwood's parks.",
      "Lincolnwood borders Skokie, so I am usually less than ten minutes from your door and there is never a travel fee.",
    ],
    content: legacyLocationData.lincolnwood.content,
    landmarks: legacyLocationData.lincolnwood.landmarks,
    why: [
      {
        title: "Lincolnwood parks are small, so timing matters more.",
        body: "Proesel Park and Centennial Park are neighborhood parks rather than big preserves. They are beautiful at golden hour and busy during ball games and pool season. I pick quiet corners and quiet hours.",
      },
      {
        title: "Many families here want photos at home.",
        body: "Lincolnwood's ranches and split-levels often have big living-room windows, which is exactly what in-home newborn and family sessions need. I bring nothing but the camera and work with the light your house already has.",
      },
      {
        title: "The Valley Line Trail is an underused backdrop.",
        body: "The trail that runs through Lincolnwood has long tree-lined stretches that photograph like a forest preserve without the drive. It is a good choice for families who want a walk-and-talk style session.",
      },
    ],
    faqs: [
      faqCost("Lincolnwood"),
      faqInHome("Lincolnwood"),
      {
        question: "Where are the best places for family photos in Lincolnwood?",
        answer:
          "Proesel Park for open lawns and mature trees, Centennial Park for paths and a pond, the Valley Line Trail for a wooded feel, and your own home or backyard for newborn and everyday family photos.",
      },
      faqBestTime("Lincolnwood"),
      faqNewbornTiming,
      faqBookAhead,
      faqKids,
    ],
    proof: [proofSkokieNewborn, proofWestRogersPark, proofSkokieLibrary],
    nearby: ["skokie", "west-rogers-park", "evanston", "morton-grove"],
    driveNote: "Next door to Skokie. No travel fee.",
  },

  wilmette: {
    slug: "wilmette",
    name: "Wilmette",
    title: "Wilmette Family and Newborn Photographer",
    description:
      "Wilmette family, newborn and maternity photographer. Gillson Beach, Keay Nature Center and in-home sessions in natural light. Sessions from $200.",
    h1: "Wilmette Family Photographer",
    heroLabel: legacyLocationData.wilmette.heroLabel,
    intro: [
      "Tovy Photography photographs families, newborns and expecting parents in Wilmette, IL, at Gillson Beach, the Keay Nature Center, and in Wilmette homes.",
      "I am based in Skokie, about fifteen minutes away, so there is no travel fee for Wilmette sessions.",
    ],
    content: legacyLocationData.wilmette.content,
    landmarks: legacyLocationData.wilmette.landmarks,
    why: [
      {
        title: "Gillson Beach is the North Shore's most photographed park, and it shows.",
        body: "Summer weekends bring beachgoers, sailing lessons and other photographers. I book Gillson for sunrise or for weekday evenings, and I know the dune grass and the harbor wall spots that stay quiet.",
      },
      {
        title: "Some Wilmette parks require a photography permit.",
        body: "The Wilmette Park District has rules for professional photography at its lakefront parks. I confirm what is required before we book so there are no surprises on the day.",
      },
      {
        title: "Keay Nature Center gives you woods without the crowds.",
        body: "I have photographed families on its wooded paths, and the dappled light there is gentle even in the middle of the afternoon. It is my first suggestion for families with toddlers who need room to wander.",
      },
      {
        title: "Lakefront wind and cold come early in the fall.",
        body: "October at the beach can be beautiful or brutal. For fall sessions I usually suggest Mallinckrodt Park or the Green Bay Trail, where the color is just as good and the wind is not.",
      },
    ],
    faqs: [
      faqCost("Wilmette"),
      faqInHome("Wilmette"),
      {
        question: "Where are the best places for family photos in Wilmette?",
        answer:
          "Gillson Beach for the lake and dunes, Keay Nature Center for woods, Mallinckrodt Park and the Green Bay Trail for fall color, and the gardens around the Baha'i House of Worship for a formal garden feel.",
      },
      faqBestTime("Wilmette"),
      faqNewbornTiming,
      faqBookAhead,
      faqKids,
    ],
    proof: [proofWilmetteKeay, proofSkokieNewborn, proofSkokieLibrary],
    nearby: ["evanston", "winnetka", "glenview", "skokie"],
    driveNote: "About fifteen minutes from Skokie. No travel fee.",
  },

  "morton-grove": {
    slug: "morton-grove",
    name: "Morton Grove",
    title: "Morton Grove Family and Newborn Photographer",
    description:
      "Morton Grove family, newborn and milestone photographer. Forest preserve, park and in-home sessions in natural light, minutes from Skokie. From $200.",
    h1: "Morton Grove Family Photographer",
    heroLabel: "Morton Grove Hero Photo",
    intro: [
      "Tovy Photography is a family, newborn and milestone photographer serving Morton Grove, IL, in natural light at your home, at village parks, or in the forest preserves along the North Branch.",
      "Morton Grove sits right next to Skokie, so I am about ten minutes away and there is no travel fee.",
    ],
    content: [
      "Morton Grove is one of the easiest places on the North Shore to photograph a family, because the forest preserves run right through the village. St. Paul Woods, Linne Woods and Miami Woods give you tall trees, a river, open meadows and quiet trails within a few minutes of each other, and none of them feel like a backdrop. They feel like a Sunday walk.",
      "For families who would rather stay close to home, Harrer Park and Prairie View Park have the open lawns and mature trees that make golden hour glow, and the residential streets north of Dempster are lined with the kind of big old trees that turn gold in October.",
      "In-home sessions are just as popular here. Many Morton Grove homes have bright front rooms and back patios, which is all I need for a newborn session or a relaxed family morning at home. You stay comfortable, the baby stays on schedule, and the photos look like your actual life.",
    ],
    landmarks: ["St. Paul Woods", "Linne Woods", "Harrer Park", "Prairie View Park", "Miami Woods"],
    why: [
      {
        title: "Forest preserve sessions may need a permit.",
        body: "The Forest Preserves of Cook County have their own rules for professional photography. I check what applies to the specific grove before we book, so the session day is simple.",
      },
      {
        title: "Woods are darker than they look.",
        body: "Under a full summer canopy the light drops fast after 7 pm. For forest preserve sessions I start a little earlier than a beach session would, and I pick the meadow edges where light still reaches.",
      },
      {
        title: "Mosquitoes are real near the river in July and August.",
        body: "For late summer I suggest Harrer Park or an in-home session, or an early morning in the woods before the bugs wake up. I will tell you honestly which weeks to avoid.",
      },
    ],
    faqs: [
      faqCost("Morton Grove"),
      faqInHome("Morton Grove"),
      {
        question: "Where are the best places for family photos in Morton Grove?",
        answer:
          "St. Paul Woods and Linne Woods for trees and trails, Harrer Park and Prairie View Park for open lawns at golden hour, and your own home or backyard for newborn and everyday family sessions.",
      },
      faqBestTime("Morton Grove"),
      faqNewbornTiming,
      faqBookAhead,
      faqKids,
    ],
    proof: [proofSkokieLibrary, proofSkokieNewborn, proofWilmetteKeay],
    nearby: ["skokie", "niles", "glenview", "lincolnwood"],
    driveNote: "About ten minutes from Skokie. No travel fee.",
  },

  glenview: {
    slug: "glenview",
    name: "Glenview",
    title: "Glenview Family and Newborn Photographer",
    description:
      "Glenview family, newborn and maternity photographer. The Grove, Gallery Park and in-home sessions in natural light, a short drive from Skokie. From $200.",
    h1: "Glenview Family Photographer",
    heroLabel: "Glenview Hero Photo",
    intro: [
      "Tovy Photography photographs families, newborns and expecting parents in Glenview, IL, in natural light at your home or at Glenview's parks and prairies.",
      "I am based in Skokie, roughly fifteen minutes from most of Glenview, and sessions here carry no travel fee.",
    ],
    content: [
      "Glenview has more variety in one village than almost anywhere on the North Shore. The Grove is a historic woodland with a pond and log buildings that feels like a different century. Gallery Park in The Glen has a lake, a boardwalk and long open lawns. Wagner Farm gives you fields and a working farm feel, and the Air Station Prairie is tall grass and big sky in late summer.",
      "That variety means a Glenview family session can be tailored to your family. Toddlers who need to run get the lawns at Gallery Park. Families who want a quiet, storybook feel get The Grove. Fall sessions get the maples along the older residential streets near the downtown.",
      "For newborn sessions and cozy family mornings, I come to your Glenview home. Many homes here have large windows and open floor plans, and that soft indoor light is exactly what a newborn session needs.",
    ],
    landmarks: ["The Grove", "Gallery Park", "Wagner Farm", "Air Station Prairie", "Flick Park"],
    why: [
      {
        title: "The Grove is popular with photographers, so it needs a plan.",
        body: "Fall weekends there are busy. I aim for weekday evenings or early mornings, and I know the spots along the pond and the back trails that stay quiet.",
      },
      {
        title: "Gallery Park is wide open and bright.",
        body: "Great at golden hour, harsh at midday. For families who can only do a midday slot, I use the tree line and the boardwalk shade rather than the open lawn.",
      },
      {
        title: "Some sites in Glenview have their own photography rules.",
        body: "Wagner Farm and The Grove are run by the Glenview Park District and may require a photography permit or a fee for professional sessions. I confirm the details before we book.",
      },
    ],
    faqs: [
      faqCost("Glenview"),
      faqInHome("Glenview"),
      {
        question: "Where are the best places for family photos in Glenview?",
        answer:
          "The Grove for woods and a pond, Gallery Park for lawns, a lake and a boardwalk, Wagner Farm for fields and barns, the Air Station Prairie for tall grass in late summer, and your own home for newborn sessions.",
      },
      faqBestTime("Glenview"),
      faqNewbornTiming,
      faqBookAhead,
      faqKids,
    ],
    proof: [proofWilmetteKeay, proofSkokieNewborn, proofSkokieLibrary],
    nearby: ["northbrook", "wilmette", "morton-grove", "skokie"],
    driveNote: "About fifteen minutes from Skokie. No travel fee.",
  },

  niles: {
    slug: "niles",
    name: "Niles",
    title: "Niles Family and Newborn Photographer",
    description:
      "Niles, IL family, newborn and milestone photographer. Park, forest preserve and in-home sessions in natural light, minutes from Skokie. From $200.",
    h1: "Niles Family Photographer",
    heroLabel: "Niles Hero Photo",
    intro: [
      "Tovy Photography is a family, newborn and milestone photographer serving Niles, IL, working in natural light at your home, at Niles parks, or in the forest preserves along the North Branch.",
      "Niles is about ten minutes from my home base in Skokie, so there is no travel fee.",
    ],
    content: [
      "Niles is easy to overlook for family photos, and that is part of what makes it work. The forest preserves that run along the river on the village's edge, Bunker Hill and the groves near Caldwell Avenue, are quieter than the better-known North Shore spots and just as green. Jozwiak Park and Oakton Manor Park give you open lawns and playgrounds for families who want a park session close to home.",
      "In-home sessions are a favorite for Niles families welcoming a baby. I only need a window with good light and a little floor space. Everything else, from feeding breaks to a big sibling who needs a snack, is expected and built into how I work.",
      "If you want something a little playful, the Leaning Tower of Niles and the plaza around it make for a fun set of photos, especially for kids who have grown up driving past it.",
    ],
    landmarks: ["Bunker Hill Forest Preserve", "Jozwiak Park", "Oakton Manor Park", "Leaning Tower of Niles", "Tam O'Shanter area"],
    why: [
      {
        title: "Forest preserve sessions may need a permit.",
        body: "The Forest Preserves of Cook County have rules for professional photography. I confirm what applies before we book a session at Bunker Hill or the groves along Caldwell.",
      },
      {
        title: "Neighborhood parks are busiest after school and on weekend mornings.",
        body: "I schedule around sports practices and playground rush hour so we get the lawns and the light to ourselves.",
      },
      {
        title: "Small living rooms photograph beautifully.",
        body: "Many Niles homes are compact, and families sometimes worry there is not enough room. There is. A small condo works as well as a big house when we stay close to one bright window.",
      },
    ],
    faqs: [
      faqCost("Niles"),
      faqInHome("Niles"),
      {
        question: "Where are the best places for family photos in Niles?",
        answer:
          "Bunker Hill Forest Preserve and the groves along the river for trees and trails, Jozwiak Park and Oakton Manor Park for open lawns, and your own home or backyard for newborn and everyday family sessions.",
      },
      faqBestTime("Niles"),
      faqNewbornTiming,
      faqBookAhead,
      faqKids,
    ],
    proof: [proofSkokieNewborn, proofSkokieLibrary, proofWestRogersPark],
    nearby: ["skokie", "morton-grove", "park-ridge", "lincolnwood"],
    driveNote: "About ten minutes from Skokie. No travel fee.",
  },

  northbrook: {
    slug: "northbrook",
    name: "Northbrook",
    title: "Northbrook Family and Newborn Photographer",
    description:
      "Northbrook family, newborn and maternity photographer. Park, prairie and in-home sessions in natural light near the Chicago Botanic Garden. From $200.",
    h1: "Northbrook Family Photographer",
    heroLabel: "Northbrook Hero Photo",
    intro: [
      "Tovy Photography photographs families, newborns and expecting parents in Northbrook, IL, in natural light at your home or at Northbrook's parks, prairies and gardens.",
      "I am based in Skokie, about twenty minutes from Northbrook, and sessions here carry no travel fee.",
    ],
    content: [
      "Northbrook gives families a lot of choices. Wood Oaks Green Park and Meadowhill Park have the open lawns and mature trees that make golden hour easy. Techny Prairie Park and Fields has tall grass and long sightlines in late summer, and the Village Green in the downtown has a classic small-town feel with a gazebo and old trees.",
      "The Chicago Botanic Garden is just up the road in Glencoe, and many Northbrook families ask about it. It is a beautiful place for maternity and family photos, and it requires a portrait photography permit for professional sessions. If that is the location you want, we build the permit into the plan.",
      "For newborn sessions and quiet family mornings, I come to your Northbrook home. Bright family rooms and nurseries are all the studio a newborn session needs.",
    ],
    landmarks: ["Wood Oaks Green Park", "Meadowhill Park", "Techny Prairie Park and Fields", "Village Green", "Chicago Botanic Garden (nearby, permit required)"],
    why: [
      {
        title: "The Botanic Garden requires a permit for portrait sessions.",
        body: "It is worth it for the right family, but it adds cost and scheduling steps. I will tell you plainly whether a Northbrook park would give you a similar look without the paperwork.",
      },
      {
        title: "Prairie sessions are a late summer and early fall thing.",
        body: "Techny Prairie looks its best from August into October when the grasses are tall and gold. In spring it is mostly green stubble, so I steer spring sessions toward the parks with trees.",
      },
      {
        title: "Big lawns need a plan for shade.",
        body: "Wood Oaks and Meadowhill are wide open. At golden hour that is perfect. Earlier in the day I keep the family near the tree lines so nobody is squinting.",
      },
    ],
    faqs: [
      faqCost("Northbrook"),
      faqInHome("Northbrook"),
      {
        question: "Where are the best places for family photos in Northbrook?",
        answer:
          "Wood Oaks Green Park and Meadowhill Park for lawns and trees, Techny Prairie for tall grass in late summer, the Village Green downtown for a classic feel, and the Chicago Botanic Garden nearby if you want gardens and are happy to arrange a permit.",
      },
      {
        question: "Can we take family photos at the Chicago Botanic Garden?",
        answer:
          "Yes, with a portrait photography permit from the Garden for professional sessions. I will walk you through what it costs and how to reserve it, and I will suggest a Northbrook park alternative if you would rather skip the permit.",
      },
      faqBestTime("Northbrook"),
      faqNewbornTiming,
      faqBookAhead,
    ],
    proof: [proofWilmetteKeay, proofSkokieNewborn, proofSkokieLibrary],
    nearby: ["glenview", "winnetka", "highland-park", "wilmette"],
    driveNote: "About twenty minutes from Skokie. No travel fee.",
  },

  "park-ridge": {
    slug: "park-ridge",
    name: "Park Ridge",
    title: "Park Ridge Family and Newborn Photographer",
    description:
      "Park Ridge family, newborn and milestone photographer. Park, uptown and in-home sessions in natural light, a short drive from Skokie. Sessions from $200.",
    h1: "Park Ridge Family Photographer",
    heroLabel: "Park Ridge Hero Photo",
    intro: [
      "Tovy Photography is a family, newborn and milestone photographer serving Park Ridge, IL, in natural light at your home, at Park Ridge parks, or in Uptown.",
      "Park Ridge is about fifteen minutes from my home base in Skokie, so there is no travel fee.",
    ],
    content: [
      "Park Ridge has a small-town feel that photographs beautifully. Hinkley Park and Northwest Park have big lawns and mature trees, Hodges Park sits right next to the historic Uptown blocks, and the streets around the Pickwick Theatre give you brick, awnings and a classic downtown backdrop for families who want something a little different from a park.",
      "Fall is the season Park Ridge families book most. The older neighborhoods have the kind of tall oaks and maples that turn all at once, and the light on those streets in the last hour of the day is warm and even.",
      "For newborn sessions and cozy family mornings, I come to you. Park Ridge homes tend to have bright front rooms and sunrooms, which is all I need. You stay in your pajamas if you want to. The baby stays on schedule.",
    ],
    landmarks: ["Hinkley Park", "Northwest Park", "Hodges Park", "Uptown Park Ridge", "Maine Park"],
    why: [
      {
        title: "Uptown sessions work best early on weekend mornings.",
        body: "The blocks around the Pickwick Theatre are quiet before the shops open, and the low morning light along Prospect Avenue is soft. By late morning the sidewalks are busy.",
      },
      {
        title: "Fall dates fill in August.",
        body: "Park Ridge families book fall sessions early, and the peak color window is only a couple of weeks. If October matters to you, reach out in August.",
      },
      {
        title: "Big lawns mean planning for shade.",
        body: "Hinkley and Northwest Park are wide open. That is perfect at golden hour. Earlier in the day I keep the family along the tree lines so the light stays gentle.",
      },
    ],
    faqs: [
      faqCost("Park Ridge"),
      faqInHome("Park Ridge"),
      {
        question: "Where are the best places for family photos in Park Ridge?",
        answer:
          "Hinkley Park and Northwest Park for lawns and mature trees, Hodges Park and the Uptown blocks near the Pickwick Theatre for a downtown feel, and your own home or backyard for newborn and everyday family sessions.",
      },
      faqBestTime("Park Ridge"),
      faqNewbornTiming,
      faqBookAhead,
      faqKids,
    ],
    proof: [proofSkokieLibrary, proofSkokieNewborn, proofWestRogersPark],
    nearby: ["niles", "morton-grove", "skokie", "glenview"],
    driveNote: "About fifteen minutes from Skokie. No travel fee.",
  },

  winnetka: {
    slug: "winnetka",
    name: "Winnetka",
    title: "Winnetka Family and Newborn Photographer",
    description:
      "Winnetka family, newborn and maternity photographer. Beach, Skokie Lagoons and in-home sessions in natural light on the North Shore. Sessions from $200.",
    h1: "Winnetka Family Photographer",
    heroLabel: "Winnetka Hero Photo",
    intro: [
      "Tovy Photography photographs families, newborns and expecting parents in Winnetka, IL, in natural light at the lakefront, at the Skokie Lagoons, or at home.",
      "I am based in Skokie, about twenty minutes from Winnetka, and sessions here carry no travel fee.",
    ],
    content: [
      "Winnetka has two very different looks, and both are wonderful. The lakefront at Tower Road Beach and Elder Lane Beach gives you bluffs, water and big sky. The Skokie Lagoons and Crow Island Woods on the west side of the village give you still water, tall trees and quiet trails.",
      "In between, the residential streets around Hubbard Woods and the Village Green are lined with the kind of old trees and brick that photograph beautifully in fall, and Lloyd Park has open lawn by the lake for families with kids who need to run.",
      "For newborn sessions, I come to your Winnetka home. Big windows and bright nurseries make in-home sessions here easy, and staying home means the baby stays comfortable and the older kids stay themselves.",
    ],
    landmarks: ["Tower Road Beach", "Elder Lane Beach", "Skokie Lagoons", "Crow Island Woods", "Lloyd Park"],
    why: [
      {
        title: "Winnetka beaches have their own access rules.",
        body: "The Winnetka Park District manages lakefront access, and rules differ by season. I check what applies to the beach and date we choose so there are no surprises.",
      },
      {
        title: "The bluffs mean stairs.",
        body: "Tower Road Beach is reached by a long stairway. Beautiful for a family with school-age kids, harder with a newborn or grandparents. For those sessions I suggest Lloyd Park or the Lagoons.",
      },
      {
        title: "The Lagoons are a forest preserve.",
        body: "The Skokie Lagoons are part of the Forest Preserves of Cook County, which has rules for professional photography. I confirm what is needed before we book.",
      },
    ],
    faqs: [
      faqCost("Winnetka"),
      faqInHome("Winnetka"),
      {
        question: "Where are the best places for family photos in Winnetka?",
        answer:
          "Tower Road Beach and Elder Lane Beach for the lake and bluffs, the Skokie Lagoons and Crow Island Woods for water and trees, Lloyd Park for lawn by the lake, and the streets around Hubbard Woods for fall color.",
      },
      faqBestTime("Winnetka"),
      faqNewbornTiming,
      faqBookAhead,
      faqKids,
    ],
    proof: [proofWilmetteKeay, proofSkokieNewborn, proofSkokieLibrary],
    nearby: ["wilmette", "northbrook", "highland-park", "glenview"],
    driveNote: "About twenty minutes from Skokie. No travel fee.",
  },

  "highland-park": {
    slug: "highland-park",
    name: "Highland Park",
    title: "Highland Park Family and Newborn Photographer",
    description:
      "Highland Park family, newborn and maternity photographer. Rosewood Beach, ravines and in-home sessions in natural light on the North Shore. From $200.",
    h1: "Highland Park Family Photographer",
    heroLabel: "Highland Park Hero Photo",
    intro: [
      "Tovy Photography photographs families, newborns and expecting parents in Highland Park, IL, in natural light at the lakefront, in the ravines and woods, or at home.",
      "I am based in Skokie, about twenty-five minutes away, and a $50 travel fee applies to most Highland Park sessions.",
    ],
    content: [
      "Highland Park is the North Shore at its most dramatic. Rosewood Beach has a long boardwalk, dunes and a wide stretch of sand. The ravines and woods at Heller Nature Center and Millard Park feel like a forest, and Sunset Woods Park sits right in the middle of town with lawns and old trees for a classic golden hour session.",
      "The Ravinia district and the blocks around Port Clinton Square give you brick, storefronts and a small-town downtown for families who want something other than a park.",
      "For newborn sessions and quiet family mornings, I come to your Highland Park home. Bright family rooms and nurseries are all the space a newborn session needs, and staying home keeps the baby on schedule.",
    ],
    landmarks: ["Rosewood Beach", "Heller Nature Center", "Sunset Woods Park", "Millard Park", "Ravinia district"],
    why: [
      {
        title: "Rosewood Beach has a season and a permit process.",
        body: "The Park District of Highland Park manages the beach and has rules for professional photography. I confirm what is required for the date we choose.",
      },
      {
        title: "Ravine trails are steep in places.",
        body: "Heller and Millard are beautiful, but the paths down to the water are not stroller friendly. For families with a newborn or a grandparent along, Sunset Woods is the easier choice.",
      },
      {
        title: "The drive from Skokie is long enough to matter.",
        body: "Highland Park is past my 10-mile no-fee radius, so a $50 travel fee applies. I mention it up front because I would rather you know before you book.",
      },
    ],
    faqs: [
      {
        question: "How much does a family photographer in Highland Park cost?",
        answer:
          "My sessions start at $200 for a 30-minute mini session and go up to $500 for a 90-minute full session, plus a $50 travel fee for Highland Park because it is beyond 10 miles from Skokie. Every package includes edited images in a private online gallery with full print rights.",
      },
      faqInHome("Highland Park"),
      {
        question: "Where are the best places for family photos in Highland Park?",
        answer:
          "Rosewood Beach for the lake, boardwalk and dunes, Heller Nature Center and Millard Park for ravines and woods, Sunset Woods Park for a classic lawn and trees session, and the Ravinia district for a downtown feel.",
      },
      faqBestTime("Highland Park"),
      faqNewbornTiming,
      faqBookAhead,
      faqKids,
    ],
    proof: [proofWilmetteKeay, proofSkokieNewborn, proofSkokieLibrary],
    nearby: ["winnetka", "northbrook", "wilmette", "glenview"],
    driveNote: "About twenty-five minutes from Skokie. A $50 travel fee applies.",
  },

  "west-rogers-park": {
    slug: "west-rogers-park",
    name: "West Rogers Park",
    title: "West Rogers Park Family Photographer",
    description:
      "West Rogers Park and West Ridge family, newborn and milestone photographer. In-home and park sessions in natural light, minutes from Skokie. From $200.",
    h1: "West Rogers Park Family Photographer",
    heroLabel: "West Rogers Park Hero Photo",
    intro: [
      "Tovy Photography is a family, newborn and milestone photographer serving West Rogers Park and West Ridge on Chicago's far north side, in natural light at your home or at neighborhood parks.",
      "West Rogers Park borders Skokie and Lincolnwood, so I am usually less than ten minutes away and there is no travel fee.",
    ],
    content: [
      "West Rogers Park is right next door to Skokie, and in-home sessions are the heart of it. Two-flats, courtyard buildings, bungalows and condos all photograph beautifully when you work with the window light. Staying home means the baby naps on schedule, the toddler has their toys, and the photos look like your real life.",
      "For outdoor sessions, Indian Boundary Park has a lagoon, old trees and a castle-style fieldhouse that kids love. Warren Park has open lawns and a hill that is perfect for a running-and-tumbling family session. Lerner Park and the quieter residential blocks west of California give you tree-lined streets for fall color.",
      "Milestone sessions are popular here too. I photographed a nine-month session in a West Rogers Park home that is one of my favorites, and I photograph first birthdays, upsherins and family gatherings too.",
    ],
    landmarks: ["Indian Boundary Park", "Warren Park", "Lerner Park", "Devon Avenue", "Loyola Beach (nearby)"],
    why: [
      {
        title: "Chicago Park District parks have their own rules.",
        body: "Chicago parks can require a permit for professional photography depending on the park and the setup. I keep sessions simple, one camera and no equipment, and I confirm what applies to the park we choose.",
      },
      {
        title: "Courtyard and garden apartments have one great window.",
        body: "That is enough. I find the brightest spot in your home, turn off the overhead lights, and build the session around it. Small spaces make for close, cozy photos.",
      },
      {
        title: "Indian Boundary Park is busiest on weekend afternoons.",
        body: "The playground and the lagoon draw families all day. Weekday evenings and early weekend mornings give us the trees and the light without the crowd.",
      },
    ],
    faqs: [
      faqCost("West Rogers Park"),
      faqInHome("West Rogers Park"),
      {
        question: "Where are the best places for family photos in West Rogers Park?",
        answer:
          "Indian Boundary Park for the lagoon, old trees and the fieldhouse, Warren Park for open lawns and a hill, Lerner Park and the quieter residential streets for fall color, and your own home for newborn and everyday family sessions.",
      },
      faqBestTime("West Rogers Park"),
      faqNewbornTiming,
      faqBookAhead,
      faqKids,
    ],
    proof: [proofWestRogersPark, proofSkokieNewborn, proofDowntownNewborn],
    nearby: ["skokie", "lincolnwood", "evanston"],
    driveNote: "Borders Skokie and Lincolnwood. No travel fee.",
  },
};

export const locationSlugs = Object.keys(locationPages);

export function getLocation(slug: string): LocationPage | undefined {
  return locationPages[slug];
}

export const chicagoProof = { proofDowntownNewborn, proofGarfield, proofBarMitzvah };
