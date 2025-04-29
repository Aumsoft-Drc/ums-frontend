"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useRouter } from "next/navigation"
import { GenericFormPage } from "@/components/crud/generic-form-page"
import { examActions } from "@/redux/slices/exam-slice"
import { useTranslation } from "@/hooks/use-translation"

export default function EditExamPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = useParams()
  const { currentItem: exam, loading, error } = useSelector((state: any) => state.exams)

  useEffect(() => {
    if (id) {
      dispatch(examActions.fetchById(id))
    }
  }, [dispatch, id])

  const fields = [
    { name: "title", label: t("exam.title"), type: "text", required: true },
    {
      name: "course",
      label: t("exam.course"),
      type: "select",
      required: true,
      fetchOptions: "courses",
      optionLabel: "name",
      optionValue: "id",
    },
    { name: "date", label: t("exam.date"), type: "date", required: true },
    { name: "duration", label: t("exam.duration"), type: "number", required: true },
    { name: "maxScore", label: t("exam.maxScore"), type: "number", required: true },
    {
      name: "status",
      label: t("exam.status"),
      type: "select",
      required: true,
      options: [
        { label: t("exam.status.scheduled"), value: "scheduled" },
        { label: t("exam.status.inProgress"), value: "inProgress" },
        { label: t("exam.status.completed"), value: "completed" },
        { label: t("exam.status.graded"), value: "graded" },
      ],
    },
    { name: "instructions", label: t("exam.instructions"), type: "textarea" },
  ]

  const handleSubmit = async (data: any) => {
    await dispatch(examActions.update({ id, ...data }))
    router.push(`/dashboard/exams/${id}`)
  }

  return (
    <GenericFormPage
      title={t("exam.editExam")}
      fields={fields}
      initialValues={exam}
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
      onCancel={() => router.push(`/dashboard/exams/${id}`)}
    />
  )
}
