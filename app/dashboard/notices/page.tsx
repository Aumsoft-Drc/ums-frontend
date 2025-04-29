"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { GenericListPage } from "@/components/crud/generic-list-page"
import { useDispatch, useSelector } from "react-redux"
import { fetchAll } from "@/redux/slices/notice-slice"
import type { RootState, AppDispatch } from "@/redux/store"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function NoticesPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { items, loading, error } = useSelector((state: RootState) => state.notices)
  const [filters, setFilters] = useState({
    status: "",
    category: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    dispatch(fetchAll())
  }, [dispatch])

  const filteredItems = items.filter((item) => {
    return (
      (filters.status === "" || item.status === filters.status) &&
      (filters.category === "" ||
        (item.category && item.category.toLowerCase().includes(filters.category.toLowerCase())))
    )
  })

  const columns = [
    { header: t("notice.id"), accessorKey: "id" },
    { header: t("notice.title"), accessorKey: "title" },
    { header: t("notice.category"), accessorKey: "category" },
    { header: t("notice.status"), accessorKey: "status" },
    { header: t("notice.publishedAt"), accessorKey: "publishedAt" },
    { header: t("notice.expiresAt"), accessorKey: "expiresAt" },
  ]

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="container mx-auto py-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("notice.notices")}</h1>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("notice.status")}</label>
                <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("all")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("all")}</SelectItem>
                    <SelectItem value="draft">{t("notice.draft")}</SelectItem>
                    <SelectItem value="published">{t("notice.published")}</SelectItem>
                    <SelectItem value="expired">{t("notice.expired")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("notice.category")}</label>
                <Input
                  placeholder={t("search")}
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
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
        entityName="notice"
        entityNamePlural="notices"
        basePath="/dashboard/notices"
      />
    </div>
  )
}
