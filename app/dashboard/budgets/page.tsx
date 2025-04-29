"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { GenericListPage } from "@/components/crud/generic-list-page"
import { useDispatch, useSelector } from "react-redux"
import { fetchAll } from "@/redux/slices/budget-slice"
import type { RootState, AppDispatch } from "@/redux/store"
import { Button } from "@/components/ui/button"
import { Download, Filter } from "lucide-react"
import { ExcelExport } from "@/components/excel/excel-export"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function BudgetsPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { items, loading, error } = useSelector((state: RootState) => state.budgets)
  const [filters, setFilters] = useState({
    fiscalYear: "",
    department: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    dispatch(fetchAll())
  }, [dispatch])

  const filteredItems = items.filter((item) => {
    return (
      (filters.fiscalYear === "" || item.fiscalYear === filters.fiscalYear) &&
      (filters.department === "" ||
        (item.department?.name && item.department.name.toLowerCase().includes(filters.department.toLowerCase())))
    )
  })

  const columns = [
    { header: t("budget.id"), accessorKey: "id" },
    { header: t("budget.name"), accessorKey: "name" },
    { header: t("budget.fiscalYear"), accessorKey: "fiscalYear" },
    { header: t("budget.department"), accessorKey: "department.name" },
    { header: t("budget.totalAmount"), accessorKey: "totalAmount" },
    { header: t("budget.allocatedAmount"), accessorKey: "allocatedAmount" },
    { header: t("budget.remainingAmount"), accessorKey: "remainingAmount" },
    { header: t("budget.status"), accessorKey: "status" },
  ]

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="container mx-auto py-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("budget.budgets")}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={toggleFilters}>
            <Filter className="h-4 w-4 mr-2" />
            {t("filter")}
          </Button>
          <ExcelExport data={filteredItems} filename="budgets-export" sheetName="Budgets">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("budget.fiscalYear")}</label>
                <Input
                  placeholder={t("search")}
                  value={filters.fiscalYear}
                  onChange={(e) => setFilters({ ...filters, fiscalYear: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("budget.department")}</label>
                <Input
                  placeholder={t("search")}
                  value={filters.department}
                  onChange={(e) => setFilters({ ...filters, department: e.target.value })}
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
        entityName="budget"
        entityNamePlural="budgets"
        basePath="/dashboard/budgets"
      />
    </div>
  )
}
