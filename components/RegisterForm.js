import React, { useState } from 'react'
import axios from 'axios'

const inputStyles =
  'w-full rounded-xl border border-purple-200 bg-white/90 px-4 py-2.5 text-sm text-purple-900 shadow-sm transition focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200'

const buttonStyles =
  'w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-600 hover:to-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500'

const RegisterForm = ({ className = '', title = 'Create your account', submitLabel = 'Join for free', onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
      const response = await axios.post('/register', formData)
      setMessage(response.data.message || 'Registration successful!')
      if (onSuccess) onSuccess(response.data)
    } catch (error) {
      setMessage(error?.response?.data?.error || 'Registration failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className={`register-form space-y-5 ${className}`}>
      <div>
        <h2 className="text-xl font-semibold text-purple-900">{title}</h2>
        <p className="text-xs text-purple-700/80">Create a free account to track progress and unlock full lessons.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1.5">
          <label htmlFor="register-name" className="text-xs font-semibold uppercase tracking-wide text-purple-700">
            Parent / Learner name
          </label>
          <input
            id="register-name"
            type="text"
            name="name"
            placeholder="Alex Sharma"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            className={inputStyles}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="register-email" className="text-xs font-semibold uppercase tracking-wide text-purple-700">
            Email
          </label>
          <input
            id="register-email"
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
          <label htmlFor="register-phone" className="text-xs font-semibold uppercase tracking-wide text-purple-700">
            Phone
          </label>
          <input
            id="register-phone"
            type="tel"
            name="phone"
            placeholder="+91 80024 16363"
            value={formData.phone}
            onChange={handleChange}
            required
            autoComplete="tel"
            className={inputStyles}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="register-password" className="text-xs font-semibold uppercase tracking-wide text-purple-700">
            Password
          </label>
          <input
            id="register-password"
            type="password"
            name="password"
            placeholder="At least 8 characters"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
            className={inputStyles}
          />
        </div>
        <button type="submit" className={`${buttonStyles} ${busy ? 'opacity-70' : ''}`} disabled={busy}>
          {busy ? 'Creating...' : submitLabel}
        </button>
      </form>
      {message && <p className="rounded-xl bg-purple-50 px-3 py-2 text-xs text-purple-700">{message}</p>}
    </div>
  )
}

export default RegisterForm
