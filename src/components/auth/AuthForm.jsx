import { useState } from 'react'
import { ShoppingCart, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import LoadingSpinner from '../ui/LoadingSpinner'
import { useAuth } from '../../context/AuthContext'

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, signup } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        await login(email, password)
      } else {
        if (!displayName.trim()) {
          setError('Please enter your name')
          setLoading(false)
          return
        }
        await signup(email, password, displayName.trim())
      }
    } catch (err) {
      const messages = {
        'auth/user-not-found': 'No account found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/email-already-in-use': 'An account with this email already exists',
        'auth/weak-password': 'Password should be at least 6 characters',
        'auth/invalid-email': 'Please enter a valid email address',
        'auth/invalid-credential': 'Invalid email or password',
      }
      setError(messages[err.code] || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-400 to-amber-300" />

      {/* Decorative circles */}
      <div className="absolute top-[-10%] right-[-15%] w-72 h-72 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-orange-600/20 rounded-full blur-3xl" />
      <div className="absolute top-[30%] left-[-5%] w-32 h-32 bg-amber-300/20 rounded-full blur-xl" />

      <div className="w-full max-w-sm px-5 relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 slide-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-[22px] mb-5 border border-white/30 bounce-in">
            <ShoppingCart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Shopping Planner</h1>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <Sparkles className="w-3.5 h-3.5 text-white/70" />
            <p className="text-white/70 text-sm font-medium">Plan smarter, shop faster</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[24px] shadow-elevated p-7 slide-up" style={{ animationDelay: '0.1s' }}>
          {/* Toggle */}
          <div className="flex mb-7 bg-slate-100 rounded-2xl p-1.5">
            <button
              type="button"
              onClick={() => { setIsLogin(true); setError('') }}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
                isLogin
                  ? 'bg-white text-orange-600 shadow-soft'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => { setIsLogin(false); setError('') }}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
                !isLogin
                  ? 'bg-white text-orange-600 shadow-soft'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative fade-in">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                <Input
                  type="text"
                  placeholder="Your name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="pl-11"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-11"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="pl-11"
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl border border-red-100 fade-in">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-2"
              size="lg"
            >
              {loading ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : null}
              <span>{isLogin ? 'Log In' : 'Create Account'}</span>
              {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-white/50 text-xs mt-6 slide-up" style={{ animationDelay: '0.2s' }}>
          Your data is securely stored in the cloud
        </p>
      </div>
    </div>
  )
}
