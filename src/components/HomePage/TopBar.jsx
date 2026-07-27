export default function TopBar({ viewMode, onViewModeChange, subViewMode, onSubViewModeChange, search, onSearchChange, sort, onSortChange, resultCount }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex gap-0 bg-slate-100 rounded-xl p-0.5">
          <button
            className={`px-4 py-2 text-[13px] font-medium cursor-pointer border-none bg-transparent text-slate-500 rounded-lg transition-all duration-200 flex items-center ${viewMode === 'normal' ? 'bg-white text-slate-900 shadow-sm' : ''}`}
            onClick={() => onViewModeChange('normal')}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mr-1.5">
              <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" opacity="0.7"/>
              <rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor" opacity="0.7"/>
              <rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor" opacity="0.7"/>
              <rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor" opacity="0.7"/>
            </svg>
            Normal View
          </button>
          <button
            className={`px-4 py-2 text-[13px] font-medium cursor-pointer border-none bg-transparent text-slate-500 rounded-lg transition-all duration-200 flex items-center ${viewMode === 'redflag' ? 'bg-red-50 text-red-700 shadow-sm' : ''}`}
            onClick={() => onViewModeChange('redflag')}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mr-1.5">
              <path d="M2 1v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M2 1h8l-2 3 2 3H2" fill="currentColor" opacity="0.7"/>
            </svg>
            Red Flag
          </button>
        </div>

        {viewMode === 'normal' && (
          <div className="flex gap-0 bg-slate-100 rounded-xl p-0.5">
            <button
              className={`px-4 py-2 text-[13px] font-medium cursor-pointer border-none bg-transparent text-slate-500 rounded-lg transition-all duration-200 flex items-center ${subViewMode === 'quick' ? 'bg-white text-slate-900 shadow-sm' : ''}`}
              onClick={() => onSubViewModeChange('quick')}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mr-1.5">
                <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" opacity="0.7"/>
                <rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor" opacity="0.7"/>
                <rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor" opacity="0.7"/>
                <rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor" opacity="0.7"/>
              </svg>
              Quick View
            </button>
            <button
              className={`px-4 py-2 text-[13px] font-medium cursor-pointer border-none bg-transparent text-slate-500 rounded-lg transition-all duration-200 flex items-center ${subViewMode === 'table' ? 'bg-white text-slate-900 shadow-sm' : ''}`}
              onClick={() => onSubViewModeChange('table')}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mr-1.5">
                <rect x="1" y="1" width="12" height="3" rx="1" fill="currentColor" opacity="0.7"/>
                <rect x="1" y="5.5" width="12" height="3" rx="1" fill="currentColor" opacity="0.7"/>
                <rect x="1" y="10" width="12" height="3" rx="1" fill="currentColor" opacity="0.7"/>
              </svg>
              Table View
            </button>
          </div>
        )}

        <input
          type="text"
          className="flex-1 min-w-[180px] max-w-[320px] px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none transition-all duration-200 bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
          placeholder="Search schools..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
        />

        <span className="text-[13px] text-slate-500 font-medium whitespace-nowrap">{resultCount} Results</span>

        <div className="flex items-center gap-2 text-[13px] text-slate-500">
          <span>Sort:</span>
          <select className="px-3 py-2 border border-slate-200 rounded-lg text-[13px] bg-white outline-none cursor-pointer text-slate-900" value={sort} onChange={e => onSortChange(e.target.value)}>
            <option value="rank">Rank: High to Low</option>
            <option value="name">Name: A-Z</option>
            <option value="score">Score: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  )
}
