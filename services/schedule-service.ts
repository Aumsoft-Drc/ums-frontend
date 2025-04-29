import { api } from "./api"

export const scheduleService = {
  async getStudentSchedule() {
    try {
      // In a real app, this would call the API
      // const response = await api.get("/students/me/schedule");
      // return response.data;

      // Mock data for development
      return {
        monday: [
          {
            id: "1",
            course: {
              id: "1",
              name: "Introduction to Computer Science",
              code: "CS101",
            },
            startTime: "08:00",
            endTime: "10:00",
            location: "Room A101",
            instructor: "Dr. John Smith",
            type: "Lecture",
          },
          {
            id: "2",
            course: {
              id: "2",
              name: "Calculus I",
              code: "MATH101",
            },
            startTime: "13:00",
            endTime: "15:00",
            location: "Room B205",
            instructor: "Dr. Jane Doe",
            type: "Lecture",
          },
        ],
        tuesday: [
          {
            id: "3",
            course: {
              id: "3",
              name: "Introduction to Psychology",
              code: "PSY101",
            },
            startTime: "10:00",
            endTime: "12:00",
            location: "Room C302",
            instructor: "Prof. Robert Johnson",
            type: "Lecture",
          },
        ],
        wednesday: [
          {
            id: "4",
            course: {
              id: "1",
              name: "Introduction to Computer Science",
              code: "CS101",
            },
            startTime: "15:00",
            endTime: "17:00",
            location: "Lab 1",
            instructor: "Dr. John Smith",
            type: "Lab",
          },
        ],
        thursday: [
          {
            id: "5",
            course: {
              id: "2",
              name: "Calculus I",
              code: "MATH101",
            },
            startTime: "13:00",
            endTime: "15:00",
            location: "Room B205",
            instructor: "Dr. Jane Doe",
            type: "Tutorial",
          },
        ],
        friday: [
          {
            id: "6",
            course: {
              id: "3",
              name: "Introduction to Psychology",
              code: "PSY101",
            },
            startTime: "09:00",
            endTime: "11:00",
            location: "Room C302",
            instructor: "Prof. Robert Johnson",
            type: "Seminar",
          },
        ],
        saturday: [],
      }
    } catch (error) {
      throw error
    }
  },

  async getInstructorSchedule() {
    try {
      const response = await api.get("/instructors/me/schedule")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getRoomSchedule(roomId: string) {
    try {
      const response = await api.get(`/rooms/${roomId}/schedule`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
