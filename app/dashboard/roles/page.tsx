"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import { useTranslation } from "@/hooks/use-translation"
import { PlusCircle, FileDown, FileUp, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExcelExport } from "@/components/excel/excel-export"
import { ExcelImport } from "@/components/excel/excel-import"
import { fetchAllRoles } from "@/redux/slices/role-slice"
import type { RootState, AppDispatch } from "@/redux/store"
import type { Role } from "@/services/role-service"

export default function RolesPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { items: roles, loading, error } = useSelector((state: RootState) => state.roles)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    dispatch(fetchAllRoles())
  }, [dispatch])

  // Colonnes pour le tableau des rôles
  const columns = [
    {
      accessorKey: "id",
      header: t("id"),
    },
    {
      accessorKey: "name",
      header: t("name"),
    },
    {
      accessorKey: "description",
      header: t("description"),
    },
    {
      accessorKey: "permissions",
      header: t("permissions"),
      cell: ({ row }: { row: { original: Role } }) => {
        return <span>{row.original.permissions?.length || 0}</span>
      },
    },
  ]

  // Filtrer les données en fonction du terme de recherche
  const filteredData = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Fonction pour rafraîchir les données
  const refreshData = () => {
    dispatch(fetchAllRoles())
  }

  // Fonction pour gérer l'importation de données Excel
  const handleImport = (data: any[]) => {
    // Logique d'importation
    console.log("Imported data:", data)
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t("roles")}</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t("roles")}</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("roles")}</h1>
        <Button onClick={() => router.push("/dashboard/roles/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t("newRole")}
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("rolesManagement")}</CardTitle>
          <CardDescription>{t("rolesManagementDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder={t("searchRoles")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={refreshData}>
                <RefreshCw className="h-4 w-4" />
              </Button>
              <ExcelExport data={filteredData} filename="roles-export">
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
            onRowClick={(row) => router.push(`/dashboard/roles/${row.id}`)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
