import { api } from "./api"

export function createGenericService<T>(endpoint: string) {
  return {
    async getAll(params = {}) {
      try {
        const response = await api.get(`/${endpoint}`, { params })
        return response.data
      } catch (error) {
        throw error
      }
    },

    async getById(id: string) {
      try {
        const response = await api.get(`/${endpoint}/${id}`)
        return response.data
      } catch (error) {
        throw error
      }
    },

    async create(data: Partial<T>) {
      try {
        const response = await api.post(`/${endpoint}`, data)
        return response.data
      } catch (error) {
        throw error
      }
    },

    async update(id: string, data: Partial<T>) {
      try {
        const response = await api.put(`/${endpoint}/${id}`, data)
        return response.data
      } catch (error) {
        throw error
      }
    },

    async delete(id: string) {
      try {
        const response = await api.delete(`/${endpoint}/${id}`)
        return response.data
      } catch (error) {
        throw error
      }
    },
  }
}
