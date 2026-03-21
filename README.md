# FadeScore

Barber discovery and ranking site with **programmatic SEO**: thousands of long-tail pages (city + intent) to capture search traffic like "best barbers in [city]" and "cheap barbers [city]".

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Pattern | Example | Purpose |
|--------|---------|--------|
| `/` | Home | Entry + popular cities |
| `/best-barbers-in/[city]` | `/best-barbers-in/salt-lake-city` | Best barbers in city |
| `/best-fade-barbers-in/[city]` | Same | Best fade barbers |
| `/cheap-barbers-in/[city]` | Same | Cheap barbers |
| `/barber/[slug]` | `/barber/james-carter-salt-lake-city` | Barber profile |
| `/hidden-gem-barbers` | Viral page | Under $30, 4.8+ FadeScore |

## Data

- **Cities:** `src/data/cities.ts` — top 100 US cities (expand to 500+ with same structure).
- **Barbers:** `src/data/mock-barbers.ts` — mock data per city. Replace with your DB/API and keep the same types in `src/types/index.ts`.

## Build

```bash
npm run build
```

Static pages are generated for every city × variant (e.g. 120 cities × 3 = 360 city pages). Barber profiles are rendered on demand.

## SEO

- `generateMetadata()` on every page for title/description.
- `generateStaticParams()` for city routes so all city pages are pre-rendered.
- Internal links between city pages, barber profiles, and the hidden-gem page.

Add a sitemap and real barber data to scale to 10k+ monthly visitors.
