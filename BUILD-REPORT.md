# Build Report — Coal Region Auto Services Directory

## Summary

**Project:** Coal Region Auto Services Directory
**Build Date:** March 15, 2026
**Status:** Complete — site builds and all pages render

## Listing Totals

| Subcategory | Count |
|-------------|-------|
| Auto Repair | 14 |
| Body Shops | 8 |
| Tire Shops | 7 |
| Oil Change | 2 |
| Towing | 3 |
| Auto Parts | 10 |
| **Total** | **44** |

## Towns Covered

Pottsville (15), Schuylkill Haven (6), Tamaqua (5), Pine Grove (4), Minersville (3), Frackville (2), Orwigsburg (1), Ashland (1), Mahanoy City (1), Port Carbon (1), Tremont (1)

## Pages Generated

- **59 total pages** built by Eleventy
- 44 individual listing pages with JSON-LD schema
- 6 subcategory browse pages (grouped by city)
- 3 guide articles (800-1500 words each)
- Homepage with category cards and city browsing
- About, Advertise, Contact, 404, Thank You pages
- Guides index page

## Guide Articles

1. "How to Find an Honest Mechanic in Schuylkill County" (~1,100 words)
2. "What to Do After a Car Accident in Pennsylvania" (~1,400 words)
3. "Seasonal Car Maintenance for Coal Region Drivers" (~1,300 words)

## Outreach Materials

- **Market Report** — business counts, digital gap analysis, revenue projections
- **Target Ranking** — 10 businesses scored by digital gap and revenue potential
- **Outreach Scripts** — personalized phone scripts, email template, objection handlers

## Top Outreach Targets

1. **Wehr's Auto Service** — 5-star rating, no website, family owned
2. **Kline Brothers Auto Body** — since 1960, no website, no reviews
3. **Foran's Transmission** — 5-star specialist, no website
4. **Right Turn Automotive** — 4.5 stars, basic website, AAA/NAPA
5. **Gary's Auto Body** — since 1977, basic website, body shop ROI

## Technical Notes

- Eleventy 3.1.2, Nunjucks templates, CSV data pipeline
- Color theme: Charcoal (#2d2d2d) / Red (#c0392b)
- JSON-LD schema on all listing pages (AutoRepair, AutoBodyShop, TireShop, AutoPartsStore, LocalBusiness)
- Netlify Forms integration for contact page
- Stripe Buy Button placeholder on advertise page
- Plausible Analytics integration

## Quality Checklist

- [x] CSV has 44 business listings with no fabricated data
- [x] All 6 subcategory pages render correctly
- [x] City-based browsing works (businesses grouped by city)
- [x] Individual listing pages have correct JSON-LD schema
- [x] Homepage has category cards and city links
- [x] Advertise page has clear free vs premium comparison
- [x] 3 guide articles written and linked
- [x] About page has local community angle
- [x] Contact form uses Netlify Forms syntax
- [x] CSS colors match charcoal/red category theme
- [x] outreach/ directory has market report, target ranking, and scripts
- [x] Site builds without errors: `npx @11ty/eleventy`
- [x] Git repo initialized with initial commit

## Next Steps

1. Deploy to Netlify and configure custom domain
2. Set up Stripe Buy Button with live keys
3. Begin outreach to top 5 targets with free month offer
4. Add Google Business Profile links to listings
5. Build comparison screenshots for advertise page slider
