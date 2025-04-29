import { createGenericService } from "./generic-service"

export interface DeliberationResult {
  id: string
  deliberationSessionId: string
  studentId: string
  academicPeriodId: string
  programId: string
  gpa: number
  credits: number
  status: string
  decision: string
  notes: string
  createdAt: string
  updatedAt: string
}

export const deliberationResultService = createGenericService<DeliberationResult>("deliberationResults")
