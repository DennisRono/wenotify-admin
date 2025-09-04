import { createAsyncThunk } from "@reduxjs/toolkit"
import type { ErrorResponse } from '@/types/responses'
import type {
  UserCreate,
  UserUpdate,
  UserResponse,
  UserProfileResponse,
  PasswordChangeRequest,
  LoginRequest,
  UsersResponse,
  UsersFilters,
} from "@/types/user"

const getAuthHeaders = (state: any) => ({
  Authorization: `Bearer ${state?.auth?.access_token}`,
  "Content-Type": "application/json",
})

/* ------------------ USERS ACTIONS ------------------ */

export const reduxLoginUser = createAsyncThunk<any, LoginRequest, { rejectValue: ErrorResponse }>(
  "users/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const formData = new URLSearchParams()
      formData.append("username", loginData.username)
      formData.append("password", loginData.password)

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      })

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return await response.json()
    } catch {
      return rejectWithValue({ message: "Failed to authenticate user." })
    }
  },
)

export const reduxRegisterUser = createAsyncThunk<UserResponse, UserCreate, { rejectValue: ErrorResponse }>(
  "users/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return await response.json()
    } catch {
      return rejectWithValue({ message: "Failed to register user." })
    }
  },
)

export const reduxFetchUserProfile = createAsyncThunk<UserProfileResponse, void, { rejectValue: ErrorResponse }>(
  "users/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/profile`, {
        headers: getAuthHeaders(state),
      })

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return await response.json()
    } catch {
      return rejectWithValue({ message: "Failed to fetch user profile." })
    }
  },
)

export const reduxUpdateUserProfile = createAsyncThunk<UserResponse, UserUpdate, { rejectValue: ErrorResponse }>(
  "users/updateProfile",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/profile`, {
        method: "PUT",
        headers: getAuthHeaders(state),
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return await response.json()
    } catch {
      return rejectWithValue({ message: "Failed to update user profile." })
    }
  },
)

export const reduxChangePassword = createAsyncThunk<any, PasswordChangeRequest, { rejectValue: ErrorResponse }>(
  "users/changePassword",
  async (passwordData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/change-password`, {
        method: "POST",
        headers: getAuthHeaders(state),
        body: JSON.stringify(passwordData),
      })

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return await response.json()
    } catch {
      return rejectWithValue({ message: "Failed to change password." })
    }
  },
)

export const reduxDeactivateAccount = createAsyncThunk<any, void, { rejectValue: ErrorResponse }>(
  "users/deactivateAccount",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/deactivate`, {
        method: "DELETE",
        headers: getAuthHeaders(state),
      })

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return await response.json()
    } catch {
      return rejectWithValue({ message: "Failed to deactivate account." })
    }
  },
)

export const reduxFetchUsers = createAsyncThunk<
  UsersResponse,
  UsersFilters | void,
  { rejectValue: ErrorResponse }
>("users/fetchUsers", async (params, { getState, rejectWithValue }) => {
  try {
    const query = params ? "?" + new URLSearchParams(params as Record<string, string>).toString() : ""
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${query}`, {
      headers: getAuthHeaders(state),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to fetch users." })
  }
})

export const reduxFetchUserById = createAsyncThunk<UsersResponse, string, { rejectValue: ErrorResponse }>(
  "users/fetchUserById",
  async (userId, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${userId}`, {
        headers: getAuthHeaders(state),
      })

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return await response.json()
    } catch {
      return rejectWithValue({ message: "Failed to fetch user by ID." })
    }
  },
)