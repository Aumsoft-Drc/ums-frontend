"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import { ArrowLeft, Edit, Trash2, BookOpen, Users, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DataTable } from "@/components/data-table/data-table"

interface Program {
  id: string
  name: string
  code: string
  department: string
  faculty: string
  level: string
  duration: string
  description: string
  createdAt: string
  courses: Array<{ id: string; code: string; name: string; credits: number }>
  students: Array<{ id: string; name: string; studentId: string; status: string }>
  cohorts: Array<{ id: string; name: string; year: string; studentsCount: number }>
}

export default function ProgramDetailPage({ params }: { params: { id: string } }) {
  const { t } = useTranslation()
  const router = useRouter()
  const [program, setProgram] = useState<Program | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Dans un environnement réel, vous appelleriez votre API
    // Simulons des données pour la démonstration
    setTimeout(() => {
      setProgram({
        id: params.id,
        name: "Bachelor of Science in Computer Science",
        code: "BSCS",
        department: "Computer Science",
        faculty: "Science and Technology",
        level: "Undergraduate",
        duration: "4 years",
        description:
          "The Bachelor of Science in Computer Science program provides students with a strong foundation in computer science principles, programming, algorithms, and software development.",
        createdAt: "2010-09-01",
        courses: [
          { id: "1", code: "CS101", name: "Introduction to Computer Science", credits: 3 },
          { id: "2", code: "CS201", name: "Data Structures and Algorithms", credits: 4 },
          { id: "3", code: "CS301", name: "Database Systems", credits: 3 },
          { id: "4", code: "CS401", name: "Software Engineering", credits: 4 },
          { id: "5", code: "CS501", name: "Artificial Intelligence", credits: 3 },
        ],
        students: [
          { id: "1", name: "John Doe", studentId: "S12345", status: "Active" },
          { id: "2", name: "Jane Smith", studentId: "S12346", status: "Active" },
          { id: "3", name: "Robert Johnson", studentId: "S12347", status: "Active" },
          { id: "4", name: "Emily Davis", studentId: "S12348", status: "Inactive" },
          { id: "5", name: "Michael Brown", studentId: "S12349", status: "Active" },
        ],
        cohorts: [
          { id: "1", name: "2020 Intake", year: "2020", studentsCount: 45 },
          { id: "2", name: "2021 Intake", year: "2021", studentsCount: 50 },
          { id: "3", name: "2022 Intake", year: "2022", studentsCount: 55 },
          { id: "4", name: "2023 Intake", year: "2023", studentsCount: 60 },
        ],
      })
      setLoading(false)
    }, 1000)
  }, [params.id])

  const handleDelete = () => {
    // Dans un environnement réel, vous appelleriez votre API pour supprimer le programme
    // Simulons une suppression pour la démonstration
    setTimeout(() => {
      router.push("/dashboard/programs")
    }, 500)
  }

  const courseColumns = [
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "credits",
      header: "Credits",
    },
  ]

  const studentColumns = [
    {
      accessorKey: "studentId",
      header: "Student ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            className={
              status === "Active"
                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
            }
          >
            {status}
          </Badge>
        )
      },
    },
  ]

  const cohortColumns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "year",
      header: "Year",
    },
    {
      accessorKey: "studentsCount",
      header: "Students",
    },
  ]

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back")}
          </Button>
          <h1 className="text-3xl font-bold">{t("loading")}</h1>
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

  if (!program) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back")}
          </Button>
          <h1 className="text-3xl font-bold">{t("programNotFound")}</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <p>{t("programNotFoundDescription")}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/dashboard/programs")}>{t("backToPrograms")}</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back")}
          </Button>
          <h1 className="text-3xl font-bold">{program.name}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/dashboard/programs/${params.id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            {t("edit")}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                {t("delete")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("deleteProgram")}</AlertDialogTitle>
                <AlertDialogDescription>{t("deleteProgramConfirmation")}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>{t("delete")}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>{t("programInfo")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">{t("code")}</h3>
                <p>{program.code}</p>
              </div>
              <div>
                <h3 className="font-medium">{t("department")}</h3>
                <p>{program.department}</p>
              </div>
              <div>
                <h3 className="font-medium">{t("faculty")}</h3>
                <p>{program.faculty}</p>
              </div>
              <div>
                <h3 className="font-medium">{t("level")}</h3>
                <Badge
                  variant={
                    program.level === "Undergraduate"
                      ? "default"
                      : program.level === "Graduate"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {program.level}
                </Badge>
              </div>
              <div>
                <h3 className="font-medium">{t("duration")}</h3>
                <p>{program.duration}</p>
              </div>
              <div>
                <h3 className="font-medium">{t("established")}</h3>
                <p>{new Date(program.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-medium">{t("totalStudents")}</h3>
                <p>{program.students.length}</p>
              </div>
              <div>
                <h3 className="font-medium">{t("totalCourses")}</h3>
                <p>{program.courses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t("programDetails")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="description">
              <TabsList className="mb-4">
                <TabsTrigger value="description">{t("description")}</TabsTrigger>
                <TabsTrigger value="courses">
                  <BookOpen className="mr-2 h-4 w-4" />
                  {t("courses")}
                </TabsTrigger>
                <TabsTrigger value="students">
                  <Users className="mr-2 h-4 w-4" />
                  {t("students")}
                </TabsTrigger>
                <TabsTrigger value="cohorts">
                  <Calendar className="mr-2 h-4 w-4" />
                  {t("cohorts")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description">
                <p>{program.description}</p>
              </TabsContent>

              <TabsContent value="courses">
                <DataTable
                  columns={courseColumns}
                  data={program.courses}
                  onRowClick={(row) => router.push(`/dashboard/courses/${row.id}`)}
                />
              </TabsContent>

              <TabsContent value="students">
                <DataTable
                  columns={studentColumns}
                  data={program.students}
                  onRowClick={(row) => router.push(`/dashboard/students/${row.id}`)}
                />
              </TabsContent>

              <TabsContent value="cohorts">
                <DataTable
                  columns={cohortColumns}
                  data={program.cohorts}
                  onRowClick={(row) => router.push(`/dashboard/cohorts/${row.id}`)}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
