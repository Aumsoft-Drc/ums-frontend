interface Notice {
  id: string
  title: string
  content: string
  type: string
  priority: string
  targetAudience: string[]
  startDate: string
  endDate: string
  createdBy: {
    id: string
    name: string
  }
  status: string
  createdAt: string
  updatedAt: string
}

class NoticeService {
  async getAll(): Promise<Notice[]> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.get('/notices');

      // Données simulées pour le développement
      return [
        {
          id: "1",
          title: "Fermeture de la bibliothèque",
          content: "La bibliothèque sera fermée pour maintenance du 15 au 20 juin.",
          type: "maintenance",
          priority: "medium",
          targetAudience: ["students", "faculty"],
          startDate: "2023-06-15T00:00:00Z",
          endDate: "2023-06-20T23:59:59Z",
          createdBy: {
            id: "201",
            name: "Admin Système",
          },
          status: "active",
          createdAt: "2023-06-01T10:00:00Z",
          updatedAt: "2023-06-01T10:00:00Z",
        },
        {
          id: "2",
          title: "Changement d'horaires des examens",
          content:
            "Suite à des contraintes logistiques, les horaires des examens de fin d'année ont été modifiés. Veuillez consulter le nouveau planning.",
          type: "academic",
          priority: "high",
          targetAudience: ["students"],
          startDate: "2023-06-10T00:00:00Z",
          endDate: "2023-06-30T23:59:59Z",
          createdBy: {
            id: "202",
            name: "Bureau des Examens",
          },
          status: "active",
          createdAt: "2023-06-05T14:30:00Z",
          updatedAt: "2023-06-05T14:30:00Z",
        },
        {
          id: "3",
          title: "Coupure électrique planifiée",
          content: "Une coupure électrique est prévue le 25 juin de 8h à 12h pour des travaux de maintenance.",
          type: "maintenance",
          priority: "medium",
          targetAudience: ["students", "faculty", "staff"],
          startDate: "2023-06-20T00:00:00Z",
          endDate: "2023-06-25T12:00:00Z",
          createdBy: {
            id: "203",
            name: "Service Technique",
          },
          status: "active",
          createdAt: "2023-06-10T09:15:00Z",
          updatedAt: "2023-06-10T09:15:00Z",
        },
      ]
    } catch (error) {
      console.error("Error fetching notices:", error)
      throw error
    }
  }

  async getById(id: string): Promise<Notice> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.get(`/notices/${id}`);

      // Données simulées pour le développement
      const notices = await this.getAll()
      const notice = notices.find((n) => n.id === id)

      if (!notice) {
        throw new Error(`Notice with ID ${id} not found`)
      }

      return notice
    } catch (error) {
      console.error(`Error fetching notice with ID ${id}:`, error)
      throw error
    }
  }

  async create(data: Partial<Notice>): Promise<Notice> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.post('/notices', data);

      // Simulation pour le développement
      const now = new Date().toISOString()
      const newNotice: Notice = {
        id: Math.random().toString(36).substr(2, 9),
        title: data.title || "",
        content: data.content || "",
        type: data.type || "general",
        priority: data.priority || "medium",
        targetAudience: data.targetAudience || ["all"],
        startDate: data.startDate || now,
        endDate: data.endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: data.createdBy || { id: "", name: "" },
        status: data.status || "draft",
        createdAt: now,
        updatedAt: now,
      }

      return newNotice
    } catch (error) {
      console.error("Error creating notice:", error)
      throw error
    }
  }

  async update(id: string, data: Partial<Notice>): Promise<Notice> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.put(`/notices/${id}`, data);

      // Simulation pour le développement
      const notice = await this.getById(id)

      const updatedNotice: Notice = {
        ...notice,
        ...data,
        createdBy: data.createdBy || notice.createdBy,
        targetAudience: data.targetAudience || notice.targetAudience,
        updatedAt: new Date().toISOString(),
      }

      return updatedNotice
    } catch (error) {
      console.error(`Error updating notice with ID ${id}:`, error)
      throw error
    }
  }

  async remove(id: string): Promise<void> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // await api.delete(`/notices/${id}`);

      // Simulation pour le développement
      // Vérifier si l'avis existe
      await this.getById(id)

      // Dans un environnement réel, l'élément serait supprimé de la base de données
      console.log(`Notice with ID ${id} has been removed`)

      return
    } catch (error) {
      console.error(`Error removing notice with ID ${id}:`, error)
      throw error
    }
  }
}

export const noticeService = new NoticeService()
