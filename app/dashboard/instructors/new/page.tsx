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

export default function NewInstructorPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    specialization: "",
    status: "Active",
    bio: "",
    joinDate: new Date().toISOString().split("T")[0],
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
        title: t("instructorCreated"),
        description: t("instructorCreatedDescription"),
      })

      router.push("/dashboard/instructors")
    } catch (error) {
      console.error("Error creating instructor:", error)
      toast({
        title: t("error"),
        description: t("errorCreatingInstructor"),
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
        <h1 className="text-3xl font-bold">{t("newInstructor")}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>{t("instructorInformation")}</CardTitle>
            <CardDescription>{t("instructorInformationDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("name")}</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">{t("department")}</Label>
                <Input id="department" name="department" value={formData.department} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">{t("specialization")}</Label>
                <Input
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">{t("status")}</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectStatus")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">{t("active")}</SelectItem>
                    <SelectItem value="On Leave">{t("onLeave")}</SelectItem>
                    <SelectItem value="Retired">{t("retired")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="joinDate">{t("joinDate")}</Label>
                <Input
                  id="joinDate"
                  name="joinDate"
                  type="date"
                  value={formData.joinDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">{t("biography")}</Label>
              <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={5} />
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
