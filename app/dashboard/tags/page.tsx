"use client"

import { useEffect } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { GenericListPage } from "@/components/crud/generic-list-page"
import { useDispatch, useSelector } from "react-redux"
import { fetchAll } from "@/redux/slices/tag-slice"
import type { RootState, AppDispatch } from "@/redux/store"

export default function TagsPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { items, loading, error } = useSelector((state: RootState) => state.tags)

  useEffect(() => {
    dispatch(fetchAll())
  }, [dispatch])

  const columns = [
    { header: t("tag.id"), accessorKey: "id" },
    { header: t("tag.name"), accessorKey: "name" },
    { header: t("tag.slug"), accessorKey: "slug" },
    { header: t("tag.postsCount"), accessorKey: "postsCount" },
  ]

  return (
    <div className="container mx-auto py-6 space-y-4">
      <h1 className="text-3xl font-bold">{t("tag.tags")}</h1>
      <GenericListPage
        items={items}
        columns={columns}
        loading={loading}
        error={error}
        entityName="tag"
        entityNamePlural="tags"
        basePath="/dashboard/tags"
      />
    </div>
  )
}
