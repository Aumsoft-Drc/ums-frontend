import { createGenericService } from "./generic-service"

export interface CourseResult {
  id: string
  enrollmentId: string
  studentId: string
  courseOfferingId: string
  finalGrade: number
  letterGrade: string
  status: string
  createdAt: string
  updatedAt: string
}

export const courseResultService = createGenericService<CourseResult>("courseResults")
