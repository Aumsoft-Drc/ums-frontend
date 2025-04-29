"use client"

import { useEffect } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { GenericListPage } from "@/components/crud/generic-list-page"
import { useDispatch, useSelector } from "react-redux"
import { fetchAll } from "@/redux/slices/category-slice"
import type { RootState, AppDispatch } from "@/redux/store"

export default function CategoriesPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { items, loading, error } = useSelector((state: RootState) => state.categories)

  useEffect(() => {
    dispatch(fetchAll())
  }, [dispatch])

  const columns = [
    { header: t("category.id"), accessorKey: "id" },
    { header: t("category.name"), accessorKey: "name" },
    { header: t("category.slug"), accessorKey: "slug" },
    { header: t("category.description"), accessorKey: "description" },
    { header: t("category.postsCount"), accessorKey: "postsCount" },
  ]

  return (
    <div className="container mx-auto py-6 space-y-4">
      <h1 className="text-3xl font-bold">{t("category.categories")}</h1>
      <GenericListPage
        items={items}
        columns={columns}
        loading={loading}
        error={error}
        entityName="category"
        entityNamePlural="categories"
        basePath="/dashboard/categories"
      />
    </div>
  )
}
