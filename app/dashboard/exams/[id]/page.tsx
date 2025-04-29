"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useRouter } from "next/navigation"
import { GenericDetailPage } from "@/components/crud/generic-detail-page"
import { examActions } from "@/redux/slices/exam-slice"
import { useTranslation } from "@/hooks/use-translation"
import { usePermissions } from "@/hooks/use-permissions"

export default function ExamDetailPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = useParams()
  const { hasPermission } = usePermissions()
  const { currentItem: exam, loading, error } = useSelector((state: any) => state.exams)

  useEffect(() => {
    if (id) {
      dispatch(examActions.fetchById(id))
    }
  }, [dispatch, id])

  const canEdit = hasPermission("exams:edit")
  const canDelete = hasPermission("exams:delete")

  const fields = [
    { label: t("exam.title"), value: exam?.title },
    { label: t("exam.course"), value: exam?.course?.name },
    { label: t("exam.date"), value: exam?.date, type: "date" },
    { label: t("exam.duration"), value: `${exam?.duration} ${t("common.minutes")}` },
    { label: t("exam.maxScore"), value: exam?.maxScore },
    { label: t("exam.status"), value: exam?.status && t(`exam.status.${exam.status}`) },
    { label: t("exam.instructions"), value: exam?.instructions, type: "markdown" },
  ]

  const sections = [
    {
      title: t("exam.questions"),
      fields: exam?.questions?.map((question: any, index: number) => ({
        label: `${t("exam.question")} ${index + 1}`,
        value: question.text,
        subfields: [
          { label: t("exam.questionType"), value: t(`exam.questionType.${question.type}`) },
          { label: t("exam.points"), value: question.points },
        ],
      })),
    },
  ]

  return (
    <GenericDetailPage
      title={exam?.title || t("exam.examDetails")}
      subtitle={exam?.course?.name}
      item={exam}
      loading={loading}
      error={error}
      fields={fields}
      sections={sections}
      onEdit={canEdit ? () => router.push(`/dashboard/exams/${id}/edit`) : undefined}
      onDelete={
        canDelete
          ? () => {
              dispatch(examActions.remove(id))
              router.push("/dashboard/exams")
            }
          : undefined
      }
      onBack={() => router.push("/dashboard/exams")}
    />
  )
}
