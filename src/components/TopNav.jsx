import { useState, useRef, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { getThemeById, getSubThemeById } from '../data/indicators-catalogue.js'
import styles from './TopNav.module.css'

const LANGUAGES = [
  { code: 'EN', label: 'English' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'FR', label: 'Français' },
  { code: 'IT', label: 'Italiano' },
  { code: 'ES', label: 'Español' },
]

export default function TopNav({ isDark, toggleDark, lang, setLang }) {
  const location  = useLocation()
  const { themeId, subId } = useParams() ?? {}

  const [userOpen, setUserOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const userRef = useRef(null)
  const langRef = useRef(null)

  const isRoot      = location.pathname === '/'
  const isTheme     = Boolean(themeId && !subId)
  const isIndicator = Boolean(themeId && subId)

  const currentLang  = LANGUAGES.find(l => l.code === lang) ?? LANGUAGES[0]
  const themeObj     = themeId ? getThemeById(themeId) : null
  const subThemeObj  = (themeId && subId) ? getSubThemeById(themeId, subId) : null
  const themeName    = themeObj?.name    ?? themeId
  const subThemeName = subThemeObj?.name ?? subId

  useEffect(() => {
    function onMouseDown(e) {
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false)
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [])

  return (
    <header className={styles.topnav}>

      {/* ── Logo ── */}
      <Link to="/" className={styles.logoWrap} aria-label="Interreg CENTRAL EUROPE — Home">
        <img
          src={`${import.meta.env.BASE_URL}Interreg_Logo.svg`}
          alt="Interreg CENTRAL EUROPE — Co-funded by the European Union"
          className={styles.logo}
        />
      </Link>

      <div className={styles.logoDivider} />

      {/* ── Right actions ── */}
      <div className={styles.actions}>

        {/* Language selector */}
        <div className={styles.langWrap} ref={langRef}>
          <button
            className={styles.langBtn}
            onClick={() => setLangOpen(o => !o)}
            aria-haspopup="listbox"
            aria-expanded={langOpen}
          >
            <span className={styles.langCode}>{currentLang.code}</span>
            <span className={styles.chevron}>▾</span>
          </button>

          {langOpen && (
            <div className={styles.dropdown} role="listbox">
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  role="option"
                  aria-selected={l.code === lang}
                  className={`${styles.dropItem} ${l.code === lang ? styles.dropItemActive : ''}`}
                  onClick={() => { setLang(l.code); setLangOpen(false) }}
                >
                  <span className={styles.dropItemCode}>{l.code}</span>
                  <span className={styles.dropItemLabel}>{l.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dark / Light toggle */}
        <button
          className={styles.iconBtn}
          onClick={toggleDark}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? '☀' : '🌙'}
        </button>

        <div className={styles.actionDivider} />

        {/* User account */}
        <div className={styles.userWrap} ref={userRef}>
          <button
            className={styles.userBtn}
            onClick={() => setUserOpen(o => !o)}
            aria-haspopup="menu"
            aria-expanded={userOpen}
          >
            <span className={styles.avatar}>AT</span>
            <span className={styles.userName}>Alex Turner</span>
            <span className={styles.chevron}>▾</span>
          </button>

          {userOpen && (
            <div className={`${styles.dropdown} ${styles.dropdownRight}`} role="menu">
              <div className={styles.dropHeader}>
                <div className={styles.dropHeaderName}>Alex Turner</div>
                <div className={styles.dropHeaderRole}>Programme Analyst</div>
              </div>
              <div className={styles.dropDivider} />
              <button className={styles.dropItem} role="menuitem">
                <span className={styles.dropIcon}>👤</span> Edit profile
              </button>
              <button className={styles.dropItem} role="menuitem">
                <span className={styles.dropIcon}>⚙</span> Settings
              </button>
              <div className={styles.dropDivider} />
              <button className={`${styles.dropItem} ${styles.dropItemDanger}`} role="menuitem">
                <span className={styles.dropIcon}>↩</span> Sign out
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}
