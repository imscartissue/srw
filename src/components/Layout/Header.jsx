import { Link } from 'react-router-dom'

export default function Header({ onCounsellingOpen }) {
  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-slate-200 px-8 sticky top-0 z-50 h-16 flex items-center gap-10 max-md:px-4 max-md:gap-5">
      <Link to="/" className="flex items-center gap-2.5 no-underline text-slate-900 font-bold text-xl tracking-tight">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="6" fill="#1a365d"/>
          <path d="M7 20V12L14 8L21 12V20L14 24L7 20Z" fill="white" opacity="0.9"/>
          <rect x="12" y="14" width="4" height="6" fill="white" opacity="0.9"/>
        </svg>
        IEA <span className="bg-slate-800 text-white px-2.5 py-0.5 rounded-md text-xs font-semibold tracking-wider">RANKING</span>
      </Link>
      <nav className="flex gap-8 items-center">
        <Link to="/" className="no-underline text-slate-600 text-sm font-medium hover:text-slate-900 transition-colors">Home</Link>
        <Link to="/about" className="no-underline text-slate-600 text-sm font-medium hover:text-slate-900 transition-colors">About Us</Link>
        <Link to="/college-admission-tips" className="no-underline text-slate-600 text-sm font-medium hover:text-slate-900 transition-colors">College Admission Tips</Link>
        <button onClick={onCounsellingOpen} className="no-underline text-slate-600 text-sm font-medium hover:text-slate-900 transition-colors bg-transparent border-none cursor-pointer">Get College Counselling</button>
      </nav>
    </header>
  )
}
