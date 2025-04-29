"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { GenericListPage } from "@/components/crud/generic-list-page"
import { useDispatch, useSelector } from "react-redux"
import { fetchAll } from "@/redux/slices/fee-payment-slice"
import type { RootState, AppDispatch } from "@/redux/store"
import { Button } from "@/components/ui/button"
import { Download, Filter } from "lucide-react"
import { ExcelExport } from "@/components/excel/excel-export"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function FeePaymentsPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { items, loading, error } = useSelector((state: RootState) => state.feePayments)
  const [filters, setFilters] = useState({
    status: "",
    student: "",
    feeType: "",
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
      (filters.feeType === "" ||
        (item.feeType?.name && item.feeType.name.toLowerCase().includes(filters.feeType.toLowerCase())))
    )
  })

  const columns = [
    { header: t("feePayment.id"), accessorKey: "id" },
    { header: t("feePayment.student"), accessorKey: "student.name" },
    { header: t("feePayment.feeType"), accessorKey: "feeType.name" },
    { header: t("feePayment.amount"), accessorKey: "amount" },
    { header: t("feePayment.paymentDate"), accessorKey: "paymentDate" },
    { header: t("feePayment.paymentMethod"), accessorKey: "paymentMethod" },
    { header: t("feePayment.status"), accessorKey: "status" },
    { header: t("feePayment.reference"), accessorKey: "reference" },
  ]

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="container mx-auto py-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("feePayment.feePayments")}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={toggleFilters}>
            <Filter className="h-4 w-4 mr-2" />
            {t("filter")}
          </Button>
          <ExcelExport data={filteredItems} filename="fee-payments-export" sheetName="FeePayments">
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
                <label className="text-sm font-medium">{t("feePayment.status")}</label>
                <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("all")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("all")}</SelectItem>
                    <SelectItem value="pending">{t("feePayment.pending")}</SelectItem>
                    <SelectItem value="completed">{t("feePayment.completed")}</SelectItem>
                    <SelectItem value="failed">{t("feePayment.failed")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("feePayment.student")}</label>
                <Input
                  placeholder={t("search")}
                  value={filters.student}
                  onChange={(e) => setFilters({ ...filters, student: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("feePayment.feeType")}</label>
                <Input
                  placeholder={t("search")}
                  value={filters.feeType}
                  onChange={(e) => setFilters({ ...filters, feeType: e.target.value })}
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
        entityName="feePayment"
        entityNamePlural="feePayments"
        basePath="/dashboard/fee-payments"
      />
    </div>
  )
}
