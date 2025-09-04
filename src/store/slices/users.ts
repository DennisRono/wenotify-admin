import { createSlice } from "@reduxjs/toolkit"
import type { UserProfileResponse } from "@/types/user"
import {
  reduxLoginUser,
  reduxRegisterUser,
  reduxFetchUserProfile,
  reduxUpdateUserProfile,
  reduxChangePassword,
  reduxDeactivateAccount,
} from "../actions/users"

interface UsersState {
  // Authentication
  isAuthenticated: boolean
  accessToken: string | null
  refreshToken: string | null
  tokenExpiry: string | null

  // User profile
  currentUser: UserProfileResponse | null
  userProfileLoading: boolean
  userProfileError: string | null

  // Login
  loginLoading: boolean
  loginError: string | null

  // Registration
  registerLoading: boolean
  registerError: string | null

  // Update profile
  updateProfileLoading: boolean
  updateProfileError: string | null

  // Change password
  changePasswordLoading: boolean
  changePasswordError: string | null

  // Deactivate account
  deactivateLoading: boolean
  deactivateError: string | null
}

const initialState: UsersState = {
  // Authentication
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  tokenExpiry: null,

  // User profile
  currentUser: null,
  userProfileLoading: false,
  userProfileError: null,

  // Login
  loginLoading: false,
  loginError: null,

  // Registration
  registerLoading: false,
  registerError: null,

  // Update profile
  updateProfileLoading: false,
  updateProfileError: null,

  // Change password
  changePasswordLoading: false,
  changePasswordError: null,

  // Deactivate account
  deactivateLoading: false,
  deactivateError: null,
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsersErrors: (state) => {
      state.loginError = null
      state.registerError = null
      state.userProfileError = null
      state.updateProfileError = null
      state.changePasswordError = null
      state.deactivateError = null
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.accessToken = null
      state.refreshToken = null
      state.tokenExpiry = null
      state.currentUser = null
    },
    setTokens: (state, action) => {
      const { access_token, refresh_token, expires_in } = action.payload
      state.accessToken = access_token
      state.refreshToken = refresh_token
      state.isAuthenticated = true
      if (expires_in) {
        const expiryDate = new Date(Date.now() + expires_in * 1000)
        state.tokenExpiry = expiryDate.toISOString()
      }
    },
    resetUsersState: () => initialState,
  },
  extraReducers: (builder) => {
    // Login User
    builder
      .addCase(reduxLoginUser.pending, (state) => {
        state.loginLoading = true
        state.loginError = null
      })
      .addCase(reduxLoginUser.fulfilled, (state, action) => {
        state.loginLoading = false
        const { access_token, refresh_token, expires_in } = action.payload
        state.accessToken = access_token
        state.refreshToken = refresh_token
        state.isAuthenticated = true
        if (expires_in) {
          const expiryDate = new Date(Date.now() + expires_in * 1000)
          state.tokenExpiry = expiryDate.toISOString()
        }
      })
      .addCase(reduxLoginUser.rejected, (state, action) => {
        state.loginLoading = false
        state.loginError = action.payload?.message || "Failed to authenticate user"
        state.isAuthenticated = false
        state.accessToken = null
        state.refreshToken = null
      })

    // Register User
    builder
      .addCase(reduxRegisterUser.pending, (state) => {
        state.registerLoading = true
        state.registerError = null
      })
      .addCase(reduxRegisterUser.fulfilled, (state, action) => {
        state.registerLoading = false
        // Note: Registration doesn't automatically log in the user
      })
      .addCase(reduxRegisterUser.rejected, (state, action) => {
        state.registerLoading = false
        state.registerError = action.payload?.message || "Failed to register user"
      })

    // Fetch User Profile
    builder
      .addCase(reduxFetchUserProfile.pending, (state) => {
        state.userProfileLoading = true
        state.userProfileError = null
      })
      .addCase(reduxFetchUserProfile.fulfilled, (state, action) => {
        state.userProfileLoading = false
        state.currentUser = action.payload
      })
      .addCase(reduxFetchUserProfile.rejected, (state, action) => {
        state.userProfileLoading = false
        state.userProfileError = action.payload?.message || "Failed to fetch user profile"
      })

    // Update User Profile
    builder
      .addCase(reduxUpdateUserProfile.pending, (state) => {
        state.updateProfileLoading = true
        state.updateProfileError = null
      })
      .addCase(reduxUpdateUserProfile.fulfilled, (state, action) => {
        state.updateProfileLoading = false
        // Update current user profile with the updated data
        if (state.currentUser) {
          state.currentUser = {
            ...state.currentUser,
            first_name: action.payload.first_name,
            last_name: action.payload.last_name,
            phone_number: action.payload.phone_number,
            profile_picture_url: action.payload.profile_picture_url,
            bio: action.payload.bio,
            county: action.payload.county,
            sub_county: action.payload.sub_county,
          }
        }
      })
      .addCase(reduxUpdateUserProfile.rejected, (state, action) => {
        state.updateProfileLoading = false
        state.updateProfileError = action.payload?.message || "Failed to update user profile"
      })

    // Change Password
    builder
      .addCase(reduxChangePassword.pending, (state) => {
        state.changePasswordLoading = true
        state.changePasswordError = null
      })
      .addCase(reduxChangePassword.fulfilled, (state) => {
        state.changePasswordLoading = false
      })
      .addCase(reduxChangePassword.rejected, (state, action) => {
        state.changePasswordLoading = false
        state.changePasswordError = action.payload?.message || "Failed to change password"
      })

    // Deactivate Account
    builder
      .addCase(reduxDeactivateAccount.pending, (state) => {
        state.deactivateLoading = true
        state.deactivateError = null
      })
      .addCase(reduxDeactivateAccount.fulfilled, (state) => {
        state.deactivateLoading = false
        // Log out the user after successful deactivation
        state.isAuthenticated = false
        state.accessToken = null
        state.refreshToken = null
        state.tokenExpiry = null
        state.currentUser = null
      })
      .addCase(reduxDeactivateAccount.rejected, (state, action) => {
        state.deactivateLoading = false
        state.deactivateError = action.payload?.message || "Failed to deactivate account"
      })
  },
})

export const { clearUsersErrors, logout, setTokens, resetUsersState } = usersSlice.actions
export default usersSlice.reducer
