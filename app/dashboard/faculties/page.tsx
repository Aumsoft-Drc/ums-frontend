"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { EntityList } from "@/components/crud/entity-list"
import { createActionsColumn, createSelectionColumn, createSortableHeader } from "@/components/data-table/columns"
import { facultyService } from "@/services/faculty-service"
import { useToast } from "@/components/ui/use-toast"

export default function FacultiesPage() {
  const { t } = useTranslation()
  const { toast } = useToast()
  const [faculties, setFaculties] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const data = await facultyService.getAllFaculties()
        setFaculties(data)
      } catch (error) {
        console.error("Failed to fetch faculties:", error)
        toast({
          variant: "destructive",
          title: t("crud.fetchError"),
          description: t("crud.fetchErrorDescription"),
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchFaculties()
  }, [toast, t])

  const handleDelete = async (id: string) => {
    try {
      await facultyService.deleteFaculty(id)
      setFaculties(faculties.filter((faculty) => faculty.id !== id))
      return Promise.resolve()
    } catch (error) {
      console.error("Failed to delete faculty:", error)
      return Promise.reject(error)
    }
  }

  const handleImport = async (data: any[]) => {
    // Process imported data
    console.log("Importing faculties:", data)
    return Promise.resolve()
  }

  const columns = [
    createSelectionColumn(),
    {
      accessorKey: "name",
      header: createSortableHeader(t("faculties.name"), "name"),
    },
    {
      accessorKey: "code",
      header: t("faculties.code"),
    },
    {
      accessorKey: "dean",
      header: t("faculties.dean"),
      cell: ({ row }) => {
        const dean = row.getValue("dean") as { firstName: string; lastName: string } | null
        return dean ? `${dean.firstName} ${dean.lastName}` : "N/A"
      },
    },
    {
      accessorKey: "departments",
      header: t("faculties.departments"),
      cell: ({ row }) => {
        const departments = row.getValue("departments") as any[]
        return departments?.length || 0
      },
    },
    {
      accessorKey: "createdAt",
      header: t("faculties.createdAt"),
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as string
        return date ? new Date(date).toLocaleDateString() : "N/A"
      },
    },
    createActionsColumn({
      onView: (faculty) => `/dashboard/faculties/${faculty.id}`,
      onEdit: (faculty) => `/dashboard/faculties/${faculty.id}/edit`,
      onDelete: (faculty) => handleDelete(faculty.id),
    }),
  ]

  return (
    <EntityList
      title={t("faculties.title")}
      entityNameSingular={t("faculties.singular")}
      entityNamePlural={t("faculties.plural")}
      columns={columns}
      data={faculties}
      isLoading={isLoading}
      baseUrl="/dashboard/faculties"
      onDelete={handleDelete}
      onImport={handleImport}
      searchKey="name"
    />
  )
}
