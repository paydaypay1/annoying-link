import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Donate from '../pages/Donate'
import Features from '../pages/Features'
import WebDJ from '../pages/features/WebDJ'
import BrowserLab from '../pages/features/BrowserLab'

export default function MainContent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/features" element={<Features />} />
        <Route path="/features/webdj" element={<WebDJ />} />
        <Route path="/features/browserlab" element={<BrowserLab />} />
      </Routes>
    </BrowserRouter>
  )
}