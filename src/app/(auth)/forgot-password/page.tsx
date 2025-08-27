'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FloatingLabelInput } from '@/components/shared/floating-label-input'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const {  isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {error && (
          <div className="w-full rounded-sm bg-red-400 border-red-600 border-2 p-2 mb-4 flex items-center gap-2 text-white text-sm">
            <AlertCircle className="w-4 h-4 text-white" />
            {error}
          </div>
        )}
        {success && (
          <div className="w-full rounded-sm bg-green-400 border-green-600 border-2 p-2 mb-4 flex items-center gap-2 text-white text-sm">
            <CheckCircle2 className="w-4 h-4 text-white" />
            {success}
          </div>
        )}

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Forgot Password</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FloatingLabelInput
            type="email"
            id="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 px-4 text-base bg-gray-100 border-2 rounded-lg transition-all duration-200 focus:border-purple-500 focus:bg-purple-50 hover:border-gray-400"
          />

          <Button
            type="submit"
            className="w-full h-14 text-base font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
            disabled={!email}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : ''}
            Send Reset Link
          </Button>

          <div className="text-center pt-4">
            <p className="text-gray-600">
              Remembered your password?{' '}
              <Link
                href="/login"
                className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
