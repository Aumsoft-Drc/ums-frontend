"use client"

import { GenericListPage } from "@/components/crud/generic-list-page"
import { useTranslation } from "@/hooks/use-translation"
import { fetchAllStaff } from "@/redux/slices/staff-slice"
import type { RootState } from "@/redux/store"
import { Badge } from "@/components/ui/badge"

export default function StaffPage() {
  const { t } = useTranslation()

  const columns = [
    {
      accessorKey: "id",
      header: t("id"),
    },
    {
      accessorKey: "firstName",
      header: t("firstName"),
    },
    {
      accessorKey: "lastName",
      header: t("lastName"),
    },
    {
      accessorKey: "email",
      header: t("email"),
    },
    {
      accessorKey: "phone",
      header: t("phone"),
    },
    {
      accessorKey: "position",
      header: t("position"),
    },
    {
      accessorKey: "department",
      header: t("department"),
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        let variant = "default"
        if (status === "Active") variant = "success"
        else if (status === "On Leave") variant = "warning"
        else if (status === "Inactive") variant = "destructive"

        return <Badge variant={variant as any}>{status}</Badge>
      },
    },
  ]

  const selector = (state: RootState) => state.staff

  return (
    <GenericListPage
      title={t("staff")}
      description={t("staffManagementDescription")}
      entityName={t("staffMember")}
      entityNamePlural={t("staff")}
      basePath="/dashboard/staff"
      columns={columns}
      fetchAction={fetchAllStaff}
      selector={selector}
      searchFields={["firstName", "lastName", "email", "position", "department"]}
      resourceName="staff"
    />
  )
}
