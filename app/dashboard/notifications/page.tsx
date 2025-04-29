"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle, Bell } from "lucide-react"
import { GenericListPage } from "@/components/crud/generic-list-page"
import { notificationActions } from "@/redux/slices/notification-slice"
import { useTranslation } from "@/hooks/use-translation"
import { usePermissions } from "@/hooks/use-permissions"

export default function NotificationsPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()
  const { hasPermission } = usePermissions()
  const { items, loading, error } = useSelector((state: any) => state.notifications)

  useEffect(() => {
    dispatch(notificationActions.fetchAll())
  }, [dispatch])

  const canCreate = hasPermission("notifications:create")
  const canView = hasPermission("notifications:view")
  const canEdit = hasPermission("notifications:edit")
  const canDelete = hasPermission("notifications:delete")
  const canMarkAsRead = hasPermission("notifications:markAsRead")

  const columns = [
    { header: t("notification.title"), accessor: "title" },
    { header: t("notification.message"), accessor: "message" },
    { header: t("notification.type"), accessor: "type" },
    { header: t("notification.recipient"), accessor: "recipient.fullName" },
    { header: t("notification.createdAt"), accessor: "createdAt", type: "datetime" },
    { header: t("notification.isRead"), accessor: "isRead", type: "boolean" },
  ]

  const filters = [
    {
      name: "type",
      label: t("notification.type"),
      type: "select",
      options: [
        { label: t("notification.type.info"), value: "info" },
        { label: t("notification.type.warning"), value: "warning" },
        { label: t("notification.type.error"), value: "error" },
        { label: t("notification.type.success"), value: "success" },
      ],
    },
    {
      name: "isRead",
      label: t("notification.isRead"),
      type: "select",
      options: [
        { label: t("common.yes"), value: "true" },
        { label: t("common.no"), value: "false" },
      ],
    },
    {
      name: "createdAt",
      label: t("notification.createdAt"),
      type: "dateRange",
    },
  ]

  const handleMarkAsRead = (id: string) => {
    if (canMarkAsRead) {
      dispatch(notificationActions.update({ id, isRead: true }))
    }
  }

  const rowActions = [
    {
      icon: <Bell className="h-4 w-4" />,
      label: t("notification.markAsRead"),
      onClick: handleMarkAsRead,
      show: (item: any) => canMarkAsRead && !item.isRead,
    },
  ]

  return (
    <GenericListPage
      title={t("notification.notifications")}
      items={items}
      loading={loading}
      error={error}
      columns={columns}
      filters={filters}
      onView={(id) => canView && router.push(`/dashboard/notifications/${id}`)}
      onEdit={(id) => canEdit && router.push(`/dashboard/notifications/${id}/edit`)}
      onDelete={(id) => canDelete && dispatch(notificationActions.remove(id))}
      rowActions={rowActions}
      actions={
        canCreate && (
          <Button onClick={() => router.push("/dashboard/notifications/new")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {t("notification.createNotification")}
          </Button>
        )
      }
    />
  )
}
