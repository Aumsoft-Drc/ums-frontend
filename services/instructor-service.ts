import { api } from "./api"

export const instructorService = {
  async getInstructorProfile() {
    try {
      const response = await api.get("/instructors/me/profile")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getAssignedCourses() {
    try {
      const response = await api.get("/instructors/me/courses")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getCourseStudents(courseOfferingId: string) {
    try {
      const response = await api.get(`/instructors/me/courses/${courseOfferingId}/students`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async createAssignment(courseOfferingId: string, assignmentData: any) {
    try {
      const response = await api.post(`/instructors/me/courses/${courseOfferingId}/assignments`, assignmentData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async createExam(courseOfferingId: string, examData: any) {
    try {
      const response = await api.post(`/instructors/me/courses/${courseOfferingId}/exams`, examData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async submitGrades(courseOfferingId: string, gradesData: any) {
    try {
      const response = await api.post(`/instructors/me/courses/${courseOfferingId}/grades`, gradesData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getSubmissions(assignmentId: string) {
    try {
      const response = await api.get(`/instructors/me/assignments/${assignmentId}/submissions`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async gradeSubmission(submissionId: string, gradeData: any) {
    try {
      const response = await api.post(`/instructors/me/submissions/${submissionId}/grade`, gradeData)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
