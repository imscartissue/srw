import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      className="fixed bottom-8 right-8 w-11 h-11 rounded-xl bg-slate-900 text-white border-none cursor-pointer flex items-center justify-center shadow-lg transition-all duration-200 z-50 hover:bg-slate-800 hover:-translate-y-1 hover:shadow-xl animate-fadeIn"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 15V3M9 3L4 8M9 3L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}
