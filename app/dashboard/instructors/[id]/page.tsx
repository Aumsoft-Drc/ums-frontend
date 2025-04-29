"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import { ArrowLeft, Edit, Trash2, BookOpen, Users, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

interface Instructor {
  id: string
  name: string
  email: string
  department: string
  specialization: string
  status: string
  bio: string
  joinDate: string
  courses: Array<{ id: string; code: string; name: string }>
  education: Array<{ degree: string; institution: string; year: string }>
  publications: Array<{ title: string; journal: string; year: string }>
}

export default function InstructorDetailPage({ params }: { params: { id: string } }) {
  const { t } = useTranslation()
  const router = useRouter()
  const [instructor, setInstructor] = useState<Instructor | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Dans un environnement réel, vous appelleriez votre API
    // Simulons des données pour la démonstration
    setTimeout(() => {
      setInstructor({
        id: params.id,
        name: "Dr. John Smith",
        email: "john.smith@university.edu",
        department: "Computer Science",
        specialization: "Artificial Intelligence",
        status: "Active",
        bio: "Dr. John Smith is a professor of Computer Science specializing in Artificial Intelligence. He has over 15 years of experience in teaching and research.",
        joinDate: "2010-09-01",
        courses: [
          { id: "1", code: "CS101", name: "Introduction to Computer Science" },
          { id: "2", code: "CS301", name: "Artificial Intelligence" },
          { id: "3", code: "CS401", name: "Machine Learning" },
        ],
        education: [
          { degree: "Ph.D. in Computer Science", institution: "MIT", year: "2005" },
          { degree: "M.S. in Computer Science", institution: "Stanford University", year: "2000" },
          { degree: "B.S. in Computer Science", institution: "University of California, Berkeley", year: "1998" },
        ],
        publications: [
          { title: "Advances in Neural Networks", journal: "Journal of AI Research", year: "2018" },
          { title: "Deep Learning Applications", journal: "IEEE Transactions on AI", year: "2016" },
          { title: "Machine Learning in Education", journal: "Educational Technology Journal", year: "2014" },
        ],
      })
      setLoading(false)
    }, 1000)
  }, [params.id])

  const handleDelete = () => {
    // Dans un environnement réel, vous appelleriez votre API pour supprimer l'instructeur
    // Simulons une suppression pour la démonstration
    setTimeout(() => {
      router.push("/dashboard/instructors")
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

  if (!instructor) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back")}
          </Button>
          <h1 className="text-3xl font-bold">{t("instructorNotFound")}</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <p>{t("instructorNotFoundDescription")}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/dashboard/instructors")}>{t("backToInstructors")}</Button>
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
          <h1 className="text-3xl font-bold">{instructor.name}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/dashboard/instructors/${params.id}/edit`)}>
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
                <AlertDialogTitle>{t("deleteInstructor")}</AlertDialogTitle>
                <AlertDialogDescription>{t("deleteInstructorConfirmation")}</AlertDialogDescription>
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
            <CardTitle>{t("instructorProfile")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.name)}&background=random`}
                />
                <AvatarFallback>
                  {instructor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{instructor.name}</h2>
              <p className="text-muted-foreground">{instructor.email}</p>
              <Badge className="mt-2" variant={instructor.status === "Active" ? "default" : "secondary"}>
                {instructor.status}
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium">{t("department")}</h3>
                <p>{instructor.department}</p>
              </div>
              <div>
                <h3 className="font-medium">{t("specialization")}</h3>
                <p>{instructor.specialization}</p>
              </div>
              <div>
                <h3 className="font-medium">{t("joinDate")}</h3>
                <p>{new Date(instructor.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t("instructorDetails")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="bio">
              <TabsList className="mb-4">
                <TabsTrigger value="bio">{t("biography")}</TabsTrigger>
                <TabsTrigger value="courses">
                  <BookOpen className="mr-2 h-4 w-4" />
                  {t("courses")}
                </TabsTrigger>
                <TabsTrigger value="education">
                  <Users className="mr-2 h-4 w-4" />
                  {t("education")}
                </TabsTrigger>
                <TabsTrigger value="publications">
                  <Calendar className="mr-2 h-4 w-4" />
                  {t("publications")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bio">
                <p>{instructor.bio}</p>
              </TabsContent>

              <TabsContent value="courses">
                <div className="space-y-4">
                  {instructor.courses.map((course) => (
                    <div key={course.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{course.name}</h3>
                          <p className="text-sm text-muted-foreground">{course.code}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/dashboard/courses/${course.id}`)}
                        >
                          {t("view")}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="education">
                <div className="space-y-4">
                  {instructor.education.map((edu, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className="text-sm">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="publications">
                <div className="space-y-4">
                  {instructor.publications.map((pub, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h3 className="font-semibold">{pub.title}</h3>
                      <p className="text-sm">{pub.journal}</p>
                      <p className="text-sm text-muted-foreground">{pub.year}</p>
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
