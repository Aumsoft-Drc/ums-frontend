interface FeePayment {
  id: string
  student: {
    id: string
    name: string
  }
  amount: number
  feeType: {
    id: string
    name: string
  }
  paymentDate: string
  paymentMethod: string
  transactionId: string
  status: string
  academicPeriod: {
    id: string
    name: string
  }
}

class FeePaymentService {
  async getAll(): Promise<FeePayment[]> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.get('/fee-payments');

      // Données simulées pour le développement
      return [
        {
          id: "1",
          student: {
            id: "101",
            name: "Jean Dupont",
          },
          amount: 1500,
          feeType: {
            id: "1",
            name: "Frais de scolarité",
          },
          paymentDate: "2023-09-05T10:30:00Z",
          paymentMethod: "Carte bancaire",
          transactionId: "TRX123456",
          status: "Complété",
          academicPeriod: {
            id: "2023-1",
            name: "Semestre 1 2023-2024",
          },
        },
        {
          id: "2",
          student: {
            id: "102",
            name: "Marie Laurent",
          },
          amount: 800,
          feeType: {
            id: "2",
            name: "Frais de laboratoire",
          },
          paymentDate: "2023-09-10T14:45:00Z",
          paymentMethod: "Virement bancaire",
          transactionId: "TRX789012",
          status: "Complété",
          academicPeriod: {
            id: "2023-1",
            name: "Semestre 1 2023-2024",
          },
        },
        {
          id: "3",
          student: {
            id: "103",
            name: "Thomas Petit",
          },
          amount: 1500,
          feeType: {
            id: "1",
            name: "Frais de scolarité",
          },
          paymentDate: "2023-09-08T11:20:00Z",
          paymentMethod: "Chèque",
          transactionId: "TRX345678",
          status: "En attente",
          academicPeriod: {
            id: "2023-1",
            name: "Semestre 1 2023-2024",
          },
        },
      ]
    } catch (error) {
      console.error("Error fetching fee payments:", error)
      throw error
    }
  }

  async getById(id: string): Promise<FeePayment> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.get(`/fee-payments/${id}`);

      // Données simulées pour le développement
      const payments = await this.getAll()
      const payment = payments.find((p) => p.id === id)

      if (!payment) {
        throw new Error(`Fee payment with ID ${id} not found`)
      }

      return payment
    } catch (error) {
      console.error(`Error fetching fee payment with ID ${id}:`, error)
      throw error
    }
  }

  async create(data: Partial<FeePayment>): Promise<FeePayment> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.post('/fee-payments', data);

      // Simulation pour le développement
      const newPayment: FeePayment = {
        id: Math.random().toString(36).substr(2, 9),
        student: data.student || { id: "", name: "" },
        amount: data.amount || 0,
        feeType: data.feeType || { id: "", name: "" },
        paymentDate: data.paymentDate || new Date().toISOString(),
        paymentMethod: data.paymentMethod || "",
        transactionId: data.transactionId || "",
        status: data.status || "En attente",
        academicPeriod: data.academicPeriod || { id: "", name: "" },
      }

      return newPayment
    } catch (error) {
      console.error("Error creating fee payment:", error)
      throw error
    }
  }

  async update(id: string, data: Partial<FeePayment>): Promise<FeePayment> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.put(`/fee-payments/${id}`, data);

      // Simulation pour le développement
      const payment = await this.getById(id)

      const updatedPayment: FeePayment = {
        ...payment,
        ...data,
        student: data.student || payment.student,
        feeType: data.feeType || payment.feeType,
        academicPeriod: data.academicPeriod || payment.academicPeriod,
      }

      return updatedPayment
    } catch (error) {
      console.error(`Error updating fee payment with ID ${id}:`, error)
      throw error
    }
  }

  async remove(id: string): Promise<void> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // await api.delete(`/fee-payments/${id}`);

      // Simulation pour le développement
      // Vérifier si le paiement existe
      await this.getById(id)

      // Dans un environnement réel, l'élément serait supprimé de la base de données
      console.log(`Fee payment with ID ${id} has been removed`)

      return
    } catch (error) {
      console.error(`Error removing fee payment with ID ${id}:`, error)
      throw error
    }
  }
}

export const feePaymentService = new FeePaymentService()
