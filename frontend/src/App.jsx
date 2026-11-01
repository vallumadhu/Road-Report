import './App.css'
import MapPage from './pages/MapPage.jsx'
import UploadPage from './pages/UploadPage.jsx'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </>
  )
}

export default App