import { api } from "./api"

export class DocumentService {
  static async getAll() {
    const response = await api.get("/documents")
    return response.data
  }

  static async getById(id: string) {
    const response = await api.get(`/documents/${id}`)
    return response.data
  }

  static async create(data: any) {
    const response = await api.post("/documents", data)
    return response.data
  }

  static async update(id: string, data: any) {
    const response = await api.put(`/documents/${id}`, data)
    return response.data
  }

  static async remove(id: string) {
    await api.delete(`/documents/${id}`)
  }
}
