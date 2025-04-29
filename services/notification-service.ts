import { api } from "./api"

export const notificationService = {
  async getUserNotifications() {
    try {
      const response = await api.get("/notifications")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async markAsRead(notificationId: string) {
    try {
      const response = await api.put(`/notifications/${notificationId}/read`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async markAllAsRead() {
    try {
      const response = await api.put("/notifications/read-all")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async deleteNotification(notificationId: string) {
    try {
      const response = await api.delete(`/notifications/${notificationId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
