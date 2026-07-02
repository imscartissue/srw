import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import schoolsData, { rankSchools } from '../data/schoolsData.js'
import BackToTop from '../components/BackToTop.jsx'

const SIDEBAR_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'environment', label: 'School Environment' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'cost', label: 'Net Cost' },
  { id: 'benefit', label: 'Net Benefit' },
  { id: 'complaint', label: 'Complaint' },
]

function scoreBarClass(val) {
  if (val >= 75) return 'rating-bar-green'
  if (val >= 50) return 'rating-bar-amber'
  return 'rating-bar-red'
}

function scoreColor(val) {
  if (val >= 75) return '#16a34a'
  if (val >= 50) return '#d97706'
  return '#dc2626'
}

function rankMedalColor(rank) {
  if (rank === 1) return '#eab308'
  if (rank === 2) return '#94a3b8'
  if (rank === 3) return '#cd7f32'
  return undefined
}

export default function SchoolPage() {
  const { id } = useParams()
  const [activeSection, setActiveSection] = useState('overview')
  const [barAnimated, setBarAnimated] = useState(false)

  const ranked = rankSchools(schoolsData)
  const school = ranked.find(s => s.id === Number(id))

  useEffect(() => {
    const timer = setTimeout(() => setBarAnimated(true), 200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    const sections = SIDEBAR_ITEMS.map(item => document.getElementById(item.id)).filter(Boolean)
    sections.forEach(el => observer.observe(el))

    return () => sections.forEach(el => observer.unobserve(el))
  }, [school])

  if (!school) {
    return <div className="flex items-center justify-center min-h-[400px] text-[15px] text-slate-500">School not found</div>
  }

  const scrollTo = (sectionId) => {
    setActiveSection(sectionId)
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const SectionIcon = ({ bg, color, children }) => (
    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: bg, color }}>
      {children}
    </div>
  )

  return (
    <div className="grid grid-cols-[200px_1fr] gap-6 items-start max-md:grid-cols-1">
      <aside className="sticky top-22 bg-white border border-slate-200 rounded-xl py-3 max-md:static max-md:order-first max-md:flex max-md:overflow-x-auto max-md:gap-0 max-md:py-0 max-md:border-0 max-md:bg-transparent">
        <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 px-4 pb-2.5 border-b border-slate-100 mb-1 max-md:hidden">On this page</div>
        {SIDEBAR_ITEMS.map(item => (
          <div
            key={item.id}
            className={`px-4 py-2 text-[13px] text-slate-600 cursor-pointer transition-all duration-150 border-l-2 border-transparent font-medium whitespace-nowrap max-md:border-l-0 max-md:px-4 max-md:py-2 max-md:border-b-2 max-md:border-b-transparent ${activeSection === item.id ? 'text-blue-600 border-l-blue-600 bg-blue-50 max-md:border-b-blue-600' : ' hover:text-slate-900 hover:bg-slate-50'}`}
            onClick={() => scrollTo(item.id)}
          >
            {item.label}
          </div>
        ))}
      </aside>

      <div className="flex flex-col gap-5">
        <div className="bg-[linear-gradient(135deg,#ffffff_0%,#f0f4ff_50%,#faf5ff_100%)] border border-slate-200 rounded-xl p-8 animate-slideUp relative overflow-hidden" id="overview">
          <div className="absolute -top-60% -right-20% w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] pointer-events-none"></div>
          <div className="absolute -bottom-40% -left-10% w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.05)_0%,transparent_70%)] pointer-events-none"></div>
          <div className="flex items-start gap-5 max-md:flex-col max-md:items-center max-md:text-center">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0" style={{ backgroundColor: school.logoColor }}>
              {school.logoInitials}
            </div>
            <div className="flex-1">
              <div className="text-xs text-slate-400 mb-1.5">
                <Link to="/" className="text-slate-500 no-underline hover:text-blue-600 transition-colors">Home</Link> / <span>{school.name}</span>
              </div>
              <h1 className="text-[26px] font-bold tracking-tight mb-1.5">{school.name}</h1>
              <div className="text-sm text-slate-500 flex items-center flex-wrap gap-2 max-md:justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mr-1">
                  <path d="M7 13s4-4.5 4-7.5a4 4 0 00-8 0c0 3 4 7.5 4 7.5z" stroke="#64748b" strokeWidth="1.5" fill="none"/>
                  <circle cx="7" cy="5.5" r="1.5" stroke="#64748b" strokeWidth="1.5" fill="none"/>
                </svg>
                {school.location}
                <span className="inline-flex px-2.5 py-0.5 bg-slate-100 rounded-md text-xs font-semibold text-slate-600" style={school.rank <= 3 ? { color: rankMedalColor(school.rank), background: school.rank === 1 ? '#fefce8' : school.rank === 2 ? '#f8fafc' : '#fff7ed' } : {}}>Rank #{school.rank}</span>
                <span className="inline-flex px-2.5 py-0.5 bg-amber-50 text-amber-800 rounded-md text-xs font-semibold">Grades {school.gradeRange}</span>
              </div>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed max-w-2xl">{school.description}</p>
            </div>
            <div className="flex flex-col items-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              <svg className="w-[120px] h-[120px] block" viewBox="0 0 120 120">
                <circle className="score-ring-bg" cx="60" cy="60" r="52" />
                <circle className="score-ring-fg" cx="60" cy="60" r="52"
                  stroke={scoreColor(school.overallScore)}
                  strokeDasharray={326.726}
                  strokeDashoffset={barAnimated ? 326.726 * (1 - school.overallScore / 100) : 326.726}
                />
                <text className="text-[30px] font-bold" x="60" y="56" textAnchor="middle" dominantBaseline="central" fill={scoreColor(school.overallScore)}>{school.overallScore}</text>
                <text className="text-[10px] font-semibold" x="60" y="80" textAnchor="middle" dominantBaseline="central" fill="#94a3b8" letterSpacing="0.08em">OVERALL</text>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-7 animate-slideUp border-l-[3px] border-l-green-500" id="environment" style={{ animationDelay: '0.05s' }}>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-green-50 text-green-600">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2s-4 4-4 7a4 4 0 008 0c0-3-4-7-4-7z" fill="currentColor" opacity="0.3"/>
                <path d="M8 2s-4 4-4 7a4 4 0 008 0c0-3-4-7-4-7z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="8" cy="9" r="1.5" fill="currentColor"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight">School Environment</h2>
          </div>
          <p className="text-[13px] text-slate-500 mb-5">An assessment of the overall school atmosphere, culture, student life, and the quality of the surrounding learning environment.</p>
          <div className="grid grid-cols-1 gap-3">
            <div className="grid grid-cols-[160px_1fr_40px] gap-3 items-center max-md:grid-cols-1 max-md:gap-1">
              <div className="text-[13px] text-slate-600 font-medium">School Environment Score</div>
              <div className="rating-bar-wrap"><div className={`rating-bar ${scoreBarClass(school.schoolEnvironment)}`} style={{ width: barAnimated ? `${school.schoolEnvironment}%` : '0%' }}></div></div>
              <span className="text-[13px] font-semibold text-right max-md:text-left" style={{ color: scoreColor(school.schoolEnvironment) }}>{school.schoolEnvironment}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-7 animate-slideUp border-l-[3px] border-l-blue-500" id="infrastructure" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-blue-50 text-blue-600">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="7" width="4" height="7" rx="0.5" fill="currentColor" opacity="0.3"/>
                <rect x="10" y="4" width="4" height="10" rx="0.5" fill="currentColor" opacity="0.3"/>
                <rect x="6" y="2" width="4" height="12" rx="0.5" stroke="currentColor" strokeWidth="1.3" fill="none"/>
                <path d="M2 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight">Infrastructure</h2>
          </div>
          <p className="text-[13px] text-slate-500 mb-5">Evaluation of physical facilities including classrooms, laboratories, libraries, sports grounds, technology, and campus amenities.</p>
          <div className="grid grid-cols-1 gap-3">
            <div className="grid grid-cols-[160px_1fr_40px] gap-3 items-center max-md:grid-cols-1 max-md:gap-1">
              <div className="text-[13px] text-slate-600 font-medium">Infrastructure Score</div>
              <div className="rating-bar-wrap"><div className={`rating-bar ${scoreBarClass(school.infrastructure)}`} style={{ width: barAnimated ? `${school.infrastructure}%` : '0%' }}></div></div>
              <span className="text-[13px] font-semibold text-right max-md:text-left" style={{ color: scoreColor(school.infrastructure) }}>{school.infrastructure}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-7 animate-slideUp border-l-[3px] border-l-amber-500" id="cost" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-amber-50 text-amber-600">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="5" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.3" fill="none"/>
                <path d="M5 5V4a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.3" fill="none"/>
                <circle cx="8" cy="10" r="1.5" fill="currentColor"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight">Net Cost — Fee Structure</h2>
          </div>
          <p className="text-[13px] text-slate-500 mb-5">Detailed fee breakdown for the school. All amounts are in Nepalese Rupees (NRS).</p>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {[
              { label: 'Admission Fee', value: school.admissionFee, note: 'One-time payment at enrollment' },
              { label: 'Monthly Fee', value: school.monthlyFee, note: 'Per month tuition' },
              { label: 'Annual Fee', value: school.annualFee, note: 'Total yearly cost' },
            ].map((item, i) => (
              <div key={item.label}
                className="border border-slate-200 rounded-xl p-6 text-center bg-slate-50 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300 animate-slideUp"
                style={{ animationDelay: `${0.05 + i * 0.05}s` }}>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{item.label}</div>
                <div className="text-[22px] font-bold text-slate-900 mb-1.5">NRS {item.value?.toLocaleString()}</div>
                <div className="text-xs text-slate-400">{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-7 animate-slideUp border-l-[3px] border-l-purple-500" id="benefit" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-purple-50 text-purple-600">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 12l4-6 3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M2 12l4-6 3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" transform="translate(0, 3)" opacity="0.3"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight">Net Benefit</h2>
          </div>
          <p className="text-[13px] text-slate-500 mb-5">How much benefit the student gains after leaving the school — reflecting career outcomes, higher education placement, alumni network strength, and long-term success.</p>
          <div className="grid grid-cols-1 gap-3">
            <div className="grid grid-cols-[160px_1fr_40px] gap-3 items-center max-md:grid-cols-1 max-md:gap-1">
              <div className="text-[13px] text-slate-600 font-medium">Net Benefit Score</div>
              <div className="rating-bar-wrap"><div className={`rating-bar ${scoreBarClass(school.netBenefit)}`} style={{ width: barAnimated ? `${school.netBenefit}%` : '0%' }}></div></div>
              <span className="text-[13px] font-semibold text-right max-md:text-left" style={{ color: scoreColor(school.netBenefit) }}>{school.netBenefit}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-7 animate-slideUp border-l-[3px] border-l-red-500" id="complaint" style={{ animationDelay: '0.25s' }}>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-red-50 text-red-600">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1C4.134 1 1 4.134 1 8s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
                <path d="M5.5 6s.5-1.5 2.5-1.5S10.5 6 10.5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
                <path d="M4.5 9.5s1 2 3.5 2 3.5-2 3.5-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight">Complaint</h2>
          </div>
          <p className="text-[13px] text-slate-500 mb-5">Registered complaints and their resolution status for this institution.</p>
          <div className="flex items-center justify-center py-6 text-sm text-slate-400 font-medium">
            {school.complaint}
          </div>
        </div>

        <div className="text-center text-xs text-slate-400 py-6 border-t border-slate-100 mt-2">
          Based on anonymous student survey responses. Scores and fee data collected from student feedback.
        </div>
      </div>
      <BackToTop />
    </div>
  )
}
