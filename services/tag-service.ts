interface Tag {
  id: string
  name: string
  slug: string
  createdAt: string
  updatedAt: string
}

class TagService {
  async getAll(): Promise<Tag[]> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.get('/tags');

      // Données simulées pour le développement
      return [
        {
          id: "1",
          name: "Recherche",
          slug: "recherche",
          createdAt: "2023-01-20T10:00:00Z",
          updatedAt: "2023-01-20T10:00:00Z",
        },
        {
          id: "2",
          name: "Étudiants",
          slug: "etudiants",
          createdAt: "2023-01-20T10:05:00Z",
          updatedAt: "2023-01-20T10:05:00Z",
        },
        {
          id: "3",
          name: "Enseignement",
          slug: "enseignement",
          createdAt: "2023-01-20T10:10:00Z",
          updatedAt: "2023-01-20T10:10:00Z",
        },
        {
          id: "4",
          name: "International",
          slug: "international",
          createdAt: "2023-01-20T10:15:00Z",
          updatedAt: "2023-01-20T10:15:00Z",
        },
        {
          id: "5",
          name: "Innovation",
          slug: "innovation",
          createdAt: "2023-01-20T10:20:00Z",
          updatedAt: "2023-01-20T10:20:00Z",
        },
      ]
    } catch (error) {
      console.error("Error fetching tags:", error)
      throw error
    }
  }

  async getById(id: string): Promise<Tag> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.get(`/tags/${id}`);

      // Données simulées pour le développement
      const tags = await this.getAll()
      const tag = tags.find((t) => t.id === id)

      if (!tag) {
        throw new Error(`Tag with ID ${id} not found`)
      }

      return tag
    } catch (error) {
      console.error(`Error fetching tag with ID ${id}:`, error)
      throw error
    }
  }

  async create(data: Partial<Tag>): Promise<Tag> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.post('/tags', data);

      // Simulation pour le développement
      const now = new Date().toISOString()
      const newTag: Tag = {
        id: Math.random().toString(36).substr(2, 9),
        name: data.name || "",
        slug: data.slug || this.generateSlug(data.name || ""),
        createdAt: now,
        updatedAt: now,
      }

      return newTag
    } catch (error) {
      console.error("Error creating tag:", error)
      throw error
    }
  }

  async update(id: string, data: Partial<Tag>): Promise<Tag> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.put(`/tags/${id}`, data);

      // Simulation pour le développement
      const tag = await this.getById(id)

      const updatedTag: Tag = {
        ...tag,
        ...data,
        slug: data.slug || (data.name ? this.generateSlug(data.name) : tag.slug),
        updatedAt: new Date().toISOString(),
      }

      return updatedTag
    } catch (error) {
      console.error(`Error updating tag with ID ${id}:`, error)
      throw error
    }
  }

  async remove(id: string): Promise<void> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // await api.delete(`/tags/${id}`);

      // Simulation pour le développement
      // Vérifier si le tag existe
      await this.getById(id)

      // Dans un environnement réel, l'élément serait supprimé de la base de données
      console.log(`Tag with ID ${id} has been removed`)

      return
    } catch (error) {
      console.error(`Error removing tag with ID ${id}:`, error)
      throw error
    }
  }

  // Utilitaire pour générer un slug à partir d'un nom
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
  }
}

export const tagService = new TagService()
