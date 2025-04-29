"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { EntityForm } from "@/components/crud/entity-form"
import { studentService } from "@/services/student-service"
import { programService } from "@/services/program-service"
import { cohortService } from "@/services/cohort-service"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export default function EditStudentPage() {
  const { t } = useTranslation()
  const params = useParams()
  const { toast } = useToast()
  const studentId = params.id as string

  const [student, setStudent] = useState<any>(null)
  const [programs, setPrograms] = useState<any[]>([])
  const [cohorts, setCohorts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentData, programsData, cohortsData] = await Promise.all([
          studentService.getStudentById(studentId),
          programService.getAllPrograms(),
          cohortService.getAllCohorts(),
        ])
        setStudent(studentData)
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
  }, [studentId, toast, t])

  const handleSubmit = async (data: any) => {
    return studentService.updateStudent(studentId, data)
  }

  if (isLoading || !student) {
    return null // Loading state is handled by EntityForm
  }

  // Format dates for input fields
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  }

  return (
    <EntityForm
      title={t("students.edit", { name: `${student.firstName} ${student.lastName}` })}
      description={t("students.editDescription")}
      initialData={student}
      onSubmit={handleSubmit}
      backUrl={`/dashboard/students/${studentId}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">{t("students.firstName")}</Label>
          <Input id="firstName" name="firstName" defaultValue={student.firstName} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">{t("students.lastName")}</Label>
          <Input id="lastName" name="lastName" defaultValue={student.lastName} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t("students.email")}</Label>
        <Input id="email" name="email" type="email" defaultValue={student.email} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="studentId">{t("students.studentId")}</Label>
          <Input id="studentId" name="studentId" defaultValue={student.studentId} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{t("students.phone")}</Label>
          <Input id="phone" name="phone" defaultValue={student.phone} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">{t("students.dateOfBirth")}</Label>
          <Input id="dateOfBirth" name="dateOfBirth" type="date" defaultValue={formatDate(student.dateOfBirth)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">{t("students.gender")}</Label>
          <Select name="gender" defaultValue={student.gender}>
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
        <Input id="address" name="address" defaultValue={student.address} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="programId">{t("students.program")}</Label>
          <Select name="programId" defaultValue={student.program?.id}>
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
          <Select name="cohortId" defaultValue={student.cohort?.id}>
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
          <Input
            id="enrollmentDate"
            name="enrollmentDate"
            type="date"
            defaultValue={formatDate(student.enrollmentDate)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expectedGraduationDate">{t("students.expectedGraduationDate")}</Label>
          <Input
            id="expectedGraduationDate"
            name="expectedGraduationDate"
            type="date"
            defaultValue={formatDate(student.expectedGraduationDate)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">{t("students.status")}</Label>
        <Select name="status" defaultValue={student.status}>
          <SelectTrigger>
            <SelectValue placeholder={t("students.selectStatus")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">{t("students.statusActive")}</SelectItem>
            <SelectItem value="inactive">{t("students.statusInactive")}</SelectItem>
            <SelectItem value="suspended">{t("students.statusSuspended")}</SelectItem>
            <SelectItem value="graduated">{t("students.statusGraduated")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </EntityForm>
  )
}
