import { createGenericService } from "./generic-service"
import { api } from "./api"

export interface CourseOffering {
  id: string
  courseId: string
  academicPeriodId: string
  instructorId: string
  status: string
  maxEnrollment: number
  currentEnrollment: number
  createdAt: string
  updatedAt: string
}

const baseService = createGenericService<CourseOffering>("courseOfferings")

export const courseOfferingService = {
  ...baseService,

  async getCourseOfferingSchedules(courseOfferingId: string) {
    try {
      const response = await api.get(`/courseOfferings/${courseOfferingId}/schedules`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getCourseOfferingEnrollments(courseOfferingId: string) {
    try {
      const response = await api.get(`/courseOfferings/${courseOfferingId}/enrollments`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
