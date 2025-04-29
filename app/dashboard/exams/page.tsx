"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { GenericListPage } from "@/components/crud/generic-list-page"
import { examActions } from "@/redux/slices/exam-slice"
import { useTranslation } from "@/hooks/use-translation"
import { usePermissions } from "@/hooks/use-permissions"

export default function ExamsPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()
  const { hasPermission } = usePermissions()
  const { items, loading, error } = useSelector((state: any) => state.exams)

  useEffect(() => {
    dispatch(examActions.fetchAll())
  }, [dispatch])

  const canCreate = hasPermission("exams:create")
  const canView = hasPermission("exams:view")
  const canEdit = hasPermission("exams:edit")
  const canDelete = hasPermission("exams:delete")

  const columns = [
    { header: t("exam.title"), accessor: "title" },
    { header: t("exam.course"), accessor: "course.name" },
    { header: t("exam.date"), accessor: "date", type: "date" },
    { header: t("exam.duration"), accessor: "duration" },
    { header: t("exam.maxScore"), accessor: "maxScore" },
    { header: t("exam.status"), accessor: "status" },
  ]

  const filters = [
    {
      name: "course",
      label: t("exam.course"),
      type: "select",
      options: [],
      fetchOptions: "courses",
    },
    {
      name: "status",
      label: t("exam.status"),
      type: "select",
      options: [
        { label: t("exam.status.scheduled"), value: "scheduled" },
        { label: t("exam.status.inProgress"), value: "inProgress" },
        { label: t("exam.status.completed"), value: "completed" },
        { label: t("exam.status.graded"), value: "graded" },
      ],
    },
    {
      name: "date",
      label: t("exam.date"),
      type: "dateRange",
    },
  ]

  return (
    <GenericListPage
      title={t("exam.exams")}
      items={items}
      loading={loading}
      error={error}
      columns={columns}
      filters={filters}
      onView={(id) => canView && router.push(`/dashboard/exams/${id}`)}
      onEdit={(id) => canEdit && router.push(`/dashboard/exams/${id}/edit`)}
      onDelete={(id) => canDelete && dispatch(examActions.remove(id))}
      actions={
        canCreate && (
          <Button onClick={() => router.push("/dashboard/exams/new")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {t("exam.createExam")}
          </Button>
        )
      }
    />
  )
}
