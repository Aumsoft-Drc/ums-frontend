import { api } from "./api"

export const studentService = {
  async getAllStudents(params = {}) {
    try {
      const response = await api.get("/students", { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getStudentById(id: string) {
    try {
      const response = await api.get(`/students/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async createStudent(data: any) {
    try {
      const response = await api.post("/students", data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async updateStudent(id: string, data: any) {
    try {
      const response = await api.put(`/students/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async deleteStudent(id: string) {
    try {
      const response = await api.delete(`/students/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getStudentProfile() {
    try {
      const response = await api.get("/students/me/profile")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getEnrollments() {
    try {
      const response = await api.get("/students/me/enrollments")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getCourseResults() {
    try {
      const response = await api.get("/students/me/results/courses")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getTranscripts() {
    try {
      const response = await api.get("/students/me/transcripts")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getFinancialSummary() {
    try {
      const response = await api.get("/students/me/finance/summary")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async submitAppeal(appealData: any) {
    try {
      const response = await api.post("/students/me/appeals", appealData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getAppeals() {
    try {
      const response = await api.get("/students/me/appeals")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async createCardRequest(requestData: any) {
    try {
      const response = await api.post("/students/me/card-requests", requestData)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
