# CLAUDE.md - Tovy Photography Project Context

## Quick Reference
- **Business:** Tovy Photography (Gabi Amrami)
- **Site:** https://tovyphotography.com
- **Local path:** /Users/gabiamrami/gabi-photography-site
- **Stack:** Next.js 16.1.7, React 19, TypeScript, Tailwind CSS v4, App Router
- **Hosting:** Vercel (project: gabi-photography-site, team: tovypics-4863s-projects)
- **DNS:** Cloudflare
- **Node.js:** /Users/gabiamrami/.local/node/bin (add to PATH)
- **GitHub:** https://github.com/tovypics-cell/gabi-photography-site

## Deploy Workflow
Vercel is linked to the GitHub repo (since 2026-09-17). **Merging a PR into `main` deploys to production automatically.** That is the normal publish path. Do not run manual deploys for content.

```bash
export PATH="/Users/gabiamrami/.local/node/bin:$PATH"
cd /Users/gabiamrami/gabi-photography-site
# Preview locally:
npm run dev
# Ship a change: commit on a branch, push, open a PR, Gabi merges. Vercel deploys main.
# Emergency manual deploy only (CLI is logged in on this Mac):
npx vercel deploy --prod --yes
```
No Vercel token is stored anywhere in this repo. Do NOT add one.

## Weekly Content Loop
A launchd job (`com.tovy.weekly-page`, Mondays 9:00) runs `scripts/weekly-page.sh`, which writes the next `"queued"` page from `content/queue.json` with `claude -p`, verifies the build, opens a PR on a `content/<slug>` branch, and texts Gabi. Publishing is Gabi merging that PR. Details:
- Plan and priorities: `content/seo-plan.md`. Queue order is the publish order.
- Writer rules: `scripts/weekly-page-prompt.md` (brand rules, answer-first format, no invented numbers, real locations only).
- `scripts/mark-published.sh` flips queue items to `"published"` once their PR is merged. It runs at the start of every weekly run.
- Private settings (iMessage number, Claude token) live in `~/.config/tovy-weekly/env`, not in git.
- Log: `~/Library/Logs/tovy-weekly-page.log`. Dry run: `scripts/weekly-page.sh --dry-run`.
- To skip or reorder a page, edit `content/queue.json` on a branch and merge it.

## Brand Identity
- **Tagline:** "Seeing the good in your world"
- **Voice:** Warm, emotional but not cheesy, calm, family-centered, natural, grounded, not salesy
- **Focus:** Family, newborn, milestone, and event photography
- **Service area:** Skokie, Evanston, Lincolnwood, Wilmette, Chicago North Shore
- **Email:** tovypics@gmail.com
- **Instagram:** @tovyphotography

## Brand Rules (STRICT)
- NO em dashes
- NO self-hype or braggy copy
- NO "link in bio" phrasing
- NO freelance-style copy without approval
- Do NOT claim experience at locations Gabi hasn't actually shot
- Prefer real photos over stock
- About page hero MUST stay solid rose pink - do not change it
- Use keyword-rich SEO when publishing galleries

## Visual Brand
- **Colors:** Cream #FAF9F6, Sage #9CA896, Rose #C4A39A, Charcoal #2B2B2B, White #FFFFFF
- **Fonts:** Cormorant Garamond (display), Montserrat (body)
- **Logo:** Text wordmark "Tovy Photography" in Cormorant Garamond

## Pricing (source of truth is sessions page code)
- Mini: $200 (30 min, 10 images)
- Classic: $325 (60 min, 20 images) - Most Popular
- Full: $500 (90 min, 30 images)
- Tailored: Custom (events/special occasions)

## Architecture
- Content is hardcoded in source files (no CMS)
- Gallery data: src/lib/gallery-data.ts
- Blog data: src/lib/blog-data.ts
- Client galleries: Vercel Blob storage (blob store: gabi-galleries)
- Contact form: Web3Forms (there's also an unused /api/contact route)
- Admin: PIN-based auth, env var ADMIN_PIN

## Key Files
- src/app/page.tsx - Homepage
- src/app/layout.tsx - Root layout
- src/app/globals.css - Global styles + brand colors
- src/lib/gallery-data.ts - All portfolio gallery content
- src/lib/blog-data.ts - All blog post content
- src/lib/client-galleries.ts - Client gallery logic (Vercel Blob)
- src/components/HeroSlideshow.tsx - Homepage hero
- src/components/Header.tsx - Navigation
- src/components/Footer.tsx - Footer
- src/components/ContactForm.tsx - Contact form (Web3Forms)

## Site Structure
### Public pages
- / (homepage)
- /about
- /sessions (pricing)
- /gallery, /gallery/[category], /gallery/[category]/[slug]
- /blog, /blog/[slug]
- /contact
- /testimonials (exists but not in nav or sitemap)
- /locations/[skokie|evanston|lincolnwood|wilmette]

### Admin
- /admin, /admin/galleries, /admin/galleries/[id]

### Client galleries
- /client-gallery/[id] (public by URL, not password protected, has expiry)

### Client gallery product section (album + gallery walls)
- A "Make your photos come to life" section with Custom Photo Album + Gallery Walls carousel shows by DEFAULT on every client gallery.
- DEFAULT for all new/future shoots: "Example Custom Photo Album" + "Example Gallery Walls" subtitles, 8x10 hardcover album, starting at $240. Standard album video and standard gallery wall slides.
- Per-gallery overrides live in src/app/client-gallery/[id]/page.tsx inside the products IIFE:
  - Legacy non-"Example" galleries (kept on prior copy): mluj1gve ($325, 10x10), 3myjm0yh ($160, 10x10, different video)
  - 3myjm0yh also uses its own gallery wall carousel slides (galleryWallSlides3myjm0yh)
  - 5xbsrns6: replaces standard section with its own album-only ($180) + custom newborn gallery walls
  - 9gy4ze1g: replaces standard section with the flipbook album ($160, 10x10)
- To exclude a future gallery from the default section entirely: add it to the `!(galleryId === "...")` check above the products `<section>`.
- To override price/dimensions/labels for a future gallery, edit the `isLegacy`, `albumPrice`, etc. lines.

### Client gallery product section (album + gallery walls)
- Standard "Make your photos come to life" section with Custom Photo Album ($325, 10x10) + Gallery Walls carousel shows by DEFAULT on every client gallery.
- Per-gallery overrides live in src/app/client-gallery/[id]/page.tsx:
  - 3myjm0yh: different album video, $160 price (still 10x10)
  - h58zetdo, yetewomt: "Example" prefix on subtitles, 8x10 album, $240 price
  - 5xbsrns6: replaces standard section with its own album-only ($180) + custom newborn gallery walls
  - 9gy4ze1g: replaces standard section with the flipbook album ($160, 10x10)
- To exclude a gallery from the default section: add it to the `!(galleryId === "...")` check above the products `<section>`.

## Known Issues / Tech Debt
1. Testimonials page not in nav or sitemap
2. Duplicate contact form implementations (Web3Forms + /api/contact)
3. Hardcoded fallback admin PIN - should be env-only
4. Location pages use placeholder heroes (no real photos yet)
5. Maternity not fully surfaced as its own service category
6. Cover image references can drift between gallery/homepage/category pages
7. Homepage JSON-LD hardcodes aggregate rating 5 / 25 reviews - verify accuracy
8. /og-image.jpg may not exist in public/
9. Some old copy still contains em dashes

## Image/Cover Notes
- When changing covers, audit: gallery page, category page, homepage tile, hero, dedicated cover files
- Cache-busted cover files (cover-home.jpg, cover-bench.jpg, etc.) are the standard
- Gallery admin supports cover crop position: top/center/bottom
- stolberg-bar-mitzvah is the active folder; stoberg-bar-mitzvah is likely an old typo copy

## How Gabi Works
- Visual direction matters a lot
- Exact photo selection and cover choice matter
- She notices crop issues quickly
- Prefers concrete changes over abstract branding talk
- Wants tasteful, emotionally resonant copy

## Business Priorities (in order)
1. Google Business Profile + reviews
2. Warm outreach
3. Instagram
4. Blog / SEO

## Env Vars Needed
- BLOB_READ_WRITE_TOKEN (Vercel Blob for client galleries)
- ADMIN_PIN (admin authentication)

---

# Operational Playbooks

## Playbook: Adding a New Portfolio Gallery

1. Get the final approved photo set. Do not publish partials unless Gabi says so.
2. Confirm the category: Newborn, Family, Milestone, or Event.
3. Create folder: `public/photos/<session-slug>/`
4. Name files:
   - Gallery images: `01.jpg`, `02.jpg`, `03.jpg`, etc.
   - Cover image: `cover-<descriptor>.jpg` (e.g., `cover-home.jpg`)
   - IMPORTANT: When swapping a cover, always create a NEW filename to bust cache.
5. Image sizing: JPG, long side ~2048px, reasonable file size. No automated script exists for public images.
6. Pick the strongest image as cover (not necessarily the first image).
7. Edit `src/lib/gallery-data.ts` -- add a Shoot object with:
   - `slug`: lowercase, hyphenated, location + session type
   - `title`: natural, keyword-rich, not spammy
   - `description`: one sentence with session type + location + visual tone
   - `category`: exact match to one of the four categories
   - `coverImage`: path to the cover file
   - `images`: array of `{ src, alt }` objects
8. Order images intentionally -- strongest 5-7 first. Follow Gabi's preferred order if given.
9. Write alt text per image: subject + action/moment + setting. Describe the real image, include keywords naturally.
10. What auto-updates from gallery-data.ts:
    - /gallery, /gallery/[category], /gallery/[category]/[slug]
    - Sitemap entries
    - ImageGallery JSON-LD
11. What does NOT auto-update:
    - Homepage category cards in `src/app/page.tsx` (hardcoded src/alt) -- update manually if needed
    - Hero slideshow in `src/components/HeroSlideshow.tsx` -- add slide object if needed (with objectPosition for crop control)
12. Build locally (`npm run build`), fix any errors, then deploy.
13. Verify live: individual session page, category grid, /gallery, homepage if touched.
14. Push to GitHub after confirmed live.

## Playbook: Publishing a New Blog Post

1. Start with one primary keyword target based on: real sessions/locations, real client questions, or service+location queries.
2. Choose the angle: location post, FAQ/advice, seasonal search, or session recap.
3. Pick or create the featured image (goes in `image` field).
4. Edit `src/lib/blog-data.ts` -- add a BlogPost object with:
   - `slug`: lowercase, hyphenated, keyword-first
   - `title`: on-page H1, natural and readable
   - `seoTitle`: separate from title, include business name when helpful
   - `excerpt`: card summary for blog index
   - `seoDescription`: more keyword-explicit and conversion-aware than excerpt
   - `date`: YYYY-MM-DD
   - `category`: e.g., Maternity, Family, Newborn, etc.
   - `image`: path to featured image
   - `content`: raw HTML string (NOT Markdown). Use `<p>`, `<h2>`, `<h3>`, `<ul>`, `<li>`, `<a href>`
5. Include 2-4 internal links naturally: matching gallery, /contact, /sessions, /testimonials, related blog posts.
6. Keyword placement: slug, title, seoTitle, seoDescription, first paragraph, at least one h2.
7. Auto-generated from blog-data.ts: title, meta description, canonical, OG fields, BlogPosting JSON-LD, sitemap entry. No manual sitemap edit needed.
8. Build, deploy, verify /blog and /blog/[slug].

## Playbook: Client Gallery Delivery

> **DECISION (July 2026):** New shoots are delivered via **Pixieset**, not the website's client-gallery system. The custom system stays live (Vercel Pro, upgraded July 2026 after the blob store was suspended for exceeding free-tier usage) only so previously delivered gallery links keep working. Do not build new features on the custom client-gallery system without asking Gabi.
> Blob usage caution: one full gallery is ~200MB; the July 2026 suspension was caused by monthly transfer/ops limits on the Hobby plan, not storage. If Gabi asks to downgrade later, archive/retire the blob galleries first.

1. Login at /admin (PIN-based auth via ADMIN_PIN env var, stored in cookie for 30 days).
2. Create gallery at /admin/galleries: clientName (required), clientEmail (optional), sessionDate (required), sessionType (required), message (optional). Types: Family, Newborn, Milestone, Event, Mini, Maternity.
3. Default expiration: 90 days.
4. Upload photos via drag-and-drop or file picker. Accepted: JPG, PNG, WEBP, HEIC, HEIF (up to 20MB).
   - Auto-resize: files over 3MB get resized to max 2400px, JPEG quality 0.85.
   - Storage: Vercel Blob at `galleries/<galleryId>/<photoId>.<ext>`
   - First photo auto-becomes cover if none set.
5. Set cover image (hover photo, click "Set Cover").
6. Set hero crop position: top / center / bottom.
7. Preview as client before sending.
8. Verify: correct hero photo, crop looks right, message is clean, downloads work, favorites work, review button visible.
9. Copy link: `https://tovyphotography.com/client-gallery/<id>`
10. Default client message template:
    "Hi [Name], your gallery is ready! Here's your link: [URL]. You can download the full gallery, mark favorites, and share individual photos. The gallery will stay up for 90 days, so make sure to download everything before it expires."
11. Extend/reactivate: +30d / -30d buttons from /admin/galleries.
12. Metadata uses versioned writes + pointer file (`galleries/_pointer.txt`) to bust stale cache.

## Playbook: Instagram Captions

- Voice: warm, personal, reflective, grounded, emotional without cheesy, not salesy, no em dashes, no self-hype
- Structure: Line 1 emotional hook -> Lines 2-4 short story/feeling -> Final line soft CTA
- Soft CTA examples: "If you've been thinking about booking a session, feel free to reach out." / "If this feels like your kind of session, I'd love to plan one with you."
- AVOID: BOOK NOW, LIMITED SPOTS, DM ASAP, fake urgency
- Hashtags: 4-8 relevant tags. Mix service type + location + local audience + content type.
  Example: #skokiephotographer #northshorephotographer #familyphotography #chicagofamilyphotographer #lifestylephotography
- Anchor session-based posts to one real thing Gabi noticed (a look, gesture, location, family dynamic).

## Playbook: Google Business Profile Posts

- Format: Line 1 seasonal/local hook -> Line 2 session type -> Line 3 one emotional/practical benefit -> Final line CTA
- Use one strong, clean, bright image with immediate emotional clarity (proven cover images work best).
- CTA button: "Book" -> link to /contact (or specific session/location page).
- Frequency: ~1 post per week.
- Topics: spring sessions, mini sessions, seasonal family sessions, location spotlight, newborn availability, recent favorite session.

## Playbook: Warm Outreach

- Keep it personal, light, short. Not a campaign blast.
- Past client template: "Hi [Name], I was thinking of you guys because I'm opening up [spring/mini] sessions and your family immediately came to mind. If you've been wanting updated photos, I'd love to do something beautiful and easy for you. No pressure at all."
- Referral template: "Hi [Name], I'm booking a few [family/newborn] sessions right now. If anyone comes to mind who's been meaning to do photos, I'd be so grateful if you passed my name along."
- Rules: no fake urgency, no long intros, no corporate voice, no guilt language, no mass-blast feel.

## Playbook: SEO Checklist for New Content

1. For galleries: verify slug, title, description, every image alt, coverImage in gallery-data.ts.
2. For blog posts: verify slug, title, excerpt, seoTitle, seoDescription, image, internal links.
3. Structured data is auto-generated for blog posts (BlogPosting) and galleries (ImageGallery). Homepage LocalBusiness JSON-LD is hardcoded -- only update for business-level changes.
4. Sitemap auto-includes blog posts and gallery shoots. Does NOT auto-include new route types.
5. Post-deploy QA: check page title in browser tab, first paragraph includes topic, featured image resolves, internal links work, page appears in /sitemap.xml.

## Image Naming Conventions

- **Gallery images**: `public/photos/<session-slug>/01.jpg`, `02.jpg`, etc.
- **Cover images**: `public/photos/<session-slug>/cover-<descriptor>.jpg`
- **Hero images**: `public/photos/hero-<descriptor>.jpg` (top-level)
- **Reusable images**: `public/photos/<descriptive-name>.jpg` (top-level)
- Public site: JPG, long side ~2048px
- Client gallery uploads: auto-resized if >3MB to max 2400px, JPEG quality 0.85
- CRITICAL: Never reuse a cover filename when swapping. Always create a new filename.

## Common Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| Wrong cover shows live | Stale cache or second hardcoded ref | New cover filename + update all refs |
| Category page right, homepage wrong | Homepage cards hardcoded in page.tsx | Update src/alt in page.tsx |
| Hero crops face on mobile | Wrong objectPosition | Edit HeroSlideshow.tsx, add objectPosition |
| Client gallery dates off by one | Naive date parsing | Use parseDateOnly()/formatDateOnly() from src/lib/date.ts |
| Client uploads failing | File too large | Already mitigated (auto-resize >3MB) |
| Stale client gallery metadata | Cache issue | Versioned metadata + pointer file handles this |
| Code right but wrong photo live | Multiple refs or stale asset | Verify actual rendered path, find extra reference |

## Content Reuse Strategy

Best workflow for each new session:
1. Publish gallery session on the site
2. Reuse for a blog post
3. Reuse one image for GBP post
4. Reuse a few images/copy angles for Instagram
This keeps content real and on-brand.

## Weekly Rhythm

- 1 GBP post per week
- 1-2 blog posts per week (when real material exists)
- ~5 warm outreach touches per week
- Keep Instagram moving with real session-based posts
- Respond to new Google reviews
- Maintain local listings (Yelp, Bing Places, Apple Maps)
