'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock credentials
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('loggedIn', 'true')
      router.push('/dashboard')
    } else {
      setError('Invalid credentials. Use admin/password')
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundImage: 'url(/image.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <header className="absolute top-0 left-0 p-4 z-10">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>YuvaIoT</h1>
      </header>
      <div className="flex min-h-screen items-center justify-center pt-16">
        <div className="bg-slate-900/90 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-slate-700/50 w-full max-w-md">
          <h1 className="text-4xl font-bold mb-8 text-center text-white" style={{ fontFamily: 'Georgia, serif' }}>Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-slate-200 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-200 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                placeholder="Enter password"
                required
              />
            </div>
            {error && (
              <p className="text-red-300 text-sm text-center bg-red-500/20 rounded-lg py-2 border border-red-500/30 backdrop-blur-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-300" style={{ fontFamily: 'Arial, sans-serif' }}>
            <p>Mock credentials: admin / password</p>
          </div>
        </div>
      </div>
    </div>
  )
}
