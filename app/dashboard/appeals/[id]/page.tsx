"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { GenericDetailPage } from "@/components/crud/generic-detail-page"
import { useDispatch, useSelector } from "react-redux"
import { fetchById } from "@/redux/slices/appeal-slice"
import type { RootState, AppDispatch } from "@/redux/store"

export default function AppealDetailPage() {
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

  const fields = [
    { label: t("appeal.id"), key: "id" },
    { label: t("appeal.student"), key: "student.name" },
    { label: t("appeal.course"), key: "course.name" },
    { label: t("appeal.examResult"), key: "examResult.score" },
    { label: t("appeal.reason"), key: "reason" },
    { label: t("appeal.description"), key: "description" },
    { label: t("appeal.status"), key: "status" },
    { label: t("appeal.submissionDate"), key: "submissionDate" },
    { label: t("appeal.resolutionDate"), key: "resolutionDate" },
    { label: t("appeal.resolution"), key: "resolution" },
    { label: t("appeal.resolvedBy"), key: "resolvedBy.name" },
  ]

  return (
    <GenericDetailPage
      item={currentItem}
      fields={fields}
      loading={loading}
      error={error}
      entityName="appeal"
      basePath="/dashboard/appeals"
    />
  )
}
