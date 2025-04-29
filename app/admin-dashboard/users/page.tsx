"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { DataTable } from "@/components/data-table/data-table"
import { createActionsColumn, createSelectionColumn, createSortableHeader } from "@/components/data-table/columns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExcelExport } from "@/components/excel/excel-export"
import { ExcelImport } from "@/components/excel/excel-import"
import { adminService } from "@/services/admin-service"
import { Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function UsersPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { toast } = useToast()
  const [users, setUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await adminService.getAllUsers()
        setUsers(data)
      } catch (error) {
        console.error("Failed to fetch users:", error)
        toast({
          variant: "destructive",
          title: t("users.fetchError"),
          description: t("users.fetchErrorDescription"),
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [toast, t])

  const handleView = (user: any) => {
    router.push(`/admin-dashboard/users/${user.id}`)
  }

  const handleEdit = (user: any) => {
    router.push(`/admin-dashboard/users/${user.id}/edit`)
  }

  const handleDelete = async (user: any) => {
    if (window.confirm(t("users.confirmDelete"))) {
      try {
        await adminService.deleteUser(user.id)
        setUsers(users.filter((u) => u.id !== user.id))
        toast({
          title: t("users.deleteSuccess"),
          description: t("users.deleteSuccessDescription"),
        })
      } catch (error) {
        console.error("Failed to delete user:", error)
        toast({
          variant: "destructive",
          title: t("users.deleteError"),
          description: t("users.deleteErrorDescription"),
        })
      }
    }
  }

  const handleExport = () => {
    // The ExcelExport component handles the export
  }

  const handleImport = (data: any[]) => {
    // Process imported data
    toast({
      title: t("users.importSuccess"),
      description: t(`users.importSuccessDescription`, { count: data.length }),
    })
  }

  const columns = [
    createSelectionColumn(),
    {
      accessorKey: "username",
      header: createSortableHeader(t("users.username"), "username"),
    },
    {
      accessorKey: "firstName",
      header: t("users.firstName"),
    },
    {
      accessorKey: "lastName",
      header: t("users.lastName"),
    },
    {
      accessorKey: "email",
      header: t("users.email"),
    },
    {
      accessorKey: "roles",
      header: t("users.roles"),
      cell: ({ row }) => {
        const roles = row.getValue("roles") as string[]
        return (
          <div className="flex flex-wrap gap-1">
            {roles.map((role) => (
              <span
                key={role}
                className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
              >
                {role}
              </span>
            ))}
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: t("users.status"),
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <span
            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
              status === "active"
                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
            }`}
          >
            {status}
          </span>
        )
      },
    },
    createActionsColumn({
      onView: handleView,
      onEdit: handleEdit,
      onDelete: handleDelete,
    }),
  ]

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t("users.title")}</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{t("users.loading")}</CardTitle>
            <CardDescription>{t("users.loadingDescription")}</CardDescription>
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
        <h1 className="text-3xl font-bold">{t("users.title")}</h1>
        <div className="flex gap-2">
          <ExcelImport onDataImported={handleImport} buttonText={t("users.import")} />
          <ExcelExport data={users} filename="users" buttonText={t("users.export")} />
          <Button asChild>
            <Link href="/admin-dashboard/users/new">
              <Plus className="mr-2 h-4 w-4" />
              {t("users.create")}
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("users.list")}</CardTitle>
          <CardDescription>
            {t("users.total")}: {users.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={users}
            searchKey="username"
            onExport={handleExport}
            onImport={(file) => {
              // Process file import
              console.log("Importing file:", file.name)
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
