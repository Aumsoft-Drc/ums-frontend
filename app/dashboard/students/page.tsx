"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { EntityList } from "@/components/crud/entity-list"
import { createActionsColumn, createSelectionColumn, createSortableHeader } from "@/components/data-table/columns"
import { studentService } from "@/services/student-service"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

export default function StudentsPage() {
  const { t } = useTranslation()
  const { toast } = useToast()
  const [students, setStudents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await studentService.getAllStudents()
        setStudents(data)
      } catch (error) {
        console.error("Failed to fetch students:", error)
        toast({
          variant: "destructive",
          title: t("crud.fetchError"),
          description: t("crud.fetchErrorDescription"),
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchStudents()
  }, [toast, t])

  const handleDelete = async (id: string) => {
    try {
      await studentService.deleteStudent(id)
      setStudents(students.filter((student) => student.id !== id))
      return Promise.resolve()
    } catch (error) {
      console.error("Failed to delete student:", error)
      return Promise.reject(error)
    }
  }

  const handleImport = async (data: any[]) => {
    // Process imported data
    // This would typically involve API calls to create students
    console.log("Importing students:", data)
    return Promise.resolve()
  }

  const columns = [
    createSelectionColumn(),
    {
      accessorKey: "studentId",
      header: createSortableHeader(t("students.studentId"), "studentId"),
    },
    {
      accessorKey: "firstName",
      header: t("students.firstName"),
    },
    {
      accessorKey: "lastName",
      header: t("students.lastName"),
    },
    {
      accessorKey: "email",
      header: t("students.email"),
    },
    {
      accessorKey: "program",
      header: t("students.program"),
      cell: ({ row }) => {
        const program = row.getValue("program") as { name: string; code: string }
        return program ? `${program.name} (${program.code})` : "N/A"
      },
    },
    {
      accessorKey: "cohort",
      header: t("students.cohort"),
      cell: ({ row }) => {
        const cohort = row.getValue("cohort") as { name: string }
        return cohort ? cohort.name : "N/A"
      },
    },
    {
      accessorKey: "status",
      header: t("students.status"),
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            className={
              status === "active"
                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
            }
          >
            {status}
          </Badge>
        )
      },
    },
    createActionsColumn({
      onView: (student) => `/dashboard/students/${student.id}`,
      onEdit: (student) => `/dashboard/students/${student.id}/edit`,
      onDelete: (student) => handleDelete(student.id),
    }),
  ]

  return (
    <EntityList
      title={t("students.title")}
      entityNameSingular={t("students.singular")}
      entityNamePlural={t("students.plural")}
      columns={columns}
      data={students}
      isLoading={isLoading}
      baseUrl="/dashboard/students"
      onDelete={handleDelete}
      onImport={handleImport}
      searchKey="lastName"
    />
  )
}
