import { EntityResponse, GetEntityParams } from '@/types/entity'
import { ErrorResponse } from '@/types/responses'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const CreateEntity = createAsyncThunk<
  EntityResponse,
  Record<string, any>,
  { rejectValue: ErrorResponse }
>('products/add-product', async (product, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/masterdata/api/v1/entity/create`,
      {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          Authorization: `Bearer ${state?.auth?.access_token}`,
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
      }
    )

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json()
      return rejectWithValue(errorData)
    }

    return await response.json()
  } catch (error) {
    console.log(error)
    return rejectWithValue({
      message: 'Failed to create product.',
    })
  }
})

export const reduxAddUserToEntity = createAsyncThunk<
  EntityResponse,
  Record<string, any>,
  { rejectValue: ErrorResponse }
>('entity/add-user', async (user, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/masterdata/api/v1/entity/create`,
      {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          Authorization: `Bearer ${state?.auth?.access_token}`,
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
      }
    )

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json()
      return rejectWithValue(errorData)
    }

    return await response.json()
  } catch (error) {
    console.log(error)
    return rejectWithValue({
      message: 'Failed to Add User.',
    })
  }
})

export const getEntityById = createAsyncThunk<EntityResponse, GetEntityParams, { rejectValue: ErrorResponse }>(
  "entity/get-by-params",
  async (params, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const queryParams = new URLSearchParams()

      if (params.id) queryParams.append("id", params.id)
      if (params.registration_number) queryParams.append("registration_number", params.registration_number)
      if (params.full_legal_name) queryParams.append("full_legal_name", params.full_legal_name)
      if (params.tax_pin) queryParams.append("tax_pin", params.tax_pin)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/masterdata/api/v1/entity/get?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${state?.auth?.access_token}`,
            "Content-Type": "application/json",
          },
        },
      )

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json()
        return rejectWithValue(errorData)
      }

      return await response.json()
    } catch (error) {
      console.log(error)
      return rejectWithValue({
        message: "Failed to fetch entity.",
      })
    }
  },
)