"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { GenericListPage } from "@/components/crud/generic-list-page"
import { useDispatch, useSelector } from "react-redux"
import { fetchAll } from "@/redux/slices/contact-message-slice"
import type { RootState, AppDispatch } from "@/redux/store"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactMessagesPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { items, loading, error } = useSelector((state: RootState) => state.contactMessages)
  const [filters, setFilters] = useState({
    status: "",
    email: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    dispatch(fetchAll())
  }, [dispatch])

  const filteredItems = items.filter((item) => {
    return (
      (filters.status === "" || item.status === filters.status) &&
      (filters.email === "" || (item.email && item.email.toLowerCase().includes(filters.email.toLowerCase())))
    )
  })

  const columns = [
    { header: t("contactMessage.id"), accessorKey: "id" },
    { header: t("contactMessage.name"), accessorKey: "name" },
    { header: t("contactMessage.email"), accessorKey: "email" },
    { header: t("contactMessage.subject"), accessorKey: "subject" },
    { header: t("contactMessage.status"), accessorKey: "status" },
    { header: t("contactMessage.createdAt"), accessorKey: "createdAt" },
  ]

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="container mx-auto py-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("contactMessage.contactMessages")}</h1>
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
                <label className="text-sm font-medium">{t("contactMessage.status")}</label>
                <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("all")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("all")}</SelectItem>
                    <SelectItem value="new">{t("contactMessage.new")}</SelectItem>
                    <SelectItem value="read">{t("contactMessage.read")}</SelectItem>
                    <SelectItem value="replied">{t("contactMessage.replied")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("contactMessage.email")}</label>
                <Input
                  placeholder={t("search")}
                  value={filters.email}
                  onChange={(e) => setFilters({ ...filters, email: e.target.value })}
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
        entityName="contactMessage"
        entityNamePlural="contactMessages"
        basePath="/dashboard/contact-messages"
      />
    </div>
  )
}
