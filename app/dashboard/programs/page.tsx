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
import { Badge } from "@/components/ui/badge"

// Colonnes pour le tableau des programmes
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
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "level",
    header: "Level",
    cell: ({ row }) => {
      const level = row.getValue("level") as string
      return (
        <Badge variant={level === "Undergraduate" ? "default" : level === "Graduate" ? "secondary" : "outline"}>
          {level}
        </Badge>
      )
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "students",
    header: "Students",
  },
]

// Données fictives pour les programmes
const programsData = [
  {
    id: "1",
    name: "Bachelor of Science in Computer Science",
    code: "BSCS",
    department: "Computer Science",
    level: "Undergraduate",
    duration: "4 years",
    students: 120,
  },
  {
    id: "2",
    name: "Master of Science in Computer Science",
    code: "MSCS",
    department: "Computer Science",
    level: "Graduate",
    duration: "2 years",
    students: 45,
  },
  {
    id: "3",
    name: "PhD in Computer Science",
    code: "PHDCS",
    department: "Computer Science",
    level: "Doctorate",
    duration: "4 years",
    students: 15,
  },
  {
    id: "4",
    name: "Bachelor of Science in Mathematics",
    code: "BSMATH",
    department: "Mathematics",
    level: "Undergraduate",
    duration: "3 years",
    students: 85,
  },
  {
    id: "5",
    name: "Master of Science in Data Science",
    code: "MSDS",
    department: "Computer Science",
    level: "Graduate",
    duration: "2 years",
    students: 60,
  },
]

export default function ProgramsPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [data, setData] = useState(programsData)

  // Filtrer les données en fonction du terme de recherche
  const filteredData = data.filter(
    (program) =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.level.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Fonction pour rafraîchir les données
  const refreshData = () => {
    // Dans un environnement réel, vous appelleriez votre API
    // Simulons un rafraîchissement pour la démonstration
    setTimeout(() => {
      setData([...programsData])
    }, 500)
  }

  // Fonction pour gérer l'importation de données Excel
  const handleImport = (data: any[]) => {
    setData(data)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("programs")}</h1>
        <Button onClick={() => router.push("/dashboard/programs/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t("newProgram")}
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("programsManagement")}</CardTitle>
          <CardDescription>{t("programsManagementDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder={t("searchPrograms")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={refreshData}>
                <RefreshCw className="h-4 w-4" />
              </Button>
              <ExcelExport data={filteredData} filename="programs-export">
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
            onRowClick={(row) => router.push(`/dashboard/programs/${row.id}`)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
