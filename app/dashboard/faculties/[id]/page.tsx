"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { EntityDetail } from "@/components/crud/entity-detail"
import { facultyService } from "@/services/faculty-service"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/data-table/data-table"
import { createActionsColumn, createSortableHeader } from "@/components/data-table/columns"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function FacultyDetailPage() {
  const { t } = useTranslation()
  const params = useParams()
  const { toast } = useToast()
  const facultyId = params.id as string

  const [faculty, setFaculty] = useState<any>(null)
  const [departments, setDepartments] = useState<any[]>([])
  const [programs, setPrograms] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const [facultyData, departmentsData, programsData] = await Promise.all([
          facultyService.getFacultyById(facultyId),
          facultyService.getFacultyDepartments(facultyId),
          facultyService.getFacultyPrograms(facultyId),
        ])
        setFaculty(facultyData)
        setDepartments(departmentsData)
        setPrograms(programsData)
      } catch (error) {
        console.error("Failed to fetch faculty data:", error)
        toast({
          variant: "destructive",
          title: t("crud.fetchError"),
          description: t("crud.fetchErrorDescription"),
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchFacultyData()
  }, [facultyId, toast, t])

  const handleDelete = async (id: string) => {
    try {
      await facultyService.deleteFaculty(id)
      return Promise.resolve()
    } catch (error) {
      console.error("Failed to delete faculty:", error)
      return Promise.reject(error)
    }
  }

  const departmentColumns = [
    {
      accessorKey: "name",
      header: createSortableHeader(t("departments.name"), "name"),
    },
    {
      accessorKey: "code",
      header: t("departments.code"),
    },
    {
      accessorKey: "head",
      header: t("departments.head"),
      cell: ({ row }) => {
        const head = row.getValue("head") as { firstName: string; lastName: string } | null
        return head ? `${head.firstName} ${head.lastName}` : "N/A"
      },
    },
    {
      accessorKey: "instructorsCount",
      header: t("departments.instructorsCount"),
    },
    createActionsColumn({
      onView: (department) => `/dashboard/departments/${department.id}`,
    }),
  ]

  const programColumns = [
    {
      accessorKey: "name",
      header: createSortableHeader(t("programs.name"), "name"),
    },
    {
      accessorKey: "code",
      header: t("programs.code"),
    },
    {
      accessorKey: "level",
      header: t("programs.level"),
    },
    {
      accessorKey: "duration",
      header: t("programs.duration"),
      cell: ({ row }) => {
        const duration = row.getValue("duration") as number
        return `${duration} ${t("programs.years")}`
      },
    },
    {
      accessorKey: "studentsCount",
      header: t("programs.studentsCount"),
    },
    createActionsColumn({
      onView: (program) => `/dashboard/programs/${program.id}`,
    }),
  ]

  if (isLoading || !faculty) {
    return null // Loading state is handled by EntityDetail
  }

  return (
    <EntityDetail
      title={faculty.name}
      description={faculty.code}
      entity={faculty}
      entityName={t("faculties.singular")}
      baseUrl="/dashboard/faculties"
      onDelete={handleDelete}
    >
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("faculties.details")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{t("faculties.name")}</h3>
                <p>{faculty.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{t("faculties.code")}</h3>
                <p>{faculty.code}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{t("faculties.dean")}</h3>
                <p>{faculty.dean ? `${faculty.dean.firstName} ${faculty.dean.lastName}` : t("common.notAssigned")}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{t("faculties.createdAt")}</h3>
                <p>{faculty.createdAt ? new Date(faculty.createdAt).toLocaleDateString() : "N/A"}</p>
              </div>
              <div className="col-span-2">
                <h3 className="text-sm font-medium text-muted-foreground">{t("faculties.description")}</h3>
                <p>{faculty.description || t("common.noDescription")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="departments">
        <TabsList className="mb-4">
          <TabsTrigger value="departments">{t("faculties.tabs.departments")}</TabsTrigger>
          <TabsTrigger value="programs">{t("faculties.tabs.programs")}</TabsTrigger>
        </TabsList>

        <TabsContent value="departments">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t("departments.title")}</CardTitle>
                <CardDescription>{t("departments.count", { count: departments.length })}</CardDescription>
              </div>
              <Button asChild>
                <Link href={`/dashboard/departments/new?facultyId=${facultyId}`}>
                  <Plus className="mr-2 h-4 w-4" />
                  {t("departments.create")}
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <DataTable columns={departmentColumns} data={departments} searchKey="name" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t("programs.title")}</CardTitle>
                <CardDescription>{t("programs.count", { count: programs.length })}</CardDescription>
              </div>
              <Button asChild>
                <Link href={`/dashboard/programs/new?facultyId=${facultyId}`}>
                  <Plus className="mr-2 h-4 w-4" />
                  {t("programs.create")}
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <DataTable columns={programColumns} data={programs} searchKey="name" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </EntityDetail>
  )
}
