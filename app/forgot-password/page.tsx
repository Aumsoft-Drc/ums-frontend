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
import { Loader2 } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { toast } = useToast()

  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await authService.forgotPassword(email)
      setIsSubmitted(true)
      toast({
        title: t("forgotPassword.success"),
        description: t("forgotPassword.emailSent"),
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("forgotPassword.error"),
        description: t("forgotPassword.emailError"),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{t("forgotPassword.title")}</CardTitle>
          <CardDescription>{t("forgotPassword.subtitle")}</CardDescription>
        </CardHeader>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("forgotPassword.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("forgotPassword.emailPlaceholder")}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("common.loading")}
                  </>
                ) : (
                  t("forgotPassword.resetPassword")
                )}
              </Button>
              <div className="text-center text-sm">
                <Link href="/login" className="text-primary hover:underline">
                  {t("forgotPassword.backToLogin")}
                </Link>
              </div>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-4">
            <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-400">
                    {t("forgotPassword.checkEmail")}
                  </h3>
                  <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                    <p>{t("forgotPassword.resetInstructions")}</p>
                  </div>
                </div>
              </div>
            </div>
            <Button asChild className="w-full">
              <Link href="/login">{t("forgotPassword.backToLogin")}</Link>
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
