import { api } from "./api"

export const authService = {
  async login(credentials: { username: string; password: string }) {
    try {
      const response = await api.post("/auth/login", credentials)
      // Store token in localStorage
      localStorage.setItem("token", response.data.token)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async register(userData: any) {
    try {
      const response = await api.post("/auth/register", userData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async logout() {
    try {
      // Remove token from localStorage
      localStorage.removeItem("token")
      return true
    } catch (error) {
      throw error
    }
  },

  async getCurrentUser() {
    try {
      const token = localStorage.getItem("token")
      if (!token) return null

      const response = await api.get("/auth/me")
      return {
        user: response.data,
        token,
      }
    } catch (error) {
      // If token is invalid, clear it
      localStorage.removeItem("token")
      return null
    }
  },

  async forgotPassword(email: string) {
    try {
      const response = await api.post("/auth/password/reset/request", { usernameOrEmail: email })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async resetPassword(token: string, newPassword: string) {
    try {
      const response = await api.post("/auth/password/reset", { token, newPassword })
      return response.data
    } catch (error) {
      throw error
    }
  },
}
