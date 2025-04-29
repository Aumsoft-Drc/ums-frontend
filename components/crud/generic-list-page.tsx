"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "@/hooks/use-translation"
import { usePermissions } from "@/hooks/use-permissions"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import { PlusCircle, FileDown, FileUp, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExcelExport } from "@/components/excel/excel-export"
import { ExcelImport } from "@/components/excel/excel-import"
import type { AppDispatch, RootState } from "@/redux/store"
import { Skeleton } from "@/components/ui/skeleton"

interface GenericListPageProps<T> {
  title: string
  description?: string
  entityName: string
  entityNamePlural: string
  basePath: string
  columns: any[]
  fetchAction: any
  selector: (state: RootState) => { items: T[]; loading: boolean; error: string | null }
  searchFields?: string[]
  resourceName: string
}

export function GenericListPage<T extends { id: string }>({
  title,
  description,
  entityName,
  entityNamePlural,
  basePath,
  columns,
  fetchAction,
  selector,
  searchFields = ["name"],
  resourceName,
}: GenericListPageProps<T>) {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { items, loading, error } = useSelector(selector)
  const [searchTerm, setSearchTerm] = useState("")
  const { canView, canCreate } = usePermissions()

  useEffect(() => {
    if (canView(resourceName)) {
      dispatch(fetchAction())
    }
  }, [dispatch, fetchAction, canView, resourceName])

  // Filtrer les données en fonction du terme de recherche
  const filteredData = items.filter((item: any) => {
    if (!searchTerm) return true
    return searchFields.some((field) => {
      const value = field.split(".").reduce((obj, key) => obj && obj[key], item)
      return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    })
  })

  // Fonction pour rafraîchir les données
  const refreshData = () => {
    dispatch(fetchAction())
  }

  // Fonction pour gérer l'importation de données Excel
  const handleImport = (data: any[]) => {
    // Implement import logic
    console.log("Importing data:", data)
  }

  if (!canView(resourceName)) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">{t("accessDenied")}</h1>
        <p>{t("noPermissionToView", { resource: entityNamePlural })}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        {canCreate(resourceName) && (
          <Button onClick={() => router.push(`${basePath}/new`)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {t("new", { entity: entityName })}
          </Button>
        )}
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("manage", { entity: entityNamePlural })}</CardTitle>
          <CardDescription>{description || t("total", { count: filteredData.length })}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder={t("search", { entity: entityNamePlural })}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={refreshData}>
                <RefreshCw className="h-4 w-4" />
              </Button>
              <ExcelExport data={filteredData} filename={entityNamePlural.toLowerCase()}>
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

          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <DataTable
              columns={columns}
              data={filteredData}
              onRowClick={(row) => router.push(`${basePath}/${row.id}`)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
