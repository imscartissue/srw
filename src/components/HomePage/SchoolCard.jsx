import { useNavigate } from 'react-router-dom'
import { CATEGORY_MAP } from '../../data/schoolsData.js'

const METRICS_LABELS = {
  schoolEnvironment: 'School Environment',
  infrastructure: 'Infrastructure',
  netCost: 'Net Cost',
  netBenefit: 'Net Benefit',
}

function scoreColor(val) {
  if (val >= 75) return '#16a34a'
  if (val >= 50) return '#d97706'
  return '#dc2626'
}

function rankMedalClass(rank) {
  if (rank === 1) return 'rank-medal-1'
  if (rank === 2) return 'rank-medal-2'
  if (rank === 3) return 'rank-medal-3'
  return ''
}

function rankBorderColor(rank) {
  if (rank === 1) return '#eab308'
  if (rank === 2) return '#94a3b8'
  if (rank === 3) return '#cd7f32'
  return undefined
}

export default function SchoolCard({ school, activeMetric, onMetricChange }) {
  const navigate = useNavigate()

  return (
    <div
      className="bg-white border border-slate-200 rounded-xl p-5 mb-2.5 grid grid-cols-[48px_1fr_auto] gap-4 items-center transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 hover:border-slate-300"
      style={school.rank <= 3 ? { borderLeft: `3px solid ${rankBorderColor(school.rank)}` } : {}}
      onClick={() => navigate(`/school/${school.id}`)}
    >
      <div className={`text-[22px] font-bold text-slate-800 leading-none ${rankMedalClass(school.rank) ? `animate-pulse-slow text-[${rankBorderColor(school.rank)}]` : ''}`}
        style={{ color: school.rank === 1 ? '#eab308' : school.rank === 2 ? '#94a3b8' : school.rank === 3 ? '#cd7f32' : undefined }}>
        #{school.rank}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-[14px] shrink-0"
            style={{ backgroundColor: school.logoColor }}>
            {school.logoInitials}
          </div>
          <div>
            <div className="text-base font-semibold text-slate-900 leading-tight">{school.name} ({school.shortName})</div>
            <div className="text-[13px] text-slate-500">{school.location}</div>
          </div>
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {CATEGORY_MAP.map(cat => (
            <button
              key={cat.key}
              className={`px-3 py-1 text-xs font-medium border border-slate-200 rounded-md text-slate-500 cursor-pointer bg-white transition-all duration-200 ${activeMetric === cat.key ? '!bg-slate-800 !border-slate-800 !text-white' : 'hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900'}`}
              onClick={e => { e.stopPropagation(); onMetricChange(cat.key) }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex gap-4 flex-wrap">
          {CATEGORY_MAP.filter(c => c.key === activeMetric).flatMap(cat =>
            cat.metrics.map(m => (
              <span key={m} className="text-xs text-slate-500">
                {METRICS_LABELS[m]}: <strong className="text-slate-900 font-semibold">{school[m]}</strong>
              </span>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-0.5 min-w-[80px]">
        <div className="text-[28px] font-bold text-slate-800 leading-none transition-colors" style={{ color: scoreColor(school.overallScore) }}>{school.overallScore}</div>
        <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Overall Score</div>
        <button
          className="mt-1.5 px-4 py-1.5 text-xs font-medium border border-slate-200 rounded-lg bg-slate-800 text-white border-slate-800 cursor-pointer transition-all duration-200 hover:bg-slate-900"
          onClick={e => { e.stopPropagation(); navigate(`/school/${school.id}`) }}
        >
          View School
        </button>
      </div>
    </div>
  )
}
