"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { authService } from "@/services/auth-service"
import Link from "next/link"

export default function RegisterPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: t("register.error"),
        description: t("register.passwordMismatch"),
      })
      return
    }

    setIsLoading(true)

    try {
      await authService.register(formData)

      toast({
        title: t("register.success"),
        description: t("register.accountCreated"),
      })

      router.push("/login")
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("register.error"),
        description: t("register.registrationFailed"),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{t("register.title")}</CardTitle>
          <CardDescription>{t("register.subtitle")}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t("register.firstName")}</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder={t("register.firstNamePlaceholder")}
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t("register.lastName")}</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder={t("register.lastNamePlaceholder")}
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">{t("register.username")}</Label>
              <Input
                id="username"
                name="username"
                placeholder={t("register.usernamePlaceholder")}
                required
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("register.email")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t("register.emailPlaceholder")}
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("register.password")}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={t("register.passwordPlaceholder")}
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t("register.confirmPassword")}</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder={t("register.confirmPasswordPlaceholder")}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t("common.loading") : t("register.createAccount")}
            </Button>
            <div className="text-center text-sm">
              {t("register.alreadyHaveAccount")}{" "}
              <Link href="/login" className="text-primary hover:underline">
                {t("register.signIn")}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
