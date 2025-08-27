'use client'

import { Button } from '@/components/ui/button'
import { FloatingLabelInput } from '@/components/shared/floating-label-input'
import type React from 'react'
import { useState } from 'react'
import { CircleAlert, Eye, EyeOff, Loader2 } from 'lucide-react'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const PasswordFloatingInput = ({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <FloatingLabelInput
        type={showPassword ? 'text' : 'password'}
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        className="h-14 px-4 text-base bg-gray-100 border-2 rounded-lg transition-all duration-200 focus:border-purple-500 focus:bg-purple-50 hover:border-gray-400"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-20"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  )
}

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res: {
      success: boolean
      data?: Record<string, any> | undefined
      error?: Record<string, any> | undefined
    } = await login({ username: email, password, rememberMe })
    if (!res.success && res.error) {
      setError(res.error.detail || res.error.message)
    }else {
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {error && (
          <Alert variant="destructive">
            <CircleAlert />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        <br />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sign in</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FloatingLabelInput
            type="email"
            id="email"
            label="Username or Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 px-4 text-base bg-gray-100 border-2 rounded-lg transition-all duration-200 focus:border-purple-500 focus:bg-purple-50 hover:border-gray-400"
          />

          <PasswordFloatingInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    rememberMe
                      ? 'bg-purple-600 border-purple-600'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {rememberMe && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-gray-700">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-14 text-base font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
            disabled={!email || !password}
          >
            {isLoading ? <Loader2 className="w-2 h-2 animate-spin" /> : ''}
            Login
          </Button>

          <div className="text-center pt-4">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                href="/create-account"
                className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
              >
                Create new account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
