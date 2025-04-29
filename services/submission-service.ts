import { createGenericService } from "./generic-service"

export interface Submission {
  id: string
  assignmentId: string
  studentId: string
  submissionDate: string
  content: string
  attachments: string[]
  grade: number
  feedback: string
  status: string
  createdAt: string
  updatedAt: string
}

export const submissionService = createGenericService<Submission>("submissions")
