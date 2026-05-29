# CLAUDE.md — Interreg CENTRAL EUROPE Dashboard
> POC for TNCOOP territorial analysis — T33 × Open Economics project

## Setup

```bash
npm install
npm run dev          # http://localhost:5173
npm run deploy       # GitHub Pages
```

## Stack

- React 18 + Vite 5 (JSX, no TypeScript)
- CSS Modules for component styles
- react-router-dom with HashRouter (GitHub Pages compatible)
- d3-geo for NUTS2 map projection
- recharts for charts

## Project structure

```
src/
├── data/
│   ├── indicators-catalogue.js  ← themes → sub-themes → indicators (auto-generated from KB)
│   ├── indicators-data.js       ← CE NUTS2 time series for 29 indicator sheets (auto-generated)
│   ├── data.js                  ← legacy: 81 NUTS2 regions, unemployment rate only
│   └── nuts2_ce.geojson
├── hooks/
│   ├── useAppState.js           ← legacy state hook (single indicator)
│   └── useIndicatorState.js     ← new: parametric state hook (any indicator by sheetCode)
├── pages/
│   ├── ThemesPage.jsx           ← 8-theme grid (homepage)
│   ├── SubThemesPage.jsx        ← sub-theme list for a theme
│   └── IndicatorPage.jsx        ← full indicator detail page
├── components/
│   ├── TopNav.jsx/.css           ← dynamic breadcrumb
│   ├── KpiStrip.jsx/.css         ← 4 summary KPI cards
│   ├── MapSection.jsx/.css       ← NUTS2 choropleth map + trend line chart
│   ├── RankingChart.jsx/.css     ← horizontal bar chart
│   ├── DataTable.jsx/.css        ← paginated data table
│   └── Footer.jsx
├── App.jsx                       ← routing + full-width layout shell
└── index.css                     ← OE design tokens
```

## Development workflow

User stories live in `docs/dev/`:
```
docs/dev/
├── US-001.md    ← Routing, layout refactor & data files
├── US-002.md    ← Themes page & Sub-themes page
├── US-003.md    ← Indicator page (full implementation)
└── PROMPT.md    ← How to run these with Claude Code
```

**How to work on a user story:**
1. Read this CLAUDE.md first
2. Read the specific `docs/dev/US-NNN.md` file
3. Follow the "Claude Code prompt" section exactly
4. Only create/modify files listed in the US scope
5. Run `npm run dev` to verify before committing

**Execution order:**
| # | US | Depends on | Creates/modifies |
|---|-----|-----------|-----------------|
| 1 | US-001 | — | main.jsx, App.jsx, TopNav.jsx, src/pages/* (placeholders) |
| 2 | US-002 | US-001 | ThemesPage.jsx, SubThemesPage.jsx + CSS |
| 3 | US-003 | US-001, US-002 | IndicatorPage.jsx, useIndicatorState.js, adapts MapSection/KpiStrip |

## Layout

Full-width, no sidebar. Navigation via TopNav breadcrumb.
Filters are inline on the indicator page (between metadata panels and charts).

## Routing

| Route | Page |
|-------|------|
| `/` | ThemesPage — 8-theme grid |
| `/theme/:themeId` | SubThemesPage — sub-theme list |
| `/theme/:themeId/sub/:subId` | IndicatorPage — metadata + filters + charts |

HashRouter required for GitHub Pages.

## Data files

**indicators-catalogue.js** (auto-generated):
- `THEMES` array: 8 themes, 26 sub-themes, KB metadata
- Each sub-theme has: id, name, type, dataSheets[], metadata{}, subIndicators[], hasData
- Helpers: getAllThemes(), getThemeById(), getSubThemeById(), getSubThemesByType()

**indicators-data.js** (auto-generated):
- `INDICATORS_DATA` object: keyed by sheet code (e.g. "153a_Waste")
- Each entry: { years: string[], regions: { code, name, country, series: { year: value } }[] }
- Helpers: getIndicatorData(), getIndicatorYears()

Regenerate with: `python3 extract_kb_data.py`

## Indicator page structure

```
Header (back link + sub-theme name)
├── Sub-indicator tabs (if multiple sheets)
├── Section 1: Data source (collapsible, KB metadata)
├── Section 2: Policy context (collapsible, T33 metadata — pending)
├── Section 3: Filters (year slider + country pills + focus regions)
├── Section 4: KPI strip (avg, highest, lowest, programme avg)
├── Section 5: Map + Trend chart
├── Section 6: Ranking chart
└── Section 7: Data table
```

## Design system

Colors:
- `--violet: #5B4FCF` — buttons, accents
- `--violet-dark: #3D2B8E` — header
- `--violet-light: #EEF0FD` — hover bg, pills
- TNCOOP badge: `#F4A261` (orange)
- Additional badge: `#8338EC` (purple)

Font: `Atkinson Hyperlegible Next` (sans)

## Anti-patterns

- DO NOT use TypeScript — project is JSX only
- DO NOT use BrowserRouter — HashRouter required for GitHub Pages
- DO NOT hardcode data in JSX — everything in `src/data/`
- DO NOT delete existing components — adapt them minimally
- DO NOT re-add the Sidebar — layout is full-width with inline filters
- DO NOT modify auto-generated data files — regenerate with the Python script