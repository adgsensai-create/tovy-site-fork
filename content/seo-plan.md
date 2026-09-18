# Tovy Photography SEO Plan

Prepared 2026-09-17 from OpenSEO research (site audit, backlinks, keyword metrics, competitor ranked keywords, Maps results near Skokie). Volumes are monthly US searches. Nearly every term here is keyword difficulty 0 to 5, so the real competition is Google Maps, not backlinks.

Status key: Live = on main today. Built = in the seo-merge branch. New = to create. Queue order is in content/queue.json.

## Ground rules (from CLAUDE.md and this plan)

- One page per intent. Never split "newborn photographer" and "newborn photography" into two pages.
- First person, warm, no em dashes, no invented numbers, no luxury. Cost figures only as ranges attributed to published cost guides.
- Only claim locations and session types Gabi has actually photographed. Proof links go to real galleries.
- Every page: literal question H3s with the direct answer in the first sentence, FAQPage JSON-LD, a link from the sessions page or footer, and two internal links from existing pages.
- Service pages stay out of the main nav (Gabi's decision). They are linked from Sessions and Pricing, the footer, and the town pages.

## Tier 1: Money pages (service intent)

| # | Page | Target keywords (monthly US volume) | Status |
|---|---|---|---|
| 1 | Newborn photography | newborn photographer near me 6,600; chicago newborn photographer 320; newborn photography chicago 260 | Live |
| 2 | Maternity photography | maternity photographer near me 9,900; chicago maternity photographer 1,600; maternity photos chicago 1,000 | Built |
| 3 | Family photography | family photographer near me 3,600; chicago family photographer 480; family photos chicago 480 | Live |
| 4 | Engagement photography | engagement photographer chicago 480; chicago engagement photos 390 | Live |
| 5 | Proposal photography | chicago proposal photographer 320; proposal photographer chicago 320 | New |
| 6 | Bar and Bat Mitzvah photography | bar mitzvah photographer 390; bat mitzvah photographer 390 | Built |
| 7 | Mini sessions | mini session photography 720; family mini session 70 | Built |
| 8 | Milestone and first year | newborn and family photoshoot 3,600; sitter session 30 | Built |
| 9 | In-home newborn photography | newborn photography at home 880; in-home newborn photography near me 320; at home newborn photoshoot 260 | New |
| 10 | Maternity plus newborn bundle | maternity and newborn photography 320; packages 40 | New |
| 11 | Lifestyle newborn photography | lifestyle newborn photography 720 | New |
| 12 | Lifestyle family photography | lifestyle family photography 390; in home family photoshoot 140 | New |
| 13 | Extended family sessions | extended family photos 480; large family photoshoot 720; multigenerational family photos 40 | New |
| 14 | Twins newborn photography | twins newborn photography 110 | New |
| 15 | Fresh 48 sessions | fresh 48 newborn photos 70 | New |

## Tier 2: Cost pages (buyers comparing, quoted by AI answers)

| # | Page | Target keywords | Status |
|---|---|---|---|
| 16 | Newborn photography cost | newborn photography cost 320; newborn photography prices 320; newborn photoshoot cost 320 | Built |
| 17 | Family photo cost | family photoshoot prices 260; how much do family photos cost 140; family photoshoot cost 90 | Built |
| 18 | Engagement photoshoot cost | engagement photoshoot cost 720 (KD 19); engagement photographer cost 110 | New |
| 19 | Maternity photoshoot cost | maternity photoshoot cost 210; maternity photoshoot prices 170 | New |
| 20 | Bar Mitzvah photographer cost | how much does a bar mitzvah photographer cost 10, plus AI answers | New |

## Tier 3: Guides (national volume, AI-citable, convert through internal links)

| # | Page | Target keywords | Status |
|---|---|---|---|
| 21 | What to wear for family photos | family photo outfits 12,100; family photo outfit ideas 9,900; what to wear for family photos 720 | Live, rewrite to target outfits |
| 22 | Fall family photos guide | fall family photoshoot 6,600; family photos fall 6,600; fall mini sessions 390 | New |
| 23 | Holiday and Christmas family photos | christmas family photos 3,600; holiday family photos 1,300; holiday mini sessions 140 | New |
| 24 | When to take maternity photos | when to take maternity photos 1,300; best week for maternity photos 110 | Live, retitle |
| 25 | When to take newborn photos | when to take newborn photos 720; when to schedule newborn photos 90 | Live, retitle |
| 26 | Family photos with your dog | family photos with dog 880; newborn photos with dog 90 | New |
| 27 | Newborn photos with siblings | newborn photos with siblings 590 | New |
| 28 | What to wear for maternity photos | what to wear for maternity photos 390 | New |
| 29 | What to wear for newborn photos | what to wear for newborn photos 260 | New |
| 30 | In-home vs studio newborn photos | newborn photography at home 880 | Built |
| 31 | Hanukkah family photoshoot | hanukkah photoshoot 260 | New |
| 32 | Mother's Day mini sessions | mothers day mini sessions 210 | New |
| 33 | Spring mini sessions and blossoms | spring mini sessions 70 | New |
| 34 | Birth announcement photos | birth announcement photos 260 | New |
| 35 | How long a family session takes and how to prepare | how to prepare for family photos; how long does a family photo session take | New (draft exists) |

## Tier 4: Location guides (low volume, high citation and link value)

| # | Page | Target keywords | Status |
|---|---|---|---|
| 36 | Best family photo locations, North Shore | family photo locations near me 210 | Live |
| 37 | Best engagement photo locations, Chicago and North Shore | best places for engagement photos chicago | Live |
| 38 | Gillson Park family photos | gillson park photos 110 | New |
| 39 | Chicago Botanic Garden photos and permits | chicago botanic garden engagement photos 50; family photos | New |
| 40 | Garfield Park Conservatory engagement photos | garfield park conservatory engagement photos 50 | Live |
| 41 | Chicago Riverwalk and skyline engagement photos | chicago riverwalk engagement photos 40; chicago riverwalk photoshoot 210 | New |
| 42 | Lincoln Park Conservatory engagement photos | lincoln park conservatory engagement photos 30 | New |
| 43 | Best maternity photo locations, North Shore | draft exists | New |

## Tier 5: Town pages (near-zero measured volume, but they win Maps relevance and long tail)

| # | Pages | Status |
|---|---|---|
| 44 | Skokie, Evanston, Lincolnwood, Wilmette | Built (rewritten with FAQs and proof) |
| 45 | Morton Grove, Glenview, Niles, Northbrook | Built |
| 46 | Park Ridge, Winnetka, Highland Park, West Rogers Park | Built |
| 47 | Deerfield, Glencoe, Kenilworth | New (drafts exist) |
| 48 | Lake Forest, Buffalo Grove, Arlington Heights | New, lowest priority |
| 49 | Chicago neighborhoods: Lincoln Park, Lakeview, Edgewater, Rogers Park | New, only after real sessions there |
| 50 | Graduation and senior portraits, Evanston | senior pictures chicago 70; northwestern graduation photos 20 | New |

## Implementation phases

### Phase 0, this week, no new pages
- Deploy the seo-merge branch. That ships items 2, 6, 7, 8, 16, 17, 30 and rows 44 to 46.
- Fix the Google Business Profile pin to Skokie. Add all 7 services and the 12 service areas, upload 20 photos, post weekly. Items 1 and 3 are won or lost in Maps, not on the page.
- Connect Search Console to OpenSEO and submit the sitemap.
- Review routine: every delivered gallery gets a review request. Target 25 reviews by year end. Rena Meystel has 47.

### Phase 1, weeks 2 to 6, one to two pages a week
- New service pages 5, 9, 10, 11, 12, 13 on the existing service template.
- Cost pages 18, 19, 20 on the blog template with FAQ schema.
- Rewrite 21 to target "family photo outfits" with a seasonal section.

### Phase 2, weeks 6 to 12, seasonal timing
- Fall guide 22 and fall minis: publish now, catches November holiday card searches; must be live by early September next year.
- Holiday guide 23, Hanukkah 31, holiday minis in October.
- Guides 24 to 29, 34, 35, one a week. Half exist as drafts in the OpenClaw workspace and only need the answer-first edit.

### Phase 3, months 3 to 6
- Location guides 38 to 43, each tied to a real session and a permit note.
- Mother's Day and spring minis (32, 33) in March.
- Town pages 47, 48 only once the first 12 show impressions in Search Console.
- Neighborhood pages 49 only after Gabi shoots there.

### Ongoing
- Links: Chicago North Shore Moms directory, synagogue vendor lists, pediatrician and doula referral pages, park district photographer lists. Ten real local links would double the current profile of 10 referring domains.
- Measure monthly in OpenSEO: Maps rank for "family photographer" and "newborn photographer" from Skokie, Evanston and Wilmette; Search Console impressions per page; inquiries per month.
- Expected: Maps traffic moves 4 to 8 weeks after the GBP fix and reviews. Organic pages take 3 to 6 months. Cost and guide pages are what AI answers quote.
