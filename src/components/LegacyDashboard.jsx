import { useAppState } from '../hooks/useAppState.js'
import KpiStrip     from './KpiStrip.jsx'
import MapSection   from './MapSection.jsx'
import RankingChart from './RankingChart.jsx'
import DataTable    from './DataTable.jsx'
import Footer       from './Footer.jsx'
import styles       from '../App.module.css'

export default function LegacyDashboard() {
  const state = useAppState()

  return (
    <>
      <div className={styles.pageHead}>
        <h1 className={styles.pageTitle}>Interreg CENTRAL EUROPE Dashboard</h1>
        <p className={styles.pageDesc}>
          Regional unemployment rates · Eurostat data · Central &amp; Eastern Europe ·{' '}
          {state.filtered.length} regions · {state.activeCountries.length} countries
        </p>
      </div>

      <KpiStrip
        stats={state.stats}
        euVal={state.euVal}
        selectedYear={state.selectedYear}
      />

      <section>
        <MapSection state={state} />
      </section>

      <section>
        <div className="section-header">
          <h2 className="section-title">Regional ranking — {state.selectedYear}</h2>
        </div>
        <RankingChart
          regions={state.filtered}
          selectedYear={state.selectedYear}
          euVal={state.euVal}
          focusRegionId={state.focusRegionId}
          onSelect={state.setFocusRegionId}
        />
      </section>

      <section>
        <div className="section-header">
          <h2 className="section-title">Full data table</h2>
        </div>
        <DataTable
          regions={state.filtered}
          years={state.years}
          selectedYear={state.selectedYear}
          euVal={state.euVal}
          focusRegionId={state.focusRegionId}
          onSelect={state.setFocusRegionId}
        />
      </section>

      <Footer />
    </>
  )
}
