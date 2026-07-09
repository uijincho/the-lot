import { useState } from 'react'

type Theme = 'finals' | 'day'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(
    () => (document.documentElement.getAttribute('data-theme') as Theme) ?? 'finals'
  )

  function toggle() {
    const next: Theme = theme === 'finals' ? 'day' : 'finals'
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
    setTheme(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title={theme === 'finals' ? 'Switch to Daylight' : 'Switch to Finals Night'}
      className="p-2 rounded-lg text-text-dim hover:text-text transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-structure"
      aria-label={theme === 'finals' ? 'Switch to Daylight' : 'Switch to Finals Night'}
    >
      {theme === 'finals' ? (
        /* sun */
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ) : (
        /* moon */
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M13.5 10A6 6 0 0 1 6 2.5a6 6 0 1 0 7.5 7.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  )
}
