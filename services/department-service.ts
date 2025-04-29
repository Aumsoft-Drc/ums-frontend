import { createGenericService } from "./generic-service"
import { api } from "./api"

export interface Department {
  id: string
  name: string
  code: string
  facultyId: string
  headOfDepartmentId: string
  description: string
  createdAt: string
  updatedAt: string
}

const baseService = createGenericService<Department>("departments")

export const departmentService = {
  ...baseService,

  async getDepartmentFaculty(departmentId: string) {
    try {
      const response = await api.get(`/departments/${departmentId}/faculty`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getDepartmentPrograms(departmentId: string) {
    try {
      const response = await api.get(`/departments/${departmentId}/programs`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
