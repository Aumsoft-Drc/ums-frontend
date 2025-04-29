"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { GenericListPage } from "@/components/crud/generic-list-page"
import { examResultActions } from "@/redux/slices/exam-result-slice"
import { useTranslation } from "@/hooks/use-translation"
import { usePermissions } from "@/hooks/use-permissions"

export default function ExamResultsPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()
  const { hasPermission } = usePermissions()
  const { items, loading, error } = useSelector((state: any) => state.examResults)

  useEffect(() => {
    dispatch(examResultActions.fetchAll())
  }, [dispatch])

  const canCreate = hasPermission("examResults:create")
  const canView = hasPermission("examResults:view")
  const canEdit = hasPermission("examResults:edit")
  const canDelete = hasPermission("examResults:delete")

  const columns = [
    { header: t("examResult.student"), accessor: "student.fullName" },
    { header: t("examResult.exam"), accessor: "exam.title" },
    { header: t("examResult.course"), accessor: "exam.course.name" },
    { header: t("examResult.score"), accessor: "score" },
    { header: t("examResult.maxScore"), accessor: "exam.maxScore" },
    {
      header: t("examResult.percentage"),
      accessor: (row: any) => `${((row.score / row.exam.maxScore) * 100).toFixed(2)}%`,
    },
    { header: t("examResult.submittedAt"), accessor: "submittedAt", type: "datetime" },
  ]

  const filters = [
    {
      name: "student",
      label: t("examResult.student"),
      type: "select",
      options: [],
      fetchOptions: "students",
    },
    {
      name: "exam",
      label: t("examResult.exam"),
      type: "select",
      options: [],
      fetchOptions: "exams",
    },
    {
      name: "course",
      label: t("examResult.course"),
      type: "select",
      options: [],
      fetchOptions: "courses",
    },
    {
      name: "submittedAt",
      label: t("examResult.submittedAt"),
      type: "dateRange",
    },
  ]

  return (
    <GenericListPage
      title={t("examResult.examResults")}
      items={items}
      loading={loading}
      error={error}
      columns={columns}
      filters={filters}
      onView={(id) => canView && router.push(`/dashboard/exam-results/${id}`)}
      onEdit={(id) => canEdit && router.push(`/dashboard/exam-results/${id}/edit`)}
      onDelete={(id) => canDelete && dispatch(examResultActions.remove(id))}
      actions={
        canCreate && (
          <Button onClick={() => router.push("/dashboard/exam-results/new")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {t("examResult.createExamResult")}
          </Button>
        )
      }
      exportOptions={{
        filename: "exam-results",
        fields: [
          { header: t("examResult.student"), field: "student.fullName" },
          { header: t("examResult.exam"), field: "exam.title" },
          { header: t("examResult.course"), field: "exam.course.name" },
          { header: t("examResult.score"), field: "score" },
          { header: t("examResult.maxScore"), field: "exam.maxScore" },
          {
            header: t("examResult.percentage"),
            field: (row: any) => ((row.score / row.exam.maxScore) * 100).toFixed(2),
          },
          { header: t("examResult.submittedAt"), field: "submittedAt" },
        ],
      }}
    />
  )
}
