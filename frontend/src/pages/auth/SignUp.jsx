import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  User, Users, Baby, IdCard, Phone, Mail,
  Lock, KeyRound, GraduationCap, Briefcase,
  Bell, CheckCircle, AlertCircle
} from 'lucide-react'
import signupImage from "../../assets/signup-image.jpg";

export default function SignUp() {
  const [role, setRole] = useState('student')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    motherName: '',
    enrollmentNumber: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!")
      return
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }
    setSuccess(true)
    setTimeout(() => navigate('/login'), 2000)
  }

  const inputClass =
    "w-full rounded-full border border-gray-200 bg-gray-50 px-5 py-2.5 pl-10 text-sm outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300/40 placeholder:text-gray-400 text-gray-800"

  const iconClass = "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[1300px] bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[700px]">

        {/* ── LEFT: Image panel ── */}
        <div className="relative w-full lg:w-[52%] overflow-hidden min-h-[300px]">
          <img
            src={signupImage}
            alt="Library"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/65" />

          {/* Brand pill */}
          <div className="absolute top-6 left-6 bg-white/15 backdrop-blur-md border border-white/25 text-white text-sm font-medium px-5 py-2 rounded-full">
            LibraryHub
          </div>

          {/* Floating notification card */}
          <div className="absolute top-6 right-6 bg-white rounded-2xl p-3 w-48 shadow-xl">
            <div className="flex items-center gap-2 mb-1">
              <Bell className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
              <p className="text-xs font-semibold text-gray-800">New Book Available</p>
            </div>
            <p className="text-[11px] text-gray-400">Design Patterns · Added today</p>
          </div>

          {/* Stats strip */}
          <div className="absolute bottom-6 left-6 right-6 flex gap-3">
            {[
              { value: '12k+', label: 'Books available' },
              { value: '3.2k', label: 'Active members' },
              { value: '98%', label: 'Happy readers', accent: true },
            ].map((s) => (
              <div
                key={s.label}
                className={`flex-1 rounded-xl p-3 backdrop-blur-md border ${
                  s.accent
                    ? 'bg-yellow-400/20 border-yellow-400/40'
                    : 'bg-white/10 border-white/20'
                }`}
              >
                <p className={`text-lg font-semibold ${s.accent ? 'text-yellow-400' : 'text-white'}`}>
                  {s.value}
                </p>
                <p className="text-[11px] text-white/60 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Form panel ── */}
        <div className="w-full lg:w-[48%] bg-white flex items-center justify-center px-8 py-10 lg:px-14">
          <div className="w-full max-w-sm">

            <h1 className="text-2xl font-semibold text-gray-900">Create account</h1>
            <p className="text-sm text-gray-400 mt-1 mb-5">Sign up and start borrowing resources</p>

            {/* Role toggle */}
            <div className="flex bg-gray-100 rounded-full p-1 mb-5">
              {[
                { id: 'student', label: 'Student', Icon: GraduationCap },
                { id: 'faculty', label: 'Faculty', Icon: Briefcase },
              ].map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setRole(id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    role === id
                      ? 'bg-yellow-400 text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>

            {/* Error alert */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl px-4 py-3 mb-4 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Success alert */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-2xl px-4 py-3 mb-4 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                Account created! Redirecting…
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">

              {/* Full name */}
              <div className="relative">
                <User className={iconClass} />
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              {/* Father / Mother */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Users className={iconClass} />
                  <input
                    name="fatherName"
                    type="text"
                    placeholder="Father's name"
                    value={formData.fatherName}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div className="relative flex-1">
                  <Baby className={iconClass} />
                  <input
                    name="motherName"
                    type="text"
                    placeholder="Mother's name"
                    value={formData.motherName}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Enrollment */}
              <div className="relative">
                <IdCard className={iconClass} />
                <input
                  name="enrollmentNumber"
                  type="text"
                  placeholder={role === 'student' ? 'Enrollment number' : 'Employee ID'}
                  value={formData.enrollmentNumber}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              {/* Phone / Email */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Phone className={iconClass} />
                  <input
                    name="phoneNumber"
                    type="tel"
                    placeholder="Phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div className="relative flex-1">
                  <Mail className={iconClass} />
                  <input
                    name="email"
                    type="email"
                    placeholder={role === 'student' ? 'Student email' : 'Faculty email'}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Password / Confirm */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Lock className={iconClass} />
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div className="relative flex-1">
                  <KeyRound className={iconClass} />
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] transition-all duration-200 py-3 rounded-full text-sm font-semibold text-gray-900 mt-1"
              >
                Create account
              </button>

            </form>

            {/* Footer */}
            <div className="flex justify-between items-center mt-6 text-xs text-gray-400">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="text-gray-900 font-semibold hover:underline">
                  Login
                </Link>
              </p>
              <a href="#" className="hover:underline">Terms</a>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}