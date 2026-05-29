import { useState, useMemo } from 'react'
import { getIndicatorData } from '../data/indicators-data.js'

export const CE_COUNTRIES = [
  { code: 'AT', name: 'Austria' },
  { code: 'CZ', name: 'Czechia' },
  { code: 'DE', name: 'Germany' },
  { code: 'HR', name: 'Croatia' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IT', name: 'Italy' },
  { code: 'PL', name: 'Poland' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'SK', name: 'Slovakia' },
]

const COUNTRY_NAMES = Object.fromEntries(CE_COUNTRIES.map(c => [c.code, c.name]))

export function useIndicatorState(sheetCode) {
  const raw  = getIndicatorData(sheetCode)
  const years = raw?.years || []

  // Normalize: add id (=code) and countryName so existing components work
  const regions = (raw?.regions || []).map(r => ({
    ...r,
    id: r.code,
    countryName: COUNTRY_NAMES[r.country] || r.country,
  }))

  const allCountryCodes  = CE_COUNTRIES.map(c => c.code)
  const allRegionCodes   = regions.map(r => r.code)

  const [selectedYear,    setSelectedYear]    = useState(years[years.length - 1] || '2024')
  const [activeCountries, setActiveCountries] = useState(allCountryCodes)
  const [focusRegions,    setFocusRegions]    = useState(allRegionCodes)

  const filtered = useMemo(
    () => activeCountries.length === 0
      ? []
      : regions.filter(r => activeCountries.includes(r.country)),
    [regions, activeCountries]
  )

  // Stats computed on selected regions (focusRegions), fallback to all filtered
  const statsRegions = useMemo(() => {
    if (focusRegions.length > 0) {
      return regions.filter(r => focusRegions.includes(r.code))
    }
    return filtered
  }, [focusRegions, regions, filtered])

  const stats = useMemo(() => {
    const vals = statsRegions.map(r => r.series[selectedYear]).filter(v => v != null)
    if (!vals.length) return null
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length
    const max = Math.max(...vals)
    const min = Math.min(...vals)
    const isSelection = focusRegions.length > 0 && focusRegions.length < regions.length
    return {
      avg, max, min, count: vals.length,
      maxRegion: statsRegions.find(r => r.series[selectedYear] === max),
      minRegion: statsRegions.find(r => r.series[selectedYear] === min),
      isSelection,
    }
  }, [statsRegions, selectedYear, focusRegions, regions])

  const focusRegionObjects = useMemo(
    () => focusRegions.map(id => regions.find(r => r.code === id)).filter(Boolean),
    [focusRegions, regions]
  )

  const focusRegionId = focusRegions[0] || null

  const setFocusRegionId = (id) => {
    if (!id) setFocusRegions([])
    else setFocusRegions(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    )
  }

  // Programme area average = FIXED reference over ALL CE regions, ignoring filters
  const programmeAvg = useMemo(() => {
    const result = {}
    years.forEach(y => {
      const vals = regions.map(r => r.series[y]).filter(v => v != null)
      result[y] = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null
    })
    return result
  }, [regions, years])

  return {
    regions, years, filtered,
    selectedYear, setSelectedYear,
    activeCountries, setActiveCountries,
    focusRegions, setFocusRegions,
    focusRegionId, setFocusRegionId,
    focusRegionObjects,
    stats,
    programmeAvg,
    // MapSection compatibility: expose programmeAvg as eu27
    eu27: programmeAvg,
    countries: CE_COUNTRIES,
    hasTimeSeries: years.length > 2,
  }
}
