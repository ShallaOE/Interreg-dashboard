import styles from './KpiStrip.module.css'

export default function KpiStrip({ stats, euVal, selectedYear, benchmarkLabel = 'Programme avg' }) {
  if (!stats) return null
  if (euVal == null) euVal = 0
  const gap = stats.avg - euVal

  const avgLabel = stats.isSelection
    ? `Selected avg (${stats.count} region${stats.count > 1 ? 's' : ''})`
    : 'Regional average'

  const cards = [
    {
      label: avgLabel,
      value: stats.avg.toFixed(1),
      sub: stats.isSelection
        ? `${stats.count} region${stats.count > 1 ? 's' : ''} selected`
        : `${stats.count} regions · 9 countries`,
      delta: (gap > 0 ? '+' : '') + gap.toFixed(1) + ' vs ' + benchmarkLabel,
      deltaOk: gap <= 0,
    },
    {
      label: stats.isSelection ? 'Highest (selection)' : 'Highest value',
      value: stats.max.toFixed(1),
      sub: stats.maxRegion?.name || '—',
      delta: '+' + (stats.max - euVal).toFixed(1) + ' vs ' + benchmarkLabel,
      deltaOk: false,
    },
    {
      label: stats.isSelection ? 'Lowest (selection)' : 'Lowest value',
      value: stats.min.toFixed(1),
      sub: stats.minRegion?.name || '—',
      delta: (stats.min - euVal).toFixed(1) + ' vs ' + benchmarkLabel,
      deltaOk: true,
    },
    {
      label: benchmarkLabel,
      value: euVal.toFixed(1),
      sub: `All CE regions · ${selectedYear}`,
      delta: gap === 0
        ? '= Selection avg'
        : (gap < 0 ? '+' : '') + (gap < 0 ? (-gap).toFixed(1) : gap.toFixed(1)) + ' gap vs selection',
      deltaOk: gap <= 0,
    },
  ]

  return (
    <div className={styles.grid}>
      {cards.map((c, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.label}>{c.label}</div>
          <div className={styles.value}>{c.value}</div>
          <div className={styles.sub}>{c.sub}</div>
          <div className={`${styles.delta} ${c.deltaOk ? styles.green : styles.red}`}>
            {c.delta}
          </div>
        </div>
      ))}
    </div>
  )
}
