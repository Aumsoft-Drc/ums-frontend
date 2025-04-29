"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { GenericListPage } from "@/components/crud/generic-list-page"
import { useDispatch, useSelector } from "react-redux"
import { fetchAll } from "@/redux/slices/card-request-slice"
import type { RootState, AppDispatch } from "@/redux/store"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function CardRequestsPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { items, loading, error } = useSelector((state: RootState) => state.cardRequests)
  const [filters, setFilters] = useState({
    status: "",
    student: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    dispatch(fetchAll())
  }, [dispatch])

  const filteredItems = items.filter((item) => {
    return (
      (filters.status === "" || item.status === filters.status) &&
      (filters.student === "" ||
        (item.student?.name && item.student.name.toLowerCase().includes(filters.student.toLowerCase())))
    )
  })

  const columns = [
    { header: t("cardRequest.id"), accessorKey: "id" },
    { header: t("cardRequest.student"), accessorKey: "student.name" },
    { header: t("cardRequest.type"), accessorKey: "type" },
    { header: t("cardRequest.reason"), accessorKey: "reason" },
    { header: t("cardRequest.status"), accessorKey: "status" },
    { header: t("cardRequest.requestDate"), accessorKey: "requestDate" },
    { header: t("cardRequest.processedDate"), accessorKey: "processedDate" },
  ]

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="container mx-auto py-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("cardRequest.cardRequests")}</h1>
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
                <label className="text-sm font-medium">{t("cardRequest.status")}</label>
                <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("all")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("all")}</SelectItem>
                    <SelectItem value="pending">{t("cardRequest.pending")}</SelectItem>
                    <SelectItem value="approved">{t("cardRequest.approved")}</SelectItem>
                    <SelectItem value="rejected">{t("cardRequest.rejected")}</SelectItem>
                    <SelectItem value="processed">{t("cardRequest.processed")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("cardRequest.student")}</label>
                <Input
                  placeholder={t("search")}
                  value={filters.student}
                  onChange={(e) => setFilters({ ...filters, student: e.target.value })}
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
        entityName="cardRequest"
        entityNamePlural="cardRequests"
        basePath="/dashboard/card-requests"
      />
    </div>
  )
}
