import { createGenericService } from "./generic-service"
import { api } from "./api"

export interface Transcript {
  id: string
  studentId: string
  programId: string
  issueDate: string
  cumulativeGPA: number
  totalCredits: number
  status: string
  createdAt: string
  updatedAt: string
}

const baseService = createGenericService<Transcript>("transcripts")

export const transcriptService = {
  ...baseService,

  async generateTranscript(studentId: string, programId: string) {
    try {
      const response = await api.post(`/transcripts/generate`, { studentId, programId })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async downloadTranscript(transcriptId: string) {
    try {
      const response = await api.get(`/transcripts/${transcriptId}/download`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
