"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { GenericListPage } from "@/components/crud/generic-list-page"
import { useDispatch, useSelector } from "react-redux"
import { fetchAll } from "@/redux/slices/post-slice"
import type { RootState, AppDispatch } from "@/redux/store"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function PostsPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { items, loading, error } = useSelector((state: RootState) => state.posts)
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    author: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    dispatch(fetchAll())
  }, [dispatch])

  const filteredItems = items.filter((item) => {
    return (
      (filters.status === "" || item.status === filters.status) &&
      (filters.category === "" ||
        (item.category?.name && item.category.name.toLowerCase().includes(filters.category.toLowerCase()))) &&
      (filters.author === "" ||
        (item.author?.name && item.author.name.toLowerCase().includes(filters.author.toLowerCase())))
    )
  })

  const columns = [
    { header: t("post.id"), accessorKey: "id" },
    { header: t("post.title"), accessorKey: "title" },
    { header: t("post.slug"), accessorKey: "slug" },
    { header: t("post.category"), accessorKey: "category.name" },
    { header: t("post.author"), accessorKey: "author.name" },
    { header: t("post.status"), accessorKey: "status" },
    { header: t("post.publishedAt"), accessorKey: "publishedAt" },
  ]

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="container mx-auto py-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("post.posts")}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={toggleFilters}>
            <Filter className="h-4 w-4 mr-2" />
            {t("filter")}
          </Button>
        </div>
      </div>

      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("post.status")}</label>
                <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("all")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("all")}</SelectItem>
                    <SelectItem value="draft">{t("post.draft")}</SelectItem>
                    <SelectItem value="published">{t("post.published")}</SelectItem>
                    <SelectItem value="archived">{t("post.archived")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("post.category")}</label>
                <Input
                  placeholder={t("search")}
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("post.author")}</label>
                <Input
                  placeholder={t("search")}
                  value={filters.author}
                  onChange={(e) => setFilters({ ...filters, author: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <GenericListPage
        items={filteredItems}
        columns={columns}
        loading={loading}
        error={error}
        entityName="post"
        entityNamePlural="posts"
        basePath="/dashboard/posts"
      />
    </div>
  )
}
