import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import SchoolPage from './pages/SchoolPage.jsx'
import AboutUs from './pages/AboutUs.jsx'
import CollegeAdmissionTips from './pages/CollegeAdmissionTips.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/school/:id" element={<SchoolPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/college-admission-tips" element={<CollegeAdmissionTips />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
