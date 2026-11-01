import { useEffect, useState } from 'react'
import './App.css'
import PotholeMap from './components/PotholeMap'

const API = 'https://road-report-y1tk.onrender.com/api'

const getreports = async () => {
  try {
    await fetch(`${API}/health`)
  } catch (error) {
    console.warn('Health check failed:', error)
  }

  try {
    const response = await fetch(`${API}/get_potholes`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    console.log('Fetched reports:', data)
    return data["reports"]
  } catch (error) {
    console.error('Error fetching reports:', error)
    throw error
  }
}

function App() {
  const [potholes, setPotholes] = useState([])

  useEffect(() => {
    getreports().then(setPotholes).catch(() => setPotholes([]))
  }, [])

  return (
    <>
      <PotholeMap potholes={potholes} />
    </>
  )
}

export default App