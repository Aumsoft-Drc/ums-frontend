"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import { useTranslation } from "@/hooks/use-translation"
import { PlusCircle, FileDown, FileUp, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExcelExport } from "@/components/excel/excel-export"
import { ExcelImport } from "@/components/excel/excel-import"

// Colonnes pour le tableau des instructeurs
const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "specialization",
    header: "Specialization",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]

// Données fictives pour les instructeurs
const instructorsData = [
  {
    id: "1",
    name: "Dr. John Smith",
    email: "john.smith@university.edu",
    department: "Computer Science",
    specialization: "Artificial Intelligence",
    status: "Active",
  },
  {
    id: "2",
    name: "Prof. Maria Garcia",
    email: "maria.garcia@university.edu",
    department: "Mathematics",
    specialization: "Applied Mathematics",
    status: "Active",
  },
  {
    id: "3",
    name: "Dr. Robert Johnson",
    email: "robert.johnson@university.edu",
    department: "Physics",
    specialization: "Quantum Physics",
    status: "On Leave",
  },
  {
    id: "4",
    name: "Prof. Sarah Williams",
    email: "sarah.williams@university.edu",
    department: "Biology",
    specialization: "Molecular Biology",
    status: "Active",
  },
  {
    id: "5",
    name: "Dr. Michael Brown",
    email: "michael.brown@university.edu",
    department: "Chemistry",
    specialization: "Organic Chemistry",
    status: "Active",
  },
]

export default function InstructorsPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [data, setData] = useState(instructorsData)

  // Filtrer les données en fonction du terme de recherche
  const filteredData = data.filter(
    (instructor) =>
      instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Fonction pour rafraîchir les données
  const refreshData = () => {
    // Dans un environnement réel, vous appelleriez votre API
    // Simulons un rafraîchissement pour la démonstration
    setTimeout(() => {
      setData([...instructorsData])
    }, 500)
  }

  // Fonction pour gérer l'importation de données Excel
  const handleImport = (data: any[]) => {
    setData(data)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("instructors")}</h1>
        <Button onClick={() => router.push("/dashboard/instructors/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t("newInstructor")}
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("instructorsManagement")}</CardTitle>
          <CardDescription>{t("instructorsManagementDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder={t("searchInstructors")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={refreshData}>
                <RefreshCw className="h-4 w-4" />
              </Button>
              <ExcelExport data={filteredData} filename="instructors-export">
                <Button variant="outline">
                  <FileDown className="mr-2 h-4 w-4" />
                  {t("export")}
                </Button>
              </ExcelExport>
              <ExcelImport onImport={handleImport}>
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  {t("import")}
                </Button>
              </ExcelImport>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredData}
            onRowClick={(row) => router.push(`/dashboard/instructors/${row.id}`)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
