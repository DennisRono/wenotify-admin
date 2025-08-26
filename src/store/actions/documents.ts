import { createAsyncThunk } from '@reduxjs/toolkit'
import type { EntityResponse } from '@/types/entity'
import type { ErrorResponse } from '@/types/responses'

const getAuthHeaders = (state: any) => ({
  Authorization: `Bearer ${state?.auth?.access_token}`,
  'Content-Type': 'application/json',
})

/* ------------------ TEMPLATES ------------------ */

export const reduxFetchTemplates = createAsyncThunk<
  EntityResponse[],
  Record<string, any> | void,
  { rejectValue: ErrorResponse }
>('templates/fetch', async (params, { getState, rejectWithValue }) => {
  try {
    const query = params
      ? '?' + new URLSearchParams(params as Record<string, string>).toString()
      : ''
    const state = getState() as any
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/docs/api/v1/templates/${query}`,
      { headers: getAuthHeaders(state) }
    )

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: 'Failed to fetch templates.' })
  }
})

export const reduxFetchTemplateById = createAsyncThunk<
  EntityResponse,
  string,
  { rejectValue: ErrorResponse }
>('templates/fetchById', async (templateId, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/docs/api/v1/templates/${templateId}`,
      {
        headers: getAuthHeaders(state),
      }
    )

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: 'Failed to fetch template by ID.' })
  }
})

export const reduxFetchTemplateBySlug = createAsyncThunk<
  EntityResponse,
  string,
  { rejectValue: ErrorResponse }
>('templates/fetchBySlug', async (slug, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/docs/api/v1/templates/${slug}`,
      {
        headers: getAuthHeaders(state),
      }
    )

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: 'Failed to fetch template by slug.' })
  }
})

export const reduxCreateTemplate = createAsyncThunk<
  EntityResponse,
  Record<string, any>,
  { rejectValue: ErrorResponse }
>('templates/create', async (templateData, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/docs/api/v1/templates/`,
      {
        method: 'POST',
        headers: getAuthHeaders(state),
        body: JSON.stringify(templateData),
      }
    )

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: 'Failed to create template.' })
  }
})

export const reduxUpdateTemplate = createAsyncThunk<
  EntityResponse,
  { id: string; data: Record<string, any> },
  { rejectValue: ErrorResponse }
>('templates/update', async ({ id, data }, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/docs/api/v1/templates/${id}`,
      {
        method: 'PUT',
        headers: getAuthHeaders(state),
        body: JSON.stringify(data),
      }
    )

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: 'Failed to update template.' })
  }
})

export const reduxDeleteTemplate = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: ErrorResponse }
>('templates/delete', async (id, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/docs/api/v1/templates/${id}`,
      { method: 'DELETE', headers: getAuthHeaders(state) }
    )

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return { id }
  } catch {
    return rejectWithValue({ message: 'Failed to delete template.' })
  }
})

/* ------------------ DOCUMENTS ------------------ */

export const reduxFetchDocuments = createAsyncThunk<
  EntityResponse[],
  Record<string, any> | void,
  { rejectValue: ErrorResponse }
>('documents/fetch', async (params, { getState, rejectWithValue }) => {
  try {
    const query = params
      ? '?' + new URLSearchParams(params as Record<string, string>).toString()
      : ''
    const state = getState() as any
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/docs/api/v1/documents/${query}`,
      { headers: getAuthHeaders(state) }
    )

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: 'Failed to fetch documents.' })
  }
})

export const reduxCreateDocument = createAsyncThunk<
  EntityResponse,
  Record<string, any>,
  { rejectValue: ErrorResponse }
>('documents/create', async (docData, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/docs/api/v1/documents/`,
      {
        method: 'POST',
        headers: getAuthHeaders(state),
        body: JSON.stringify(docData),
      }
    )

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: 'Failed to create document.' })
  }
})

export const reduxUpdateDocument = createAsyncThunk<
  EntityResponse,
  { id: string; data: Record<string, any> },
  { rejectValue: ErrorResponse }
>('documents/update', async ({ id, data }, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/docs/api/v1/documents/${id}`,
      {
        method: 'PUT',
        headers: getAuthHeaders(state),
        body: JSON.stringify(data),
      }
    )

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: 'Failed to update document.' })
  }
})

export const reduxDeleteDocument = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: ErrorResponse }
>('documents/delete', async (id, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/docs/api/v1/documents/${id}`,
      { method: 'DELETE', headers: getAuthHeaders(state) }
    )

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return { id }
  } catch {
    return rejectWithValue({ message: 'Failed to delete document.' })
  }
})

export const reduxExportDocument = createAsyncThunk<
  { id: string },
  { id: string; format?: 'json' | 'yaml' | 'pdf' },
  { rejectValue: ErrorResponse }
>(
  'documents/export',
  async ({ id, format = 'pdf' }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/docs/api/v1/documents/export/${id}?format=${format || 'pdf'}`,
        { method: 'GET', headers: getAuthHeaders(state) }
      )

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      if (format === 'pdf') {
        const blob = await response.blob()

        const contentDisposition = response.headers.get('Content-Disposition')
        let filename = `${id}.pdf`
        if (contentDisposition) {
          const match = contentDisposition.match(/filename="(.+)"/)
          if (match && match[1]) {
            filename = match[1]
          }
        }

        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)
      } else if (format === 'json' || format === 'yaml') {
        const data = await response.text()
        const blob = new Blob([data], {
          type: format === 'json' ? 'application/json' : 'application/x-yaml',
        })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${id}.${format}`
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)
      }

      return { id }
    } catch {
      return rejectWithValue({ message: 'Failed to export document.' })
    }
  }
)
