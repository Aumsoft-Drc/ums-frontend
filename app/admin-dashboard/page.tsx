"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "@/hooks/use-translation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, BookOpen, School, Building } from "lucide-react"
import Link from "next/link"
import type { RootState } from "@/redux/store"

export default function AdminDashboard() {
  const { t } = useTranslation()
  const { user } = useSelector((state: RootState) => state.auth)

  const [stats, setStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll simulate with mock data
        setStats({
          totalStudents: 1250,
          totalInstructors: 85,
          totalCourses: 120,
          totalPrograms: 15,
          recentUsers: [
            { id: "1", name: "John Doe", email: "john.doe@example.com", role: "STUDENT", createdAt: "2025-04-25" },
            {
              id: "2",
              name: "Jane Smith",
              email: "jane.smith@example.com",
              role: "INSTRUCTOR",
              createdAt: "2025-04-24",
            },
            {
              id: "3",
              name: "Robert Johnson",
              email: "robert.j@example.com",
              role: "STUDENT",
              createdAt: "2025-04-23",
            },
          ],
          recentCourses: [
            { id: "1", name: "Introduction to Computer Science", code: "CS101", department: "Computer Science" },
            { id: "2", name: "Calculus I", code: "MATH101", department: "Mathematics" },
            { id: "3", name: "Introduction to Psychology", code: "PSY101", department: "Psychology" },
          ],
        })
      } catch (error) {
        console.error("Failed to fetch admin data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAdminData()
  }, [])

  if (isLoading) {
    return (
      <div className="container py-10">
        <Skeleton className="h-12 w-3/4 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-[400px] mt-6" />
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">{t("adminDashboard.welcome", { name: user?.firstName })}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t("adminDashboard.totalStudents")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalStudents}</div>
            <Button asChild variant="link" className="p-0">
              <Link href="/admin-dashboard/students">{t("adminDashboard.manageStudents")}</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t("adminDashboard.totalInstructors")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalInstructors}</div>
            <Button asChild variant="link" className="p-0">
              <Link href="/admin-dashboard/instructors">{t("adminDashboard.manageInstructors")}</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t("adminDashboard.totalCourses")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalCourses}</div>
            <Button asChild variant="link" className="p-0">
              <Link href="/admin-dashboard/courses">{t("adminDashboard.manageCourses")}</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t("adminDashboard.totalPrograms")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalPrograms}</div>
            <Button asChild variant="link" className="p-0">
              <Link href="/admin-dashboard/programs">{t("adminDashboard.managePrograms")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">{t("adminDashboard.tabs.overview")}</TabsTrigger>
          <TabsTrigger value="users">{t("adminDashboard.tabs.users")}</TabsTrigger>
          <TabsTrigger value="courses">{t("adminDashboard.tabs.courses")}</TabsTrigger>
          <TabsTrigger value="reports">{t("adminDashboard.tabs.reports")}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("adminDashboard.recentUsers")}</CardTitle>
                <CardDescription>{t("adminDashboard.recentlyAddedUsers")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recentUsers.map((user: any) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-muted-foreground mr-4">{user.role}</span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin-dashboard/users/${user.id}`}>{t("common.view")}</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button asChild variant="outline" className="w-full mt-4">
                  <Link href="/admin-dashboard/users">{t("adminDashboard.viewAllUsers")}</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("adminDashboard.recentCourses")}</CardTitle>
                <CardDescription>{t("adminDashboard.recentlyAddedCourses")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recentCourses.map((course: any) => (
                    <div key={course.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{course.name}</p>
                        <p className="text-sm text-muted-foreground">{course.code}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-muted-foreground mr-4">{course.department}</span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin-dashboard/courses/${course.id}`}>{t("common.view")}</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button asChild variant="outline" className="w-full mt-4">
                  <Link href="/admin-dashboard/courses">{t("adminDashboard.viewAllCourses")}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{t("adminDashboard.userManagement")}</h2>
            <Button asChild>
              <Link href="/admin-dashboard/users/new">{t("adminDashboard.createUser")}</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  {t("adminDashboard.students")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/admin-dashboard/students">{t("adminDashboard.manageStudents")}</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  {t("adminDashboard.instructors")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/admin-dashboard/instructors">{t("adminDashboard.manageInstructors")}</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  {t("adminDashboard.staff")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/admin-dashboard/staff">{t("adminDashboard.manageStaff")}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{t("adminDashboard.courseManagement")}</h2>
            <Button asChild>
              <Link href="/admin-dashboard/courses/new">{t("adminDashboard.createCourse")}</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  {t("adminDashboard.courses")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/admin-dashboard/courses">{t("adminDashboard.manageCourses")}</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <School className="mr-2 h-5 w-5" />
                  {t("adminDashboard.programs")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/admin-dashboard/programs">{t("adminDashboard.managePrograms")}</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  {t("adminDashboard.departments")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/admin-dashboard/departments">{t("adminDashboard.manageDepartments")}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{t("adminDashboard.reports")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("adminDashboard.enrollmentReports")}</CardTitle>
                <CardDescription>{t("adminDashboard.enrollmentReportsDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/admin-dashboard/reports/enrollment">{t("adminDashboard.generateReport")}</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t("adminDashboard.academicReports")}</CardTitle>
                <CardDescription>{t("adminDashboard.academicReportsDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/admin-dashboard/reports/academic">{t("adminDashboard.generateReport")}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
