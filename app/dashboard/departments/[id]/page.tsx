"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import { ArrowLeft, Edit, Trash2, BookOpen, Users } from "lucide-react"
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

interface Department {
  id: string
  name: string
  code: string
  faculty: string
  head: string
  description: string
  createdAt: string
  programs: Array<{ id: string; name: string; code: string; level: string }>
  instructors: Array<{ id: string; name: string; specialization: string }>
  students: number
}

export default function DepartmentDetailPage({ params }: { params: { id: string } }) {
  const { t } = useTranslation()
  const router = useRouter()
  const [department, setDepartment] = useState<Department | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Dans un environnement réel, vous appelleriez votre API
    // Simulons des données pour la démonstration
    setTimeout(() => {
      setDepartment({
        id: params.id,
        name: "Computer Science",
        code: "CS",
        faculty: "Science and Technology",
        head: "Dr. John Smith",
        description:
          "The Department of Computer Science offers programs in various areas of computing, including artificial intelligence, software engineering, and data science.",
        createdAt: "2000-09-01",
        programs: [
          { id: "1", name: "Bachelor of Science in Computer Science", code: "BSCS", level: "Undergraduate" },
          { id: "2", name: "Master of Science in Computer Science", code: "MSCS", level: "Graduate" },
          { id: "3", name: "PhD in Computer Science", code: "PHDCS", level: "Doctorate" },
        ],
        instructors: [
          { id: "1", name: "Dr. John Smith", specialization: "Artificial Intelligence" },
          { id: "2", name: "Prof. Jane Doe", specialization: "Software Engineering" },
          { id: "3", name: "Dr. Robert Johnson", specialization: "Data Science" },
          { id: "4", name: "Prof. Emily Brown", specialization: "Computer Networks" },
        ],
        students: 450,
      })
      setLoading(false)
    }, 1000)
  }, [params.id])

  const handleDelete = () => {
    // Dans un environnement réel, vous appelleriez votre API pour supprimer le département
    // Simulons une suppression pour la démonstration
    setTimeout(() => {
      router.push("/dashboard/departments")
    }, 500)
  }

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

  if (!department) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back")}
          </Button>
          <h1 className="text-3xl font-bold">{t("departmentNotFound")}</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <p>{t("departmentNotFoundDescription")}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/dashboard/departments")}>{t("backToDepartments")}</Button>
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
          <h1 className="text-3xl font-bold">{department.name}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/dashboard/departments/${params.id}/edit`)}>
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
                <AlertDialogTitle>{t("deleteDepartment")}</AlertDialogTitle>
                <AlertDialogDescription>{t("deleteDepartmentConfirmation")}</AlertDialogDescription>
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
            <CardTitle>{t("departmentInfo")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">{t("code")}</h3>
                <p>{department.code}</p>
              </div>
              <div>
                <h3 className="font-medium">{t("faculty")}</h3>
                <p>{department.faculty}</p>
              </div>
              <div>
                <h3 className="font-medium">{t("headOfDepartment")}</h3>
                <p>{department.head}</p>
              </div>
              <div>
                <h3 className="font-medium">{t("established")}</h3>
                <p>{new Date(department.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-medium">{t("totalStudents")}</h3>
                <p>{department.students}</p>
              </div>
              <div>
                <h3 className="font-medium">{t("totalPrograms")}</h3>
                <p>{department.programs.length}</p>
              </div>
              <div>
                <h3 className="font-medium">{t("totalInstructors")}</h3>
                <p>{department.instructors.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t("departmentDetails")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="description">
              <TabsList className="mb-4">
                <TabsTrigger value="description">{t("description")}</TabsTrigger>
                <TabsTrigger value="programs">
                  <BookOpen className="mr-2 h-4 w-4" />
                  {t("programs")}
                </TabsTrigger>
                <TabsTrigger value="instructors">
                  <Users className="mr-2 h-4 w-4" />
                  {t("instructors")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description">
                <p>{department.description}</p>
              </TabsContent>

              <TabsContent value="programs">
                <div className="space-y-4">
                  {department.programs.map((program) => (
                    <div key={program.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{program.name}</h3>
                          <p className="text-sm text-muted-foreground">{program.code}</p>
                          <Badge className="mt-1">{program.level}</Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/dashboard/programs/${program.id}`)}
                        >
                          {t("view")}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="instructors">
                <div className="space-y-4">
                  {department.instructors.map((instructor) => (
                    <div key={instructor.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{instructor.name}</h3>
                          <p className="text-sm text-muted-foreground">{instructor.specialization}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/dashboard/instructors/${instructor.id}`)}
                        >
                          {t("view")}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
