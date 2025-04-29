import { api } from "./api"

export const adminService = {
  async getAllUsers(params: any = {}) {
    try {
      const response = await api.get("/admin/users", { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getUserById(userId: string) {
    try {
      const response = await api.get(`/admin/users/${userId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async createUser(userData: any) {
    try {
      const response = await api.post("/admin/users", userData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async updateUser(userId: string, userData: any) {
    try {
      const response = await api.put(`/admin/users/${userId}`, userData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async deleteUser(userId: string) {
    try {
      const response = await api.delete(`/admin/users/${userId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getAllCourses(params: any = {}) {
    try {
      const response = await api.get("/admin/courses", { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async createCourse(courseData: any) {
    try {
      const response = await api.post("/admin/courses", courseData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async updateCourse(courseId: string, courseData: any) {
    try {
      const response = await api.put(`/admin/courses/${courseId}`, courseData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async deleteCourse(courseId: string) {
    try {
      const response = await api.delete(`/admin/courses/${courseId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async createCourseOffering(courseOfferingData: any) {
    try {
      const response = await api.post("/admin/course-offerings", courseOfferingData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getDepartments() {
    try {
      const response = await api.get("/admin/departments")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getPrograms() {
    try {
      const response = await api.get("/admin/programs")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getCohorts() {
    try {
      const response = await api.get("/admin/cohorts")
      return response.data
    } catch (error) {
      throw error
    }
  },
}
