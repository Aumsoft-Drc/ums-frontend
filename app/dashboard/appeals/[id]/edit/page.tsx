"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { GenericFormPage } from "@/components/crud/generic-form-page"
import { useDispatch, useSelector } from "react-redux"
import { fetchById, update } from "@/redux/slices/appeal-slice"
import type { RootState, AppDispatch } from "@/redux/store"
import { z } from "zod"

export default function EditAppealPage() {
  const { t } = useTranslation()
  const params = useParams()
  const id = params.id as string
  const dispatch = useDispatch<AppDispatch>()
  const { currentItem, loading, error } = useSelector((state: RootState) => state.appeals)

  useEffect(() => {
    if (id) {
      dispatch(fetchById(id))
    }
  }, [dispatch, id])

  const formSchema = z.object({
    studentId: z.string().min(1, t("validation.required")),
    courseId: z.string().min(1, t("validation.required")),
    examResultId: z.string().min(1, t("validation.required")),
    reason: z.string().min(1, t("validation.required")),
    description: z.string().optional(),
    status: z.string().min(1, t("validation.required")),
    resolution: z.string().optional(),
  })

  const fields = [
    {
      name: "studentId",
      label: t("appeal.student"),
      type: "select",
      options: "students",
      required: true,
      disabled: true,
    },
    {
      name: "courseId",
      label: t("appeal.course"),
      type: "select",
      options: "courses",
      required: true,
      disabled: true,
    },
    {
      name: "examResultId",
      label: t("appeal.examResult"),
      type: "select",
      options: "examResults",
      required: true,
      disabled: true,
    },
    {
      name: "reason",
      label: t("appeal.reason"),
      type: "text",
      required: true,
      disabled: true,
    },
    {
      name: "description",
      label: t("appeal.description"),
      type: "textarea",
      disabled: true,
    },
    {
      name: "status",
      label: t("appeal.status"),
      type: "select",
      options: [
        { value: "pending", label: t("appeal.pending") },
        { value: "approved", label: t("appeal.approved") },
        { value: "rejected", label: t("appeal.rejected") },
      ],
      required: true,
    },
    {
      name: "resolution",
      label: t("appeal.resolution"),
      type: "textarea",
    },
  ]

  const handleSubmit = (data: any) => {
    dispatch(update({ id, ...data }))
  }

  return (
    <GenericFormPage
      formSchema={formSchema}
      fields={fields}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      entityName="appeal"
      mode="edit"
      basePath="/dashboard/appeals"
      initialData={currentItem}
    />
  )
}
