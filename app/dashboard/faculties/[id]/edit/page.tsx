"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { EntityForm } from "@/components/crud/entity-form"
import { facultyService } from "@/services/faculty-service"
import { adminService } from "@/services/admin-service"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function EditFacultyPage() {
  const { t } = useTranslation()
  const params = useParams()
  const { toast } = useToast()
  const facultyId = params.id as string

  const [faculty, setFaculty] = useState<any>(null)
  const [instructors, setInstructors] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [facultyData, instructorsData] = await Promise.all([
          facultyService.getFacultyById(facultyId),
          adminService.getAllUsers({ role: "INSTRUCTOR" }),
        ])
        setFaculty(facultyData)
        setInstructors(instructorsData)
      } catch (error) {
        console.error("Failed to fetch data:", error)
        toast({
          variant: "destructive",
          title: t("crud.fetchError"),
          description: t("crud.fetchErrorDescription"),
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [facultyId, toast, t])

  const handleSubmit = async (data: any) => {
    return facultyService.updateFaculty(facultyId, data)
  }

  if (isLoading || !faculty) {
    return null // Loading state is handled by EntityForm
  }

  return (
    <EntityForm
      title={t("faculties.edit", { name: faculty.name })}
      description={t("faculties.editDescription")}
      initialData={faculty}
      onSubmit={handleSubmit}
      backUrl={`/dashboard/faculties/${facultyId}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">{t("faculties.name")}</Label>
          <Input id="name" name="name" defaultValue={faculty.name} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="code">{t("faculties.code")}</Label>
          <Input id="code" name="code" defaultValue={faculty.code} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="deanId">{t("faculties.dean")}</Label>
        <Select name="deanId" defaultValue={faculty.dean?.id}>
          <SelectTrigger>
            <SelectValue placeholder={t("faculties.selectDean")} />
          </SelectTrigger>
          <SelectContent>
            {instructors.map((instructor) => (
              <SelectItem key={instructor.id} value={instructor.id}>
                {`${instructor.firstName} ${instructor.lastName}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{t("faculties.description")}</Label>
        <Textarea id="description" name="description" rows={4} defaultValue={faculty.description} />
      </div>
    </EntityForm>
  )
}
