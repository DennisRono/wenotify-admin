'use client'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { login, logout, register } from '@/store/actions/auth'
import { reduxLogoutUser, resetAuthError, updateUserProfile } from '@/store/slices/auth-slice'
import {
  LoginCredentials,
  RegisterData,
  UserProfile,
  UserRole,
} from '@/types/auth'

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>()
  const {
    user,
    access_token,
    refresh_token,
    isAuthenticated,
    isLoading,
    error,
    isInitialized,
  } = useSelector((state: RootState) => state.auth)

  const loginUser = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        const resultAction = await dispatch(login(credentials))
        if (login.fulfilled.match(resultAction)) {
          return { success: true, data: resultAction.payload }
        } else {
          return {
            success: false,
            error: resultAction.payload || { message: 'Login failed' },
          }
        }
      } catch (error) {
        return {
          success: false,
          error: { message: 'An unexpected error occurred' },
        }
      }
    },
    [dispatch]
  )

  const registerUser = useCallback(
    async (data: RegisterData) => {
      try {
        const resultAction = await dispatch(register(data))
        if (register.fulfilled.match(resultAction)) {
          return { success: true, data: resultAction.payload }
        } else {
          return {
            success: false,
            error: resultAction.payload || { message: 'Registration failed' },
          }
        }
      } catch (error) {
        return {
          success: false,
          error: { message: 'An unexpected error occurred' },
        }
      }
    },
    [dispatch]
  )

  const logoutUser = useCallback(
    async (options = { allDevices: false }) => {
      try {
        const resultAction = await dispatch(logout(options))
        dispatch(reduxLogoutUser())
        return logout.fulfilled.match(resultAction)
      } catch (error) {
        return false
      }
    },
    [dispatch]
  )

  const updateProfile = useCallback(
    (profileData: Partial<UserProfile>) => {
      dispatch(updateUserProfile(profileData))
    },
    [dispatch]
  )

  const clearError = useCallback(() => {
    dispatch(resetAuthError())
  }, [dispatch])

  const hasRole = useCallback(
    (role: UserRole | UserRole[]) => {
      if (!user) return false

      if (Array.isArray(role)) {
        return role.some(r => user.roles.includes(r))
      }

      return user.roles.includes(role)
    },
    [user]
  )

  return {
    user,
    access_token,
    refresh_token,
    isAuthenticated,
    isLoading,
    error,
    isInitialized,
    login: loginUser,
    register: registerUser,
    logout: logoutUser,
    updateProfile,
    clearError,
    hasRole,
  }
}
