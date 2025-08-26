import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

const selectDocumentsState = (state: RootState) => state.documents

export const selectDocuments = createSelector(
  [selectDocumentsState],
  documentsState => ({
    documents: documentsState.documents,
    templates: documentsState.templates,
    loading: documentsState.isLoading,
    error: documentsState.error,
  })
)