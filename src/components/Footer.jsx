import styles from './Footer.module.css'

export default function Footer() {
  const year = 2025

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* Left — branding */}
        <div className={styles.brand}>
          <span className={styles.dashName}>Interreg Central Europe Dashboard</span>
          <span className={styles.sep}>·</span>
          <span className={styles.poweredBy}>powered by</span>
          <img
            src={`${import.meta.env.BASE_URL}OpenEconomics-LOGO BLACK.png`}
            alt="OpenEconomics"
            className={styles.oeLogo}
          />
        </div>

        {/* Right — legal */}
        <div className={styles.legal}>
          <span>© {year} OpenEconomics S.r.l. — VAT IT12504821005</span>
        </div>

      </div>
    </footer>
  )
}
