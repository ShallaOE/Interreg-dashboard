import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import TopNav        from './components/TopNav.jsx'
import Footer        from './components/Footer.jsx'
import ThemesPage    from './pages/ThemesPage.jsx'
import SubThemesPage from './pages/SubThemesPage.jsx'
import IndicatorPage from './pages/IndicatorPage.jsx'
import styles        from './App.module.css'

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('interreg-theme') === 'dark'
  })
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('interreg-lang') ?? 'EN'
  })

  // Apply data-theme to <html> so CSS variables cascade everywhere
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem('interreg-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    localStorage.setItem('interreg-lang', lang)
  }, [lang])

  const toggleDark = () => setIsDark(d => !d)

  return (
    <div className={styles.shell}>
      <TopNav
        isDark={isDark}
        toggleDark={toggleDark}
        lang={lang}
        setLang={setLang}
      />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<ThemesPage />} />
          <Route path="/theme/:themeId" element={<SubThemesPage />} />
          <Route path="/theme/:themeId/sub/:subId" element={<IndicatorPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
