import { createGenericService } from "./generic-service"
import { api } from "./api"

export interface Cohort {
  id: string
  name: string
  programId: string
  academicYear: string
  startDate: string
  endDate: string
  status: string
  createdAt: string
  updatedAt: string
}

const baseService = createGenericService<Cohort>("cohorts")

export const cohortService = {
  ...baseService,

  async getCohortStudents(cohortId: string) {
    try {
      const response = await api.get(`/cohorts/${cohortId}/students`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async addStudentToCohort(cohortId: string, studentId: string) {
    try {
      const response = await api.post(`/cohorts/${cohortId}/students`, { studentId })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async removeStudentFromCohort(cohortId: string, studentId: string) {
    try {
      const response = await api.delete(`/cohorts/${cohortId}/students/${studentId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
