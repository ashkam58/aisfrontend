import React, { useState } from 'react'
import axios from 'axios'

const inputStyles =
  'w-full rounded-xl border border-purple-200 bg-white/90 px-4 py-2.5 text-sm text-purple-900 shadow-sm transition focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200'

const buttonStyles =
  'w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:from-fuchsia-600 hover:to-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-500'

const LoginForm = ({ className = '', title = 'Welcome back', submitLabel = 'Log in', onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (busy) return
    setBusy(true)
    setMessage('')

    try {
      const response = await axios.post('/login', formData)
      setMessage(response.data.message || 'Login successful!')
      localStorage.setItem('token', response.data.token)
      if (onSuccess) onSuccess(response.data)
    } catch (error) {
      setMessage(error?.response?.data?.error || 'Login failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className={`login-form space-y-5 ${className}`}>
      <div>
        <h2 className="text-xl font-semibold text-purple-900">{title}</h2>
        <p className="text-xs text-purple-700/80">Sign back in to keep your streaks and continue learning.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1.5">
          <label htmlFor="login-email" className="text-xs font-semibold uppercase tracking-wide text-purple-700">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            name="email"
            placeholder="you@email.com"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className={inputStyles}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="login-password" className="text-xs font-semibold uppercase tracking-wide text-purple-700">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            name="password"
            placeholder="Your password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            className={inputStyles}
          />
        </div>
        <button type="submit" className={`${buttonStyles} ${busy ? 'opacity-70' : ''}`} disabled={busy}>
          {busy ? 'Signing in...' : submitLabel}
        </button>
      </form>
      {message && <p className="rounded-xl bg-purple-50 px-3 py-2 text-xs text-purple-700">{message}</p>}
    </div>
  )
}

export default LoginForm
