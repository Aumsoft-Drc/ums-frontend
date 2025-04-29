import { createGenericService } from "./generic-service"
import { api } from "./api"

export interface Exam {
  id: string
  courseOfferingId: string
  title: string
  description: string
  date: string
  duration: number
  totalPoints: number
  weight: number
  type: string
  createdAt: string
  updatedAt: string
}

const baseService = createGenericService<Exam>("exams")

export const examService = {
  ...baseService,

  async getExamResults(examId: string) {
    try {
      const response = await api.get(`/exams/${examId}/results`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
