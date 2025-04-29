import { createGenericService } from "./generic-service"

export interface ExamResult {
  id: string
  examId: string
  studentId: string
  score: number
  feedback: string
  status: string
  createdAt: string
  updatedAt: string
}

export const examResultService = createGenericService<ExamResult>("examResults")
