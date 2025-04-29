interface Category {
  id: string
  name: string
  description: string
  slug: string
  parentId?: string
  createdAt: string
  updatedAt: string
}

class CategoryService {
  async getAll(): Promise<Category[]> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.get('/categories');

      // Données simulées pour le développement
      return [
        {
          id: "1",
          name: "Actualités",
          description: "Actualités de l'université",
          slug: "actualites",
          createdAt: "2023-01-15T10:00:00Z",
          updatedAt: "2023-01-15T10:00:00Z",
        },
        {
          id: "2",
          name: "Événements",
          description: "Événements à venir",
          slug: "evenements",
          createdAt: "2023-01-15T10:05:00Z",
          updatedAt: "2023-01-15T10:05:00Z",
        },
        {
          id: "3",
          name: "Recherche",
          description: "Publications et projets de recherche",
          slug: "recherche",
          createdAt: "2023-01-15T10:10:00Z",
          updatedAt: "2023-01-15T10:10:00Z",
        },
        {
          id: "4",
          name: "Conférences",
          description: "Conférences académiques",
          slug: "conferences",
          parentId: "2",
          createdAt: "2023-01-15T10:15:00Z",
          updatedAt: "2023-01-15T10:15:00Z",
        },
      ]
    } catch (error) {
      console.error("Error fetching categories:", error)
      throw error
    }
  }

  async getById(id: string): Promise<Category> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.get(`/categories/${id}`);

      // Données simulées pour le développement
      const categories = await this.getAll()
      const category = categories.find((c) => c.id === id)

      if (!category) {
        throw new Error(`Category with ID ${id} not found`)
      }

      return category
    } catch (error) {
      console.error(`Error fetching category with ID ${id}:`, error)
      throw error
    }
  }

  async create(data: Partial<Category>): Promise<Category> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.post('/categories', data);

      // Simulation pour le développement
      const now = new Date().toISOString()
      const newCategory: Category = {
        id: Math.random().toString(36).substr(2, 9),
        name: data.name || "",
        description: data.description || "",
        slug: data.slug || this.generateSlug(data.name || ""),
        parentId: data.parentId,
        createdAt: now,
        updatedAt: now,
      }

      return newCategory
    } catch (error) {
      console.error("Error creating category:", error)
      throw error
    }
  }

  async update(id: string, data: Partial<Category>): Promise<Category> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.put(`/categories/${id}`, data);

      // Simulation pour le développement
      const category = await this.getById(id)

      const updatedCategory: Category = {
        ...category,
        ...data,
        slug: data.slug || (data.name ? this.generateSlug(data.name) : category.slug),
        updatedAt: new Date().toISOString(),
      }

      return updatedCategory
    } catch (error) {
      console.error(`Error updating category with ID ${id}:`, error)
      throw error
    }
  }

  async remove(id: string): Promise<void> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // await api.delete(`/categories/${id}`);

      // Simulation pour le développement
      // Vérifier si la catégorie existe
      await this.getById(id)

      // Dans un environnement réel, l'élément serait supprimé de la base de données
      console.log(`Category with ID ${id} has been removed`)

      return
    } catch (error) {
      console.error(`Error removing category with ID ${id}:`, error)
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

export const categoryService = new CategoryService()
