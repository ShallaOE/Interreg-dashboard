import { useMemo, useState } from 'react'
import styles from './RankingChart.module.css'

// Brand book colours — consistent with TrendChart
const CCOLORS = {
  AT: '#0d428d',
  CZ: '#6c8793',
  DE: '#18BAA8',
  HR: '#F68A42',
  HU: '#9ACA3C',
  IT: '#0E6EB6',
  PL: '#84aab0',
  SI: '#4c6470',
  SK: '#c3d3d7',
}

const TABS = ['All regions', 'Top 20', 'Bottom 20']

export default function RankingChart({ regions, selectedYear, euVal, focusRegionId, onSelect }) {
  const [tab,            setTab]            = useState('All regions')
  const [hiddenCountries, setHiddenCountries] = useState(new Set())

  // All unique countries in the current regions
  const countries = useMemo(() =>
    [...new Set(regions.map(r => r.country))].sort(),
    [regions]
  )

  const sorted = useMemo(() =>
    regions
      .map(r => ({ ...r, rate: r.series[selectedYear] }))
      .filter(r => r.rate != null)
      .sort((a, b) => b.rate - a.rate),
    [regions, selectedYear]
  )

  const visibleSorted = useMemo(() =>
    sorted.filter(r => !hiddenCountries.has(r.country)),
    [sorted, hiddenCountries]
  )

  const displayed = useMemo(() => {
    if (tab === 'Top 20')    return visibleSorted.slice(0, 20)
    if (tab === 'Bottom 20') return visibleSorted.slice(-20).reverse()
    return visibleSorted
  }, [visibleSorted, tab])

  const barMax = Math.ceil((visibleSorted[0]?.rate ?? 1) * 1.1) || 1
  const euPct  = (euVal / barMax) * 100

  const toggleCountry = (c) => {
    setHiddenCountries(prev => {
      const next = new Set(prev)
      next.has(c) ? next.delete(c) : next.add(c)
      return next
    })
  }

  return (
    <div className={styles.wrap}>

      {/* Tab group */}
      <div className={styles.toolbar}>
        <div className="tab-group">
          {TABS.map(t => (
            <button key={t}
              className={`tab-pill ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Country legend */}
      <div className={styles.legend}>
        {countries.map(c => {
          const hidden = hiddenCountries.has(c)
          const color  = CCOLORS[c] || '#6c8793'
          const count  = visibleSorted.filter(r => r.country === c).length
          return (
            <button key={c}
              className={`${styles.legendItem} ${hidden ? styles.legendHidden : ''}`}
              onClick={() => toggleCountry(c)}
              title={hidden ? `Show ${c}` : `Hide ${c}`}
            >
              <span style={{
                background: hidden ? 'var(--border-md)' : color,
                color: 'white',
                fontSize: 9, fontWeight: 800,
                fontFamily: 'var(--font-head)',
                padding: '2px 5px', borderRadius: 3,
                letterSpacing: 0.5, minWidth: 22, textAlign: 'center',
                display: 'inline-block',
              }}>
                {c}
              </span>
              <span className={styles.legendLabel}>
                {hidden ? 0 : count} region{count !== 1 ? 's' : ''}
              </span>
            </button>
          )
        })}
      </div>

      {/* Chart */}
      <div className={styles.chart}>
        {/* Programme avg reference line */}
        <div className={styles.euLine}
          style={{ left: `calc(160px + ${euPct}% * (100% - 160px - 60px) / 100)` }}>
          <div className={styles.euLabel}>Programme avg {euVal.toFixed(2)}</div>
        </div>

        {displayed.map(r => {
          const pct     = (r.rate / barMax) * 100
          const isFocus = r.id === focusRegionId
          return (
            <div key={r.id}
              className={`${styles.row} ${isFocus ? styles.rowFocus : ''}`}
              onClick={() => onSelect(r.id === focusRegionId ? null : r.id)}>
              <div className={styles.rowLabel}>
                <span className={styles.code}>{r.id}</span>
                <span className={styles.name}> — {r.name}</span>
              </div>
              <div className={styles.barArea}>
                <div className={styles.bar}
                  style={{ width: `${pct}%`, background: CCOLORS[r.country] || '#888' }} />
                <span className={styles.barVal}>{r.rate.toFixed(1)}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.foot}>
        {displayed.length} regions · click a bar to highlight it on the map
      </div>
    </div>
  )
}
