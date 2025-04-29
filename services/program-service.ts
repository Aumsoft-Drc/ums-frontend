import { createGenericService } from "./generic-service"
import { api } from "./api"

export interface Program {
  id: string
  name: string
  code: string
  departmentId: string
  level: string
  duration: number
  description: string
  createdAt: string
  updatedAt: string
}

const baseService = createGenericService<Program>("programs")

export const programService = {
  ...baseService,

  async getProgramCourses(programId: string) {
    try {
      const response = await api.get(`/programs/${programId}/courses`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getProgramCohorts(programId: string) {
    try {
      const response = await api.get(`/programs/${programId}/cohorts`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
