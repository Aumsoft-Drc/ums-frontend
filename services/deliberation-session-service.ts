import { createGenericService } from "./generic-service"
import { api } from "./api"

export interface DeliberationSession {
  id: string
  academicPeriodId: string
  programId: string
  date: string
  status: string
  notes: string
  createdAt: string
  updatedAt: string
}

const baseService = createGenericService<DeliberationSession>("deliberationSessions")

export const deliberationSessionService = {
  ...baseService,

  async getDeliberationResults(sessionId: string) {
    try {
      const response = await api.get(`/deliberationSessions/${sessionId}/results`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async finalizeDeliberation(sessionId: string) {
    try {
      const response = await api.post(`/deliberationSessions/${sessionId}/finalize`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
