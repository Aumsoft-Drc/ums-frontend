export class CardRequestService {
  static async getAll() {
    try {
      // Dans un environnement réel, ceci ferait un appel API via api.get
      // const response = await api.get("/card-requests")
      // return response.data

      // Données simulées pour le développement
      return [
        {
          id: "1",
          studentId: "101",
          studentName: "Jean Dupont",
          requestDate: "2023-09-05T10:30:00Z",
          status: "pending",
          cardType: "student",
          reason: "Première inscription",
        },
        {
          id: "2",
          studentId: "102",
          studentName: "Marie Laurent",
          requestDate: "2023-09-15T11:45:00Z",
          status: "approved",
          cardType: "student",
          reason: "Carte perdue",
          approvedBy: "Admin",
          approvedDate: "2023-09-16T09:30:00Z",
        },
        {
          id: "3",
          studentId: "103",
          studentName: "Thomas Petit",
          requestDate: "2023-09-12T09:20:00Z",
          status: "rejected",
          cardType: "library",
          reason: "Expiration",
        },
      ]
    } catch (error) {
      console.error("Error fetching card requests:", error)
      throw error
    }
  }

  static async getById(id: string) {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // const response = await api.get(`/card-requests/${id}`)
      // return response.data

      // Données simulées pour le développement
      const requests = await this.getAll()
      const request = requests.find((r) => r.id === id)

      if (!request) {
        throw new Error(`Card request with ID ${id} not found`)
      }

      return request
    } catch (error) {
      console.error(`Error fetching card request with ID ${id}:`, error)
      throw error
    }
  }

  static async create(data: any) {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // const response = await api.post("/card-requests", data)
      // return response.data

      // Simulation pour le développement
      const newRequest = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        requestDate: new Date().toISOString(),
        status: "pending",
      }

      return newRequest
    } catch (error) {
      console.error("Error creating card request:", error)
      throw error
    }
  }

  static async update(id: string, data: any) {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // const response = await api.put(`/card-requests/${id}`, data)
      // return response.data

      // Simulation pour le développement
      const request = await this.getById(id)
      const updatedRequest = {
        ...request,
        ...data,
      }

      return updatedRequest
    } catch (error) {
      console.error(`Error updating card request with ID ${id}:`, error)
      throw error
    }
  }

  static async remove(id: string) {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // await api.delete(`/card-requests/${id}`)

      // Simulation pour le développement
      await this.getById(id) // Vérifier si la demande existe
      console.log(`Card request with ID ${id} has been removed`)
      return id
    } catch (error) {
      console.error(`Error removing card request with ID ${id}:`, error)
      throw error
    }
  }
}
