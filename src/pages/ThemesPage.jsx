import { useNavigate } from 'react-router-dom'
import { getAllThemes } from '../data/indicators-catalogue.js'
import ThemeIcon from '../components/ThemeIcon.jsx'
import styles from './ThemesPage.module.css'

export default function ThemesPage() {
  const navigate = useNavigate()
  const themes   = getAllThemes()

  return (
    <div className={styles.page}>
      <div
        className={styles.cooperationBg}
        aria-hidden="true"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}Network_Interreg_.png')` }}
      />

      <div className={styles.header}>
        <h1 className={styles.title}>
          Themes <span className={styles.titleSep}>|</span> Interreg Central Europe
        </h1>
        <p className={styles.subtitle}>8 thematic dimensions — TNCOOP Analytical Grid</p>
      </div>

      <div className={styles.grid}>
        {themes.map((theme) => {
          const isActive      = theme.subThemes.length > 0
          const withData      = theme.subThemes.filter(s => s.hasData).length
          const tncoopCount   = theme.subThemes.filter(s => s.type === 'tncoop').length
          const additionalCount = theme.subThemes.filter(s => s.type === 'additional').length

          return (
            <div
              key={theme.id}
              className={`${styles.card} ${isActive ? styles.cardActive : styles.cardDisabled}`}
              onClick={isActive ? () => navigate(`/theme/${theme.id}`) : undefined}
              role={isActive ? 'button' : undefined}
              tabIndex={isActive ? 0 : undefined}
              onKeyDown={isActive ? (e) => e.key === 'Enter' && navigate(`/theme/${theme.id}`) : undefined}
            >
              <div className={styles.iconWrap}>
                <ThemeIcon themeId={theme.id} size={38} />
              </div>

              <div className={styles.info}>
                <h3 className={styles.name}>{theme.name}</h3>
                {isActive ? (
                  <p className={styles.stats}>
                    {theme.subThemes.length} sub-themes
                    <span className={styles.dot}> · </span>
                    <span className={styles.statAvail}>{withData} with data</span>
                    {tncoopCount > 0 && (
                      <>
                        <span className={styles.dot}> · </span>
                        <span className={styles.statTncoop}>{tncoopCount} TNCOOP</span>
                      </>
                    )}
                    {additionalCount > 0 && (
                      <>
                        <span className={styles.dot}> · </span>
                        <span className={styles.statAdditional}>{additionalCount} additional</span>
                      </>
                    )}
                  </p>
                ) : (
                  <span className={styles.comingSoonLabel}>Coming soon</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
