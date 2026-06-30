import { Link } from 'react-router-dom'

export default function CollegeAdmissionTips() {
  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <Link to="/" className="text-xs text-slate-400 no-underline hover:text-blue-600 transition-colors">Home</Link>
        <span className="text-xs text-slate-300 mx-2">/</span>
        <span className="text-xs text-slate-500">College Admission Tips</span>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
        Information unavailable
      </p>
    </div>
  )
}
