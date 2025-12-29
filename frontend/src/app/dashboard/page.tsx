'use client'

import { useState, useEffect } from 'react'

const CircularProgress = ({ percentage }: { percentage: number }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="120" height="120" className="mx-auto">
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke="#e5e7eb"
        strokeWidth="10"
        fill="none"
      />
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke="#10b981"
        strokeWidth="10"
        fill="none"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 60 60)"
        className="transition-all duration-500 ease-in-out"
      />
      <text x="60" y="65" textAnchor="middle" fontSize="18" fill="#1f2937" fontWeight="bold">
        {percentage}%
      </text>
    </svg>
  );
};

export default function Dashboard() {
  const [selected, setSelected] = useState('')
  const [percentage, setPercentage] = useState(0)

  const fetchData = async (type: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/data/${type}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setPercentage(data.percentage)
    } catch (error) {
      console.error('Fetch error:', error)
      alert('Failed to fetch data')
    }
  }

  useEffect(() => {
    if (selected) {
      fetchData(selected)
    }
  }, [selected])

  return (
    <div className="min-h-screen" style={{ backgroundImage: 'url(/image.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <header className="absolute top-0 left-0 p-4 z-10">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>YuvaIoT</h1>
      </header>
      
      {/* Dropdown on the left side */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10">
        <div className="bg-slate-900/90 backdrop-blur-md rounded-lg shadow-2xl p-6 border border-slate-700/50 min-w-64">
          <h2 className="text-xl font-semibold mb-4 text-white" style={{ fontFamily: 'Georgia, serif' }}>Select Device</h2>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full mb-6 p-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-800/50 text-white shadow-sm backdrop-blur-sm"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            <option value="" className="text-slate-300 bg-slate-800">Choose a device...</option>
            <option value="ir" className="text-blue-400 bg-slate-800">IR Sensor</option>
            <option value="smartlock" className="text-green-400 bg-slate-800">Smart Lock</option>
            <option value="doorbell" className="text-purple-400 bg-slate-800">Smart Door Bell</option>
          </select>
        </div>
      </div>

      {/* Data display on the right side */}
      {selected && (
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10">
          <div className="bg-slate-900/90 backdrop-blur-md rounded-lg shadow-2xl p-6 border border-slate-700/50 min-w-80">
            <div className="text-center">
              <h3 className={`text-lg font-medium mb-4 ${selected === 'ir' ? 'text-blue-400' : selected === 'smartlock' ? 'text-green-400' : 'text-purple-400'}`} style={{ fontFamily: 'Georgia, serif' }}>
                {selected === 'ir' ? 'IR Sensor' : selected === 'smartlock' ? 'Smart Lock' : 'Smart Door Bell'} Data
              </h3>
              <CircularProgress percentage={percentage} />
              <p className="text-center mt-4 text-slate-200 font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>Data Stored: {percentage}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}