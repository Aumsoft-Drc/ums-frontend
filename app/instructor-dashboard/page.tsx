"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "@/hooks/use-translation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, GraduationCap, Users, BookOpen } from "lucide-react"
import Link from "next/link"
import type { RootState } from "@/redux/store"
import { instructorService } from "@/services/instructor-service"

export default function InstructorDashboard() {
  const { t } = useTranslation()
  const { user } = useSelector((state: RootState) => state.auth)

  const [instructorProfile, setInstructorProfile] = useState<any>(null)
  const [assignedCourses, setAssignedCourses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        const profile = await instructorService.getInstructorProfile()
        setInstructorProfile(profile)

        const courses = await instructorService.getAssignedCourses()
        setAssignedCourses(courses)
      } catch (error) {
        console.error("Failed to fetch instructor data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInstructorData()
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
      <h1 className="text-3xl font-bold mb-6">{t("instructorDashboard.welcome", { name: user?.firstName })}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t("instructorDashboard.department")}</CardTitle>
            <CardDescription>{instructorProfile?.department?.name || "N/A"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{instructorProfile?.title || "N/A"}</span>
            </div>
            <div className="flex items-center mt-2">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>
                {t("instructorDashboard.employeeId")}: {instructorProfile?.employeeId || "N/A"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t("instructorDashboard.assignedCourses")}</CardTitle>
            <CardDescription>{t("instructorDashboard.currentSemester")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{assignedCourses.length}</div>
            <Button asChild variant="link" className="p-0">
              <Link href="/instructor-dashboard/courses">{t("instructorDashboard.viewAllCourses")}</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t("instructorDashboard.upcomingClasses")}</CardTitle>
            <CardDescription>{t("instructorDashboard.today")}</CardDescription>
          </CardHeader>
          <CardContent>
            {assignedCourses[0]?.nextClass ? (
              <>
                <div className="font-medium">{assignedCourses[0].name}</div>
                <div className="flex items-center mt-1">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{assignedCourses[0].nextClass.time}</span>
                </div>
                <div className="flex items-center mt-1">
                  <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{assignedCourses[0].nextClass.location}</span>
                </div>
              </>
            ) : (
              <div className="text-muted-foreground">{t("instructorDashboard.noUpcomingClasses")}</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses">
        <TabsList className="mb-4">
          <TabsTrigger value="courses">{t("instructorDashboard.tabs.courses")}</TabsTrigger>
          <TabsTrigger value="schedule">{t("instructorDashboard.tabs.schedule")}</TabsTrigger>
          <TabsTrigger value="students">{t("instructorDashboard.tabs.students")}</TabsTrigger>
          <TabsTrigger value="grades">{t("instructorDashboard.tabs.grades")}</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignedCourses.map((course) => (
              <Card key={course.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{course.name}</CardTitle>
                  <CardDescription>{course.code}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Users className="mr-2 h-4 w-4" />
                    <span>
                      {course.enrolledStudents} {t("instructorDashboard.students")}
                    </span>
                  </div>
                  <Button asChild>
                    <Link href={`/instructor-dashboard/courses/${course.id}`}>
                      {t("instructorDashboard.manageCourse")}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <p>{t("instructorDashboard.scheduleContent")}</p>
        </TabsContent>

        <TabsContent value="students">
          <p>{t("instructorDashboard.studentsContent")}</p>
        </TabsContent>

        <TabsContent value="grades">
          <p>{t("instructorDashboard.gradesContent")}</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
