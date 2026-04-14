# Tovy Photography Agent Handoff Document

This document is based on direct repo inspection plus prior working memory from the project. If something is marked “not found” or “unconfirmed,” that means I did not find reliable evidence for it in the codebase or saved notes.

## 1. Business Overview

### Business identity
- **Business name:** Tovy Photography
- **Primary tagline:** “Seeing the good in your world”
- **Core positioning:** Natural light, gently guided photography for meaningful family moments
- **Primary focus:** Family, newborn, milestone, and event photography
- **Secondary/partial focus:** Maternity is clearly part of the brand and content strategy, but it is not fully built out as a dedicated public service category everywhere on the site

### Brand voice and tone
The voice currently used across the site is:
- warm
- emotional but not cheesy
- calm
- family-centered
- natural and grounded
- reflective
- not salesy
- not overly polished/corporate
- focused on real moments, memory, tenderness, everyday beauty

Common phrases/themes:
- “real moments”
- “natural light”
- “gently guided”
- “calm, playful”
- “slowing down for the moments that move too fast”
- “capture how it felt”

### Target audience
Primary audiences appear to be:
- families with young children
- new parents
- expecting mothers / maternity clients
- families booking milestone sessions
- families booking Jewish lifecycle/event coverage like Bar Mitzvahs
- North Shore / near-Chicago families who want lifestyle-style photography, especially in-home sessions

### Areas served
Confirmed service areas across site copy and SEO pages:
- Skokie
- Evanston
- Lincolnwood
- Wilmette
- Chicago
- Chicago’s North Shore

Also mentioned on the contact page:
- Morton Grove
- Niles
- Glenview
- Highland Park
- greater Chicago

### Brand guidelines currently in use
Confirmed preferences and rules:
- **No em dashes**
- **No self-hype**
- **No freelance-style copy without approval**
- **No “link in bio” phrasing**
- **Do not claim experience at locations unless Gabi has actually shot there**
- **Prefer real photos over stock**
- **About page hero must stay solid rose pink** and was explicitly marked “don’t change it back”

### Visual brand system
From `globals.css` and layout:

**Colors**
- Cream: `#FAF9F6`
- Sage: `#9CA896`
- Sage dark: `#7A8C72`
- Rose: `#C4A39A`
- Rose dark: `#A8877E`
- Charcoal: `#2B2B2B`
- Charcoal light: `#4A4A4A`
- White: `#FFFFFF`

**Fonts**
- Serif display: **Cormorant Garamond**
- Sans/body: **Montserrat**

### Logo / wordmark
- I did **not** find a dedicated logo asset in `public/`
- The site currently uses a **text wordmark**: “Tovy Photography”
- Header/footer wordmark styling uses **Cormorant Garamond**
- If a formal logo exists elsewhere, it is not present in the repo I inspected

---

## 2. Website, Technical Details

### Domain and infrastructure
- **Live domain:** `tovyphotography.com`
- **Canonical base URL:** `https://tovyphotography.com`
- **Hosting:** Vercel
- **DNS/domain management:** Cloudflare
- **SSL:** likely handled through Vercel/Cloudflare standard setup, but cert specifics were not documented

### DNS details currently known
Previously documented:
- A record points to `76.76.21.21`
- `www` CNAME points to `cname.vercel-dns.com`
- Cloudflare proxy was noted as **OFF** when this was set up

### Stack
- **Framework:** Next.js 16.1.7
- **React:** 19.2.3
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Architecture:** App Router
- **CMS:** none
- **Content storage:** mostly hardcoded in source files, plus Vercel Blob for client galleries

### Key repo-level technical facts
- `next.config.ts` is basically empty/default
- `README.md` is still the default create-next-app README
- There is no real internal documentation inside the repo yet for architecture, deployment, or editorial workflow

### Third-party services connected
Confirmed in code/memory:
- **Vercel**: site hosting and deployment
- **Cloudflare**: DNS/domain management
- **Web3Forms**: contact form submissions
- **Vercel Blob**: client gallery image storage and gallery metadata storage
- **Instagram**: linked account `@tovyphotography`
- **Google reviews / GBP review link**: used in gallery workflow

### Not found in codebase
I did **not** find evidence of:
- Google Analytics
- Google Tag Manager
- Meta Pixel / Facebook Pixel
- Plausible
- Umami
- Stripe
- Calendly
- Acuity
- Mailchimp
- ConvertKit
- newsletter tooling
- Pixieset
- Pic-Time
- ShootProof
- public booking platform
- public CRM integration
- payment processor integration

### Contact system
There are **two** contact implementations:
1. **Live page behavior:** `ContactForm.tsx` posts directly to **Web3Forms**
2. There is also a local API route at `/api/contact`

Important nuance:
- The contact form page appears to use Web3Forms directly, not the internal API route
- The internal API route may be leftover / unused
- This should be cleaned up to avoid duplicate implementations

### Client gallery system
Custom-built and live. Features confirmed:
- admin login
- gallery creation
- photo upload
- client-side image resize before upload
- batch photo registration
- public gallery view by ID
- favorites
- share
- download all
- download favorites
- slideshow
- cover photo selection
- cover crop position control (`top`, `center`, `bottom`)
- expiration handling
- review CTA

### Client gallery storage architecture
Uses **Vercel Blob** with a versioned metadata approach:
- photo blobs stored under gallery paths
- metadata stored as JSON blobs
- pointer blob pattern used to point to current metadata version
- done to avoid stale cache issues

### Security / auth details
Confirmed:
- admin area uses a PIN-based auth flow
- PIN is stored in cookie after login
- env vars used include:
  - `BLOB_READ_WRITE_TOKEN`
  - `ADMIN_PIN`

Important risk:
- the code contains a hardcoded fallback admin PIN if env is missing
- new agent should remove fallback behavior and require env-only auth

### Deployment process
Documented deploy process:
- `cd gabi-photography-site && npm run build && npx pm2 restart gabi-photo && npx vercel --yes --prod`

Other deployment notes:
- local preview/server also runs via **pm2** as `gabi-photo`
- prior memory also references a preview/tunnel workflow tied to local port 3333
- Vercel project noted in memory: `gabi-photography-site` under `tovypics-4863s-projects`

---

## 3. Website, Content & Structure

### Current primary navigation
Header nav:
- Home (`/`)
- About (`/about`)
- Sessions & Pricing (`/sessions`)
- Gallery (`/gallery`)
  - Newborns (`/gallery/newborn`)
  - Families (`/gallery/family`)
  - Milestones (`/gallery/milestone`)
  - Events (`/gallery/event`)
- Blog (`/blog`)
- Contact (`/contact`)

Footer includes:
- About
- Sessions
- Gallery
- Blog
- Contact
- location links for Skokie / Evanston / Lincolnwood / Wilmette

### Important note about hidden/non-nav pages
There is also a public **Testimonials** page:
- `/testimonials`

It is:
- linked from the homepage
- **not** in the main nav
- **not** in the sitemap generator

### Full public sitemap and page descriptions

#### Core pages
- `/`
  - Homepage
  - Main brand positioning, hero slideshow, session previews, testimonials preview, about preview, pricing preview, CTA

- `/about`
  - About Gabi page
  - Bio, philosophy, process, CTA
  - Rose hero section with no image

- `/sessions`
  - Service overview and pricing page
  - Session type sections plus package cards

- `/gallery`
  - Portfolio landing page
  - Links into category galleries and individual sessions

- `/blog`
  - Blog index
  - Category filtering via client-side component

- `/contact`
  - Lead capture page with form, service area info, quick facts

- `/testimonials`
  - Full review/testimonial page
  - Public, but underlinked compared to core pages

#### Gallery category pages
- `/gallery/family`
- `/gallery/newborn`
- `/gallery/milestone`
- `/gallery/event`

Each category page has:
- category-specific metadata
- intro copy
- session grid
- CTA

#### Live individual gallery/session pages
From `gallery-data.ts`, these are currently live:

**Family**
- `/gallery/family/west-rogers-park-9-month-family-session`
- `/gallery/family/glickman-family-skokie-library`

**Newborn**
- `/gallery/newborn/cooper-family-welcome-baby-billie`
- `/gallery/newborn/nemsick-family-welcome-baby-henry`
- `/gallery/newborn/hoffman-family-welcome-baby-ava`

**Milestone**
- `/gallery/milestone/garfield-park-conservatory-engagement`
- `/gallery/milestone/shilo-3rd-birthday-upshirin`

**Event**
- `/gallery/event/stolberg-bar-mitzvah-noam`

#### Blog posts currently published
- `/blog/when-to-book-newborn-photos-what-to-expect`
- `/blog/what-to-wear-family-photo-session`
- `/blog/best-family-photo-locations-skokie-north-shore`
- `/blog/maternity-photos-when-to-book-what-to-wear`

#### Location SEO pages
- `/locations/skokie`
- `/locations/evanston`
- `/locations/lincolnwood`
- `/locations/wilmette`

These are strong local SEO pages with:
- custom local copy
- landmark lists
- service previews
- CTA

Important issue:
- the hero sections currently use placeholder hero labels, not real location hero images

#### Client gallery pages
- `/client-gallery/[id]`

These are public-by-ID private-ish delivery pages.
They are **not password protected**.
They rely on:
- obscurity of the ID URL
- expiration date
- robots exclusion

#### Admin pages
- `/admin`
- `/admin/galleries`
- `/admin/galleries/[id]`

These are intentionally blocked from indexing.

### API routes
Confirmed:
- `/api/contact`
- `/api/galleries/[id]`
- `/api/admin/galleries`
- `/api/admin/galleries/[id]`
- `/api/admin/galleries/[id]/photos`

### SEO setup
Global metadata includes:
- metadataBase: `https://tovyphotography.com`
- default title
- title template
- default description
- Open Graph defaults
- Twitter card
- robots index/follow

### Robots configuration
Confirmed disallow rules:
- `/admin`
- `/client-gallery`
- `/api/admin`

Sitemap URL:
- `https://tovyphotography.com/sitemap.xml`

### Structured data currently in use
- **Homepage:** `LocalBusiness` + `Photographer`
- **About:** `Person`
- **Sessions:** `Service` + `OfferCatalog`
- **Blog posts:** `BlogPosting`
- **Gallery session pages:** `ImageGallery`
- **Location pages:** `LocalBusiness`

### SEO titles/descriptions by page type
Patterns currently used:

- **Home:** “Tovy Photography | Skokie Family & Newborn Photographer”
- **About:** “About Gabi, Skokie Family Photographer”
- **Sessions:** “Sessions & Pricing, Skokie Family, Newborn & Maternity Photographer | Tovy Photography”
- **Gallery landing:** portfolio language for family/newborn/event/milestone photography
- **Category pages:** keyword-rich titles like “Family Photography Gallery, Skokie IL Family Photographer”
- **Blog posts:** keyword-specific SEO titles and descriptions
- **Location pages:** city + service combo, like “Skokie Family & Newborn Photographer”
- **Contact:** booking/contact language for Skokie + North Shore
- **Testimonials:** review/social proof language

### Keyword strategy actually present
No `meta keywords` tags were found.
SEO is being handled through:
- titles
- meta descriptions
- slugs
- internal linking
- alt text
- structured data
- location pages
- blog content

Examples of keyword targeting:
- newborn booking timing
- what to wear for family photos
- spring family photo locations
- maternity photos timing and clothing
- Skokie family photographer
- North Shore family photographer
- in-home newborn sessions

### Funnels / conversion paths
Main funnel paths currently in use:
- Home → Sessions → Contact
- Home → Gallery → Contact
- Blog post → Sessions / Testimonials / Contact
- Location page → Sessions / Contact
- Gallery session page → Contact
- Client gallery → review CTA / downloads / favorites

### A/B tests or experiments
I found **no formal A/B testing setup**.

What is happening instead:
- manual cover image swaps
- manual homepage hero slide changes
- SEO-focused publishing and iteration
- manual CTA/copy refinement

---

## 4. Services & Pricing

### Publicly offered services
Confirmed service types:
- Newborn Session
- Family Session
- Milestone Session
- Event Session
- Tailored / Custom Session
- Maternity is present in metadata/blog/admin options, but not fully surfaced as its own top-level public service card everywhere

### Package pricing currently on site

#### Mini Session
- **Price:** $180
- **Includes:**
  - 30-minute session
  - one location
  - 15+ edited digital images
  - online gallery
  - full rights to print and share

#### Classic Session
- **Price:** $250
- **Includes:**
  - 60-minute session
  - one location
  - 30+ edited digital images
  - online gallery
  - full rights to print and share
  - wardrobe guidance
- Marked as **Most Popular**

#### Full Session
- **Price:** $375
- **Includes:**
  - 90-minute session
  - one location
  - 45+ edited digital images
  - online gallery
  - full rights to print and share
  - wardrobe guidance
  - location scouting

#### Tailored Session
- **Price:** Custom
- **Includes:**
  - events & special occasions
  - custom duration
  - multiple locations
  - custom gallery
  - full rights to print and share
  - “Let’s chat about your vision”

### Service positioning by type
- **Newborn:** in-home, calm, gentle, no need to pack up and leave home
- **Family:** in-home or favorite outdoor spot, playful and natural
- **Milestone:** maternity, birthdays, first steps, graduations, etc.
- **Event:** Bar Mitzvahs, Upshirins, celebrations
- **Maternity:** clearly part of the content strategy, but currently underrepresented in public package display

### Turnaround promises
Confirmed public promises:
- contact reply: **24 to 48 hours**
- gallery delivery: **2 to 3 weeks**
- digital files included

### Seasonal or promotional pricing
I found **no formal seasonal pricing**, discount system, coupon system, or promo code flow.

### Pricing presentation across the site
Pricing is shown in multiple places:
- homepage: “Sessions start at $180”
- sessions page: full package cards
- contact page quick facts
- location pages: “Sessions start at $180”
- blog copy references newborn/session pricing contextually

### Important pricing mismatch to know
Memory from earlier notes said:
- Mini: 15 to 20 images

Current live package card says:
- Mini: **15+ images**

For handoff purposes, the **site code is the current source of truth** unless Gabi says otherwise.

---

## 5. Assets Inventory

### Where assets live

#### Static portfolio assets in repo
Main folder:
- `public/photos`

There are also session-specific subfolders inside `public/photos/`.

#### Cloud-based delivery assets
Client galleries are stored in:
- **Vercel Blob**
- Blob store name noted in memory: `gabi-galleries`

### Static asset folders currently present
Confirmed subfolders:
- `public/photos/cooper-family`
- `public/photos/garfield-park-conservatory-engagement`
- `public/photos/glickman-family`
- `public/photos/hoffman-family`
- `public/photos/nemsick-family`
- `public/photos/shilo-upshirin-birthday`
- `public/photos/stoberg-bar-mitzvah`
- `public/photos/stolberg-bar-mitzvah`
- `public/photos/west-rogers-park-9-month-family`

### Important asset note
- `stolberg-bar-mitzvah` is the one actively referenced in live code
- `stoberg-bar-mitzvah` exists in `public/photos` but is **not** currently used in `gallery-data.ts`
- This may be an old/typo/staging asset folder and should be reviewed

### Standalone photo assets in `public/photos`
Confirmed examples:
- `gabi-portrait.jpg`
- `newborn-sleeping-headband.jpg`
- `newborn-skyline.jpg`
- `newborn-hand-bw.jpg`
- `family-bed-portrait.jpg`
- `family-plaza-swinging.jpg`
- `birthday-cake-candles.jpg`
- `hero-engagement-lift.jpg`
- `hero-family-baby-smile.jpg`
- `boy-curtain-window.jpg`
- `parents-newborn-window.jpg`
- and other generic hero / editorial images

### Naming conventions in use
Patterns observed:
- numbered sequence files: `01.jpg`, `02.jpg`, etc.
- descriptive sequence files: `01-mom-baby-bed.jpg`
- cover files: `cover-home.jpg`, `cover-bench.jpg`, `cover-couple-lift.jpg`, `cover-ring.jpg`
- hero files: `hero-engagement-lift.jpg`, `hero-family-baby-smile.jpg`

### Why cover files matter
Cover images were intentionally moved to cache-busted dedicated files because stale image caching caused wrong covers to persist after deploys.

### Live portfolio/session galleries currently on site
From live code:
- West Rogers Park in-home family session
- Glickman family session
- Cooper family newborn
- Nemsick newborn
- Hoffman newborn
- Garfield Park Conservatory engagement
- Shilo birthday / Upshirin
- Stolberg Bar Mitzvah

### Client delivery galleries
Separate from public portfolio.
These are dynamically generated under `/client-gallery/[id]`.

Features include:
- cover image
- favorites
- share
- download all
- download favorites
- slideshow
- expiration

### Client gallery organization model
Each gallery stores:
- client name
- session date
- session type
- optional client email
- optional message
- expiration date
- photos array
- cover photo ID
- cover position

### Upload / processing workflow
On admin upload:
- browser resizes large images client-side if file is large
- target max dimension is about 2400px
- converted/compressed to JPEG when resized
- uploaded to Vercel Blob
- then batch-registered to metadata

This exists specifically to avoid Vercel request body limits and improve reliability.

### Watermarking / post-processing
I found **no watermarking system** in code.
I also found **no Lightroom / editing workflow documentation** in this repo.

### CDN / caching behavior
- Vercel image optimization is in play via Next/Image for many public assets
- stale cache issues have happened before
- dedicated cache-busted cover files were introduced to fix incorrect cover persistence
- memory also notes that clearing `.next/cache/images` mattered in local preview workflows

### Missing asset/documentation items
I did **not** find:
- formal brand asset folder
- logo package
- watermark assets
- media usage guide
- export preset documentation
- photo naming SOP doc

---

## 6. Client & Business Workflows

### Inquiry to booking flow
Current website-supported flow is:

1. visitor opens `/contact`
2. fills out contact form with:
   - first name
   - last name
   - email
   - phone
   - session type
   - message
3. form submits through Web3Forms
4. message is sent to Gabi’s contact email (`tovypics@gmail.com`)
5. follow-up appears to be manual outside the website

### What is not on the site
I found **no** built-in:
- availability calendar
- instant booking
- payment checkout
- contract signing
- scheduling automation
- invoice flow
- CRM pipeline
- automated nurture sequence

### Contact form behavior
- success message promises response within 24 to 48 hours
- fallback tells user to email directly if form fails

### Delivery workflow
Custom client gallery flow:

#### Admin side
- login at `/admin`
- create gallery
- optional client email and personalized message
- upload photos
- set cover
- set cover crop position
- copy client link
- extend expiration
- delete gallery
- preview client page

#### Client side
- opens unique gallery URL
- can favorite photos
- can share photos
- can download single photos
- can download all photos
- can download favorites
- can view slideshow
- sees optional personalized message
- can hit Google review CTA

### Expiration rules
- default gallery expiration: **90 days**
- can be extended from admin
- expired galleries stop resolving publicly

### Privacy model for client galleries
Important:
- galleries are **not password protected**
- access is URL-by-ID
- robots blocks indexing
- expiry helps limit access window

If a more private workflow is desired, this is an area for future enhancement.

### Favorites behavior
- favorites are stored in **localStorage**
- they are device/browser-specific
- they do not sync server-side

### Contracts / agreements
I found **no contracts, legal packet, or agreement workflow** in the repo.

### Email templates
I found **no email template system** in the site code.
The only written outbound marketing copy I found in memory was:
- one Instagram caption draft
- some manual marketing/to-do planning

### CRM / client tracking
I found **no CRM connected** to this site.

Client info stored in gallery admin is minimal:
- client name
- optional email
- session date
- session type
- message

That is not a full CRM.

### Automations currently present
Confirmed automations:
- contact form delivery via Web3Forms
- client-side image resize before upload
- batch metadata write for uploaded gallery photos
- gallery expiration handling
- download favorites flow
- Google review CTA in client gallery
- blog filtering on blog index

Not found:
- automated follow-up emails
- booking confirmations
- reminder sequences
- payment reminders
- review request automation beyond the gallery CTA

---

## 7. Current State of Work

### What I was last working on
Most recently, the work centered on:
- publishing/updating new portfolio galleries
- fixing client gallery UX
- fixing gallery date display
- adjusting homepage hero/cover images
- now producing this handoff export

### Recently completed work
Confirmed from recent memory:
- fixed timezone/date-display bug for saved gallery dates
- changed client gallery grid to uniform same-size tiles
- added **Download Favorites**
- made favorite/share controls visible on mobile
- published West Rogers Park family session
- published Garfield Park Conservatory engagement session
- corrected multiple cover-image mismatches
- updated homepage Milestones tile to use the correct Garfield Park cover
- updated hero slideshow order to include two new hero images
- adjusted hero image object position so baby’s head does not crop off

### In-progress / partially complete
Items that still appear active or unresolved:
- a newer family gallery upload request was noted as pending until Gabi says “go” and sends remaining images
- stock blog image replacement is still pending once real spring photos are available
- broader marketing/distribution work remains incomplete
- local repo is not clean, so some changes may be local-only or mixed with unrelated workspace edits

### Current repo status
Current `git status --short` in `gabi-photography-site` shows uncommitted changes, including:
- modified:
  - `src/app/admin/galleries/[id]/page.tsx`
  - `src/app/admin/galleries/page.tsx`
  - `src/app/client-gallery/[id]/page.tsx`
  - `src/app/page.tsx`
  - `src/components/HeroSlideshow.tsx`
  - `src/lib/gallery-data.ts`
- untracked:
  - `public/photos/garfield-park-conservatory-engagement/`
  - `public/photos/hero-engagement-lift.jpg`
  - `public/photos/hero-family-baby-smile.jpg`
  - `public/photos/west-rogers-park-9-month-family/`
  - `src/lib/date.ts`

Important nuance:
- some of these changes may already be live because the deploy workflow can happen from a dirty working tree
- do not assume git cleanliness equals live status

### Known bugs / issues / technical debt

#### 1. Testimonials page underwired
- public page exists
- not in main nav
- not in sitemap generator

#### 2. Contact implementation duplication
- `ContactForm.tsx` posts directly to Web3Forms
- `/api/contact` also exists
- this is duplicated architecture and should be unified

#### 3. Security cleanup needed
- code contains fallback admin PIN logic if env is missing
- should be env-only
- contact/Web3Forms implementation should be reviewed for exposure and simplified

#### 4. Location pages use placeholder hero blocks
- no real hero photos for location landing pages yet

#### 5. Maternity positioning is inconsistent
- included in blog and metadata
- included in admin session types
- mentioned in sessions metadata
- but not fully represented as a clear public gallery/service category

#### 6. Cover references can drift
- cover images are sometimes referenced in multiple places
- changing a gallery cover does not always update every homepage/category reference automatically
- this has already caused visible confusion

#### 7. Possible SEO/schema accuracy issue
Homepage JSON-LD hardcodes:
- aggregate rating = 5
- review count = 25

That should be verified for truthfulness/compliance before leaving it live.

#### 8. Possible OG image issue
Global metadata references `/og-image.jpg`, but I did not see that file during inspection. Verify that it actually exists in `public/`.

#### 9. Style consistency issue
Even though “no em dashes” is a strong preference, some existing code/content still contains them. Older copy likely needs a cleanup pass.

### Planned / likely next changes
Based on notes and open patterns:
- more gallery publishing
- more keyword-rich SEO around new sessions
- replace temporary/stock images with real work
- expand marketing channels
- continue GBP / reviews / outreach work
- possibly strengthen gallery privacy/auth
- possibly clean up maternity offer positioning

### Upcoming deadlines / commitments
I did not find hard dated deadlines inside this repo.
The closest thing to recurring commitments is the marketing checklist:
- weekly GBP post
- review responses
- 1 to 2 blog posts per week
- 5 warm outreach touches per week

---

## 8. Accounts & Integrations

Per your instruction, this excludes passwords and secret keys.

### Domain / infrastructure
- **Cloudflare**: manages `tovyphotography.com`
- **Vercel**: hosts the site
- **Vercel project/team identifier noted in memory:** `gabi-photography-site` under `tovypics-4863s-projects`

### Email / contact
- **Gmail:** `tovypics@gmail.com`
- **Web3Forms:** used for website contact submissions

### Social / public profiles
- **Instagram:** `@tovyphotography`
- **Google Business / Google reviews:** review link is integrated into client gallery flow

### Storage / media
- **Vercel Blob:** used for client galleries
- Blob store name noted in memory: `gabi-galleries`

### Local hosting / preview
- **pm2 process:** `gabi-photo`
- prior memory also references a local preview/tunnel workflow through Cloudflare

### Not currently connected, based on code inspection
- Google Analytics
- Google Tag Manager
- Meta Pixel
- Mailchimp
- ConvertKit
- Stripe
- Calendly
- Acuity
- Pixieset
- Pic-Time
- ShootProof
- CRM integration
- newsletter platform

---

## 9. Content Calendar & Marketing

### Overall strategic priority order
Saved priority from memory:
1. Google Business Profile + reviews
2. Warm outreach
3. Instagram
4. Blog / SEO

### Recurring marketing checklist currently being tracked
From internal operations notes:

- GBP: post 1 photo + caption with “Book” button weekly
- GBP: respond to new Google reviews
- claim Yelp business page
- claim Bing Places listing
- claim Apple Maps listing
- finalize GBP description from 2 options
- swap stock spring blog image once real spring photos arrive
- set up Instagram grid with 9 to 12 photos
- join local Facebook groups like Skokie Moms / North Shore Parents
- warm outreach: 5 people per week about spring sessions
- publish 1 to 2 blog posts per week

### Blog content currently live
Confirmed live articles:
- What to Wear for Your Family Photo Session
- 8 Beautiful Spring Family Photo Locations in Skokie & the North Shore
- When to Book Your Newborn Photo Session (and What to Expect)
- Maternity Photos: When to Book, What to Wear, and Everything You Need to Know

### Blog strategy in practice
The blog strategy is clearly SEO-first:
- local keywords
- practical prep content
- newborn timing/search intent
- location content
- wardrobe advice
- maternity questions

### Marketing assets/copy already created
Confirmed from memory:
- one Instagram caption drafted for a baby video reel
- review collection is being encouraged
- gallery/session publishing includes keyword-rich titles, descriptions, and alt text

### What I did not find
I did **not** find:
- a formal editorial calendar file
- scheduled email campaigns
- newsletter automation
- social scheduler integration
- content database / content ops board inside this repo

### Operational reality
The marketing program seems to be managed more through:
- memory notes
- to-do checklists
- direct requests
- manual publishing
rather than a formal marketing system

---

## 10. Important Decisions & Context

### Strong preferences Gabi has expressed
These are important and should be treated as rules unless she changes them:
- no em dashes
- no self-hype
- no “link in bio”
- no freelance-y copy without approval
- do not overclaim
- do not say she has shot places she has not actually shot
- prefer real photos over stock
- about hero stays rose pink
- when publishing new galleries, use keyword-rich SEO

### Big decisions already made

#### 1. Custom client gallery system was chosen
Why:
- branded
- on-site
- can support favorites
- can support downloads
- can fit the brand better than third-party gallery services

This was chosen after considering:
- Pic-Time
- Pixieset
- ShootProof

#### 2. About page hero was changed to solid rose and locked
Why:
- Gabi explicitly preferred it
- it became a strong visual brand move
- saved in memory as “don’t change it back”

#### 3. Email contact identity shifted to Gmail
- site references were changed from `hello@tovyphotography.com` to `tovypics@gmail.com`

#### 4. Blog and SEO are being used as slow-burn acquisition
Priority-wise, blog is behind GBP/reviews and warm outreach, but it is still active and important.

#### 5. Cache-busted cover files became the standard
Why:
- old covers kept showing because of stale caching
- dedicated cover files like `cover-home.jpg` and `cover-bench.jpg` reduce confusion

#### 6. Cover crop position control was added
Why:
- hero images were cropping heads badly
- gallery admin now supports top/center/bottom crop control

#### 7. Mobile client gallery UX was upgraded
Why:
- favorites/share/download needed to work clearly on phones
- most clients likely view galleries on mobile

### Things that caused problems before
- stale image caching after image swaps
- cover image changes not propagating everywhere because some homepage/category references were hardcoded separately
- head-cropping on cover images before cover-position control was added
- temporary stock imagery being less preferred than real work
- architectural duplication around contact form handling

### Important reality checks for the next agent
- do not assume every public visual reference is driven from one source
- when changing a cover, audit:
  - gallery page
  - category page
  - homepage tile
  - hero usage
  - any dedicated cover files
- do not assume repo cleanliness equals live state
- verify live behavior, especially around image caching
- preserve the warmth of the copy without making it sound generic or try-hard

### How Gabi appears to like working
Based on the actual work history:
- very visual direction matters
- exact photo selection matters
- exact cover choice matters
- she notices crop issues and wrong lead images quickly
- she wants tasteful, emotionally resonant copy, not braggy copy
- she responds well to concrete changes, not abstract branding talk

### What the new agent should treat as source of truth
Order of trust:
1. current repo code for what is live/intended
2. recent memory notes for what changed and why
3. direct new instructions from Gabi
4. older notes only when newer evidence is absent

### Final concise handoff summary
If a new agent needed the shortest high-value mental model:

- This is a **warm, natural-light, family-centered photography brand** for **Skokie + North Shore**.
- The live site is a **custom Next.js site on Vercel**, not a CMS.
- Portfolio content is mostly **hardcoded in source**, while **client galleries live in Vercel Blob**.
- The business priorities are **bookings, reviews, GBP, Instagram, and SEO**, in that order.
- Gabi strongly prefers **real, grounded, non-hype copy**.
- The custom gallery system is already built and is one of the biggest product decisions made so far.
- Main current risks are **content consistency, stale image/caching issues, duplicated contact plumbing, and lack of formal marketing/CRM systems**.
