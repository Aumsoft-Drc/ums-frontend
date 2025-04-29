"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { EntityDetail } from "@/components/crud/entity-detail"
import { studentService } from "@/services/student-service"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import { createActionsColumn, createSortableHeader } from "@/components/data-table/columns"
import Link from "next/link"

export default function StudentDetailPage() {
  const { t } = useTranslation()
  const params = useParams()
  const { toast } = useToast()
  const studentId = params.id as string

  const [student, setStudent] = useState<any>(null)
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentData = await studentService.getStudentById(studentId)
        setStudent(studentData)

        const enrollmentsData = await studentService.getEnrollments()
        setEnrollments(enrollmentsData)
      } catch (error) {
        console.error("Failed to fetch student data:", error)
        toast({
          variant: "destructive",
          title: t("crud.fetchError"),
          description: t("crud.fetchErrorDescription"),
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchStudentData()
  }, [studentId, toast, t])

  const handleDelete = async (id: string) => {
    try {
      await studentService.deleteStudent(id)
      return Promise.resolve()
    } catch (error) {
      console.error("Failed to delete student:", error)
      return Promise.reject(error)
    }
  }

  const enrollmentColumns = [
    {
      accessorKey: "courseOffering.course.code",
      header: createSortableHeader(t("enrollments.courseCode"), "courseOffering.course.code"),
    },
    {
      accessorKey: "courseOffering.course.name",
      header: t("enrollments.courseName"),
    },
    {
      accessorKey: "enrollmentDate",
      header: t("enrollments.enrollmentDate"),
      cell: ({ row }) => {
        const date = row.getValue("enrollmentDate") as string
        return new Date(date).toLocaleDateString()
      },
    },
    {
      accessorKey: "status",
      header: t("enrollments.status"),
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            className={
              status === "active"
                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
            }
          >
            {status}
          </Badge>
        )
      },
    },
    createActionsColumn({
      onView: (enrollment) => `/dashboard/enrollments/${enrollment.id}`,
    }),
  ]

  if (isLoading || !student) {
    return null // Loading state is handled by EntityDetail
  }

  return (
    <EntityDetail
      title={t("students.details", { name: `${student.firstName} ${student.lastName}` })}
      entity={student}
      entityName={t("students.singular")}
      baseUrl="/dashboard/students"
      onDelete={handleDelete}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-1">
          <div className="flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={student.avatarUrl || "/placeholder.svg"} alt={student.firstName} />
              <AvatarFallback className="text-4xl">
                {student.firstName?.charAt(0)}
                {student.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">
              {student.firstName} {student.lastName}
            </h2>
            <p className="text-muted-foreground">{student.studentId}</p>
            <Badge className="mt-2">{student.status}</Badge>
          </div>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="info">
            <TabsList className="mb-4">
              <TabsTrigger value="info">{t("students.tabs.info")}</TabsTrigger>
              <TabsTrigger value="enrollments">{t("students.tabs.enrollments")}</TabsTrigger>
              <TabsTrigger value="results">{t("students.tabs.results")}</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>{t("students.personalInfo")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">{t("students.email")}</h3>
                      <p>{student.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">{t("students.phone")}</h3>
                      <p>{student.phone || t("common.notProvided")}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">{t("students.dateOfBirth")}</h3>
                      <p>
                        {student.dateOfBirth
                          ? new Date(student.dateOfBirth).toLocaleDateString()
                          : t("common.notProvided")}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">{t("students.gender")}</h3>
                      <p>{student.gender || t("common.notProvided")}</p>
                    </div>
                    <div className="col-span-2">
                      <h3 className="text-sm font-medium text-muted-foreground">{t("students.address")}</h3>
                      <p>{student.address || t("common.notProvided")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>{t("students.academicInfo")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">{t("students.program")}</h3>
                      <p>{student.program?.name || t("common.notProvided")}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">{t("students.cohort")}</h3>
                      <p>{student.cohort?.name || t("common.notProvided")}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">{t("students.enrollmentDate")}</h3>
                      <p>
                        {student.enrollmentDate
                          ? new Date(student.enrollmentDate).toLocaleDateString()
                          : t("common.notProvided")}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        {t("students.expectedGraduationDate")}
                      </h3>
                      <p>
                        {student.expectedGraduationDate
                          ? new Date(student.expectedGraduationDate).toLocaleDateString()
                          : t("common.notProvided")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="enrollments">
              <Card>
                <CardHeader>
                  <CardTitle>{t("students.enrollments")}</CardTitle>
                  <CardDescription>
                    {t("students.enrollmentsDescription", { count: enrollments.length })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable columns={enrollmentColumns} data={enrollments} searchKey="courseOffering.course.name" />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results">
              <Card>
                <CardHeader>
                  <CardTitle>{t("students.results")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <Button asChild>
                      <Link href={`/dashboard/students/${studentId}/transcripts`}>{t("students.viewTranscripts")}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </EntityDetail>
  )
}
