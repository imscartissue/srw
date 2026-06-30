import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Layout/Header.jsx'
import CounsellingModal from './components/CounsellingModal.jsx'

export default function App() {
  const [counsellingOpen, setCounsellingOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCounsellingOpen={() => setCounsellingOpen(true)} />
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-7 animate-fadeIn max-md:px-4">
        <Outlet />
      </main>
      {counsellingOpen && <CounsellingModal onClose={() => setCounsellingOpen(false)} />}
    </div>
  )
}
