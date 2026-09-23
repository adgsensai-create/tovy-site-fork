export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  category: string;
  image: string | null; // path to featured image, null for placeholder
  imagePosition?: string; // CSS object-position for cover crop (e.g. "center bottom")
  content: string; // HTML content
  seoTitle?: string;
  seoDescription?: string;
  faqs?: { question: string; answer: string }[];
}

import { seoBlogPosts } from "./blog-posts-seo";

export const blogPosts: BlogPost[] = [
  ...seoBlogPosts,
  {
    slug: "garfield-park-conservatory-engagement-photos-chicago",
    title: "Garfield Park Conservatory Engagement Photos in Chicago",
    excerpt: "A look at this romantic Garfield Park Conservatory engagement session, plus why this Chicago location works so well for couples who want greenery, soft light, and a calm indoor setting.",
    date: "2026-04-13",
    category: "Locations",
    image: "/photos/garfield-park-conservatory-engagement/cover-bench.jpg",
    seoTitle: "Garfield Park Conservatory Engagement Photos in Chicago | Tovy Photography",
    seoDescription: "Planning Garfield Park Conservatory engagement photos in Chicago? See why this lush indoor location works so beautifully, what to wear, and what makes a conservatory session feel so special.",
    content: `
<p>If you're looking for a Chicago engagement photo location that feels green, romantic, and a little removed from the city outside, Garfield Park Conservatory is such a beautiful choice. This session had all the things I love most: soft light, quiet in-between moments, layered greenery, and just enough variety to make the gallery feel full without needing to run all over the city.</p>

<p>You can <a href="/gallery/milestone/garfield-park-conservatory-engagement">view the full Garfield Park Conservatory engagement gallery here</a>, but I wanted to share a little more about why this location works so well and what makes these sessions feel so special.</p>

<h2>Why Garfield Park Conservatory Works So Well for Engagement Photos</h2>

<p>One of the best things about Garfield Park Conservatory is that it gives you a lot of visual variety in one place. Within a single session, you can get lush tropical greens, more open architectural backgrounds, intimate little corners, and detail shots that feel almost editorial. It makes the gallery feel rich and layered without the session itself feeling rushed.</p>

<p>It is also a great option for couples who want nature in their photos but do not want to worry as much about unpredictable spring weather, early cold snaps, or a windy Chicago day. The conservatory keeps that soft, organic feeling while still giving you some shelter and consistency.</p>

<h2>What This Session Felt Like</h2>

<p>This engagement session had such a calm, romantic feel to it. We leaned into the natural greenery, the bench portraits, the walking shots, and some close-up ring details that added a really nice mix to the final gallery. Some images feel soft and intimate, and others feel a little more polished and classic. That balance is usually exactly what I want from an engagement session.</p>

<p>I always want couples to look like themselves, not like they are acting out someone else’s Pinterest board. Garfield Park Conservatory is a location that helps with that because it already has so much atmosphere. You do not need a ton of props or overthinking. Good light, a strong location, and real connection do most of the work.</p>

<h2>What to Wear for a Conservatory Engagement Session</h2>

<p>For a location like this, I love outfits that feel a little elevated but still easy to move in. Soft neutrals, earthy tones, black, cream, muted florals, and fabrics with some movement all photograph beautifully against the green backdrop. If one of you is a little dressier and the other complements that look without matching exactly, that usually lands really well.</p>

<p>If you are planning your own session and feeling stuck, my usual advice still applies: keep it simple and let the people shine. If you want more outfit help, my <a href="/blog/what-to-wear-family-photo-session">what to wear guide</a> is a good place to start, and I am always happy to help clients narrow down options.</p>

<h2>What Makes the Photos Feel So Romantic Here</h2>

<p>A big part of it is the light. Conservatory light tends to be softer and more filtered than direct outdoor sun, which is really flattering and keeps the photos feeling gentle. Then you add in all the texture from the plants, the layered paths, and the cozy corners, and the whole session naturally leans romantic without needing to force anything.</p>

<p>I also love that this space works well for both wide portraits and close details. You can step back and show the setting, then move in close for hands, rings, expressions, and those quieter little moments that often end up being favorites.</p>

<h2>Thinking About Booking Engagement Photos at Garfield Park Conservatory?</h2>

<p>If you want engagement photos that feel lush, intimate, and timeless, Garfield Park Conservatory is absolutely worth considering. It is especially great for couples who want something indoor-friendly without losing that natural look.</p>

<p>If you already know you love this vibe, <a href="/contact">reach out here</a>. I would love to help you plan a session that feels relaxed, beautiful, and true to you.</p>
`,
  },
  {
    slug: "when-to-book-newborn-photos-what-to-expect",
    title: "When to Book Your Newborn Photo Session (and What to Expect)",
    excerpt: "Timing is everything with newborn photography. Here's when to book, what happens during the session, and how to prepare so everything goes smoothly.",
    date: "2026-03-23",
    category: "Newborn",
    image: "/photos/newborn-sleeping-headband.jpg",
    seoTitle: "When to Book Newborn Photos | Tovy Photography",
    seoDescription: "When to book newborn photos, the best age for the session, and what an in-home newborn session with a Skokie photographer is really like.",
    content: `
<p>If you're expecting or just welcomed a new baby, you've probably been thinking about newborn photos. When should you book? What actually happens during a session? Do you need to have everything together first? As a newborn photographer in Skokie serving families across Chicago's North Shore, these are the questions I hear most. Let me walk you through everything.</p>

<h2>When Should You Book a Newborn Photographer?</h2>

<p>Most of my clients reach out either in their <strong>third trimester</strong> or <strong>once baby is already here</strong> — and both are totally fine. I get it, there's a lot going on and booking a photo session isn't always top of mind when you're prepping for a new baby.</p>

<p>That said, newborn sessions are best done in the <strong>first 5 to 14 days</strong> after birth. During this window, babies are sleepier, more flexible, and tend to curl up naturally into those peaceful poses you see in newborn photos. So if you can, a quick message during your third trimester lets me pencil in your due date and hold space for you. Then when baby arrives, you just text me and we lock in the actual date. No pressure, no deposits — just a heads up so I'm ready when you are.</p>

<h2>What If My Baby Is Already Here?</h2>

<p>Don't stress. If your baby is three weeks, six weeks, or even three months old, we can absolutely still do a beautiful session. It just looks a little different. Older newborns are more awake and alert, so instead of those curled-up sleepy poses, we lean into wide eyes, tiny smiles, and interaction with parents and siblings. Those are some of my favorite images to capture.</p>

<h2>What to Expect During a Newborn Session</h2>

<p>All of my newborn photography sessions are done <strong>in your home.</strong> There's a reason for that. You just had a baby. The last thing you need is to pack up a newborn, drive somewhere, and worry about parking. In-home sessions mean you're comfortable, baby is comfortable, and everything you need is right there.</p>

<p>Here's how it typically goes:</p>

<ul>
<li><strong>I come to you.</strong> I'll arrive with everything I need. You don't need to set anything up or prep your home beyond normal tidying.</li>
<li><strong>We start with family and sibling photos.</strong> Older kids have shorter attention spans, so I like to get their photos done first while they're still excited and cooperative.</li>
<li><strong>Then we focus on baby.</strong> This is the calm, quiet part. We'll work near the best natural light in your home, usually by a large window. I'll gently guide baby into natural positions — nothing forced, nothing uncomfortable.</li>
<li><strong>We work around baby's schedule.</strong> If baby needs to eat, we pause. If baby needs to be changed, we pause. There's no rush. A typical newborn session runs about 1.5 to 2 hours, and a good chunk of that is just giving baby what they need.</li>
<li><strong>Parent and detail shots.</strong> Those tiny fingers wrapped around your hand. The way baby fits perfectly against your chest. The nursery you spent months putting together. These are the details you'll forget faster than you think, and they make some of the most meaningful photos.</li>
</ul>

<h2>How to Prepare for Your Newborn Session</h2>

<p>Less than you think. Seriously.</p>

<ul>
<li><strong>Feed baby right before the session.</strong> A full baby is a sleepy baby, and sleepy babies photograph beautifully.</li>
<li><strong>Keep the house warm.</strong> Newborns lose heat quickly, especially during skin-to-skin and diaper-only shots. I usually suggest setting the thermostat a few degrees warmer than normal.</li>
<li><strong>Wear simple, neutral clothing.</strong> Soft whites, creams, and light grays work beautifully and keep the focus on baby. Check out my <a href="/blog/what-to-wear-family-photo-session">what to wear guide</a> for more ideas.</li>
<li><strong>Don't worry about your home being perfect.</strong> I'm only photographing in one or two spots with the best light. The rest of your house can look however it looks — I promise I won't judge. We all have a pile of laundry somewhere.</li>
<li><strong>Have backup outfits for baby.</strong> Blowouts happen. Spit-up happens. Having a couple of extra onesies or swaddles ready saves time.</li>
</ul>

<h2>What About Siblings?</h2>

<p>If you have older kids, include them. Sibling photos with a new baby are some of the most precious images from a newborn session. I keep things playful and low-pressure, and I never force a child to hold the baby or smile for the camera. The real moments, like a toddler gently touching baby's head or peeking into the bassinet, are always better than a posed shot. Don't just take my word for it — <a href="/testimonials">hear what other families have said</a> about their experience.</p>

<h2>When Will I Get My Photos?</h2>

<p>Your full gallery of edited images will be ready within 2 to 3 weeks after your session. Every photo is carefully edited for warmth, tone, and natural skin tones. I want your images to feel real and timeless — not overly filtered or trendy.</p>

<h2>How Much Does a Newborn Session Cost?</h2>

<p>My newborn sessions start at $250 for a one-hour session with 30+ edited images, and go up to $375 for the full 1.5-hour session with 45+ images. I also offer mini sessions and custom packages. You can see all the details on my <a href="/sessions">sessions and pricing page</a>.</p>

<h2>Ready to Book?</h2>

<p>Whether you're still expecting or baby is already here, I'd love to hear from you. I only take a limited number of newborn sessions each month so I can give every family the attention they deserve. <a href="/contact">Reach out</a> and we'll figure out the rest together.</p>

<p>Serving families in Skokie, Evanston, Lincolnwood, Wilmette, and across Chicago's North Shore.</p>
`,
  },
  {
    slug: "what-to-wear-family-photo-session",
    title: "Family Photo Outfits: What to Wear for Family Photos, by Season",
    excerpt: "Family photo outfit ideas by season and by session type, plus the simple coordinate-not-match rule I give every family before a session.",
    date: "2026-03-19",
    category: "Tips",
    image: "/photos/family-bed-portrait.jpg",
    seoTitle: "Family Photo Outfits: What to Wear, by Season | Tovy Photography",
    seoDescription: "Family photo outfit ideas for fall, spring, summer, winter and holiday cards, plus what dad and the kids should wear. Coordinate, do not match.",
    faqs: [
      { question: "What are the best family photo outfits?", answer: "Coordinated, not matching: two or three soft, warm colors shared across the family in simple textures everyone can move in. Cream, olive, rust, navy and mustard photograph well in natural light. Skip logos, neon and all-white." },
      { question: "What should we wear for fall family photos?", answer: "Warm layered neutrals such as rust, mustard, olive, cream and navy, with a light sweater or flannel for kids and a long dress or soft wide-leg pants for mom. Skip bright orange and heavy coats." },
      { question: "Should a family match for photos?", answer: "No. Pick two or three colors and let each person wear one in a different piece. Coordinated outfits look intentional while everyone still looks like themselves." },
      { question: "What should dad wear for family photos?", answer: "A solid henley, knit sweater or linen shirt with chinos or dark jeans, usually in the darkest color of the family's palette. No logos and nothing shiny." },
      { question: "Do you help families choose outfits?", answer: "Yes. Wardrobe guidance is included with Classic and Full sessions. Send photos of what you are considering and I will say what works and what to swap." },
    ],
    content: `
<p>The best family photo outfits are coordinated, not matching: two or three soft, warm colors shared across the family, simple textures, and clothes everyone can move in. Cream, olive, rust, navy and mustard photograph beautifully in natural light on the North Shore. Skip logos, neon and all-white, and dress for the season you are shooting in. That is the whole formula. Below is how I apply it, plus outfit ideas by season and by session type.</p>

<h2>Family photo outfit ideas by season</h2>

<h3>What should we wear for fall family photos?</h3>

<p>Warm, layered neutrals. Rust, mustard, olive, cream and deep navy sit naturally against changing leaves. A light sweater or a flannel for the kids, a long dress or wide-leg pants in a soft solid for mom, a henley or a knit over a collar for dad. Skip bright orange, which fights the trees, and skip heavy coats if you can, since they hide everyone's shape.</p>

<h3>What should we wear for spring and summer family photos?</h3>

<p>Lighter fabrics in cream, sage, dusty rose, chambray and soft white paired with a color, never all white. Linen, cotton and flowy dresses move in the breeze at the lakefront. Bare feet on the beach are fine. For spring blossoms, soft pastels read well without looking like Easter.</p>

<h3>What should we wear for winter or in-home family photos?</h3>

<p>Cozy textures in cream, oatmeal, camel and charcoal: chunky knits, corduroy, a wool dress. For in-home sessions, think of what you would wear on a relaxed Sunday, one notch nicer. Socks or bare feet instead of shoes. Avoid black head to toe, which loses all detail indoors.</p>

<h3>What should we wear for holiday card photos?</h3>

<p>Keep it timeless rather than themed. A palette of cream, forest green, burgundy and navy looks like the holidays without a single reindeer. Matching pajamas are fun for one or two frames at home, not for the whole session.</p>

<p>This is the number one question I get from families before their photo session, every single time, without fail. And I love it because it means you care. So let me take the stress out of it right now.</p>

<h2>The Golden Rule: Let the People Shine</h2>

<p>Don't let your clothes outshine you. That's really what it comes down to. Your family photos should be about your faces, your connection, the way your toddler looks at you. Not about a bold pattern or a bright color pulling all the attention. Plain, neutral, earthy, warm colors are your best friend. Think creams, tans, soft whites, olive, dusty rose, warm gray. These tones keep the focus exactly where it belongs: on your family.</p>

<h2>Coordinate, Don't Match</h2>

<p>You don't need to put everyone in the same white tee and jeans. Pick 2 to 3 warm, neutral tones and mix them across your family. Dad in a cream sweater, mom in olive, kids in tan and white. You'll look like you belong together without looking like a uniform. Solids photograph beautifully. If you want a pattern, keep it to one person and make sure it's subtle.</p>

<h2>Comfort Over Everything</h2>

<p>If your kid hates that collared shirt, they're going to look like they hate that collared shirt in every single photo. And if you're constantly adjusting a dress that doesn't fit right, it shows. Wear things you can move in, sit on the floor in, chase a toddler in. Some of the best moments in a family photography session happen when someone's running, spinning, or being scooped up. You want to be ready for that.</p>

<h2>Think About Your Space</h2>

<p>For my in-home family sessions in Skokie, Evanston, Lincolnwood, and across Chicago's North Shore, I always tell clients to think about the colors in their home. Neutral outfits look gorgeous against white bedding and natural light pouring through your windows. If we're shooting outdoors at a park or neighborhood spot, earthy tones and warm layers pop beautifully against greenery or fall leaves.</p>

<h2>What to Skip</h2>

<ul>
<li><strong>Neon or overly bright colors</strong>, they reflect onto skin and pull focus from your faces</li>
<li><strong>Big logos or graphics</strong>, they date your photos and distract from the moment</li>
<li><strong>All black everything</strong>, it absorbs light and loses detail, especially in natural light photography</li>
<li><strong>Brand new shoes on kids</strong>, blisters and meltdowns are not the vibe</li>
<li><strong>Anything that needs constant adjusting</strong>, if you're tugging at it now, you'll be tugging at it during the session</li>
</ul>

<h2>What to Wear for a Newborn Session</h2>

<p>For in-home newborn sessions, keep it soft and simple. Light neutrals, whites, creams, soft grays. Skin-to-skin moments are some of the most beautiful newborn photos, so don't overthink it. A cozy top you feel good in is perfect. And for baby? Those little onesies, swaddles, or just a diaper are all beautiful. I'll guide you through everything when I arrive at your home.</p>

<h2>What to Wear for a Milestone or Birthday Session</h2>

<p>Milestone sessions and birthday photography are a little more fun. Your child's personality is the star, so dress them in something they feel great in. Keep the rest of the family in those same warm, neutral tones so the birthday kid stands out. A special outfit for the birthday boy or girl with everyone else in soft, complementary colors makes for stunning photos.</p>

<h2>My Honest Advice</h2>

<p>Don't buy a whole new wardrobe for this. Wear things that feel like you. The families who show up comfortable and relaxed always have the best family photo sessions because they're not thinking about their clothes. They're thinking about each other. And that's what makes a photo feel real.</p>

<p>If you're still stuck, send me a photo of your outfit options. I do this all the time with my clients and I'm happy to help you narrow it down. Seriously, text me a mirror selfie. I've seen it all.</p>

<p>Ready to book your family or newborn session in Skokie or the North Shore? <a href="/contact">Let's chat</a> and figure out the rest together.</p>

<h2>Family photo outfits, answered</h2>

<h3>What colors look best in family photos?</h3>

<p>Soft, warm, muted tones: cream, olive, rust, navy, mustard, dusty rose, camel. They flatter every skin tone and hold up in natural light. Bright primary colors and neon cast color onto faces. Pure white blows out in sun. Black loses detail indoors.</p>

<h3>Should a family match for photos?</h3>

<p>No. Coordinate instead. Pick two or three colors and let each person wear one of them in a different piece. The photos look intentional and everyone still looks like themselves.</p>

<h3>What should dad wear for family photos?</h3>

<p>A solid henley, a knit sweater, a chambray or linen shirt, or a plain tee under an open overshirt, with chinos or dark jeans. Nothing with a logo, nothing shiny. Dads usually look best in the darkest color of the palette.</p>

<h3>What should kids wear for family photos?</h3>

<p>Whatever they can run in. Soft solids and small textures, comfortable shoes or bare feet, no characters and no words. Bring a spare outfit for anyone under five. Let older kids have a say so they show up happy.</p>

<h3>Do you help with outfits?</h3>

<p>Yes. Wardrobe guidance is included with my Classic and Full sessions. Send me photos of what you are thinking and I will tell you honestly what works and what to swap. You can see the packages on the <a href="/sessions/family-photography">family photography page</a>.</p>
`,
  },
  {
    slug: "best-family-photo-locations-skokie-north-shore",
    title: "8 Beautiful Spring Family Photo Locations in Skokie & the North Shore",
    excerpt: "Spring is here and it's the perfect time to book a family session! Here are some of the best locations in Skokie, Evanston, and Wilmette — plus a winter option for next time — with tips for the best time to shoot at each one.",
    date: "2026-03-20",
    category: "Locations",
    image: "/photos/spring-blossoms.jpg",
    seoTitle: "Family Photo Locations in Skokie & North Shore | Tovy Photography",
    seoDescription: "Eight spring family photo locations in Skokie and Chicago's North Shore, with what makes each one work and when the light is best.",
    content: `
<p>Spring is officially here and after a long Chicago winter, there's no better time to get outside with your family and capture some beautiful photos. The flowers are starting to bloom, the light is getting warmer, and the kids are ready to run. One of the first things families ask me after booking is "where should we shoot?" Here are spots I love and recommend for spring family sessions in Skokie, Evanston, Wilmette, and across the North Shore.</p>

<h2>1. Keay Nature Learning Center — Wilmette</h2>

<p>This is a spot I've actually shot at and it's so special. Keay is a quiet, secluded 4.6-acre nature preserve tucked right off Skokie Blvd. It has winding paths, mature trees, and this peaceful feel that's perfect for families with little ones who need space to warm up without crowds or distractions. In spring, everything starts coming back to life here — fresh green leaves, wildflowers popping up along the paths — it's gorgeous.</p>

<p><strong>Best time to shoot:</strong> Late afternoon. The tree canopy filters the light beautifully and gives you that warm golden glow.</p>

<h2>2. Gillson Park & Beach — Wilmette</h2>

<p>If you want that lakefront feel without driving downtown, Gillson Park is a great option. The beach, the open grass, the harbor in the background — it gives you a completely different look than a wooded trail. Once the spring weather settles in, this is one of the first spots that feels like summer is coming. It's perfect for families who want something bright and open, and kids always end up running toward the water which makes for really joyful, natural moments.</p>

<p><strong>Best time to shoot:</strong> Evening sessions. The sun sets over the lake and creates this soft, warm backlight.</p>

<h2>3. Shakespeare Garden — Evanston</h2>

<p>This small garden on Northwestern's campus has a romantic, storybook quality to it — stone walls, climbing vines, seasonal flowers. It's intimate and charming, which makes it a nice choice for smaller families, maternity sessions, or couples. It's compact, so it works better for smaller groups than big extended family sessions.</p>

<p><strong>Best time to shoot:</strong> Morning or late afternoon. The stone walls create shade earlier than open parks, so timing matters here.</p>

<h2>4. Emily Oaks Nature Center — Skokie</h2>

<p>Emily Oaks has beautiful winding paths through prairie grass and wildflowers, with mature trees that create natural canopies overhead. Spring is one of the best times to shoot here — the prairie starts filling in with fresh greens and early wildflowers, and the light through the budding trees is soft and beautiful. There's enough variety that sessions here look completely different depending on the season and where you wander. It's also quiet and spacious, which is always a plus with young kids.</p>

<p><strong>Best time to shoot:</strong> Late afternoon, about an hour and a half before sunset when the light filters through the trees.</p>

<h2>5. Ladd Arboretum — Evanston</h2>

<p>A bit of a hidden gem along the North Shore Channel. The path is lined with beautiful trees and there's a pedestrian bridge that makes a lovely backdrop. It feels tucked away even though you're in the middle of Evanston, and there's plenty of room for kids to explore without worrying about traffic or big crowds.</p>

<p><strong>Best time to shoot:</strong> Golden hour in spring or summer when the tree canopy is full and the light comes through in patches.</p>

<h2>6. Harms Woods — Skokie / Glenview Border</h2>

<p>For families who want a deep, wooded, natural feel, Harms Woods is worth considering. The tall trees and wide trails create beautiful layered depth in photos. Fall is especially stunning here when the leaves are changing and the forest floor is covered in golden tones. It's a forest preserve so it stays fairly uncrowded.</p>

<p><strong>Best time to shoot:</strong> Afternoon light works well since the tree cover softens even midday sun. Fall is peak season.</p>

<h2>7. Skokie Public Library — Skokie (Rainy Day Backup!)</h2>

<p>Spring in Chicago means beautiful weather one day and rain the next. If your session lands on a rainy day, don't stress — the Skokie Public Library is a surprisingly gorgeous indoor option. I've done sessions here and the architecture, big windows, and natural light make it work really well for family photos. It's a great reminder that you don't need sunshine to get beautiful photos — sometimes an interesting indoor space works even better. Plus your kids already feel comfortable here.</p>

<p><strong>Best time to shoot:</strong> Weekday mornings when it's quieter. The natural light from the large windows is soft and even.</p>

<h2>8. Your Own Home</h2>

<p>I saved this one for last because honestly, some of the most meaningful family photos happen inside your home. The couch where you read stories together. The kitchen where Saturday morning pancakes happen. Your baby's nursery that you spent months putting together. In-home sessions are calm, natural, and you don't have to pack a diaper bag or worry about weather. These are the backdrops that actually mean something to your family.</p>

<p><strong>Best time to shoot:</strong> Morning light is usually best. I'll ask which rooms get the most natural light and we'll work with what your home gives us.</p>

<h2>Not Sure Which Location Is Right for You?</h2>

<p>Every family is different. When you book with me, we'll talk through what feels right based on your kids' ages, the season, and the kind of photos you're hoping for. I always have a recommendation ready.</p>

<p>Spring books up fast — the weather window between "still cold" and "too hot and humid" goes quicker than you'd think in Chicago. <a href="/contact">Get in touch</a> and let's plan your spring family session in Skokie, Evanston, or anywhere across Chicago's North Shore.</p>
`,
  },
  {
    slug: "maternity-photos-when-to-book-what-to-wear",
    title: "Maternity Photos: When to Book, What to Wear, and Everything You Need to Know",
    excerpt: "Wondering about maternity photos? Here's everything you need to know about timing, outfit ideas, what the session looks like, and why it's worth it.",
    date: "2026-03-26",
    category: "Maternity",
    image: "/photos/maternity-side-profile-bw.jpg",
    imagePosition: "center 70%",
    seoTitle: "When to Take Maternity Photos, What to Wear | Tovy Photography",
    seoDescription: "When to schedule maternity photos, what to wear, and how to plan a relaxed natural light session in Skokie and the North Shore.",
    content: `
<p>If you're expecting, you've probably thought about maternity photos at least once. Maybe you're not sure if it's "your thing." Maybe you're wondering if it's too late. Maybe you just want to know what it actually looks like before committing. Here's everything you need to know about booking a maternity session.</p>

<h2>When Should You Book a Maternity Session?</h2>

<p>The sweet spot is between <strong>28 and 36 weeks.</strong> Your bump is beautifully visible but you're still comfortable enough to move around, sit on the ground, walk through a park, and actually enjoy the session. Reaching out somewhere around 24 to 30 weeks gives plenty of time to plan.</p>

<p>If you're past 36 weeks, don't count yourself out. We can still make it work. You might just prefer a shorter, more relaxed session, and that's completely fine.</p>

<h2>Do I Need a Maternity Session If I'm Already Booking Newborn?</h2>

<p>You don't <em>need</em> one, but I will say this: the two sessions capture completely different chapters of the same story. Maternity is about anticipation, connection, and this specific moment in time when your whole life is about to change. Newborn is about the after. Having both gives you the full picture.</p>

<h2>Where Do Maternity Sessions Take Place?</h2>

<p>Wherever you're most comfortable. I offer both outdoor and in-home sessions in Skokie, Evanston, Lincolnwood, Wilmette, and across Chicago's North Shore.</p>

<p><strong>Outdoor sessions</strong> work beautifully in spring, summer, and early fall. Parks with mature trees, open fields, or even a quiet neighborhood street with good light can look stunning.</p>

<p><strong>In-home sessions</strong> have their own magic. Your nursery, your bedroom, the cozy spaces where you've been nesting. These photos feel intimate and personal in a way that outdoor sessions can't replicate. Plus, you don't have to drive anywhere at 34 weeks, which is a real perk.</p>

<h2>What Should I Wear?</h2>

<p>This is probably the most common question for maternity sessions. Here's what works:</p>

<ul>
<li><strong>Form-fitting fabrics</strong> that show off your bump. Anything that hugs your shape and celebrates it.</li>
<li><strong>Flowy dresses and gowns</strong> for a more romantic, editorial look. Long maxi dresses photograph beautifully, especially outdoors with a breeze.</li>
<li><strong>Neutral and earthy tones.</strong> Creams, whites, soft pinks, sage, tan. These keep the focus on you and your bump, not the outfit.</li>
<li><strong>Something you feel good in.</strong> This matters more than anything else. If you feel beautiful, it shows in every single photo.</li>
</ul>

<p>What to skip: busy patterns, stiff fabrics, anything you'll be tugging at. You want to be comfortable and confident.</p>

<p>Not sure what to go with? Send me your top picks and I'll help you narrow it down.</p>

<h2>Should My Partner and Kids Be in the Photos?</h2>

<p>Absolutely, if you want them there. Including your partner and older kids makes the session feel like a family moment, not just a solo shoot. Sibling photos with a visible bump are some of the sweetest images, and couples shots during this stage are something you'll treasure.</p>

<p>That said, solo shots are beautiful too. Most maternity sessions include a mix of both.</p>

<h2>What If I Don't Feel "Photo Ready"?</h2>

<p>I'm not just saying this as a photographer. I've been there myself. You might be tired. You might feel swollen. You might not love the way your body looks right now. I get it.</p>

<p>But pregnancy is temporary. These photos are how you'll remember this time. And you look more beautiful than you think. Every client who felt nervous beforehand has said afterward that they're so glad they did it.</p>

<h2>How Long Is a Maternity Session?</h2>

<p>A typical session runs about 45 minutes to an hour. Enough time to get a variety of poses and locations without wearing you out. I always work at your pace. If you need to sit, we sit. If you need water, we pause. There's never any rushing.</p>

<h2>How Much Does a Maternity Session Cost?</h2>

<p>The most popular option for maternity is the one-hour session with 30+ edited images. I have a few different packages depending on what you're looking for. Check my <a href="/sessions">sessions page</a> for all the details.</p>

<p>Your full gallery will be ready within 2 to 3 weeks, carefully edited for natural warmth and soft, timeless tones.</p>

<h2>Ready to Book Your Maternity Session?</h2>

<p>Whether you're in your second trimester or already in the home stretch, <a href="/contact">reach out</a> and let's plan something beautiful. I only take a limited number of sessions each month so every family gets the attention they deserve.</p>

<p>Serving expecting moms in Skokie, Evanston, Lincolnwood, Wilmette, and across Chicago's North Shore.</p>
`,
  },
  {
    slug: "outdoor-family-photo-locations-north-shore-chicago",
    title: "The Best Outdoor Family Photo Locations on Chicago's North Shore",
    excerpt: "From Glencoe beaches and the Chicago Botanic Garden to Fort Sheridan, Gillson Park, and quieter spots in Evanston and Skokie, here are the outdoor family photo locations I return to again and again across Chicago's North Shore.",
    date: "2026-06-15",
    category: "Locations",
    image: "/photos/north-shore-family-tall-grasses.jpg",
    seoTitle: "Outdoor Family Photo Locations, North Shore | Tovy Photography",
    seoDescription: "The best outdoor family photo locations on Chicago's North Shore, from lakefront beaches to wooded trails, with the light and timing that make each one work.",
    content: `
<p>One of the questions I get asked most often is some version of "where should we actually take our pictures?" And I love it, because choosing the right spot is half the magic. As a Skokie-based photographer, I spend a lot of my time scouting outdoor family photo locations across Chicago's North Shore, and I've built a detailed mental map of the spots that photograph beautifully in every season, and the ones that look gorgeous in person but turn into a sea of harsh shadows and parking headaches the moment you show up with three kids and a stroller.</p>

<p>So let me save you the trial and error. These are the outdoor family photo locations I return to again and again, why they work, and how to get the most out of each one.</p>

<h2>What Makes a Great Outdoor Family Photo Location</h2>

<p>Before we get into specific spots, it helps to know what I'm actually looking for when I scout. A great location gives us a few different "scenes" within a short walk, so we're not marching tired toddlers half a mile between shots. It has soft, open shade or a tree line that filters the light, which keeps everyone from squinting. And it has a backdrop that feels like <em>you</em>, whether that's the drama of Lake Michigan or the cozy texture of a tree-lined path.</p>

<p>The other thing I weigh constantly is timing. Even the most beautiful location on the North Shore looks flat and washed out at noon. The hour after sunrise and the 90 minutes before sunset, what we call golden hour, are when these places truly come alive.</p>

<h2>Glencoe: Beach Drama Meets Garden Variety</h2>

<p>If I had to pick the single most versatile area for outdoor family photo locations on the North Shore, Glencoe would be at the top of my list. Glencoe Beach gives us those striking Lake Michigan backdrops, open water, soft sand, and a horizon that makes images feel cinematic. It's especially lovely in summer when the light skims across the water in the evening, and it works beautifully for everything from maternity sessions to big extended-family gatherings.</p>

<p>A few minutes away, the Chicago Botanic Garden offers an entirely different mood. English gardens, birch groves, prairie grasses, and those iconic Japanese garden bridges mean we can create real variety without driving all over town. It's one of the few places where a single session can feel like three completely different shoots.</p>

<h2>Highland Park and Fort Sheridan: Quiet, Natural, Free</h2>

<p>A little farther north, Highland Park and the Fort Sheridan area are some of my favorite under-the-radar outdoor family photo locations. Fort Sheridan gives us a wonderful mix, wooded paths, open fields of grass, and a peaceful stretch of beach that doesn't have the city skyline crowding the background. Parking is easy and free, dogs are welcome, and on a weekday evening you can often have whole stretches of it nearly to yourselves. For families who want a relaxed, nature-forward feel rather than a polished garden look, this is the one I recommend.</p>

<h2>Winnetka and Wilmette: Classic North Shore Charm</h2>

<p>For families who love a more timeless, storybook aesthetic, the lakefront parks in Winnetka and the Gillson Park area in Wilmette are hard to beat. Gillson Park in particular packs a remarkable amount of variety into one place: sandy beach, grassy hills, mature trees, and quiet little nooks that feel tucked away even on a busy summer weekend. It's a favorite of mine for milestone sessions and first-birthday shoots, because there's always somewhere shady for little ones to take a breather.</p>

<p>Winnetka's lakefront, meanwhile, has that effortless North Shore elegance, manicured greenery, gentle bluffs, and water views that elevate even the simplest of family portraits.</p>

<h2>Close to Home: Evanston, Skokie, and Lincolnwood</h2>

<p>You don't have to drive far to find beautiful outdoor family photo locations, and I always remind my clients of that. Right here near home, Evanston's lakefront and the Northwestern campus area offer dramatic water views, leafy quads, and architecture that adds a sophisticated edge. The Skokie Northshore Sculpture Park is a fun, slightly unexpected backdrop full of texture and visual interest, and it's wonderfully convenient for families based in <a href="/locations/skokie">Skokie</a> or <a href="/locations/lincolnwood">Lincolnwood</a> who'd rather keep things low-key and local.</p>

<p>These closer-to-home spots are also my go-to recommendation for newborn families who'd prefer not to travel far, or for anyone squeezing a session into a busy weeknight before the kids melt down. If you're newer to the area, my post on <a href="/blog/best-family-photo-locations-skokie-north-shore">spring family photo locations in Skokie &amp; the North Shore</a> goes deeper on some of these closer-to-home spots.</p>

<h2>How I Help You Choose the Right One</h2>

<p>Here's the part I want you to hear most clearly: you don't have to figure this out alone. When we plan your session, I take into account your kids' ages and nap schedules, the vibe you're going for, the season, and even what you plan to wear, and then I match you with the location that will make all of it sing. A toddler-heavy summer shoot calls for something different than a sentimental fall maternity session, and that's exactly the kind of thing I love sorting out together. If you're still deciding on outfits, my guide on <a href="/blog/what-to-wear-family-photo-session">what to wear for family photos</a> pairs perfectly with picking your spot.</p>

<p>Across all of these North Shore locations, Glencoe, Highland Park, Winnetka, Wilmette, Evanston, and right here in Skokie, my goal is the same: to find the place where your family feels most relaxed and most <em>yourselves</em>, because that's always where the best images happen.</p>

<p>If you've been thinking about updating your family photos this year, summer on the North Shore is honestly one of the most beautiful windows we get. The light is long, the gardens are full, and the lake is at its best. I'd love to help you choose the perfect backdrop and capture this season of your family's life. <a href="/contact">Get in touch</a> and let's plan it together.</p>
`,
  },
  {
    slug: "best-time-of-day-outdoor-family-photos",
    title: "The Best Time of Day for Outdoor Family Photos: A Chicago Photographer's Summer Guide",
    excerpt: "Golden hour, early mornings with toddlers, overcast skies, and the midday window to avoid. A Skokie photographer's guide to timing your outdoor family session so the light works for you, not against you.",
    date: "2026-07-03",
    category: "Tips",
    image: "/photos/golden-hour-family-lakeside.jpg",
    seoTitle: "Best Time of Day for Outdoor Family Photos | Tovy Photography",
    seoDescription: "Wondering the best time of day for outdoor family photos? A Skokie photographer shares golden hour timing, summer tips, and North Shore session advice.",
    content: `
<p>If there's one question I get more than any other before a summer shoot, it's this: what's the best time of day for outdoor family photos? It's a great question, and the answer matters more than most people realize. You can pick the perfect outfits, choose a beautiful park, and have kids in genuinely good moods, but if we're standing in a field at high noon in July, the light will fight us the entire time. Get the timing right, and everything else falls into place. As a photographer who specializes in family and newborn sessions here in Skokie, timing is the very first thing I plan around, and I want to walk you through exactly how I think about it.</p>

<h2>Golden Hour Is the Best Time of Day for Outdoor Family Photos</h2>

<p>When people talk about the best time of day for outdoor family photos, they're usually describing golden hour without knowing the name for it. Golden hour is the stretch of time in the hour or so after sunrise and the hour before sunset, when the sun sits low in the sky. That low angle does something magical: it softens the light, warms up every skin tone, stretches shadows into something gentle instead of harsh, and wraps your family in a glow that's almost impossible to fake.</p>

<p>Here in the Chicago area during early July, the sun sets around 8:25 to 8:30 in the evening, which means I'll usually have families meet me around 7:00 p.m. for an evening session. That gives us a full window of that buttery, flattering light before the sun dips below the horizon. By contrast, if we shoot at 1:00 in the afternoon, the sun is directly overhead. That's when you get raccoon-eye shadows under everyone's brows, squinting kids, and blown-out bright spots that no amount of editing fully rescues. I know these summer skies well, and golden hour is where the best outdoor family photos live.</p>

<h2>When Early Morning Beats the Evening</h2>

<p>Golden hour isn't only an evening thing, and this is where a lot of families are surprised. Sunrise light is just as soft and beautiful as sunset light, and for certain families it's actually the better call. If you have little ones under about six, the evening golden hour can collide head-on with what parents affectionately call the witching hour, that stretch before bedtime when even the sweetest toddler starts to unravel.</p>

<p>Young kids tend to be at their absolute best first thing in the morning, well-rested and cheerful and ready to play. A session that starts around 7:30 or 8:00 a.m. can be a total game changer with a busy toddler or a fussy baby. Morning light along the Lake Michigan shoreline in Evanston is stunning, and there's an added bonus: parks and beaches are quiet and nearly empty at that hour, so we're not weaving around crowds or waiting for a stroller to clear the frame. When I'm helping a family with young children decide, I almost always float a morning session as a serious option.</p>

<h3>A Quick Note on Newborns</h3>

<p>Newborn sessions are the exception to all of this. Those are best done indoors in the first couple of weeks, where I can fully control the temperature and the light and keep your baby cozy and sleepy. If you're expecting, timing works differently, and I break down exactly when to schedule in my guide on <a href="/blog/when-to-book-newborn-photos-what-to-expect">the best time to book a newborn session</a>, so check that out if a little one is on the way.</p>

<h2>What About Overcast Days?</h2>

<p>Parents often panic when they see clouds in the forecast, but an overcast sky is honestly one of my favorite conditions to shoot in. Think of a thick layer of clouds as nature's giant softbox: it spreads the light evenly across everyone's face, erases harsh shadows, and lets us shoot comfortably even in the middle of the day. So if we've booked a mid-morning session in Wilmette and the sky turns gray, don't cancel on me. Some of the most tender, evenly lit family portraits I take happen under exactly those clouds. Bright, hazy overcast is a gift.</p>

<p>The time I genuinely steer families away from is that harsh midday window between roughly noon and 2:00 p.m. on a clear, cloudless day. The overhead sun is unforgiving, and while I can work with almost anything, I'd rather set us up to win from the start than spend the whole session chasing patches of shade.</p>

<h2>How Chicago's Seasons Shift the Best Time of Day</h2>

<p>One thing worth understanding is that the best time of day for outdoor family photos shifts with the calendar. Right now in the heart of summer, evening golden hour lands late, close to 7:00 or 7:30 p.m., which can be past a baby's bedtime. Come autumn, when the North Shore trees turn and everyone wants those warm fall tones, the sun sets much earlier, so a golden hour session might start at 5:00 p.m. or even 4:30. In the depths of a Chicago winter, sunset golden hour can arrive as early as 3:30 in the afternoon, which actually makes it very family-friendly for nap schedules.</p>

<p>This is exactly why I build every session around the sunset and sunrise times for that specific date rather than picking a generic hour. When you reach out about booking, one of the first things I'll do is look up the light for your preferred day and suggest a start time down to the minute. Beautiful <a href="/blog/outdoor-family-photo-locations-north-shore-chicago">locations across the North Shore</a> all photograph differently depending on when we arrive, and dialing in the timing is half the craft.</p>

<h2>So, When Should Your Family Book?</h2>

<p>If I had to sum it up simply: for most families with older kids, an evening golden hour session about an hour before sunset is the sweet spot for the best outdoor family photos. If you've got a toddler or a baby, lean toward early morning when their moods are sunniest and the parks are calm. On overcast days, we have flexibility to shoot almost anytime. And on a bright, clear day, we'll happily skip the harsh midday hours in favor of that soft, low, glowing light.</p>

<p>The truth is that no two families run on the same clock, and the best time of day for your outdoor photos depends on your kids, your routine, and the season we're shooting in. That's the part I love helping with. <a href="/contact">Tell me a little about your family</a> and the day you have in mind, and I'll map out the perfect window so all you have to do is show up and be together.</p>
`,
  },
  {
    slug: "engagement-photo-locations-north-shore-chicago",
    title: "The Best Engagement Photo Locations on Chicago's North Shore",
    excerpt: "You don't have to head downtown for stunning engagement photos. From Grosse Point Lighthouse and Gillson Park to the Chicago Botanic Garden and quiet Rosewood Beach, here are my favorite North Shore spots, and exactly why each one works.",
    date: "2026-07-20",
    category: "Locations",
    image: "/photos/engagement-ring-hands-reaching.jpg",
    seoTitle: "Engagement Photo Spots on the North Shore | Tovy Photography",
    seoDescription: "Engagement photo locations on Chicago's North Shore: lakefront, gardens, woods and neighborhood spots, with timing tips from a Skokie photographer.",
    content: `
<p>When couples ask me where to take their engagement photos, they almost always assume we need to head downtown. The Chicago skyline is gorgeous, no argument there, but as a photographer based in Skokie, I'm going to let you in on something: some of the most beautiful engagement photo locations in the Chicago area are right here on the North Shore, and most of them come without the crowds, the parking headaches, or the twelve other couples waiting for the same spot.</p>

<p>If you want lakefront light, historic architecture, and gardens that look straight out of a storybook, the North Shore delivers. Here are the spots I recommend most often, and exactly why each one works.</p>

<h2>Why Choose the North Shore for Your Engagement Photos?</h2>

<p>Beyond the obvious beauty, there's a practical reason I love shooting engagement sessions up here: flexibility. Downtown sessions require permits at many locations, tight timing, and a plan B for when a film crew takes over your spot. On the North Shore, we can move at your pace. We can start at a beach in Evanston, drive ten minutes, and finish in a completely different landscape in Wilmette, two totally distinct looks in one session.</p>

<p>The light is different, too. Along the lakefront from Evanston up through Glencoe, you get unobstructed eastern horizons. That means soft, glowing morning light over the water and rich golden-hour tones in the evening without skyscrapers throwing shadows across your photos.</p>

<h2>My Favorite Engagement Photo Locations, Town by Town</h2>

<h3>Grosse Point Lighthouse and Lighthouse Beach, Evanston</h3>

<p>This is the spot I suggest when couples tell me they want something that feels romantic and timeless. The lighthouse itself gives you that classic, storybook backdrop, and the surrounding gardens bloom beautifully from late spring through early fall. Walk five minutes and you're on the beach with open water behind you. I like to time sessions here for the last 90 minutes before sunset, when the light turns the sand and the lighthouse brick a warm honey color.</p>

<h3>Northwestern University Lakefill, Evanston</h3>

<p>The Lakefill is one of the only places in the suburbs where you can get the downtown Chicago skyline in your photos. It sits far enough south along the lake that the city appears right on the horizon. So if you want that skyline without actually going downtown, this is my go-to. Bonus: the campus itself has stone archways and ivy that photograph beautifully, especially in autumn.</p>

<h3>Gillson Park, Wilmette</h3>

<p>If I could only shoot engagement sessions in one park for the rest of my career, it might be Gillson. It has everything: a wide sandy beach, a tree-lined lagoon, open lawns, and winding paths under mature willows. It's also right next to the Baha'i House of Worship, whose white lacework dome makes one of the most striking architectural backdrops anywhere in Chicagoland. Many couples don't realize the temple gardens are open to visitors. A few frames there and your gallery instantly feels like a destination shoot.</p>

<h3>Chicago Botanic Garden, Glencoe</h3>

<p>This one requires a photography permit, so plan ahead, but it's worth every bit of the paperwork. With 385 acres of themed gardens, there's a backdrop for every season and every style: the rose garden in June, the Japanese garden's quiet bridges, the waterfall garden, the English walled garden. When couples want a "garden party" feel or plan to dress up a bit more formally, this is where I send them. If you love that lush conservatory look, take a peek at this <a href="/blog/garfield-park-conservatory-engagement-photos-chicago">Garfield Park Conservatory engagement session</a> for a feel of how greenery photographs.</p>

<h3>Rosewood Beach, Highland Park</h3>

<p>Rosewood is a quieter, more intimate beach than the bigger lakefront parks, tucked below wooded bluffs. The boardwalk that runs along the shore gives us leading lines and texture, and because it's less trafficked, it feels like a private stretch of coastline. It's my pick for couples who want their session to feel like just the two of them, because up here, it usually is.</p>

<h3>Downtown Highland Park and the Ravinia District</h3>

<p>Not every couple is a beach couple, and that's okay. If your idea of a perfect date is coffee, a bookstore, and a stroll past storefronts, downtown Highland Park has charming brick streetscapes and murals that make for relaxed, editorial-feeling photos. It's a great option for an "everyday us" session, the kind of photos that look like a really well-documented Saturday together.</p>

<h2>When Should You Schedule Your North Shore Engagement Session?</h2>

<p>Here's what I tell every couple: think about your light first and your outfit second. The hour after sunrise and the 90 minutes before sunset, golden hour, will flatter every skin tone and every location on this list. Midday works at the Botanic Garden or under Gillson's tree cover, but on open beaches it creates harsh shadows I'd rather help you avoid. I go deeper on this in my guide to <a href="/blog/best-time-of-day-outdoor-family-photos">the best time of day for outdoor photos</a>.</p>

<p>Season-wise, the North Shore truly has no bad month. Late spring brings blossoms to the lighthouse gardens, summer gives us warm beach evenings, October sets the lakefront bluffs on fire with color, and even winter sessions along an empty, snow-dusted beach have a quiet drama you can't get any other time of year.</p>

<p>If you're planning to use your photos for save-the-dates, work backward from your mailing date and give yourself at least six to eight weeks for the session, gallery delivery, and printing.</p>

<h2>A Few Tips Before Your Session</h2>

<p>Wear shoes you can walk in, and bring the fancy pair to change into. Several of these locations involve sand, grass, or gravel paths. Plan two outfits if you'd like variety; a session that moves from Gillson Park to the Baha'i Temple can easily support a casual look and a dressed-up one. And leave room in your timeline to simply be together. The best engagement photos I take are never the posed ones. They're the in-between moments when you forget I'm there.</p>

<p>I'm lucky to call this area home. From my home base in Skokie, every location on this list is within a 20-minute drive, and I know exactly where the light falls at each one, hour by hour. If you're dreaming about lakefront light, garden blooms, or a skyline on the horizon, <a href="/contact">get in touch</a> and let's find the spot that feels like <em>you</em>.</p>
`,
  },
];

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getAllCategories(): string[] {
  return [...new Set(blogPosts.map((p) => p.category))];
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
