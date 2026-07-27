export default function RedFlagView() {
  return (
    <div className="bg-white border border-red-200 rounded-xl p-12 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-5">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
          <line x1="4" y1="22" x2="4" y2="15"/>
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-slate-800 mb-2">Red Flag Schools</h2>
      <p className="text-[13px] text-slate-500 max-w-md mx-auto leading-relaxed">
        Schools flagged for serious concerns such as harassment, safety violations, or other critical issues.
      </p>
      <div className="mt-6 inline-block bg-slate-50 border border-slate-200 rounded-lg px-5 py-3">
        <p className="text-[13px] text-slate-400">Information unavailable — data coming soon.</p>
      </div>
    </div>
  )
}
