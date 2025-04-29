import { api } from "./api"

export const courseService = {
  async getAllCourses() {
    try {
      const response = await api.get("/courses")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getCourseById(id: string) {
    try {
      const response = await api.get(`/courses/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getEnrolledCourses() {
    try {
      // This would typically come from the student's enrollments
      const response = await api.get("/students/me/enrollments")

      // Mock data for development
      return [
        {
          id: "1",
          name: "Introduction to Computer Science",
          code: "CS101",
          instructor: "Dr. John Smith",
          credits: 3,
          enrolledStudents: 45,
          description: "An introduction to the fundamentals of computer science and programming.",
          nextExam: {
            title: "Midterm Exam",
            date: "2025-05-15",
            time: "10:00 - 12:00",
          },
        },
        {
          id: "2",
          name: "Calculus I",
          code: "MATH101",
          instructor: "Dr. Jane Doe",
          credits: 4,
          enrolledStudents: 60,
          description: "Introduction to differential and integral calculus of functions of one variable.",
        },
        {
          id: "3",
          name: "Introduction to Psychology",
          code: "PSY101",
          instructor: "Prof. Robert Johnson",
          credits: 3,
          enrolledStudents: 75,
          description: "An overview of the scientific study of human behavior and mental processes.",
        },
      ]
    } catch (error) {
      throw error
    }
  },

  async searchCourses(criteria: any) {
    try {
      const response = await api.get("/courses/search", { params: criteria })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async enrollInCourse(courseOfferingId: string) {
    try {
      const response = await api.post("/students/me/enrollments", { courseOfferingId })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async dropCourse(courseOfferingId: string) {
    try {
      const response = await api.delete(`/enrollments/me/${courseOfferingId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
