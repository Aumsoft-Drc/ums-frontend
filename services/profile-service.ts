import { api } from "./api"

export const profileService = {
  async getUserProfile() {
    try {
      const response = await api.get("/users/me/profile")
      return response.data
    } catch (error) {
      throw error
    }
  },

  async updateUserProfile(profileData: any) {
    try {
      const response = await api.put("/users/me/profile", profileData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async changePassword(passwordData: { currentPassword: string; newPassword: string }) {
    try {
      const response = await api.put("/users/me/password", passwordData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async uploadProfilePicture(formData: FormData) {
    try {
      const response = await api.post("/users/me/profile-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data
    } catch (error) {
      throw error
    }
  },
}
