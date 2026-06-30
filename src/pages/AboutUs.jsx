import { Link } from 'react-router-dom'

export default function AboutUs() {
  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <Link to="/" className="text-xs text-slate-400 no-underline hover:text-blue-600 transition-colors">Home</Link>
        <span className="text-xs text-slate-300 mx-2">/</span>
        <span className="text-xs text-slate-500">About Us</span>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
        Information available for right now
      </p>
    </div>
  )
}
