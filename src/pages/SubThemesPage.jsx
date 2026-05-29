import { useParams, useNavigate, Link } from 'react-router-dom'
import { getThemeById } from '../data/indicators-catalogue.js'
import ThemeIcon from '../components/ThemeIcon.jsx'
import styles from './SubThemesPage.module.css'

export default function SubThemesPage() {
  const { themeId } = useParams()
  const navigate    = useNavigate()
  const theme       = getThemeById(themeId)

  if (!theme) {
    return (
      <div className={styles.page}>
        <p className={styles.error}>Theme not found.</p>
        <Link to="/" className={styles.backLink}>← Back to Themes</Link>
      </div>
    )
  }

  const withData = theme.subThemes.filter(s => s.hasData).length

  return (
    <div className={styles.page}>
      <div
        className={styles.networkBg}
        aria-hidden="true"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}Network_Interreg_.png')` }}
      />

      <div className={styles.header}>
        <Link to="/" className={styles.backLink}>← Themes</Link>
        <div className={styles.themeTitle}>
          <ThemeIcon themeId={themeId} size={42} />
          <div>
            <h1 className={styles.title}>{theme.name}</h1>
            <p className={styles.meta}>
              <span className={styles.metaCount}>{theme.subThemes.length} sub-themes</span>
              <span className={styles.metaSep}>·</span>
              <span className={styles.metaAvail}>{withData} with data</span>
            </p>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {theme.subThemes.map((sub) => {
          const isTncoop    = sub.type === 'tncoop'
          const desc        = sub.metadata?.description ?? ''
          const sheetCount  = sub.dataSheets?.length ?? 0
          const hasSubInds  = sub.subIndicators?.length > 0

          return (
            <div
              key={sub.id}
              className={`${styles.card} ${sub.hasData ? styles.cardActive : styles.cardDisabled}`}
              onClick={sub.hasData ? () => navigate(`/theme/${themeId}/sub/${sub.id}`) : undefined}
              role={sub.hasData ? 'button' : undefined}
              tabIndex={sub.hasData ? 0 : undefined}
              onKeyDown={sub.hasData ? (e) => e.key === 'Enter' && navigate(`/theme/${themeId}/sub/${sub.id}`) : undefined}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.cardName}>{sub.name}</h3>
                <span className={isTncoop ? styles.badgeTncoop : styles.badgeAdditional}>
                  {isTncoop ? 'TNCOOP' : 'Additional'}
                </span>
              </div>

              <div className={styles.cardFooter}>
                {sub.hasData ? (
                  <>
                    <span className={styles.dataStatus}>
                      <span className={styles.dotGreen} /> Data available
                      {sheetCount > 0 && (
                        <span className={styles.sheetCount}>
                          {hasSubInds ? ` · ${sub.subIndicators.length} sub-indicators` : ` · ${sheetCount} sheet${sheetCount > 1 ? 's' : ''}`}
                        </span>
                      )}
                    </span>
                    {desc && <p className={styles.snippet}>{desc}</p>}
                  </>
                ) : (
                  <span className={styles.pendingLabel}>
                    <span className={styles.dotGrey} /> Data pending
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
