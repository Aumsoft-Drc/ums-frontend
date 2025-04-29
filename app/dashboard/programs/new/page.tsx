"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "@/hooks/use-translation"
import { ArrowLeft, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function NewProgramPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    department: "",
    level: "",
    duration: "",
    description: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Dans un environnement réel, vous appelleriez votre API
      // Simulons une soumission pour la démonstration
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: t("programCreated"),
        description: t("programCreatedDescription"),
      })

      router.push("/dashboard/programs")
    } catch (error) {
      console.error("Error creating program:", error)
      toast({
        title: t("error"),
        description: t("errorCreatingProgram"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("back")}
        </Button>
        <h1 className="text-3xl font-bold">{t("newProgram")}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>{t("programInformation")}</CardTitle>
            <CardDescription>{t("programInformationDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("name")}</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">{t("code")}</Label>
                <Input id="code" name="code" value={formData.code} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">{t("department")}</Label>
                <Select value={formData.department} onValueChange={(value) => handleSelectChange("department", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectDepartment")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Science">{t("computerScience")}</SelectItem>
                    <SelectItem value="Mathematics">{t("mathematics")}</SelectItem>
                    <SelectItem value="Physics">{t("physics")}</SelectItem>
                    <SelectItem value="Biology">{t("biology")}</SelectItem>
                    <SelectItem value="Chemistry">{t("chemistry")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">{t("level")}</Label>
                <Select value={formData.level} onValueChange={(value) => handleSelectChange("level", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectLevel")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Undergraduate">{t("undergraduate")}</SelectItem>
                    <SelectItem value="Graduate">{t("graduate")}</SelectItem>
                    <SelectItem value="Doctorate">{t("doctorate")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">{t("duration")}</Label>
                <Select value={formData.duration} onValueChange={(value) => handleSelectChange("duration", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectDuration")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 year">{t("1year")}</SelectItem>
                    <SelectItem value="2 years">{t("2years")}</SelectItem>
                    <SelectItem value="3 years">{t("3years")}</SelectItem>
                    <SelectItem value="4 years">{t("4years")}</SelectItem>
                    <SelectItem value="5 years">{t("5years")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">{t("description")}</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  {t("saving")}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {t("save")}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
