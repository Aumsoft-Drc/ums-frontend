"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { instructorService } from "@/services/instructor-service"
import { Plus, Users, FileText, Calendar } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function CourseManagementPage() {
  const { t } = useTranslation()
  const params = useParams()
  const courseId = params.id as string

  const [course, setCourse] = useState<any>(null)
  const [students, setStudents] = useState<any[]>([])
  const [assignments, setAssignments] = useState<any[]>([])
  const [exams, setExams] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // In a real app, these would be separate API calls
        // For now, we'll simulate with mock data
        const courseData = {
          id: courseId,
          name: "Introduction to Computer Science",
          code: "CS101",
          description: "An introduction to the fundamentals of computer science and programming.",
          credits: 3,
          enrolledStudents: 45,
          schedule: [
            { day: "Monday", time: "10:00 - 12:00", location: "Room A101" },
            { day: "Wednesday", time: "10:00 - 12:00", location: "Room A101" },
          ],
        }
        setCourse(courseData)

        const studentsData = await instructorService.getCourseStudents(courseId)
        setStudents(studentsData)

        // Mock assignments and exams
        setAssignments([
          {
            id: "1",
            title: "Assignment 1: Introduction to Algorithms",
            dueDate: "2025-05-20",
            status: "active",
            submissionCount: 32,
          },
          {
            id: "2",
            title: "Assignment 2: Data Structures",
            dueDate: "2025-06-10",
            status: "upcoming",
            submissionCount: 0,
          },
        ])

        setExams([
          {
            id: "1",
            title: "Midterm Exam",
            date: "2025-05-15",
            time: "10:00 - 12:00",
            location: "Main Hall",
            status: "upcoming",
          },
          {
            id: "2",
            title: "Final Exam",
            date: "2025-06-20",
            time: "14:00 - 17:00",
            location: "Main Hall",
            status: "upcoming",
          },
        ])
      } catch (error) {
        console.error("Failed to fetch course data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourseData()
  }, [courseId])

  if (isLoading) {
    return (
      <div className="container py-10">
        <Skeleton className="h-12 w-3/4 mb-6" />
        <Skeleton className="h-24 mb-6" />
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-[400px]" />
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{course.name}</h1>
          <p className="text-muted-foreground">
            {course.code} • {course.credits} {t("courses.credits")}
          </p>
        </div>
        <Button asChild>
          <Link href={`/instructor-dashboard/courses/${courseId}/edit`}>{t("common.edit")}</Link>
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{t("instructorDashboard.courseDetails")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{course.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">{t("instructorDashboard.schedule")}</h3>
              <ul className="space-y-2">
                {course.schedule.map((item: any, index: number) => (
                  <li key={index} className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                      {item.day}: {item.time} ({item.location})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">{t("instructorDashboard.enrollment")}</h3>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>
                  {course.enrolledStudents} {t("instructorDashboard.students")}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="students">
        <TabsList className="mb-4">
          <TabsTrigger value="students">{t("instructorDashboard.tabs.students")}</TabsTrigger>
          <TabsTrigger value="assignments">{t("instructorDashboard.tabs.assignments")}</TabsTrigger>
          <TabsTrigger value="exams">{t("instructorDashboard.tabs.exams")}</TabsTrigger>
          <TabsTrigger value="grades">{t("instructorDashboard.tabs.grades")}</TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{t("instructorDashboard.enrolledStudents")}</h2>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              {t("instructorDashboard.exportList")}
            </Button>
          </div>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left">{t("instructorDashboard.studentName")}</th>
                  <th className="py-3 px-4 text-left">{t("instructorDashboard.studentId")}</th>
                  <th className="py-3 px-4 text-left">{t("instructorDashboard.program")}</th>
                  <th className="py-3 px-4 text-left">{t("instructorDashboard.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="py-3 px-4">{`${student.firstName} ${student.lastName}`}</td>
                    <td className="py-3 px-4">{student.studentId}</td>
                    <td className="py-3 px-4">{student.program}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/instructor-dashboard/students/${student.id}`}>
                          {t("instructorDashboard.viewDetails")}
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="assignments">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{t("instructorDashboard.assignments")}</h2>
            <Button asChild>
              <Link href={`/instructor-dashboard/courses/${courseId}/assignments/new`}>
                <Plus className="mr-2 h-4 w-4" />
                {t("instructorDashboard.createAssignment")}
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <Badge variant={assignment.status === "active" ? "default" : "secondary"}>
                      {assignment.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    {t("instructorDashboard.dueDate")}: {assignment.dueDate}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>
                      {assignment.submissionCount} {t("instructorDashboard.submissions")}
                    </span>
                  </div>
                  <Button asChild>
                    <Link href={`/instructor-dashboard/assignments/${assignment.id}`}>
                      {t("instructorDashboard.manageAssignment")}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="exams">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{t("instructorDashboard.exams")}</h2>
            <Button asChild>
              <Link href={`/instructor-dashboard/courses/${courseId}/exams/new`}>
                <Plus className="mr-2 h-4 w-4" />
                {t("instructorDashboard.createExam")}
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            {exams.map((exam) => (
              <Card key={exam.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{exam.title}</CardTitle>
                    <Badge variant={exam.status === "completed" ? "secondary" : "default"}>{exam.status}</Badge>
                  </div>
                  <CardDescription>
                    {exam.date} • {exam.time} • {exam.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href={`/instructor-dashboard/exams/${exam.id}`}>{t("instructorDashboard.manageExam")}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="grades">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{t("instructorDashboard.grades")}</h2>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              {t("instructorDashboard.exportGrades")}
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t("instructorDashboard.gradeManagement")}</CardTitle>
              <CardDescription>{t("instructorDashboard.gradeDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href={`/instructor-dashboard/courses/${courseId}/grades`}>
                  {t("instructorDashboard.manageGrades")}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
