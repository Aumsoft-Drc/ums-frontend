"use client"

import { useTranslation } from "@/hooks/use-translation"
import { EntityForm } from "@/components/crud/entity-form"
import { facultyService } from "@/services/faculty-service"
import { adminService } from "@/services/admin-service"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"

export default function NewFacultyPage() {
  const { t } = useTranslation()
  const { toast } = useToast()

  const [instructors, setInstructors] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        // Get all users with INSTRUCTOR role
        const users = await adminService.getAllUsers({ role: "INSTRUCTOR" })
        setInstructors(users)
      } catch (error) {
        console.error("Failed to fetch instructors:", error)
        toast({
          variant: "destructive",
          title: t("crud.fetchError"),
          description: t("crud.fetchErrorDescription"),
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchInstructors()
  }, [toast, t])

  const handleSubmit = async (data: any) => {
    return facultyService.createFaculty(data)
  }

  if (isLoading) {
    return null // Loading state is handled by EntityForm
  }

  return (
    <EntityForm
      title={t("faculties.create")}
      description={t("faculties.createDescription")}
      onSubmit={handleSubmit}
      backUrl="/dashboard/faculties"
      isNew={true}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">{t("faculties.name")}</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="code">{t("faculties.code")}</Label>
          <Input id="code" name="code" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="deanId">{t("faculties.dean")}</Label>
        <Select name="deanId">
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
        <Textarea id="description" name="description" rows={4} />
      </div>
    </EntityForm>
  )
}
