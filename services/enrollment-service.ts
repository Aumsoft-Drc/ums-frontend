import { createGenericService } from "./generic-service"
import { api } from "./api"

export interface Enrollment {
  id: string
  studentId: string
  courseOfferingId: string
  enrollmentDate: string
  status: string
  grade: string
  createdAt: string
  updatedAt: string
}

const baseService = createGenericService<Enrollment>("enrollments")

export const enrollmentService = {
  ...baseService,

  async getEnrollmentAssignments(enrollmentId: string) {
    try {
      const response = await api.get(`/enrollments/${enrollmentId}/assignments`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getEnrollmentExams(enrollmentId: string) {
    try {
      const response = await api.get(`/enrollments/${enrollmentId}/exams`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
