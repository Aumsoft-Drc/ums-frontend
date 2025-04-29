interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: string
  createdAt: string
  updatedAt: string
  respondedAt?: string
  respondedBy?: {
    id: string
    name: string
  }
  response?: string
}

class ContactMessageService {
  async getAll(): Promise<ContactMessage[]> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.get('/contact-messages');

      // Données simulées pour le développement
      return [
        {
          id: "1",
          name: "Jean Dupont",
          email: "jean.dupont@example.com",
          subject: "Question sur les inscriptions",
          message: "Bonjour, je souhaiterais savoir quand débutent les inscriptions pour le semestre prochain. Merci.",
          status: "responded",
          createdAt: "2023-05-10T09:30:00Z",
          updatedAt: "2023-05-12T14:15:00Z",
          respondedAt: "2023-05-12T14:15:00Z",
          respondedBy: {
            id: "301",
            name: "Service des Inscriptions",
          },
          response:
            "Bonjour, les inscriptions débuteront le 15 juin. Vous recevrez un email avec toutes les informations nécessaires. Cordialement.",
        },
        {
          id: "2",
          name: "Marie Laurent",
          email: "marie.laurent@example.com",
          subject: "Problème d'accès à la plateforme",
          message: "Bonjour, je n'arrive pas à me connecter à mon compte étudiant depuis hier. Pouvez-vous m'aider ?",
          status: "pending",
          createdAt: "2023-05-15T11:45:00Z",
          updatedAt: "2023-05-15T11:45:00Z",
        },
        {
          id: "3",
          name: "Thomas Petit",
          email: "thomas.petit@example.com",
          subject: "Demande de rendez-vous",
          message:
            "Bonjour, je souhaiterais prendre rendez-vous avec un conseiller d'orientation. Quelles sont les disponibilités ?",
          status: "pending",
          createdAt: "2023-05-16T10:20:00Z",
          updatedAt: "2023-05-16T10:20:00Z",
        },
      ]
    } catch (error) {
      console.error("Error fetching contact messages:", error)
      throw error
    }
  }

  async getById(id: string): Promise<ContactMessage> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.get(`/contact-messages/${id}`);

      // Données simulées pour le développement
      const messages = await this.getAll()
      const message = messages.find((m) => m.id === id)

      if (!message) {
        throw new Error(`Contact message with ID ${id} not found`)
      }

      return message
    } catch (error) {
      console.error(`Error fetching contact message with ID ${id}:`, error)
      throw error
    }
  }

  async create(data: Partial<ContactMessage>): Promise<ContactMessage> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.post('/contact-messages', data);

      // Simulation pour le développement
      const now = new Date().toISOString()
      const newMessage: ContactMessage = {
        id: Math.random().toString(36).substr(2, 9),
        name: data.name || "",
        email: data.email || "",
        subject: data.subject || "",
        message: data.message || "",
        status: "new",
        createdAt: now,
        updatedAt: now,
      }

      return newMessage
    } catch (error) {
      console.error("Error creating contact message:", error)
      throw error
    }
  }

  async update(id: string, data: Partial<ContactMessage>): Promise<ContactMessage> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.put(`/contact-messages/${id}`, data);

      // Simulation pour le développement
      const message = await this.getById(id)
      const now = new Date().toISOString()

      const updatedMessage: ContactMessage = {
        ...message,
        ...data,
        updatedAt: now,
        // Si on ajoute une réponse et que le statut était 'new' ou 'pending', on le passe à 'responded'
        status:
          data.response && (message.status === "new" || message.status === "pending")
            ? "responded"
            : data.status || message.status,
        // Si on ajoute une réponse et qu'il n'y avait pas de date de réponse, on l'ajoute
        respondedAt: data.response && !message.respondedAt ? now : message.respondedAt,
        respondedBy: data.respondedBy || message.respondedBy,
      }

      return updatedMessage
    } catch (error) {
      console.error(`Error updating contact message with ID ${id}:`, error)
      throw error
    }
  }

  async remove(id: string): Promise<void> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // await api.delete(`/contact-messages/${id}`);

      // Simulation pour le développement
      // Vérifier si le message existe
      await this.getById(id)

      // Dans un environnement réel, l'élément serait supprimé de la base de données
      console.log(`Contact message with ID ${id} has been removed`)

      return
    } catch (error) {
      console.error(`Error removing contact message with ID ${id}:`, error)
      throw error
    }
  }
}

export const contactMessageService = new ContactMessageService()
