import { api } from "./api"

export const gradeService = {
  async getRecentGrades() {
    try {
      // In a real app, this would call the API
      // const response = await api.get("/students/me/grades/recent");
      // return response.data;

      // Mock data for development
      return [
        {
          id: "1",
          title: "Midterm Exam",
          score: 85,
          maxScore: 100,
          feedback: "Good understanding of core concepts. Work on algorithm complexity analysis.",
          course: {
            id: "1",
            name: "Introduction to Computer Science",
            code: "CS101",
          },
        },
        {
          id: "2",
          title: "Assignment 2",
          score: 18,
          maxScore: 20,
          feedback: "Excellent work! Your solution was very efficient.",
          course: {
            id: "1",
            name: "Introduction to Computer Science",
            code: "CS101",
          },
        },
        {
          id: "3",
          title: "Quiz 1",
          score: 8,
          maxScore: 10,
          course: {
            id: "2",
            name: "Calculus I",
            code: "MATH101",
          },
        },
      ]
    } catch (error) {
      throw error
    }
  },

  async getCourseGrades(courseId: string) {
    try {
      const response = await api.get(`/students/me/courses/${courseId}/grades`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getOverallGPA() {
    try {
      const response = await api.get("/students/me/gpa")
      return response.data
    } catch (error) {
      throw error
    }
  },
}
