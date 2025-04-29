"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "@/hooks/use-translation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { RootState } from "@/redux/store"
import { studentService } from "@/services/student-service"
import { courseService } from "@/services/course-service"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, GraduationCap, Users } from "lucide-react"
import Link from "next/link"
import CourseList from "@/components/student/course-list"
import UpcomingExams from "@/components/student/upcoming-exams"
import RecentGrades from "@/components/student/recent-grades"
import ScheduleView from "@/components/student/schedule-view"

export default function StudentDashboard() {
  const { t } = useTranslation()
  const { user } = useSelector((state: RootState) => state.auth)

  const [studentProfile, setStudentProfile] = useState<any>(null)
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const profile = await studentService.getStudentProfile()
        setStudentProfile(profile)

        const courses = await courseService.getEnrolledCourses()
        setEnrolledCourses(courses)
      } catch (error) {
        console.error("Failed to fetch student data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStudentData()
  }, [])

  if (isLoading) {
    return (
      <div className="container py-10">
        <Skeleton className="h-12 w-3/4 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
        <Skeleton className="h-[400px] mt-6" />
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">{t("studentDashboard.welcome", { name: user?.firstName })}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t("studentDashboard.program")}</CardTitle>
            <CardDescription>{studentProfile?.program?.name || "N/A"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{studentProfile?.cohort?.academicYear || "N/A"}</span>
            </div>
            <div className="flex items-center mt-2">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>
                {t("studentDashboard.studentId")}: {studentProfile?.studentId || "N/A"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t("studentDashboard.enrolledCourses")}</CardTitle>
            <CardDescription>{t("studentDashboard.currentSemester")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{enrolledCourses.length}</div>
            <Button asChild variant="link" className="p-0">
              <Link href="/student-dashboard/courses">{t("studentDashboard.viewAllCourses")}</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t("studentDashboard.nextExam")}</CardTitle>
            <CardDescription>{t("studentDashboard.upcoming")}</CardDescription>
          </CardHeader>
          <CardContent>
            {enrolledCourses[0]?.nextExam ? (
              <>
                <div className="font-medium">{enrolledCourses[0].nextExam.title}</div>
                <div className="flex items-center mt-1">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{new Date(enrolledCourses[0].nextExam.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center mt-1">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{enrolledCourses[0].nextExam.time}</span>
                </div>
              </>
            ) : (
              <div className="text-muted-foreground">{t("studentDashboard.noUpcomingExams")}</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses">
        <TabsList className="mb-4">
          <TabsTrigger value="courses">{t("studentDashboard.tabs.courses")}</TabsTrigger>
          <TabsTrigger value="schedule">{t("studentDashboard.tabs.schedule")}</TabsTrigger>
          <TabsTrigger value="exams">{t("studentDashboard.tabs.exams")}</TabsTrigger>
          <TabsTrigger value="grades">{t("studentDashboard.tabs.grades")}</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <CourseList courses={enrolledCourses} />
        </TabsContent>

        <TabsContent value="schedule">
          <ScheduleView />
        </TabsContent>

        <TabsContent value="exams">
          <UpcomingExams />
        </TabsContent>

        <TabsContent value="grades">
          <RecentGrades />
        </TabsContent>
      </Tabs>
    </div>
  )
}
