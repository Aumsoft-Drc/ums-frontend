"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle, Download } from "lucide-react"
import { GenericListPage } from "@/components/crud/generic-list-page"
import { digitalResourceActions } from "@/redux/slices/digital-resource-slice"
import { useTranslation } from "@/hooks/use-translation"
import { usePermissions } from "@/hooks/use-permissions"

export default function DigitalResourcesPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()
  const { hasPermission } = usePermissions()
  const { items, loading, error } = useSelector((state: any) => state.digitalResources)

  useEffect(() => {
    dispatch(digitalResourceActions.fetchAll())
  }, [dispatch])

  const canCreate = hasPermission("digitalResources:create")
  const canView = hasPermission("digitalResources:view")
  const canEdit = hasPermission("digitalResources:edit")
  const canDelete = hasPermission("digitalResources:delete")
  const canDownload = hasPermission("digitalResources:download")

  const columns = [
    { header: t("digitalResource.title"), accessor: "title" },
    { header: t("digitalResource.type"), accessor: "type" },
    { header: t("digitalResource.category"), accessor: "category.name" },
    { header: t("digitalResource.author"), accessor: "author" },
    { header: t("digitalResource.uploadedBy"), accessor: "uploadedBy.fullName" },
    { header: t("digitalResource.uploadDate"), accessor: "uploadDate", type: "date" },
    { header: t("digitalResource.fileSize"), accessor: "fileSize", type: "fileSize" },
  ]

  const filters = [
    {
      name: "type",
      label: t("digitalResource.type"),
      type: "select",
      options: [
        { label: t("digitalResource.type.book"), value: "book" },
        { label: t("digitalResource.type.article"), value: "article" },
        { label: t("digitalResource.type.video"), value: "video" },
        { label: t("digitalResource.type.audio"), value: "audio" },
        { label: t("digitalResource.type.document"), value: "document" },
        { label: t("digitalResource.type.other"), value: "other" },
      ],
    },
    {
      name: "category",
      label: t("digitalResource.category"),
      type: "select",
      options: [],
      fetchOptions: "categories",
    },
    {
      name: "uploadDate",
      label: t("digitalResource.uploadDate"),
      type: "dateRange",
    },
  ]

  const handleDownload = (id: string) => {
    if (canDownload) {
      // Implement download functionality
      window.open(`/api/digital-resources/${id}/download`, "_blank")
    }
  }

  const rowActions = [
    {
      icon: <Download className="h-4 w-4" />,
      label: t("digitalResource.download"),
      onClick: handleDownload,
      show: canDownload,
    },
  ]

  return (
    <GenericListPage
      title={t("digitalResource.digitalResources")}
      items={items}
      loading={loading}
      error={error}
      columns={columns}
      filters={filters}
      onView={(id) => canView && router.push(`/dashboard/digital-resources/${id}`)}
      onEdit={(id) => canEdit && router.push(`/dashboard/digital-resources/${id}/edit`)}
      onDelete={(id) => canDelete && dispatch(digitalResourceActions.remove(id))}
      rowActions={rowActions}
      actions={
        canCreate && (
          <Button onClick={() => router.push("/dashboard/digital-resources/new")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {t("digitalResource.createDigitalResource")}
          </Button>
        )
      }
    />
  )
}
