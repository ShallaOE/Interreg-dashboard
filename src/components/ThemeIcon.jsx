/* Icone tema — cerchio pieno petrol + icona bianca solida, stile Interreg CE Brand Book */

const paths = {
  'environment-climate': (
    <>
      {/* Leaf / plant */}
      <path d="M24 10C24 10 14 14 14 22C14 26.4 17.6 30 22 30L22 24C22 24 26 22 28 18C30 14 28 10 24 10Z" fill="white"/>
      <path d="M22 30C22 30 20 26 20 22" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="22" cy="31" r="1.5" fill="white"/>
    </>
  ),
  'demography-geography': (
    <>
      {/* Two people */}
      <circle cx="16" cy="14" r="3.5" fill="white"/>
      <path d="M10 26C10 22 12.5 20 16 20C19.5 20 22 22 22 26" fill="white"/>
      <circle cx="26" cy="14" r="3.5" fill="white"/>
      <path d="M20 26C20 22.5 22.5 20 26 20C29.5 20 32 22.5 32 26" fill="white"/>
    </>
  ),
  'innovation-research-smes': (
    <>
      {/* Lightbulb */}
      <path d="M21 10C17.13 10 14 13.13 14 17C14 19.6 15.4 21.9 17.5 23.1V26H24.5V23.1C26.6 21.9 28 19.6 28 17C28 13.13 24.87 10 21 10Z" fill="white"/>
      <rect x="17.5" y="26" width="7" height="1.5" rx="0.75" fill="white"/>
      <rect x="18.5" y="28.5" width="5" height="1.5" rx="0.75" fill="white"/>
      <rect x="20" y="13" width="2" height="3" rx="1" fill="rgba(108,135,147,0.5)"/>
    </>
  ),
  'digital-connectivity-transport': (
    <>
      {/* Network nodes */}
      <circle cx="21" cy="21" r="3" fill="white"/>
      <circle cx="11" cy="14" r="2.5" fill="white"/>
      <circle cx="31" cy="14" r="2.5" fill="white"/>
      <circle cx="11" cy="28" r="2.5" fill="white"/>
      <circle cx="31" cy="28" r="2.5" fill="white"/>
      <line x1="13" y1="15.2" x2="18.5" y2="19" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="29" y1="15.2" x2="23.5" y2="19" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="13" y1="26.8" x2="18.5" y2="23" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="29" y1="26.8" x2="23.5" y2="23" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    </>
  ),
  'sustainable-regional-development': (
    <>
      {/* Circular arrows / recycle */}
      <path d="M21 12L21 8L17 12L21 12Z" fill="white"/>
      <path d="M21 8C26 8 30 12 30 17C30 19.2 29.2 21.2 27.9 22.8" stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M21 30L21 34L25 30L21 30Z" fill="white"/>
      <path d="M21 34C16 34 12 30 12 25C12 22.8 12.8 20.8 14.1 19.2" stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M27.9 22.8L30 26L33 23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M14.1 19.2L12 16L9 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </>
  ),
  'cultural-heritage-tourism': (
    <>
      {/* Classical columns */}
      <rect x="10" y="27" width="22" height="2.5" rx="1" fill="white"/>
      <rect x="11" y="20" width="20" height="2" rx="1" fill="white"/>
      <rect x="13" y="20" width="2.5" height="7" rx="1" fill="white"/>
      <rect x="19.75" y="20" width="2.5" height="7" rx="1" fill="white"/>
      <rect x="26.5" y="20" width="2.5" height="7" rx="1" fill="white"/>
      <path d="M11 20L21 12L31 20" fill="white"/>
    </>
  ),
  'housing': (
    <>
      {/* House */}
      <path d="M11 22L21 13L31 22" fill="white"/>
      <path d="M14 20.5V30H28V20.5" fill="white"/>
      <rect x="18" y="24" width="6" height="6" rx="0.5" fill="rgba(108,135,147,0.5)"/>
    </>
  ),
  'people-to-people': (
    <>
      {/* Handshake / cooperation */}
      <circle cx="15" cy="13" r="3" fill="white"/>
      <circle cx="27" cy="13" r="3" fill="white"/>
      <circle cx="21" cy="11" r="3.5" fill="white"/>
      <path d="M9 24C9 20 11.5 18 15 18C17 18 18.8 18.8 20 20C22 18.5 24 18 27 18C30.5 18 33 20 33 24L33 26L9 26Z" fill="white"/>
    </>
  ),
}

export default function ThemeIcon({ themeId, size = 48, color = 'var(--petrol)' }) {
  const content = paths[themeId]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cerchio pieno petrol */}
      <circle cx="21" cy="21" r="21" fill={color}/>
      {/* Icona bianca solida */}
      {content ?? <circle cx="21" cy="21" r="6" fill="white"/>}
    </svg>
  )
}
