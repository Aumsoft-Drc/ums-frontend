"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { login } from "@/redux/slices/auth-slice"
import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { authService } from "@/services/auth-service"
import Link from "next/link"

export default function LoginPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await authService.login(formData)
      dispatch(login(response))

      toast({
        title: t("login.success"),
        description: t("login.welcomeBack"),
      })

      // Redirect based on user role
      if (response.user.roles.includes("ADMIN")) {
        router.push("/admin-dashboard")
      } else if (response.user.roles.includes("INSTRUCTOR")) {
        router.push("/instructor-dashboard")
      } else {
        router.push("/student-dashboard")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("login.failed"),
        description: t("login.invalidCredentials"),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{t("login.title")}</CardTitle>
          <CardDescription>{t("login.subtitle")}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t("login.username")}</Label>
              <Input
                id="username"
                name="username"
                placeholder={t("login.usernamePlaceholder")}
                required
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t("login.password")}</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  {t("login.forgotPassword")}
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={t("login.passwordPlaceholder")}
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t("common.loading") : t("login.signIn")}
            </Button>
            <div className="text-center text-sm">
              {t("login.noAccount")}{" "}
              <Link href="/register" className="text-primary hover:underline">
                {t("login.createAccount")}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
