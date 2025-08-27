'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FloatingLabelInput } from '@/components/shared/floating-label-input'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

const CreateAccount = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)

  const { register, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const res: {
      success: boolean
      data?: Record<string, any>
      error?: Record<string, any>
    } = await register({
      username,
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      phone,
    })

    if (!res.success && res.error) {
      setError(res.error.detail || res.error.message)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {error && (
          <div className="w-full rounded-sm bg-red-400 border-red-600 border-2 p-2 mb-4 text-white text-sm">
            {error}
          </div>
        )}

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FloatingLabelInput
            type="text"
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-14 px-4 text-base bg-gray-100 border-2 rounded-lg transition-all duration-200 focus:border-purple-500 focus:bg-purple-50 hover:border-gray-400"
          />

          <FloatingLabelInput
            type="email"
            id="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 px-4 text-base bg-gray-100 border-2 rounded-lg transition-all duration-200 focus:border-purple-500 focus:bg-purple-50 hover:border-gray-400"
          />

          <div className="grid grid-cols-2 gap-4">
            <FloatingLabelInput
              type="text"
              id="firstName"
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="h-14 px-4 text-base bg-gray-100 border-2 rounded-lg transition-all duration-200 focus:border-purple-500 focus:bg-purple-50 hover:border-gray-400"
            />

            <FloatingLabelInput
              type="text"
              id="lastName"
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="h-14 px-4 text-base bg-gray-100 border-2 rounded-lg transition-all duration-200 focus:border-purple-500 focus:bg-purple-50 hover:border-gray-400"
            />
          </div>

          <FloatingLabelInput
            type="tel"
            id="phone"
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-14 px-4 text-base bg-gray-100 border-2 rounded-lg transition-all duration-200 focus:border-purple-500 focus:bg-purple-50 hover:border-gray-400"
          />

          <PasswordFloatingInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PasswordFloatingInput
            id="confirm-password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            type="submit"
            className="w-full h-14 text-base font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
            disabled={
              !username ||
              !email ||
              !password ||
              !confirmPassword ||
              !firstName ||
              !lastName ||
              !phone
            }
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : ''}
            Create Account
          </Button>

          <div className="text-center pt-4">
            <p className="text-gray-600">
              Already have an account?{' '}
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

export default CreateAccount
