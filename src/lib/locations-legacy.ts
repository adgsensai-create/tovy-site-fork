// Legacy town copy carried over verbatim from the original /locations pages.
export interface LegacyLocationData {
  name: string;
  title: string;
  metaDescription: string;
  h1: string;
  heroLabel: string;
  content: string[];
  landmarks: string[];
}

export const legacyLocationData: Record<string, LegacyLocationData> = {
  skokie: {
    name: "Skokie",
    title: "Skokie Family & Newborn Photographer — Tovy Photography",
    metaDescription:
      "Tovy Photography is a Skokie-based family and newborn photographer. Capturing authentic moments with natural light in Skokie, IL. Sessions start at $180.",
    h1: "Skokie Family & Newborn Photographer",
    heroLabel: "Skokie Hero Photo",
    content: [
      "As a Skokie-based family and newborn photographer, I'm deeply rooted in this community. Skokie is home — it's where I raise my family, where I know every park's best golden hour spot, and where I've built relationships with families who trust me to capture their most meaningful moments.",
      "Skokie offers some of the most beautiful locations for family photography sessions. From the lush green spaces of Emily Oaks Nature Center to the vibrant gardens at the Skokie Northshore Sculpture Park, there's no shortage of stunning natural backdrops right in our neighborhood. I love shooting at Laramie Park during golden hour, where the light filters through the trees in the most magical way.",
      "For families who prefer the comfort and authenticity of home, I specialize in in-home lifestyle sessions throughout Skokie. There's something irreplaceable about capturing your family in your own space — the nursery where you rock your baby to sleep, the kitchen where Saturday morning pancakes happen, the backyard where your kids run wild. These are the real moments that make your family uniquely yours.",
      "Whether you're a new family in Skokie welcoming a baby, celebrating a milestone birthday, or simply wanting to freeze time with your growing kids, I bring the same calm, playful energy to every session. My approach is naturally guided — meaning I'll gently direct without over-posing, letting the real interactions shine through. The result? Photos that feel like your family, not a staged version of it.",
      "Sessions are available throughout Skokie and surrounding areas including downtown Skokie, Old Orchard, and the residential neighborhoods that make this village so special. I'm proud to serve the diverse, vibrant community of Skokie with photography that truly sees the good in every family's story.",
    ],
    landmarks: [
      "Emily Oaks Nature Center",
      "Skokie Northshore Sculpture Park",
      "Laramie Park",
      "Old Orchard Mall area",
      "Skokie Heritage Museum",
    ],
  },
  evanston: {
    name: "Evanston",
    title: "Evanston Family Photographer — Natural Light Photography",
    metaDescription:
      "Tovy Photography serves Evanston families with natural light photography. Family, newborn, and milestone sessions along the North Shore. Book today.",
    h1: "Evanston Family Photographer",
    heroLabel: "Evanston Hero Photo",
    content: [
      "Evanston is one of my favorite places to photograph families. With its beautiful lakefront, tree-lined streets, and charming neighborhoods, this North Shore gem provides endless inspiration for natural, authentic family photography sessions.",
      "Lighthouse Beach and the Evanston lakefront offer some of the most dramatic photography backdrops on the North Shore. The combination of water, sky, and sand creates a timeless setting for family portraits — especially during the golden hour when the light over Lake Michigan is absolutely breathtaking. I've captured families playing in the waves, toddlers discovering sand for the first time, and couples stealing a quiet moment while their kids play nearby.",
      "Beyond the lakefront, Evanston's beautiful parks and green spaces provide lush, natural settings for family sessions. The Shakespeare Garden at Northwestern University is a hidden gem for intimate portraits, while the sprawling grounds of Centennial Park offer room for playful, active family sessions. During fall, the Maple Avenue corridor transforms into a canopy of warm golds and reds — perfect for cozy autumn family photos.",
      "I serve families throughout Evanston's diverse neighborhoods — from the bustling downtown area near Davis Street to the quiet, tree-lined blocks of South Evanston, and the stately homes along Sheridan Road. Each neighborhood has its own character, and I love incorporating these authentic backdrops into your family's story.",
      "For Evanston families, I offer the same warm, relaxed approach that has made me a trusted photographer on the North Shore. Whether it's a newborn session in your Evanston home, a family portrait at the lakefront, or a milestone celebration at one of Evanston's beautiful parks, I'm here to capture the real, beautiful moments that make your family special.",
    ],
    landmarks: [
      "Lighthouse Beach",
      "Centennial Park",
      "Shakespeare Garden at Northwestern",
      "Clark Street Beach",
      "Ladd Arboretum",
    ],
  },
  lincolnwood: {
    name: "Lincolnwood",
    title: "Lincolnwood Photographer — Family & Newborn Photography",
    metaDescription:
      "Tovy Photography serves Lincolnwood families with authentic, natural light photography. Family, newborn, and milestone sessions. Based in nearby Skokie, IL.",
    h1: "Lincolnwood Photographer",
    heroLabel: "Lincolnwood Hero Photo",
    content: [
      "Just minutes from my Skokie studio, Lincolnwood is a community I know and love. Its quiet, family-friendly neighborhoods and beautiful green spaces make it an ideal setting for the kind of natural, authentic photography I specialize in.",
      "Lincolnwood's crown jewel for photography is undoubtedly the Lincolnwood Centennial Park and Pool complex. The park's mature trees, open meadows, and winding paths provide a variety of natural backdrops within walking distance of each other. I love how the afternoon light plays through the canopy of trees here — it creates the most beautiful, soft natural light that's perfect for family portraits.",
      "The community spaces along Lincoln Avenue and the charming residential streets of Lincolnwood offer an authentic neighborhood feel that's perfect for lifestyle photography. Whether we're capturing your kids riding bikes down the sidewalk, a family picnic in your backyard, or your morning routine in the kitchen, Lincolnwood's community character shines through in every frame.",
      "For newborn sessions, I love photographing in Lincolnwood homes. The village's beautiful single-family homes often feature wonderful natural light from large windows — exactly what I need to create those soft, dreamy newborn portraits. There's something so special about capturing a new baby in the very home they'll grow up in.",
      "Living and working in neighboring Skokie means I'm just a short drive from anywhere in Lincolnwood. I've photographed families at Proesel Park, in the gorgeous grounds near the Lincolnwood Library, and throughout the residential neighborhoods that make this community feel like a true village within the city. If you're a Lincolnwood family looking for photography that captures your real life beautifully, I'd love to chat.",
    ],
    landmarks: [
      "Centennial Park",
      "Proesel Park",
      "Lincolnwood Town Center",
      "Drake Park",
      "Lincolnwood Public Library grounds",
    ],
  },
  wilmette: {
    name: "Wilmette",
    title: "Wilmette Family Photographer — North Shore Photography",
    metaDescription:
      "Tovy Photography captures beautiful family moments in Wilmette, IL. Natural light family, newborn, and milestone photography on Chicago's North Shore.",
    h1: "Wilmette Family Photographer",
    heroLabel: "Wilmette Hero Photo",
    content: [
      "Wilmette's stunning North Shore setting — with its lakefront beaches, historic architecture, and beautifully maintained parks — provides some of the most gorgeous photography locations in the greater Chicago area. I'm honored to serve Wilmette families with my natural, authentic approach to photography.",
      "Gillson Beach and Park is an absolute treasure for family photography. The beach setting with Lake Michigan as your backdrop creates portraits that are both timeless and uniquely North Shore. I love the variety this location offers — the sandy beach for playful family photos, the harbor for a more nautical feel, and the grassy picnic areas for relaxed, candid moments. During summer evenings, the sunset over the lake here is nothing short of spectacular.",
      "The Wilmette Village Center and its surrounding neighborhoods offer a charming, quintessentially North Shore backdrop for family sessions. The tree-canopied streets, beautiful gardens, and stately homes of Wilmette create an elegant yet warm setting. I've photographed families along the Green Bay Trail, in the beautiful Mallinckrodt Park, and throughout the picturesque residential blocks that make Wilmette such a sought-after community.",
      "For Wilmette families with newborns, I bring my gentle, calm approach directly to your home. The beautiful homes in Wilmette often feature exactly the kind of natural light that makes newborn photography magical — large windows, bright rooms, and that soft North Shore light that filters through mature trees. In-home newborn sessions let us capture your baby in the most authentic, comfortable setting possible.",
      "Whether it's a family session at Gillson Beach, a milestone portrait in one of Wilmette's beautiful parks, or a cozy in-home newborn session, I bring the same warm, professional approach to every family I work with. Based in nearby Skokie, I'm just minutes away and deeply familiar with all the best photography spots Wilmette has to offer.",
    ],
    landmarks: [
      "Gillson Beach and Park",
      "Green Bay Trail",
      "Mallinckrodt Park",
      "Wilmette Harbor",
      "Baha'i Temple gardens",
    ],
  },
};
