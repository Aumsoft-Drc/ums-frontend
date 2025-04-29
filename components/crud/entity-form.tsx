"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EntityFormProps {
  title: string
  description?: string
  initialData?: any
  onSubmit: (data: any) => Promise<void>
  backUrl: string
  isNew?: boolean
  children: React.ReactNode
}

export function EntityForm({
  title,
  description,
  initialData,
  onSubmit,
  backUrl,
  isNew = false,
  children,
}: EntityFormProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Collect form data
      const formData = new FormData(e.currentTarget)
      const data: Record<string, any> = {}

      // Convert FormData to object
      formData.forEach((value, key) => {
        // Handle checkboxes
        if (key.endsWith("[]")) {
          const baseKey = key.slice(0, -2)
          if (!data[baseKey]) {
            data[baseKey] = []
          }
          data[baseKey].push(value)
        } else {
          data[key] = value
        }
      })

      await onSubmit(data)

      toast({
        title: isNew ? t("crud.createSuccess") : t("crud.updateSuccess"),
        description: isNew ? t("crud.createSuccessDescription") : t("crud.updateSuccessDescription"),
      })

      router.push(backUrl)
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        variant: "destructive",
        title: isNew ? t("crud.createError") : t("crud.updateError"),
        description: isNew ? t("crud.createErrorDescription") : t("crud.updateErrorDescription"),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="icon" className="mr-4" asChild>
          <Link href={backUrl}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent className="space-y-6">{children}</CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href={backUrl}>{t("common.cancel")}</Link>
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("common.saving")}
                </>
              ) : isNew ? (
                t("common.create")
              ) : (
                t("common.save")
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
