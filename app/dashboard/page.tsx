"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/hooks/use-translation"
import { BarChart, LineChart, PieChart } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface DashboardStats {
  students: number
  instructors: number
  courses: number
  faculties: number
  departments: number
  activeEnrollments: number
  pendingRequests: number
  recentActivities: Array<{ id: string; type: string; description: string; date: string }>
}

export default function DashboardPage() {
  const { t } = useTranslation()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Dans un environnement réel, vous appelleriez votre API
        // const response = await adminService.getDashboardStats()
        // setStats(response.data)

        // Simulons des données pour la démonstration
        setTimeout(() => {
          setStats({
            students: 3245,
            instructors: 187,
            courses: 412,
            faculties: 8,
            departments: 32,
            activeEnrollments: 12876,
            pendingRequests: 43,
            recentActivities: [
              { id: "1", type: "enrollment", description: "New student enrollment", date: "2023-05-15" },
              { id: "2", type: "grade", description: "Grades published for CS101", date: "2023-05-14" },
              { id: "3", type: "payment", description: "Tuition payment received", date: "2023-05-13" },
              { id: "4", type: "course", description: "New course added: Advanced AI", date: "2023-05-12" },
              { id: "5", type: "exam", description: "Final exam scheduled for Math202", date: "2023-05-11" },
            ],
          })
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{t("dashboard")}</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart className="h-4 w-4 mr-2" />
            {t("overview")}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <LineChart className="h-4 w-4 mr-2" />
            {t("analytics")}
          </TabsTrigger>
          <TabsTrigger value="reports">
            <PieChart className="h-4 w-4 mr-2" />
            {t("reports")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("totalStudents")}</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-[100px]" />
                ) : (
                  <div className="text-2xl font-bold">{stats?.students.toLocaleString()}</div>
                )}
                <p className="text-xs text-muted-foreground">
                  +{loading ? "..." : "180"} {t("fromLastMonth")}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("totalInstructors")}</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-[100px]" />
                ) : (
                  <div className="text-2xl font-bold">{stats?.instructors.toLocaleString()}</div>
                )}
                <p className="text-xs text-muted-foreground">
                  +{loading ? "..." : "12"} {t("fromLastMonth")}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("activeCourses")}</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-[100px]" />
                ) : (
                  <div className="text-2xl font-bold">{stats?.courses.toLocaleString()}</div>
                )}
                <p className="text-xs text-muted-foreground">
                  +{loading ? "..." : "24"} {t("fromLastSemester")}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("pendingRequests")}</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-[100px]" />
                ) : (
                  <div className="text-2xl font-bold">{stats?.pendingRequests.toLocaleString()}</div>
                )}
                <p className="text-xs text-muted-foreground">
                  {loading ? "..." : "-8"} {t("fromYesterday")}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>{t("enrollmentOverview")}</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                {loading ? (
                  <Skeleton className="h-[200px] w-full" />
                ) : (
                  <div className="h-[200px] flex items-center justify-center border rounded">
                    <p className="text-muted-foreground">{t("enrollmentChartPlaceholder")}</p>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>{t("recentActivity")}</CardTitle>
                <CardDescription>{t("recentActivityDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    {stats?.recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between">
                        <div className="text-sm">{activity.description}</div>
                        <div className="text-xs text-muted-foreground">{activity.date}</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-7">
              <CardHeader>
                <CardTitle>{t("analyticsOverview")}</CardTitle>
                <CardDescription>{t("analyticsDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[400px] flex items-center justify-center border rounded">
                  <p className="text-muted-foreground">{t("analyticsChartPlaceholder")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-7">
              <CardHeader>
                <CardTitle>{t("reportsOverview")}</CardTitle>
                <CardDescription>{t("reportsDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[400px] flex items-center justify-center border rounded">
                  <p className="text-muted-foreground">{t("reportsChartPlaceholder")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
