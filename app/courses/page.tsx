"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Book, Users, Search, Filter } from "lucide-react"
import { courseService } from "@/services/course-service"
import Link from "next/link"

export default function CoursesPage() {
  const { t } = useTranslation()
  const [courses, setCourses] = useState<any[]>([])
  const [filteredCourses, setFilteredCourses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [creditFilter, setCreditFilter] = useState("all")

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getAllCourses()
        setCourses(data)
        setFilteredCourses(data)
      } catch (error) {
        console.error("Failed to fetch courses:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  useEffect(() => {
    let result = courses

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (course) =>
          course.name.toLowerCase().includes(query) ||
          course.code.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query),
      )
    }

    // Apply department filter
    if (departmentFilter !== "all") {
      result = result.filter((course) => course.department === departmentFilter)
    }

    // Apply credit filter
    if (creditFilter !== "all") {
      result = result.filter((course) => course.credits.toString() === creditFilter)
    }

    setFilteredCourses(result)
  }, [searchQuery, departmentFilter, creditFilter, courses])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleReset = () => {
    setSearchQuery("")
    setDepartmentFilter("all")
    setCreditFilter("all")
  }

  if (isLoading) {
    return (
      <div className="container py-10">
        <Skeleton className="h-12 w-3/4 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    )
  }

  // Extract unique departments and credits for filters
  const departments = ["all", ...new Set(courses.map((course) => course.department))]
  const credits = ["all", ...new Set(courses.map((course) => course.credits.toString()))]

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">{t("coursesPage.title")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("coursesPage.searchPlaceholder")}
              className="pl-10"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger>
            <SelectValue placeholder={t("coursesPage.departmentFilter")} />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept === "all" ? t("coursesPage.allDepartments") : dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={creditFilter} onValueChange={setCreditFilter}>
          <SelectTrigger>
            <SelectValue placeholder={t("coursesPage.creditFilter")} />
          </SelectTrigger>
          <SelectContent>
            {credits.map((credit) => (
              <SelectItem key={credit} value={credit}>
                {credit === "all" ? t("coursesPage.allCredits") : `${credit} ${t("coursesPage.credits")}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          {t("coursesPage.showing")} {filteredCourses.length} {t("coursesPage.of")} {courses.length}{" "}
          {t("coursesPage.courses")}
        </p>
        <Button variant="outline" onClick={handleReset}>
          <Filter className="mr-2 h-4 w-4" />
          {t("coursesPage.resetFilters")}
        </Button>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium">{t("coursesPage.noCoursesFound")}</h3>
          <p className="text-muted-foreground mt-1">{t("coursesPage.tryDifferentFilters")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{course.name}</CardTitle>
                  <Badge>{course.code}</Badge>
                </div>
                <CardDescription>{course.instructor}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Book className="mr-2 h-4 w-4" />
                  <span>
                    {course.credits} {t("courses.credits")}
                  </span>
                  <span className="mx-2">•</span>
                  <Users className="mr-2 h-4 w-4" />
                  <span>
                    {course.enrolledStudents} {t("courses.students")}
                  </span>
                </div>
                <p className="text-sm mb-4 line-clamp-2">{course.description}</p>
                <Button asChild>
                  <Link href={`/courses/${course.id}`}>{t("courses.viewCourse")}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
