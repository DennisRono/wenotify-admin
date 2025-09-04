import type { BaseEntity, UserRole, UserStatus } from "./api"

export interface UserCreate {
  email: string
  phone_number?: string | null
  first_name: string
  last_name: string
  role?: UserRole
  status?: UserStatus
  profile_picture_url?: string | null
  bio?: string | null
  badge_number?: string | null
  department?: string | null
  rank?: string | null
  county?: string | null
  sub_county?: string | null
  password: string
}

export interface UserUpdate {
  first_name?: string | null
  last_name?: string | null
  phone_number?: string | null
  profile_picture_url?: string | null
  bio?: string | null
  department?: string | null
  rank?: string | null
  county?: string | null
  sub_county?: string | null
}

export interface UserResponse extends BaseEntity {
  email: string
  phone_number?: string | null
  first_name: string
  last_name: string
  role: UserRole
  status: UserStatus
  profile_picture_url?: string | null
  bio?: string | null
  badge_number?: string | null
  department?: string | null
  rank?: string | null
  county?: string | null
  sub_county?: string | null
  is_verified: boolean
  is_active: boolean
  email_verified: boolean
  phone_verified: boolean
}

export interface UserProfileResponse extends BaseEntity {
  first_name: string
  last_name: string
  email: string
  phone_number?: string | null
  role: UserRole
  status: UserStatus
  profile_picture_url?: string | null
  bio?: string | null
  county?: string | null
  sub_county?: string | null
}

export interface PasswordChangeRequest {
  current_password: string
  new_password: string
}

export interface LoginRequest {
  username: string
  password: string
}


export interface UsersResponse {
  
}

export interface UsersFilters {
  page?: number
  skip?: number
  limit?: number
}