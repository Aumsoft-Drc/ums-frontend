"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import { useTranslation } from "@/hooks/use-translation"
import { FileDown, FileUp, RefreshCw, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExcelExport } from "@/components/excel/excel-export"
import { ExcelImport } from "@/components/excel/excel-import"
import { fetchAllCourseResults } from "@/redux/slices/course-result-slice"
import type { RootState, AppDispatch } from "@/redux/store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function CourseResultsPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { items: courseResults, loading, error } = useSelector((state: RootState) => state.courseResults)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    academicPeriod: "",
    status: "",
    grade: "",
  })

  useEffect(() => {
    dispatch(fetchAllCourseResults())
  }, [dispatch])

  // Colonnes pour le tableau des résultats de cours
  const columns = [
    {
      accessorKey: "id",
      header: t("id"),
    },
    {
      accessorKey: "courseOfferingName",
      header: t("course"),
    },
    {
      accessorKey: "studentName",
      header: t("student"),
    },
    {
      accessorKey: "finalGrade",
      header: t("grade"),
      cell: ({ row }: any) => {
        const grade = row.original.finalGrade
        let color = "bg-gray-100"

        if (grade === "A" || grade === "A+") color = "bg-green-100 text-green-800"
        else if (grade === "B" || grade === "B+") color = "bg-blue-100 text-blue-800"
        else if (grade === "C" || grade === "C+") color = "bg-yellow-100 text-yellow-800"
        else if (grade === "D" || grade === "D+") color = "bg-orange-100 text-orange-800"
        else if (grade === "F") color = "bg-red-100 text-red-800"

        return <Badge className={color}>{grade}</Badge>
      },
    },
    {
      accessorKey: "totalMarks",
      header: t("marks"),
    },
    {
      accessorKey: "academicPeriodName",
      header: t("academicPeriod"),
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }: any) => {
        const status = row.original.status
        let color = "bg-gray-100"

        if (status === "Passed") color = "bg-green-100 text-green-800"
        else if (status === "Failed") color = "bg-red-100 text-red-800"
        else if (status === "Incomplete") color = "bg-yellow-100 text-yellow-800"
        else if (status === "Withdrawn") color = "bg-gray-100 text-gray-800"

        return <Badge className={color}>{status}</Badge>
      },
    },
  ]

  // Filtrer les données en fonction du terme de recherche et des filtres
  const filteredData = courseResults.filter((result) => {
    const matchesSearch =
      result.courseOfferingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.studentName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAcademicPeriod = filters.academicPeriod ? result.academicPeriodId === filters.academicPeriod : true
    const matchesStatus = filters.status ? result.status === filters.status : true
    const matchesGrade = filters.grade ? result.finalGrade === filters.grade : true

    return matchesSearch && matchesAcademicPeriod && matchesStatus && matchesGrade
  })

  // Fonction pour rafraîchir les données
  const refreshData = () => {
    dispatch(fetchAllCourseResults())
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
      status: "",
      grade: "",
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t("courseResults")}</h1>
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
          <h1 className="text-3xl font-bold">{t("courseResults")}</h1>
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
  const academicPeriods = [...new Set(courseResults.map((result) => result.academicPeriodId))].map((id) => {
    const result = courseResults.find((r) => r.academicPeriodId === id)
    return { id, name: result?.academicPeriodName || id }
  })

  const statuses = [...new Set(courseResults.map((result) => result.status))]
  const grades = [...new Set(courseResults.map((result) => result.finalGrade))]

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("courseResults")}</h1>
        <div className="flex gap-2">
          <ExcelExport data={filteredData} filename="course-results-export">
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
          <CardTitle>{t("courseResultsManagement")}</CardTitle>
          <CardDescription>{t("courseResultsManagementDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder={t("searchCourseResults")}
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
                    <SheetTitle>{t("filterCourseResults")}</SheetTitle>
                    <SheetDescription>{t("filterCourseResultsDescription")}</SheetDescription>
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

                    <div className="space-y-2">
                      <Label htmlFor="grade">{t("grade")}</Label>
                      <Select value={filters.grade} onValueChange={(value) => setFilters({ ...filters, grade: value })}>
                        <SelectTrigger id="grade">
                          <SelectValue placeholder={t("selectGrade")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{t("all")}</SelectItem>
                          {grades.map((grade) => (
                            <SelectItem key={grade} value={grade}>
                              {grade}
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
            onRowClick={(row) => router.push(`/dashboard/course-results/${row.id}`)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
