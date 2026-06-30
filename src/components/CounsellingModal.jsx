import { useState } from 'react'

export default function CounsellingModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', grade: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent('College Counselling Request')
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nGrade: ${form.grade}\nMessage: ${form.message}`
    )
    window.open(`mailto:yogeshworsharma.official@gmail.com?subject=${subject}&body=${body}`)
    setSent(true)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-7 animate-slideUp max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold tracking-tight">Get College Counselling</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg bg-transparent border-none cursor-pointer text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all text-lg">&times;</button>
        </div>

        {sent ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-1">Request Submitted</h3>
            <p className="text-sm text-slate-500">Your details have been prepared. Please send the email from your email client to complete the submission.</p>
            <button onClick={onClose} className="mt-5 px-6 py-2.5 text-sm font-medium bg-slate-800 text-white rounded-xl border-none cursor-pointer hover:bg-slate-900 transition-colors">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all" />
            <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all" />
            <input name="phone" type="tel" placeholder="Phone Number" value={form.phone} onChange={handleChange} required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all" />
            <select name="grade" value={form.grade} onChange={handleChange} required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all bg-white">
              <option value="">Select your grade</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
              <option value="graduated">Graduated</option>
            </select>
            <textarea name="message" placeholder="Your message or questions..." value={form.message} onChange={handleChange} rows={4}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all resize-none" />
            <button type="submit"
              className="w-full py-3 text-sm font-semibold bg-slate-800 text-white rounded-xl border-none cursor-pointer hover:bg-slate-900 transition-colors">
              Submit Request
            </button>
            <p className="text-xs text-slate-400 text-center">This will open your email client with the details pre-filled.</p>
          </form>
        )}
      </div>
    </div>
  )
}
