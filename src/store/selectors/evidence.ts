import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

const selectEvidenceState = (state: RootState) => state.evidence

export const selectEvidence = createSelector(
  [selectEvidenceState],
  (evidenceState) => ({})
)
