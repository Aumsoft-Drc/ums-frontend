"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { courseService } from "@/services/course-service"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import Link from "next/link"
import type { RootState } from "@/redux/store"

export default function CourseDetailPage() {
  const { t } = useTranslation()
  const params = useParams()
  const courseId = params.id as string
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  const [course, setCourse] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEnrolled, setIsEnrolled] = useState(false)

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseData = await courseService.getCourseById(courseId)
        setCourse(courseData)

        // Check if user is enrolled in this course
        if (isAuthenticated) {
          const enrolledCourses = await courseService.getEnrolledCourses()
          setIsEnrolled(enrolledCourses.some((c: any) => c.id === courseId))
        }
      } catch (error) {
        console.error("Failed to fetch course data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourseData()
  }, [courseId, isAuthenticated])

  const handleEnroll = async () => {
    try {
      await courseService.enrollInCourse(courseId)
      setIsEnrolled(true)
    } catch (error) {
      console.error("Failed to enroll in course:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-10">
        <Skeleton className="h-12 w-3/4 mb-6" />
        <Skeleton className="h-24 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{course.name}</h1>
          <div className="flex items-center mt-2">
            <Badge className="mr-2">{course.code}</Badge>
            <span className="text-muted-foreground">
              {course.credits} {t("courses.credits")}
            </span>
          </div>
        </div>
        {isAuthenticated && (
          <div className="mt-4 md:mt-0">
            {isEnrolled ? (
              <Button asChild>
                <Link href={`/student-dashboard/courses/${courseId}`}>{t("courses.viewMyCourse")}</Link>
              </Button>
            ) : (
              <Button onClick={handleEnroll}>{t("courses.enroll")}</Button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t("courses.instructor")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <span>{course.instructor}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t("courses.schedule")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{course.schedule?.days || "N/A"}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{course.schedule?.time || "N/A"}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{course.schedule?.location || "N/A"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t("courses.enrollment")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>
                {course.enrolledStudents} {t("courses.students")}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("courses.description")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{course.description}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("courses.prerequisites")}</CardTitle>
          </CardHeader>
          <CardContent>
            {course.prerequisites?.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {course.prerequisites.map((prereq: any, index: number) => (
                  <li key={index}>
                    <Link href={`/courses/${prereq.id}`} className="text-primary hover:underline">
                      {prereq.name} ({prereq.code})
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>{t("courses.noPrerequisites")}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("courses.learningOutcomes")}</CardTitle>
          </CardHeader>
          <CardContent>
            {course.learningOutcomes?.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {course.learningOutcomes.map((outcome: string, index: number) => (
                  <li key={index}>{outcome}</li>
                ))}
              </ul>
            ) : (
              <p>{t("courses.noLearningOutcomes")}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
