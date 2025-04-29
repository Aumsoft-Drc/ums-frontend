"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { GenericListPage } from "@/components/crud/generic-list-page"
import { useDispatch, useSelector } from "react-redux"
import { fetchAll } from "@/redux/slices/appeal-slice"
import type { RootState, AppDispatch } from "@/redux/store"
import { Button } from "@/components/ui/button"
import { Download, Filter } from "lucide-react"
import { ExcelExport } from "@/components/excel/excel-export"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function AppealsPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { items, loading, error } = useSelector((state: RootState) => state.appeals)
  const [filters, setFilters] = useState({
    status: "",
    student: "",
    course: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    dispatch(fetchAll())
  }, [dispatch])

  const filteredItems = items.filter((item) => {
    return (
      (filters.status === "" || item.status === filters.status) &&
      (filters.student === "" ||
        (item.student?.name && item.student.name.toLowerCase().includes(filters.student.toLowerCase()))) &&
      (filters.course === "" ||
        (item.course?.name && item.course.name.toLowerCase().includes(filters.course.toLowerCase())))
    )
  })

  const columns = [
    { header: t("appeal.id"), accessorKey: "id" },
    { header: t("appeal.student"), accessorKey: "student.name" },
    { header: t("appeal.course"), accessorKey: "course.name" },
    { header: t("appeal.examResult"), accessorKey: "examResult.score" },
    { header: t("appeal.reason"), accessorKey: "reason" },
    { header: t("appeal.status"), accessorKey: "status" },
    { header: t("appeal.submissionDate"), accessorKey: "submissionDate" },
    { header: t("appeal.resolutionDate"), accessorKey: "resolutionDate" },
  ]

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="container mx-auto py-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("appeal.appeals")}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={toggleFilters}>
            <Filter className="h-4 w-4 mr-2" />
            {t("filter")}
          </Button>
          <ExcelExport data={filteredItems} filename="appeals-export" sheetName="Appeals">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              {t("export")}
            </Button>
          </ExcelExport>
        </div>
      </div>

      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("appeal.status")}</label>
                <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("all")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("all")}</SelectItem>
                    <SelectItem value="pending">{t("appeal.pending")}</SelectItem>
                    <SelectItem value="approved">{t("appeal.approved")}</SelectItem>
                    <SelectItem value="rejected">{t("appeal.rejected")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("appeal.student")}</label>
                <Input
                  placeholder={t("search")}
                  value={filters.student}
                  onChange={(e) => setFilters({ ...filters, student: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("appeal.course")}</label>
                <Input
                  placeholder={t("search")}
                  value={filters.course}
                  onChange={(e) => setFilters({ ...filters, course: e.target.value })}
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
        entityName="appeal"
        entityNamePlural="appeals"
        basePath="/dashboard/appeals"
      />
    </div>
  )
}
