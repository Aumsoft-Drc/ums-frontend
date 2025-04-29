"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { GenericListPage } from "@/components/crud/generic-list-page"
import { useDispatch, useSelector } from "react-redux"
import { fetchAll } from "@/redux/slices/document-slice"
import type { RootState, AppDispatch } from "@/redux/store"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function DocumentsPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { items, loading, error } = useSelector((state: RootState) => state.documents)
  const [filters, setFilters] = useState({
    type: "",
    name: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    dispatch(fetchAll())
  }, [dispatch])

  const filteredItems = items.filter((item) => {
    return (
      (filters.type === "" || item.type === filters.type) &&
      (filters.name === "" || (item.name && item.name.toLowerCase().includes(filters.name.toLowerCase())))
    )
  })

  const columns = [
    { header: t("document.id"), accessorKey: "id" },
    { header: t("document.name"), accessorKey: "name" },
    { header: t("document.type"), accessorKey: "type" },
    { header: t("document.size"), accessorKey: "size" },
    { header: t("document.uploadedBy"), accessorKey: "uploadedBy.name" },
    { header: t("document.uploadedAt"), accessorKey: "uploadedAt" },
  ]

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="container mx-auto py-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("document.documents")}</h1>
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
                <label className="text-sm font-medium">{t("document.type")}</label>
                <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("all")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("all")}</SelectItem>
                    <SelectItem value="pdf">{t("document.pdf")}</SelectItem>
                    <SelectItem value="doc">{t("document.doc")}</SelectItem>
                    <SelectItem value="image">{t("document.image")}</SelectItem>
                    <SelectItem value="other">{t("document.other")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("document.name")}</label>
                <Input
                  placeholder={t("search")}
                  value={filters.name}
                  onChange={(e) => setFilters({ ...filters, name: e.target.value })}
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
        entityName="document"
        entityNamePlural="documents"
        basePath="/dashboard/documents"
      />
    </div>
  )
}
