import { createGenericSlice } from "./generic-slice"
import { cohortService, type Cohort } from "@/services/cohort-service"
import { createAsyncThunk } from "@reduxjs/toolkit"

const { slice, actions, reducer } = createGenericSlice<Cohort>("cohorts", cohortService)

// Thunks spécifiques aux cohortes
export const getCohortStudents = createAsyncThunk(
  "cohorts/getCohortStudents",
  async (cohortId: string, { rejectWithValue }) => {
    try {
      const response = await cohortService.getCohortStudents(cohortId)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to get cohort students")
    }
  },
)

export const addStudentToCohort = createAsyncThunk(
  "cohorts/addStudentToCohort",
  async ({ cohortId, studentId }: { cohortId: string; studentId: string }, { rejectWithValue }) => {
    try {
      const response = await cohortService.addStudentToCohort(cohortId, studentId)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add student to cohort")
    }
  },
)

export const removeStudentFromCohort = createAsyncThunk(
  "cohorts/removeStudentFromCohort",
  async ({ cohortId, studentId }: { cohortId: string; studentId: string }, { rejectWithValue }) => {
    try {
      const response = await cohortService.removeStudentFromCohort(cohortId, studentId)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove student from cohort")
    }
  },
)

export const {
  fetchAll: fetchAllCohorts,
  fetchById: fetchCohortById,
  create: createCohort,
  update: updateCohort,
  remove: deleteCohort,
  clearItems: clearCohorts,
  clearSelectedItem: clearSelectedCohort,
  clearError: clearCohortError,
} = actions

export default reducer
