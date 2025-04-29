import { createGenericService } from "./generic-service"
import { api } from "./api"

export interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  createdAt: string
  updatedAt: string
}

const baseService = createGenericService<Role>("roles")

export const roleService = {
  ...baseService,

  async assignPermission(roleId: string, permissionId: string) {
    try {
      const response = await api.post(`/roles/${roleId}/permissions`, { permissionId })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async removePermission(roleId: string, permissionId: string) {
    try {
      const response = await api.delete(`/roles/${roleId}/permissions/${permissionId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getRolePermissions(roleId: string) {
    try {
      const response = await api.get(`/roles/${roleId}/permissions`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
