"use client"

import { useTranslation } from "@/hooks/use-translation"
import { GenericFormPage } from "@/components/crud/generic-form-page"
import { useDispatch, useSelector } from "react-redux"
import { create } from "@/redux/slices/appeal-slice"
import type { RootState, AppDispatch } from "@/redux/store"
import { z } from "zod"

export default function NewAppealPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.appeals)

  const formSchema = z.object({
    studentId: z.string().min(1, t("validation.required")),
    courseId: z.string().min(1, t("validation.required")),
    examResultId: z.string().min(1, t("validation.required")),
    reason: z.string().min(1, t("validation.required")),
    description: z.string().optional(),
  })

  const fields = [
    {
      name: "studentId",
      label: t("appeal.student"),
      type: "select",
      options: "students",
      required: true,
    },
    {
      name: "courseId",
      label: t("appeal.course"),
      type: "select",
      options: "courses",
      required: true,
    },
    {
      name: "examResultId",
      label: t("appeal.examResult"),
      type: "select",
      options: "examResults",
      required: true,
    },
    {
      name: "reason",
      label: t("appeal.reason"),
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: t("appeal.description"),
      type: "textarea",
    },
  ]

  const handleSubmit = (data: any) => {
    dispatch(create(data))
  }

  return (
    <GenericFormPage
      formSchema={formSchema}
      fields={fields}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      entityName="appeal"
      mode="create"
      basePath="/dashboard/appeals"
    />
  )
}
