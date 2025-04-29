import { api } from "./api"

export const permissionService = {
  async getAllPermissions(params = {}) {
    try {
      const response = await api.get("/permissions", { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getPermissionById(id: string) {
    try {
      const response = await api.get(`/permissions/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async createPermission(data: any) {
    try {
      const response = await api.post("/permissions", data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async updatePermission(id: string, data: any) {
    try {
      const response = await api.put(`/permissions/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async deletePermission(id: string) {
    try {
      const response = await api.delete(`/permissions/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getPermissionRoles(id: string) {
    try {
      const response = await api.get(`/permissions/${id}/roles`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getUserPermissions(userId: string) {
    try {
      const response = await api.get(`/users/${userId}/permissions`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
