interface Budget {
  id: string
  title: string
  description: string
  amount: number
  fiscalYear: string
  department: {
    id: string
    name: string
  }
  category: string
  status: string
  createdAt: string
  updatedAt: string
}

class BudgetService {
  async getAll(): Promise<Budget[]> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.get('/budgets');

      // Données simulées pour le développement
      return [
        {
          id: "1",
          title: "Budget de recherche",
          description: "Allocation pour les projets de recherche du département",
          amount: 250000,
          fiscalYear: "2023-2024",
          department: {
            id: "1",
            name: "Sciences",
          },
          category: "Recherche",
          status: "Approuvé",
          createdAt: "2023-07-01T10:00:00Z",
          updatedAt: "2023-07-15T14:30:00Z",
        },
        {
          id: "2",
          title: "Budget d'équipement",
          description: "Achat de nouveaux équipements pour les laboratoires",
          amount: 120000,
          fiscalYear: "2023-2024",
          department: {
            id: "2",
            name: "Ingénierie",
          },
          category: "Équipement",
          status: "En révision",
          createdAt: "2023-07-05T09:15:00Z",
          updatedAt: "2023-07-10T11:45:00Z",
        },
        {
          id: "3",
          title: "Budget des événements",
          description: "Organisation de conférences et séminaires",
          amount: 50000,
          fiscalYear: "2023-2024",
          department: {
            id: "3",
            name: "Lettres",
          },
          category: "Événements",
          status: "Approuvé",
          createdAt: "2023-07-03T13:20:00Z",
          updatedAt: "2023-07-18T10:10:00Z",
        },
      ]
    } catch (error) {
      console.error("Error fetching budgets:", error)
      throw error
    }
  }

  async getById(id: string): Promise<Budget> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.get(`/budgets/${id}`);

      // Données simulées pour le développement
      const budgets = await this.getAll()
      const budget = budgets.find((b) => b.id === id)

      if (!budget) {
        throw new Error(`Budget with ID ${id} not found`)
      }

      return budget
    } catch (error) {
      console.error(`Error fetching budget with ID ${id}:`, error)
      throw error
    }
  }

  async create(data: Partial<Budget>): Promise<Budget> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.post('/budgets', data);

      // Simulation pour le développement
      const now = new Date().toISOString()
      const newBudget: Budget = {
        id: Math.random().toString(36).substr(2, 9),
        title: data.title || "",
        description: data.description || "",
        amount: data.amount || 0,
        fiscalYear: data.fiscalYear || "",
        department: data.department || { id: "", name: "" },
        category: data.category || "",
        status: data.status || "Brouillon",
        createdAt: now,
        updatedAt: now,
      }

      return newBudget
    } catch (error) {
      console.error("Error creating budget:", error)
      throw error
    }
  }

  async update(id: string, data: Partial<Budget>): Promise<Budget> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.put(`/budgets/${id}`, data);

      // Simulation pour le développement
      const budget = await this.getById(id)

      const updatedBudget: Budget = {
        ...budget,
        ...data,
        department: data.department || budget.department,
        updatedAt: new Date().toISOString(),
      }

      return updatedBudget
    } catch (error) {
      console.error(`Error updating budget with ID ${id}:`, error)
      throw error
    }
  }

  async remove(id: string): Promise<void> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // await api.delete(`/budgets/${id}`);

      // Simulation pour le développement
      // Vérifier si le budget existe
      await this.getById(id)

      // Dans un environnement réel, l'élément serait supprimé de la base de données
      console.log(`Budget with ID ${id} has been removed`)

      return
    } catch (error) {
      console.error(`Error removing budget with ID ${id}:`, error)
      throw error
    }
  }
}

export const budgetService = new BudgetService()
