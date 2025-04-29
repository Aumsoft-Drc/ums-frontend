import { createGenericService } from "./generic-service"
import { api } from "./api"

export interface Assignment {
  id: string
  courseOfferingId: string
  title: string
  description: string
  dueDate: string
  totalPoints: number
  weight: number
  createdAt: string
  updatedAt: string
}

const baseService = createGenericService<Assignment>("assignments")

export const assignmentService = {
  ...baseService,

  async getAssignmentSubmissions(assignmentId: string) {
    try {
      const response = await api.get(`/assignments/${assignmentId}/submissions`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
