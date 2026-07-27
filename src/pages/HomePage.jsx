import { useState, useMemo } from 'react'
import schoolsData, { rankSchools } from '../data/schoolsData.js'
import TopBar from '../components/HomePage/TopBar.jsx'
import SchoolCard from '../components/HomePage/SchoolCard.jsx'
import RedFlagView from '../components/HomePage/RedFlagView.jsx'
import BackToTop from '../components/BackToTop.jsx'

function scoreColor(val) {
  if (val >= 75) return '#16a34a'
  if (val >= 50) return '#d97706'
  return '#dc2626'
}

function rankMedalClass(rank) {
  if (rank === 1) return 'text-yellow-500'
  if (rank === 2) return 'text-slate-400'
  if (rank === 3) return 'text-amber-700'
  return ''
}

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('rank')
  const [activeMetric, setActiveMetric] = useState('environment')
  const [viewMode, setViewMode] = useState('normal')
  const [subViewMode, setSubViewMode] = useState('quick')

  const ranked = useMemo(() => rankSchools(schoolsData), [])

  const filtered = useMemo(() => {
    let list = ranked

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.shortName.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q)
      )
    }

    switch (sort) {
      case 'name':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'score':
        list = [...list].sort((a, b) => b.overallScore - a.overallScore)
        break
      default:
        break
    }

    return list
  }, [ranked, search, sort])

  return (
    <div>
      <TopBar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        subViewMode={subViewMode}
        onSubViewModeChange={setSubViewMode}
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
        resultCount={filtered.length}
      />

      <div className="text-[13px] text-slate-400 mb-1">
        Publication date: 15 June 2026 | Ranking of Nepali Schools
      </div>
      <div className="text-[12px] text-slate-400 mb-4">
        Data collected from anonymous student surveys.
      </div>

      {viewMode === 'normal' ? (
        subViewMode === 'quick' ? (
          filtered.map(school => (
            <SchoolCard
              key={school.id}
              school={school}
              activeMetric={activeMetric}
              onMetricChange={setActiveMetric}
            />
          ))
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 border-b border-slate-200 sticky top-0 z-10">Rank</th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 border-b border-slate-200 sticky top-0 z-10">School</th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 border-b border-slate-200 sticky top-0 z-10">Location</th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 border-b border-slate-200 sticky top-0 z-10">Grades</th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 border-b border-slate-200 sticky top-0 z-10">School Env.</th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 border-b border-slate-200 sticky top-0 z-10">Infrastructure</th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 border-b border-slate-200 sticky top-0 z-10">Net Cost</th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 border-b border-slate-200 sticky top-0 z-10">Net Benefit</th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 border-b border-slate-200 sticky top-0 z-10">Overall</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id} className="cursor-pointer transition-colors duration-150 hover:bg-slate-100 active:bg-slate-200"
                    onClick={() => window.location.hash = `/school/${s.id}`}>
                    <td className="px-4 py-3 border-b border-slate-100">
                      <span className={`font-semibold ${rankMedalClass(s.rank)} ${s.rank <= 3 ? 'animate-pulse-slow' : 'text-slate-500'}`}>#{s.rank}</span>
                    </td>
                    <td className="px-4 py-3 border-b border-slate-100 text-slate-700">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-[11px] shrink-0" style={{ backgroundColor: s.logoColor }}>
                          {s.logoInitials}
                        </div>
                        {s.name} ({s.shortName})
                      </div>
                    </td>
                    <td className="px-4 py-3 border-b border-slate-100 text-slate-700">{s.location}</td>
                    <td className="px-4 py-3 border-b border-slate-100 text-slate-700">{s.gradeRange}</td>
                    <td className="px-4 py-3 border-b border-slate-100 font-semibold" style={{ color: scoreColor(s.schoolEnvironment) }}>{s.schoolEnvironment}</td>
                    <td className="px-4 py-3 border-b border-slate-100 font-semibold" style={{ color: scoreColor(s.infrastructure) }}>{s.infrastructure}</td>
                    <td className="px-4 py-3 border-b border-slate-100 font-semibold" style={{ color: scoreColor(s.netCost) }}>{s.netCost}</td>
                    <td className="px-4 py-3 border-b border-slate-100 font-semibold" style={{ color: scoreColor(s.netBenefit) }}>{s.netBenefit}</td>
                    <td className="px-4 py-3 border-b border-slate-100"><strong style={{ color: scoreColor(s.overallScore) }}>{s.overallScore}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <RedFlagView />
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto">
            <rect x="6" y="10" width="36" height="28" rx="4" stroke="#cbd5e0" strokeWidth="2" fill="none"/>
            <path d="M6 18h36" stroke="#cbd5e0" strokeWidth="2"/>
            <path d="M20 18v20" stroke="#cbd5e0" strokeWidth="2"/>
          </svg>
          <h3 className="text-base text-slate-600 mt-3 mb-1">No schools found</h3>
          <p className="text-[13px]">Try adjusting your search or filters.</p>
        </div>
      )}

      <BackToTop />
    </div>
  )
}
