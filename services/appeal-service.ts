import type { Appeal } from "@/redux/slices/appeal-slice"

class AppealService {
  async getAll(): Promise<Appeal[]> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.get('/appeals');

      // Données simulées pour le développement
      return [
        {
          id: "1",
          student: {
            id: "101",
            name: "Jean Dupont",
          },
          course: {
            id: "201",
            name: "Mathématiques avancées",
          },
          examResult: {
            id: "301",
            score: 65,
          },
          reason: "Erreur de notation possible dans la section B",
          status: "En attente",
          submissionDate: "2023-06-15T10:30:00Z",
        },
        {
          id: "2",
          student: {
            id: "102",
            name: "Marie Laurent",
          },
          course: {
            id: "202",
            name: "Physique quantique",
          },
          examResult: {
            id: "302",
            score: 58,
          },
          reason: "Questions ambiguës dans l'examen",
          status: "Approuvé",
          submissionDate: "2023-06-10T14:45:00Z",
          resolutionDate: "2023-06-20T09:15:00Z",
          resolution: "Note ajustée à 68 après révision",
        },
        {
          id: "3",
          student: {
            id: "103",
            name: "Thomas Petit",
          },
          course: {
            id: "203",
            name: "Programmation avancée",
          },
          examResult: {
            id: "303",
            score: 45,
          },
          reason: "Problèmes techniques pendant l'examen en ligne",
          status: "Rejeté",
          submissionDate: "2023-06-12T11:20:00Z",
          resolutionDate: "2023-06-18T16:30:00Z",
          resolution: "Aucune preuve de problèmes techniques n'a été trouvée",
        },
      ]
    } catch (error) {
      console.error("Error fetching appeals:", error)
      throw error
    }
  }

  async getById(id: string): Promise<Appeal> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.get(`/appeals/${id}`);

      // Données simulées pour le développement
      const appeals = await this.getAll()
      const appeal = appeals.find((a) => a.id === id)

      if (!appeal) {
        throw new Error(`Appeal with ID ${id} not found`)
      }

      return appeal
    } catch (error) {
      console.error(`Error fetching appeal with ID ${id}:`, error)
      throw error
    }
  }

  async create(data: Partial<Appeal>): Promise<Appeal> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.post('/appeals', data);

      // Simulation pour le développement
      const newAppeal: Appeal = {
        id: Math.random().toString(36).substr(2, 9),
        student: data.student || { id: "", name: "" },
        course: data.course || { id: "", name: "" },
        examResult: data.examResult || { id: "", score: 0 },
        reason: data.reason || "",
        status: data.status || "En attente",
        submissionDate: data.submissionDate || new Date().toISOString(),
        resolutionDate: data.resolutionDate,
        resolution: data.resolution,
      }

      return newAppeal
    } catch (error) {
      console.error("Error creating appeal:", error)
      throw error
    }
  }

  async update(id: string, data: Partial<Appeal>): Promise<Appeal> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.put(`/appeals/${id}`, data);

      // Simulation pour le développement
      const appeal = await this.getById(id)

      const updatedAppeal: Appeal = {
        ...appeal,
        ...data,
        student: data.student || appeal.student,
        course: data.course || appeal.course,
        examResult: data.examResult || appeal.examResult,
      }

      return updatedAppeal
    } catch (error) {
      console.error(`Error updating appeal with ID ${id}:`, error)
      throw error
    }
  }

  async remove(id: string): Promise<void> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // await api.delete(`/appeals/${id}`);

      // Simulation pour le développement
      // Vérifier si l'appel existe
      await this.getById(id)

      // Dans un environnement réel, l'élément serait supprimé de la base de données
      console.log(`Appeal with ID ${id} has been removed`)

      return
    } catch (error) {
      console.error(`Error removing appeal with ID ${id}:`, error)
      throw error
    }
  }
}

export const appealService = new AppealService()
