"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileText } from "lucide-react"
import { GenericListPage } from "@/components/crud/generic-list-page"
import { transcriptActions } from "@/redux/slices/transcript-slice"
import { useTranslation } from "@/hooks/use-translation"
import { usePermissions } from "@/hooks/use-permissions"

export default function TranscriptsPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()
  const { hasPermission } = usePermissions()
  const { items, loading, error } = useSelector((state: any) => state.transcripts)

  useEffect(() => {
    dispatch(transcriptActions.fetchAll())
  }, [dispatch])

  const canCreate = hasPermission("transcripts:create")
  const canView = hasPermission("transcripts:view")
  const canEdit = hasPermission("transcripts:edit")
  const canDelete = hasPermission("transcripts:delete")
  const canPrint = hasPermission("transcripts:print")

  const columns = [
    { header: t("transcript.student"), accessor: "student.fullName" },
    { header: t("transcript.program"), accessor: "program.name" },
    { header: t("transcript.academicPeriod"), accessor: "academicPeriod.name" },
    { header: t("transcript.gpa"), accessor: "gpa" },
    { header: t("transcript.credits"), accessor: "credits" },
    { header: t("transcript.status"), accessor: "status" },
    { header: t("transcript.issuedDate"), accessor: "issuedDate", type: "date" },
  ]

  const filters = [
    {
      name: "student",
      label: t("transcript.student"),
      type: "select",
      options: [],
      fetchOptions: "students",
    },
    {
      name: "program",
      label: t("transcript.program"),
      type: "select",
      options: [],
      fetchOptions: "programs",
    },
    {
      name: "academicPeriod",
      label: t("transcript.academicPeriod"),
      type: "select",
      options: [],
      fetchOptions: "academicPeriods",
    },
    {
      name: "status",
      label: t("transcript.status"),
      type: "select",
      options: [
        { label: t("transcript.status.draft"), value: "draft" },
        { label: t("transcript.status.final"), value: "final" },
        { label: t("transcript.status.official"), value: "official" },
      ],
    },
    {
      name: "issuedDate",
      label: t("transcript.issuedDate"),
      type: "dateRange",
    },
  ]

  const handlePrint = (id: string) => {
    if (canPrint) {
      // Implement print functionality
      window.open(`/api/transcripts/${id}/print`, "_blank")
    }
  }

  const rowActions = [
    {
      icon: <FileText className="h-4 w-4" />,
      label: t("transcript.print"),
      onClick: handlePrint,
      show: canPrint,
    },
  ]

  return (
    <GenericListPage
      title={t("transcript.transcripts")}
      items={items}
      loading={loading}
      error={error}
      columns={columns}
      filters={filters}
      onView={(id) => canView && router.push(`/dashboard/transcripts/${id}`)}
      onEdit={(id) => canEdit && router.push(`/dashboard/transcripts/${id}/edit`)}
      onDelete={(id) => canDelete && dispatch(transcriptActions.remove(id))}
      rowActions={rowActions}
      actions={
        canCreate && (
          <Button onClick={() => router.push("/dashboard/transcripts/new")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {t("transcript.createTranscript")}
          </Button>
        )
      }
      exportOptions={{
        filename: "transcripts",
        fields: [
          { header: t("transcript.student"), field: "student.fullName" },
          { header: t("transcript.program"), field: "program.name" },
          { header: t("transcript.academicPeriod"), field: "academicPeriod.name" },
          { header: t("transcript.gpa"), field: "gpa" },
          { header: t("transcript.credits"), field: "credits" },
          { header: t("transcript.status"), field: "status" },
          { header: t("transcript.issuedDate"), field: "issuedDate" },
        ],
      }}
    />
  )
}
