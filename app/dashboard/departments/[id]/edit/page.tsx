"use client"

import type React from "react"

import { useEffect, useState } from "react"
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

interface Department {
  id: string
  name: string
  code: string
  faculty: string
  head: string
  description: string
}

export default function EditDepartmentPage({ params }: { params: { id: string } }) {
  const { t } = useTranslation()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState<Department>({
    id: "",
    name: "",
    code: "",
    faculty: "",
    head: "",
    description: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Dans un environnement réel, vous appelleriez votre API
    // Simulons des données pour la démonstration
    setTimeout(() => {
      setFormData({
        id: params.id,
        name: "Computer Science",
        code: "CS",
        faculty: "Science and Technology",
        head: "Dr. John Smith",
        description:
          "The Department of Computer Science offers programs in various areas of computing, including artificial intelligence, software engineering, and data science.",
      })
      setLoading(false)
    }, 1000)
  }, [params.id])

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
        title: t("departmentUpdated"),
        description: t("departmentUpdatedDescription"),
      })

      router.push(`/dashboard/departments/${params.id}`)
    } catch (error) {
      console.error("Error updating department:", error)
      toast({
        title: t("error"),
        description: t("errorUpdatingDepartment"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back")}
          </Button>
          <h1 className="text-3xl font-bold">{t("loading")}</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("back")}
        </Button>
        <h1 className="text-3xl font-bold">{t("editDepartment")}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>{t("departmentInformation")}</CardTitle>
            <CardDescription>{t("departmentInformationDescription")}</CardDescription>
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
                <Label htmlFor="faculty">{t("faculty")}</Label>
                <Select value={formData.faculty} onValueChange={(value) => handleSelectChange("faculty", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectFaculty")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Science and Technology">{t("scienceAndTechnology")}</SelectItem>
                    <SelectItem value="Arts and Humanities">{t("artsAndHumanities")}</SelectItem>
                    <SelectItem value="Business and Economics">{t("businessAndEconomics")}</SelectItem>
                    <SelectItem value="Health Sciences">{t("healthSciences")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="head">{t("headOfDepartment")}</Label>
                <Input id="head" name="head" value={formData.head} onChange={handleChange} required />
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
