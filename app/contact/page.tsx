"use client"

import type React from "react"

import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const { t } = useTranslation()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: t("contact.success"),
        description: t("contact.messageSent"),
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">{t("contact.title")}</h1>
      <p className="text-xl text-muted-foreground mb-10">{t("contact.subtitle")}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("contact.form.title")}</CardTitle>
              <CardDescription>{t("contact.form.description")}</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("contact.form.name")}</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder={t("contact.form.namePlaceholder")}
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("contact.form.email")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t("contact.form.emailPlaceholder")}
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">{t("contact.form.subject")}</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder={t("contact.form.subjectPlaceholder")}
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t("contact.form.message")}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t("contact.form.messagePlaceholder")}
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("common.loading")}
                    </>
                  ) : (
                    t("contact.form.submit")
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t("contact.info.title")}</CardTitle>
              <CardDescription>{t("contact.info.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">{t("contact.info.address.title")}</h3>
                  <p className="text-muted-foreground mt-1">{t("contact.info.address.line1")}</p>
                  <p className="text-muted-foreground">{t("contact.info.address.line2")}</p>
                  <p className="text-muted-foreground">{t("contact.info.address.line3")}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">{t("contact.info.email.title")}</h3>
                  <p className="text-muted-foreground mt-1">info@university.edu</p>
                  <p className="text-muted-foreground">admissions@university.edu</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">{t("contact.info.phone.title")}</h3>
                  <p className="text-muted-foreground mt-1">{t("contact.info.phone.main")}: +1 (555) 123-4567</p>
                  <p className="text-muted-foreground">{t("contact.info.phone.admissions")}: +1 (555) 123-4568</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{t("contact.hours.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{t("contact.hours.monday")}</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("contact.hours.tuesday")}</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("contact.hours.wednesday")}</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("contact.hours.thursday")}</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("contact.hours.friday")}</span>
                  <span>8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("contact.hours.saturday")}</span>
                  <span>10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("contact.hours.sunday")}</span>
                  <span>{t("contact.hours.closed")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
