"use client"

import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { EntityForm } from "@/components/crud/entity-form"
import { studentService } from "@/services/student-service"
import { programService } from "@/services/program-service"
import { cohortService } from "@/services/cohort-service"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react"

export default function NewStudentPage() {
  const { t } = useTranslation()
  const { toast } = useToast()

  const [programs, setPrograms] = useState<any[]>([])
  const [cohorts, setCohorts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [programsData, cohortsData] = await Promise.all([
          programService.getAllPrograms(),
          cohortService.getAllCohorts(),
        ])
        setPrograms(programsData)
        setCohorts(cohortsData)
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
  }, [toast, t])

  const handleSubmit = async (data: any) => {
    return studentService.createStudent(data)
  }

  if (isLoading) {
    return null // Loading state is handled by EntityForm
  }

  return (
    <EntityForm
      title={t("students.create")}
      description={t("students.createDescription")}
      onSubmit={handleSubmit}
      backUrl="/dashboard/students"
      isNew={true}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">{t("students.firstName")}</Label>
          <Input id="firstName" name="firstName" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">{t("students.lastName")}</Label>
          <Input id="lastName" name="lastName" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t("students.email")}</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="studentId">{t("students.studentId")}</Label>
          <Input id="studentId" name="studentId" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{t("students.phone")}</Label>
          <Input id="phone" name="phone" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">{t("students.dateOfBirth")}</Label>
          <Input id="dateOfBirth" name="dateOfBirth" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">{t("students.gender")}</Label>
          <Select name="gender">
            <SelectTrigger>
              <SelectValue placeholder={t("students.selectGender")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">{t("students.genderMale")}</SelectItem>
              <SelectItem value="female">{t("students.genderFemale")}</SelectItem>
              <SelectItem value="other">{t("students.genderOther")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">{t("students.address")}</Label>
        <Input id="address" name="address" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="programId">{t("students.program")}</Label>
          <Select name="programId">
            <SelectTrigger>
              <SelectValue placeholder={t("students.selectProgram")} />
            </SelectTrigger>
            <SelectContent>
              {programs.map((program) => (
                <SelectItem key={program.id} value={program.id}>
                  {program.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cohortId">{t("students.cohort")}</Label>
          <Select name="cohortId">
            <SelectTrigger>
              <SelectValue placeholder={t("students.selectCohort")} />
            </SelectTrigger>
            <SelectContent>
              {cohorts.map((cohort) => (
                <SelectItem key={cohort.id} value={cohort.id}>
                  {cohort.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="enrollmentDate">{t("students.enrollmentDate")}</Label>
          <Input id="enrollmentDate" name="enrollmentDate" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expectedGraduationDate">{t("students.expectedGraduationDate")}</Label>
          <Input id="expectedGraduationDate" name="expectedGraduationDate" type="date" />
        </div>
      </div>
    </EntityForm>
  )
}
