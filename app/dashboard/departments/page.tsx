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

// Colonnes pour le tableau des départements
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
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "faculty",
    header: "Faculty",
  },
  {
    accessorKey: "head",
    header: "Head of Department",
  },
  {
    accessorKey: "programs",
    header: "Programs",
  },
]

// Données fictives pour les départements
const departmentsData = [
  {
    id: "1",
    name: "Computer Science",
    code: "CS",
    faculty: "Science and Technology",
    head: "Dr. John Smith",
    programs: 3,
  },
  {
    id: "2",
    name: "Mathematics",
    code: "MATH",
    faculty: "Science and Technology",
    head: "Prof. Maria Garcia",
    programs: 2,
  },
  {
    id: "3",
    name: "Physics",
    code: "PHYS",
    faculty: "Science and Technology",
    head: "Dr. Robert Johnson",
    programs: 2,
  },
  {
    id: "4",
    name: "Biology",
    code: "BIO",
    faculty: "Science and Technology",
    head: "Prof. Sarah Williams",
    programs: 4,
  },
  {
    id: "5",
    name: "Chemistry",
    code: "CHEM",
    faculty: "Science and Technology",
    head: "Dr. Michael Brown",
    programs: 3,
  },
]

export default function DepartmentsPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [data, setData] = useState(departmentsData)

  // Filtrer les données en fonction du terme de recherche
  const filteredData = data.filter(
    (department) =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.head.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Fonction pour rafraîchir les données
  const refreshData = () => {
    // Dans un environnement réel, vous appelleriez votre API
    // Simulons un rafraîchissement pour la démonstration
    setTimeout(() => {
      setData([...departmentsData])
    }, 500)
  }

  // Fonction pour gérer l'importation de données Excel
  const handleImport = (data: any[]) => {
    setData(data)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("departments")}</h1>
        <Button onClick={() => router.push("/dashboard/departments/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t("newDepartment")}
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("departmentsManagement")}</CardTitle>
          <CardDescription>{t("departmentsManagementDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder={t("searchDepartments")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={refreshData}>
                <RefreshCw className="h-4 w-4" />
              </Button>
              <ExcelExport data={filteredData} filename="departments-export">
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
            onRowClick={(row) => router.push(`/dashboard/departments/${row.id}`)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
