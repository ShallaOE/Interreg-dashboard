import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getThemeById, getSubThemeById } from '../data/indicators-catalogue.js'
import { useIndicatorState } from '../hooks/useIndicatorState.js'
import KpiStrip    from '../components/KpiStrip.jsx'
import MapSection, { TrendChart } from '../components/MapSection.jsx'
import RankingChart from '../components/RankingChart.jsx'
import DataTable   from '../components/DataTable.jsx'
import styles      from './IndicatorPage.module.css'

/* ── SVG icons for panels ────────────────────────────────── */
const IconDataSource = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <rect x="1" y="1" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M4 5h8M4 8h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M1 14h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)

const IconPolicy = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path d="M3 2h7l3 3v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M10 2v3h3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M5 7h6M5 10h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)

/* ── Collapsible panel (default closed) ─────────────────── */
function Panel({ title, icon, accentColor = 'var(--petrol)', defaultOpen = false, children }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  return (
    <div className={styles.panel} style={{ borderLeftColor: accentColor }}>
      <div className={styles.panelHeader} onClick={() => setIsOpen(o => !o)}>
        <div className={styles.panelTitleRow}>
          {icon}
          <span className={styles.panelTitle}>{title}</span>
        </div>
        <span className={`${styles.panelChevron} ${isOpen ? styles.panelChevronOpen : ''}`}>▾</span>
      </div>
      {isOpen && (
        <div className={styles.panelContent}>
          {children}
        </div>
      )}
    </div>
  )
}

/* ── Section 1 — Data source ───────────────────────────── */
function DataSourcePanel({ meta }) {
  if (!meta) {
    return (
      <Panel title="Data source" icon={<IconDataSource />} accentColor="var(--petrol)">
        <div className={styles.emptyMeta}>Metadata not available for this indicator</div>
      </Panel>
    )
  }
  return (
    <Panel title="Data source" icon={<IconDataSource />} accentColor="var(--petrol)">
      <div className={styles.metaGrid}>
        <MetaField label="Source"          value={meta.source} />
        <MetaField label="Spatial level"   value={meta.spatialLevel} />
        <MetaField label="Time range"      value={`${meta.temporalStart} – ${meta.temporalEnd}`} />
        <MetaField label="Indicator type"  value={meta.type} />
        <MetaField label="NUTS nomenclature" value={meta.nutsVersion} />
        {meta.sourceUrl && (
          <div className={styles.metaField}>
            <span className={styles.metaLabel}>Source URL</span>
            <a href={meta.sourceUrl} target="_blank" rel="noopener noreferrer" className={styles.metaLink}>
              Open source ↗
            </a>
          </div>
        )}
      </div>
    </Panel>
  )
}

function MetaField({ label, value }) {
  return (
    <div className={styles.metaField}>
      <span className={styles.metaLabel}>{label}</span>
      <span className={styles.metaValue}>{value || '—'}</span>
    </div>
  )
}

/* ── Section 2 — Policy context ────────────────────────── */
function PolicyContextPanel() {
  return (
    <Panel title="Policy context" icon={<IconPolicy />} accentColor="var(--petrol-bright)">
      <p className={styles.policyPending}>
        Policy metadata will be available when the analytical grid is delivered by T33.
        This section will show: cohesion policy coverage 2021–27, coverage 2028–34,
        fiche theme link, and performance framework references.
      </p>
    </Panel>
  )
}

/* ── Section 3 — Filters bar ───────────────────────────── */
function FiltersBar({ state }) {
  const {
    years, selectedYear, setSelectedYear,
    countries, activeCountries, setActiveCountries,
    regions, filtered, focusRegions, setFocusRegions,
    hasTimeSeries,
  } = state

  /* ── Country toggle with bidirectional region sync ── */
  const toggleCountry = (code) => {
    const isActive        = activeCountries.includes(code)
    const countryRegions  = (regions || filtered).filter(r => r.country === code).map(r => r.code)

    if (isActive) {
      // Deactivate: require at least 1 active country
      if (activeCountries.length > 1) {
        setActiveCountries(prev => prev.filter(c => c !== code))
        setFocusRegions(prev => prev.filter(id => !countryRegions.includes(id)))
      }
    } else {
      // Activate: add country + select all its regions in Focus
      setActiveCountries(prev => [...prev, code])
      setFocusRegions(prev => [...new Set([...prev, ...countryRegions])])
    }
  }

  /* ── Region toggle — only activates country when ALL selected ── */
  const toggleRegion = (id) => {
    const newFocus = focusRegions.includes(id)
      ? focusRegions.filter(r => r !== id)
      : [...focusRegions, id]
    setFocusRegions(newFocus)

    // Sync country state based on region selection
    const region = (regions || filtered).find(r => r.code === id)
    if (!region) return
    const allCountryRegions = (regions || filtered)
      .filter(r => r.country === region.country)
      .map(r => r.code)
    const allSelected  = allCountryRegions.every(rc => newFocus.includes(rc))
    const noneSelected = allCountryRegions.every(rc => !newFocus.includes(rc))

    // ALL selected → activate country
    if (allSelected && !activeCountries.includes(region.country)) {
      setActiveCountries(prev => [...prev, region.country])
    }
    // NONE selected → deactivate country
    if (noneSelected && activeCountries.includes(region.country)) {
      setActiveCountries(prev => prev.filter(c => c !== region.country))
    }
  }

  return (
    <div className={styles.filtersBar}>
      {/* Year */}
      <div className={styles.filterRow}>
        <div className={styles.filterLabelRow}>
          <span className={styles.filterLabel}>Reference year</span>
          <span className={styles.filterValue}>{selectedYear}</span>
        </div>
        {hasTimeSeries ? (
          <>
            <input
              type="range"
              className={styles.yearSlider}
              min={0} max={years.length - 1}
              value={years.indexOf(selectedYear)}
              onChange={e => setSelectedYear(years[+e.target.value])}
            />
            <div className={styles.yearBounds}>
              <span>{years[0]}</span><span>{years[years.length - 1]}</span>
            </div>
          </>
        ) : (
          <p className={styles.singleYear}>Data available for {selectedYear} only</p>
        )}
      </div>

      {/* Countries */}
      <div className={styles.filterRow}>
        <span className={styles.filterLabel}>Countries</span>
        <div className={styles.pillsRow}>
          {countries.map(c => {
            const active = activeCountries.includes(c.code)
            return (
              <button
                key={c.code}
                className={`${styles.pill} ${active ? styles.pillActive : styles.pillInactive}`}
                onClick={() => toggleCountry(c.code)}
                title={c.name}
              >
                <span className={styles.pillCode}>{c.code}</span>
                <span className={styles.pillName}>{c.name}</span>
              </button>
            )
          })}
          <button
            className={styles.selectAllBtn}
            onClick={() => {
              const allCodes = countries.map(c => c.code)
              setActiveCountries(allCodes)
              setFocusRegions((regions || filtered).map(r => r.code))
            }}
          >
            Select all
          </button>
          <button
            className={styles.selectAllBtn}
            onClick={() => {
              setActiveCountries([])
              setFocusRegions([])
            }}
          >
            Deselect all
          </button>
        </div>
      </div>

      {/* Focus regions */}
      <div className={styles.filterRow}>
        <div className={styles.filterLabelRow}>
          <span className={styles.filterLabel}>Focus regions</span>
          {focusRegions.length > 0 && (
            <button className={styles.clearBtn} onClick={() => setFocusRegions([])}>
              Clear ({focusRegions.length})
            </button>
          )}
        </div>
        <div className={styles.regionsGrid}>
          {filtered.map(r => {
            const active = focusRegions.includes(r.code)
            return (
              <button
                key={r.code}
                className={`${styles.regionChip} ${active ? styles.regionChipActive : ''}`}
                onClick={() => toggleRegion(r.code)}
              >
                <span className={styles.regionCode}>{r.code}</span>
                <span className={styles.regionName}>{r.name}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ── Main page ──────────────────────────────────────────── */
export default function IndicatorPage() {
  const { themeId, subId } = useParams()
  const theme = getThemeById(themeId)
  const sub   = theme ? getSubThemeById(themeId, subId) : null

  const [activeSheetIndex, setActiveSheetIndex] = useState(0)
  const activeSheet = sub?.dataSheets?.[activeSheetIndex] ?? sub?.dataSheets?.[0]

  const state = useIndicatorState(activeSheet)

  if (!theme || !sub) {
    return (
      <div className={styles.page}>
        <p style={{ color: 'var(--text-3)' }}>Indicator not found.</p>
        <Link to={themeId ? `/theme/${themeId}` : '/'} className={styles.backLink}>
          ← Back
        </Link>
      </div>
    )
  }

  const isTncoop    = sub.type === 'tncoop'
  const hasSubInds  = sub.subIndicators?.length > 0
  const badgeStyle  = isTncoop
    ? { background: 'rgba(246,138,66,0.12)', color: '#c46b1a', border: '1px solid rgba(246,138,66,0.30)' }
    : { background: 'rgba(14,110,182,0.10)', color: '#0a5490', border: '1px solid rgba(14,110,182,0.25)' }

  return (
    <div className={styles.page}>

      {/* Back link */}
      <Link to={`/theme/${themeId}`} className={styles.backLink}>
        ← Back to {theme.name}
      </Link>

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>{sub.name}</h1>
        <span className={styles.typeBadge} style={badgeStyle}>
          {isTncoop ? 'TNCOOP' : 'Additional'}
        </span>
      </div>

      {/* Sub-indicator tabs */}
      {hasSubInds && (
        <div className={styles.subTabs}>
          {sub.subIndicators.map((si, idx) => (
            <button
              key={si.sheetCode}
              className={`${styles.subTab} ${idx === activeSheetIndex ? styles.subTabActive : ''}`}
              onClick={() => setActiveSheetIndex(idx)}
              disabled={!si.hasData}
            >
              {si.label}
            </button>
          ))}
        </div>
      )}

      {/* Section 1 — Data source */}
      <DataSourcePanel meta={sub.metadata} />

      {/* Section 2 — Policy context */}
      <PolicyContextPanel />

      {/* Section 3 — Map (moved after policy context) */}
      <div style={{ marginTop: '16px' }}>
        <MapSection state={state} />
      </div>

      {/* Section 4 — Filters */}
      <FiltersBar state={state} />

      {/* Section 5 — KPI strip */}
      {state.stats && (
        <KpiStrip
          stats={state.stats}
          euVal={state.programmeAvg[state.selectedYear] ?? 0}
          selectedYear={state.selectedYear}
          benchmarkLabel="Programme avg"
        />
      )}

      {/* Section 6 — Trend (full width, separate) */}
      {state.hasTimeSeries && <TrendChart state={state} />}

      {/* Section 6 — Ranking */}
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Regional ranking — {state.selectedYear}</h2>
      </div>
      <RankingChart
        regions={state.filtered}
        selectedYear={state.selectedYear}
        euVal={state.programmeAvg[state.selectedYear] ?? 0}
        focusRegionId={state.focusRegionId}
        onSelect={state.setFocusRegionId}
      />

      {/* Section 7 — Data table */}
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Full data table</h2>
      </div>
      <DataTable
        regions={state.filtered}
        years={state.years}
        selectedYear={state.selectedYear}
        euVal={state.programmeAvg[state.selectedYear] ?? 0}
        focusRegionId={state.focusRegionId}
        onSelect={state.setFocusRegionId}
      />

    </div>
  )
}
