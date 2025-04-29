"use client"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { DataTable } from "@/components/data-table/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExcelExport } from "@/components/excel/excel-export"
import { ExcelImport } from "@/components/excel/excel-import"
import { useToast } from "@/components/ui/use-toast"
import { Plus } from "lucide-react"
import Link from "next/link"

interface EntityListProps {
  title: string
  description?: string
  entityNameSingular: string
  entityNamePlural: string
  columns: any[]
  data: any[]
  isLoading: boolean
  baseUrl: string
  onDelete?: (id: string) => Promise<void>
  onImport?: (data: any[]) => Promise<void>
  searchKey?: string
}

export function EntityList({
  title,
  description,
  entityNameSingular,
  entityNamePlural,
  columns,
  data,
  isLoading,
  baseUrl,
  onDelete,
  onImport,
  searchKey,
}: EntityListProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const { toast } = useToast()

  const handleExport = () => {
    // The ExcelExport component handles the export
  }

  const handleImport = async (importedData: any[]) => {
    if (onImport) {
      try {
        await onImport(importedData)
        toast({
          title: t("crud.importSuccess"),
          description: t("crud.importSuccessDescription", { count: importedData.length }),
        })
      } catch (error) {
        console.error("Import error:", error)
        toast({
          variant: "destructive",
          title: t("crud.importError"),
          description: t("crud.importErrorDescription"),
        })
      }
    }
  }

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{t("crud.loading", { entity: entityNamePlural })}</CardTitle>
            <CardDescription>{t("crud.loadingDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="flex gap-2">
          {onImport && (
            <ExcelImport onDataImported={handleImport} buttonText={t("crud.import", { entity: entityNamePlural })} />
          )}
          <ExcelExport
            data={data}
            filename={entityNamePlural.toLowerCase()}
            buttonText={t("crud.export", { entity: entityNamePlural })}
          />
          <Button asChild>
            <Link href={`${baseUrl}/new`}>
              <Plus className="mr-2 h-4 w-4" />
              {t("crud.create", { entity: entityNameSingular })}
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("crud.list", { entity: entityNamePlural })}</CardTitle>
          <CardDescription>{description || t("crud.total", { count: data.length })}</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} searchKey={searchKey} onExport={handleExport} />
        </CardContent>
      </Card>
    </div>
  )
}
