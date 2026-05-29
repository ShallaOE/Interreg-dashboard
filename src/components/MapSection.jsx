import { useState, useMemo, useEffect, useRef } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ReferenceLine, Legend, ResponsiveContainer,
} from 'recharts'
import { geoMercator, geoPath } from 'd3-geo'
import styles from './MapSection.module.css'

/* ── Programme regions ───────────────────────────────────── */
const PROG = new Set(["AT11","AT12","AT13","AT21","AT22","AT31","AT32","AT33","AT34","CZ01","CZ02","CZ03","CZ04","CZ05","CZ06","CZ07","CZ08","DE11","DE12","DE13","DE14","DE21","DE22","DE23","DE24","DE25","DE26","DE27","DE30","DE40","DE80","DE91","DED2","DED4","DED5","DEE0","DEG0","HR02","HR03","HR05","HR06","HU11","HU12","HU21","HU22","HU23","HU31","HU32","HU33","ITC1","ITC2","ITC3","ITC4","ITH1","ITH2","ITH3","ITH4","ITH5","PL21","PL22","PL41","PL42","PL43","PL51","PL52","PL61","PL62","PL63","PL71","PL72","PL81","PL82","PL84","PL91","PL92","SI03","SI04","SK01","SK02","SK03","SK04"])

/* ── Brand book country colours ──────────────────────────── */
export const COUNTRY_COLORS = {
  AT: '#0d428d',  // Reflex Blue
  CZ: '#6c8793',  // Original Petrol
  DE: '#18BAA8',  // Smarter (teal)
  HR: '#F68A42',  // Connected (orange)
  HU: '#9ACA3C',  // Greener (green)
  IT: '#0E6EB6',  // Governance (blue)
  PL: '#84aab0',  // Petrol Bright
  SI: '#4c6470',  // Petrol Dark
  SK: '#c3d3d7',  // Petrol Light (with dark text)
}

/* ── Choropleth colour scale: green (best) → red (worst) ─── */
const SCALE = ['#4CAF50','#81C784','#FFF176','#FFB74D','#EF5350','#C62828']
function buildQuantiles(vals) {
  if (!vals.length) return []
  const sorted = [...vals].filter(v => v != null).sort((a, b) => a - b)
  const n = SCALE.length - 1
  return Array.from({ length: n }, (_, i) => sorted[Math.floor((i + 1) * sorted.length / (n + 1))])
}
function scaleColor(value, quantiles) {
  if (value == null || !quantiles.length) return '#dce8ec'
  let idx = 0
  while (idx < quantiles.length && value > quantiles[idx]) idx++
  return SCALE[Math.min(idx, SCALE.length - 1)]
}

/* ── Map geometry loader ─────────────────────────────────── */
const MAP_W = 600, MAP_H = 440
let _geo = null
async function loadGeo() {
  if (_geo) return _geo
  const b = '/Interreg-CENTRAL-EUROPE-Dashboard'
  const [n, c] = await Promise.all([
    fetch(`${b}/nuts2_ce.geojson`).then(r => r.json()),
    fetch(`${b}/eu_countries.geojson`).then(r => r.json()),
  ])
  n.features = n.features.filter(f => PROG.has(f.properties.NUTS_ID))
  const proj = geoMercator().fitExtent([[16, 16], [MAP_W - 36, MAP_H - 16]], n)
  const pg   = geoPath().projection(proj)
  _geo = {
    regions:  n.features.map(f => ({ id: f.properties.NUTS_ID, d: pg(f) })),
    countries: c.features.map(f => ({ id: f.properties.NUTS_ID || f.properties.id, d: pg(f) })),
  }
  return _geo
}

/* ══════════════════════════════════════════════════════════
   MAP COMPONENT
   ══════════════════════════════════════════════════════════ */
export default function MapSection({ state }) {
  const {
    filtered, selectedYear,
    focusRegionId, setFocusRegionId,
    focusRegionObjects,
    focusRegions, setFocusRegions,
  } = state

  const mapRef = useRef(null)
  const [tooltip, setTooltip] = useState(null)
  const [geo, setGeo]         = useState({ regions: [], countries: [] })

  useEffect(() => { loadGeo().then(setGeo) }, [])

  const lu = useMemo(() => {
    const m = {}
    filtered.forEach(r => { m[r.id] = r })
    return m
  }, [filtered])

  const quantiles = useMemo(() => {
    const vals = filtered.map(r => r.series[selectedYear]).filter(v => v != null)
    return buildQuantiles(vals)
  }, [filtered, selectedYear])

  const hasFocus = focusRegionObjects?.length > 0

  const onMove = (e, id) => {
    const r = lu[id]
    if (!r || !mapRef.current) return
    const rect = mapRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    // Flip tooltip left if near right edge
    const flipX = x > rect.width * 0.65
    setTooltip({
      x, y, flipX,
      id, name: r.name, country: r.countryName,
      val: r.series[selectedYear],
    })
  }

  // Map click logic:
  // - Nothing selected → exclusive select (only this region)
  // - Something already selected → toggle (add if absent, remove if present)
  const onRegionClick = (id) => {
    if (!lu[id] || !setFocusRegions) return
    const current = focusRegions || []
    if (current.length === 0) {
      // Exclusive: select only this one
      setFocusRegions([id])
    } else if (current.includes(id)) {
      // Already selected → remove it
      setFocusRegions(current.filter(r => r !== id))
    } else {
      // Not selected → add it
      setFocusRegions([...current, id])
    }
  }

  const minVal = useMemo(() => {
    const vals = filtered.map(r => r.series[selectedYear]).filter(v => v != null)
    return vals.length ? Math.min(...vals) : 0
  }, [filtered, selectedYear])

  const maxVal = useMemo(() => {
    const vals = filtered.map(r => r.series[selectedYear]).filter(v => v != null)
    return vals.length ? Math.max(...vals) : 1
  }, [filtered, selectedYear])

  return (
    <div className={`card ${styles.mapCard}`}>
      <div className={`section-header ${styles.cardHead}`}>
        <span className="section-title">Regional map — {selectedYear}</span>
      </div>
      <div className={styles.mapBody} ref={mapRef} onMouseLeave={() => setTooltip(null)}>
        <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className={styles.svg}>
          {geo.countries.map(({ id, d }) => (
            <path key={`c-${id}`} d={d} fill="#E8ECF0" stroke="#fff" strokeWidth={0.8} />
          ))}
          {geo.regions.map(({ id, d }) => {
            const r       = lu[id]
            const val     = r?.series[selectedYear] ?? null
            const isFocus = id === focusRegionId
            return (
              <path key={`r-${id}`} d={d}
                fill={r ? scaleColor(val, quantiles) : '#dce8ec'}
                stroke="white"
                strokeWidth={isFocus ? 2.5 : 0.4}
                opacity={hasFocus && !focusRegionObjects.find(f => f.id === id) ? 0.35 : 1}
                style={{ cursor: r ? 'pointer' : 'default', transition: 'opacity 0.12s' }}
                onClick={() => onRegionClick(id)}
                onMouseMove={e => r && onMove(e, id)}
              />
            )
          })}
        </svg>

        {tooltip && (
          <div className={styles.tooltip}
            style={{
              left:      tooltip.flipX ? tooltip.x - 160 : tooltip.x + 14,
              top:       Math.max(tooltip.y - 70, 4),
              pointerEvents: 'none',
            }}>
            <div className={styles.ttName}>{tooltip.name}</div>
            <div className={styles.ttCode}>{tooltip.id} · {tooltip.country}</div>
            <div className={styles.ttVal}>
              {tooltip.val != null ? tooltip.val.toFixed(2) : 'n/a'}
            </div>
          </div>
        )}

        {/* Legend bar */}
        <div className={styles.legendBar}>
          <span className={styles.legendMin}>{minVal.toFixed(1)}</span>
          <div className={styles.legendGrad} />
          <span className={styles.legendMax}>{maxVal.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   TREND CHART COMPONENT (full-width, separate)
   ══════════════════════════════════════════════════════════ */
export function TrendChart({ state }) {
  const {
    filtered, regions, years, selectedYear, programmeAvg,
    focusRegionObjects, focusRegions,
    activeCountries, hasTimeSeries,
  } = state

  const [viewMode,    setViewMode]    = useState('countries')
  const [hiddenLines, setHiddenLines] = useState(new Set())
  const [hoveredLine, setHoveredLine] = useState(null)

  if (!hasTimeSeries) return null

  // Regions mode: individual lines for all regions of active countries
  // (hiddenLines at country level controls batch visibility)
  const selectedRegions = filtered  // all regions of active countries
  const effectiveMode   = viewMode  // no fallback — user chose the mode explicitly

  const trendData = useMemo(() => years.map(y => {
    const row = { year: y, 'Programme avg': programmeAvg[y] ?? null }
    const allVals = filtered.map(r => r.series[y]).filter(v => v != null)
    row['Regional avg'] = allVals.length
      ? +(allVals.reduce((a, b) => a + b, 0) / allVals.length).toFixed(2)
      : null
    if (effectiveMode === 'regions') {
      selectedRegions.forEach(r => { row[r.id] = r.series[y] ?? null })
    } else {
      activeCountries.forEach(c => {
        const vals = filtered.filter(r => r.country === c).map(r => r.series[y]).filter(v => v != null)
        if (vals.length) row[c] = +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2)
      })
    }
    return row
  }), [filtered, years, programmeAvg, effectiveMode, activeCountries, selectedRegions])

  // In Regions mode: lines = individual regions, legend = countries of those regions
  const regionLines = selectedRegions.map(r => ({
    key: r.id,
    country: r.country,
    label: `${r.id} — ${r.name}`,
    color: COUNTRY_COLORS[r.country] || '#6c8793',
  }))

  // Countries that appear in the selected regions (for Regions mode legend)
  const regionCountries = effectiveMode === 'regions'
    ? [...new Set(selectedRegions.map(r => r.country))]
    : []

  const dataLines = effectiveMode === 'regions'
    ? regionLines
    : activeCountries.map(c => ({ key: c, country: c, label: c, shortLabel: c, color: COUNTRY_COLORS[c] || '#6c8793' }))

  // In Regions mode, hiddenLines stores COUNTRY codes; a region is hidden if its country is hidden
  const isRegionHidden = (regionKey) => {
    if (effectiveMode !== 'regions') return hiddenLines.has(regionKey)
    const r = selectedRegions.find(r => r.id === regionKey)
    return r ? hiddenLines.has(r.country) : false
  }

  const toggleLine = (key) => {
    // key is always a country code (in both modes)
    setHiddenLines(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  /* ── Tooltip: show only hovered line + reference averages ── */
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null

    const refs = payload.filter(p =>
      (p.dataKey === 'Programme avg' || p.dataKey === 'Regional avg') &&
      !hiddenLines.has(p.dataKey)
    )

    const hovered = hoveredLine
      ? payload.find(p => p.dataKey === hoveredLine)
      : null

    const items = hovered ? [hovered, ...refs] : refs
    if (!items.length) return null

    return (
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border-md)',
        borderRadius: 'var(--r-m)',
        padding: '10px 14px',
        fontFamily: 'var(--font)',
        fontSize: 12,
        boxShadow: 'var(--shadow-m)',
        minWidth: 140,
      }}>
        <div style={{ fontWeight: 700, marginBottom: 6, color: 'var(--text-3)', fontSize: 11 }}>{label}</div>
        {items.map(p => (
          <div key={p.dataKey} style={{
            display: 'flex', justifyContent: 'space-between', gap: 16,
            alignItems: 'center', marginBottom: 3,
            color: p.dataKey === hoveredLine ? p.color : 'var(--text-2)',
            fontWeight: p.dataKey === hoveredLine ? 700 : 400,
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
              {p.name}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              {p.value != null ? p.value.toFixed(2) : '—'}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`card ${styles.trendCard}`}>
      <div className={styles.trendHead}>
        <span className="section-title">Trend over time</span>
        <div className={styles.toggleGroup}>
          <button
            className={`${styles.toggleBtn} ${viewMode === 'countries' ? styles.toggleActive : ''}`}
            onClick={() => setViewMode('countries')}
          >Countries</button>
          <button
            className={`${styles.toggleBtn} ${viewMode === 'regions' ? styles.toggleActive : ''}`}
            onClick={() => setViewMode('regions')}
          >Regions</button>
        </div>
      </div>

      <div className={styles.trendBody}>
        <ResponsiveContainer width="100%" height={380}>
          <LineChart data={trendData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
            <XAxis dataKey="year"
              tick={{ fontSize: 11, fill: 'var(--text-3)', fontFamily: 'var(--font)' }}
              tickLine={false} axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'var(--text-3)', fontFamily: 'var(--font)' }}
              tickLine={false} axisLine={false}
              domain={['auto', 'auto']} width={42}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine x={selectedYear} stroke="var(--petrol-light)" strokeDasharray="4 3" strokeWidth={1.5} />

            {!hiddenLines.has('Programme avg') && (
              <Line dataKey="Programme avg" stroke="var(--interreg-blue)"
                strokeWidth={2} strokeDasharray="6 3" dot={false}
                name="Programme avg" connectNulls
                onMouseEnter={() => setHoveredLine('Programme avg')}
                onMouseLeave={() => setHoveredLine(null)}
              />
            )}
            {!hiddenLines.has('Regional avg') && (
              <Line dataKey="Regional avg" stroke="var(--petrol)"
                strokeWidth={2} strokeDasharray="6 3" dot={false}
                name="Regional avg" connectNulls
                onMouseEnter={() => setHoveredLine('Regional avg')}
                onMouseLeave={() => setHoveredLine(null)}
              />
            )}

            {dataLines.map(l => !isRegionHidden(l.key) && (
              <Line key={l.key} dataKey={l.key} stroke={l.color}
                strokeWidth={hoveredLine === l.key ? 3 : 1.8}
                dot={{ r: 2, fill: l.color }}
                name={l.label} connectNulls
                onMouseEnter={() => setHoveredLine(l.key)}
                onMouseLeave={() => setHoveredLine(null)}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>

        {/* Legend — country mode shows color badges, region mode shows chips */}
        <div className={styles.legend}>
          {/* Reference lines */}
          {[
            { key: 'Programme avg', label: 'Programme avg', color: 'var(--interreg-blue)', dashed: true },
            { key: 'Regional avg',  label: 'Regional avg',  color: 'var(--petrol)',        dashed: true },
          ].map(item => {
            const hidden = hiddenLines.has(item.key)
            return (
              <button key={item.key}
                className={`${styles.legendItem} ${hidden ? styles.legendHidden : ''}`}
                onClick={() => toggleLine(item.key)}
              >
                <span className={styles.legendDot} style={{
                  background: hidden ? 'var(--border-md)' : item.color,
                  borderStyle: 'dashed',
                }} />
                <span className={styles.legendLabel}>{item.label}</span>
              </button>
            )
          })}

          {/* Countries mode: badge per country */}
          {effectiveMode === 'countries' && dataLines.map(l => {
            const hidden = hiddenLines.has(l.key)
            return (
              <button key={l.key}
                className={`${styles.legendItem} ${hidden ? styles.legendHidden : ''}`}
                onClick={() => toggleLine(l.key)}
                style={{ gap: 6 }}
              >
                <span style={{
                  background: hidden ? 'var(--border-md)' : l.color,
                  color: 'white', fontSize: 9, fontWeight: 800,
                  fontFamily: 'var(--font-head)', padding: '2px 5px',
                  borderRadius: 3, letterSpacing: 0.5, minWidth: 22, textAlign: 'center',
                }}>
                  {l.key}
                </span>
                <span className={styles.legendLabel}>{l.label}</span>
              </button>
            )
          })}

          {/* Regions mode: legend at COUNTRY level — hides/shows all regions of that country */}
          {effectiveMode === 'regions' && regionCountries.map(c => {
            const hidden = hiddenLines.has(c)
            const color  = COUNTRY_COLORS[c] || '#6c8793'
            const count  = selectedRegions.filter(r => r.country === c).length
            return (
              <button key={c}
                className={`${styles.legendItem} ${hidden ? styles.legendHidden : ''}`}
                onClick={() => toggleLine(c)}
                style={{ gap: 6 }}
              >
                <span style={{
                  background: hidden ? 'var(--border-md)' : color,
                  color: 'white', fontSize: 9, fontWeight: 800,
                  fontFamily: 'var(--font-head)', padding: '2px 5px',
                  borderRadius: 3, letterSpacing: 0.5, minWidth: 22, textAlign: 'center',
                }}>
                  {c}
                </span>
                <span className={styles.legendLabel}>
                  {c} <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>({count} region{count > 1 ? 's' : ''})</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
