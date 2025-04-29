import { api } from "./api"

export const facultyService = {
  async getAllFaculties(params = {}) {
    try {
      const response = await api.get("/faculties", { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getFacultyById(id: string) {
    try {
      const response = await api.get(`/faculties/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async createFaculty(data: any) {
    try {
      const response = await api.post("/faculties", data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async updateFaculty(id: string, data: any) {
    try {
      const response = await api.put(`/faculties/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async deleteFaculty(id: string) {
    try {
      const response = await api.delete(`/faculties/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getFacultyDepartments(id: string) {
    try {
      const response = await api.get(`/faculties/${id}/departments`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getFacultyPrograms(id: string) {
    try {
      const response = await api.get(`/faculties/${id}/programs`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
