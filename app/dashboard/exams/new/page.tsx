"use client"

import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { GenericFormPage } from "@/components/crud/generic-form-page"
import { examActions } from "@/redux/slices/exam-slice"
import { useTranslation } from "@/hooks/use-translation"

export default function NewExamPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()

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
    await dispatch(examActions.create(data))
    router.push("/dashboard/exams")
  }

  return (
    <GenericFormPage
      title={t("exam.createExam")}
      fields={fields}
      onSubmit={handleSubmit}
      onCancel={() => router.push("/dashboard/exams")}
    />
  )
}
