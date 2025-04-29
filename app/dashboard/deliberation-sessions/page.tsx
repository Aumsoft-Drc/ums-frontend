"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import { useTranslation } from "@/hooks/use-translation"
import { PlusCircle, FileDown, FileUp, RefreshCw, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExcelExport } from "@/components/excel/excel-export"
import { ExcelImport } from "@/components/excel/excel-import"
import { fetchAllDeliberationSessions } from "@/redux/slices/deliberation-session-slice"
import type { RootState, AppDispatch } from "@/redux/store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export default function DeliberationSessionsPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { items: deliberationSessions, loading, error } = useSelector((state: RootState) => state.deliberationSessions)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    academicPeriod: "",
    program: "",
    status: "",
  })

  useEffect(() => {
    dispatch(fetchAllDeliberationSessions())
  }, [dispatch])

  // Colonnes pour le tableau des sessions de délibération
  const columns = [
    {
      accessorKey: "id",
      header: t("id"),
    },
    {
      accessorKey: "title",
      header: t("title"),
    },
    {
      accessorKey: "programName",
      header: t("program"),
    },
    {
      accessorKey: "academicPeriodName",
      header: t("academicPeriod"),
    },
    {
      accessorKey: "date",
      header: t("date"),
      cell: ({ row }: any) => {
        return format(new Date(row.original.date), "PPP")
      },
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }: any) => {
        const status = row.original.status
        let color = "bg-gray-100"

        if (status === "Scheduled") color = "bg-blue-100 text-blue-800"
        else if (status === "In Progress") color = "bg-yellow-100 text-yellow-800"
        else if (status === "Completed") color = "bg-green-100 text-green-800"
        else if (status === "Cancelled") color = "bg-red-100 text-red-800"

        return <Badge className={color}>{status}</Badge>
      },
    },
    {
      accessorKey: "participants",
      header: t("participants"),
      cell: ({ row }: any) => {
        return row.original.participants.length
      },
    },
  ]

  // Filtrer les données en fonction du terme de recherche et des filtres
  const filteredData = deliberationSessions.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.academicPeriodName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAcademicPeriod = filters.academicPeriod ? session.academicPeriodId === filters.academicPeriod : true
    const matchesProgram = filters.program ? session.programId === filters.program : true
    const matchesStatus = filters.status ? session.status === filters.status : true

    return matchesSearch && matchesAcademicPeriod && matchesProgram && matchesStatus
  })

  // Fonction pour rafraîchir les données
  const refreshData = () => {
    dispatch(fetchAllDeliberationSessions())
  }

  // Fonction pour gérer l'importation de données Excel
  const handleImport = (data: any[]) => {
    // Logique d'importation
    console.log("Imported data:", data)
  }

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setFilters({
      academicPeriod: "",
      program: "",
      status: "",
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t("deliberationSessions")}</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t("deliberationSessions")}</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Extraire les options uniques pour les filtres
  const academicPeriods = [...new Set(deliberationSessions.map((session) => session.academicPeriodId))].map((id) => {
    const session = deliberationSessions.find((s) => s.academicPeriodId === id)
    return { id, name: session?.academicPeriodName || id }
  })

  const programs = [...new Set(deliberationSessions.map((session) => session.programId))].map((id) => {
    const session = deliberationSessions.find((s) => s.programId === id)
    return { id, name: session?.programName || id }
  })

  const statuses = [...new Set(deliberationSessions.map((session) => session.status))]

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("deliberationSessions")}</h1>
        <div className="flex gap-2">
          <Button onClick={() => router.push("/dashboard/deliberation-sessions/new")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {t("newDeliberationSession")}
          </Button>
          <ExcelExport data={filteredData} filename="deliberation-sessions-export">
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              {t("export")}
            </Button>
          </ExcelExport>
          <ExcelImport onImport={handleImport}>
            <Button variant="outline">
              <FileUp className="mr-2 h-4 w-4" />
              {t("import")}
            </Button>
          </ExcelImport>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("deliberationSessionsManagement")}</CardTitle>
          <CardDescription>{t("deliberationSessionsManagementDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder={t("searchDeliberationSessions")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={refreshData}>
                <RefreshCw className="h-4 w-4" />
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    {t("filter")}
                    {Object.values(filters).some(Boolean) && (
                      <Badge variant="secondary" className="ml-2">
                        {Object.values(filters).filter(Boolean).length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>{t("filterDeliberationSessions")}</SheetTitle>
                    <SheetDescription>{t("filterDeliberationSessionsDescription")}</SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="academicPeriod">{t("academicPeriod")}</Label>
                      <Select
                        value={filters.academicPeriod}
                        onValueChange={(value) => setFilters({ ...filters, academicPeriod: value })}
                      >
                        <SelectTrigger id="academicPeriod">
                          <SelectValue placeholder={t("selectAcademicPeriod")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{t("all")}</SelectItem>
                          {academicPeriods.map((period) => (
                            <SelectItem key={period.id} value={period.id}>
                              {period.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="program">{t("program")}</Label>
                      <Select
                        value={filters.program}
                        onValueChange={(value) => setFilters({ ...filters, program: value })}
                      >
                        <SelectTrigger id="program">
                          <SelectValue placeholder={t("selectProgram")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{t("all")}</SelectItem>
                          {programs.map((program) => (
                            <SelectItem key={program.id} value={program.id}>
                              {program.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">{t("status")}</Label>
                      <Select
                        value={filters.status}
                        onValueChange={(value) => setFilters({ ...filters, status: value })}
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder={t("selectStatus")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{t("all")}</SelectItem>
                          {statuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full" onClick={resetFilters}>
                      {t("resetFilters")}
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredData}
            onRowClick={(row) => router.push(`/dashboard/deliberation-sessions/${row.id}`)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
