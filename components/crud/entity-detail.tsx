"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Pencil, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EntityDetailProps {
  title: string
  description?: string
  entity: any
  entityName: string
  baseUrl: string
  onDelete?: (id: string) => Promise<void>
  children: React.ReactNode
}

export function EntityDetail({
  title,
  description,
  entity,
  entityName,
  baseUrl,
  onDelete,
  children,
}: EntityDetailProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!onDelete) return

    if (window.confirm(t("crud.confirmDelete", { entity: entityName }))) {
      setIsDeleting(true)
      try {
        await onDelete(entity.id)
        toast({
          title: t("crud.deleteSuccess"),
          description: t("crud.deleteSuccessDescription", { entity: entityName }),
        })
        router.push(baseUrl)
      } catch (error) {
        console.error("Delete error:", error)
        toast({
          variant: "destructive",
          title: t("crud.deleteError"),
          description: t("crud.deleteErrorDescription"),
        })
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="outline" size="icon" className="mr-4" asChild>
            <Link href={baseUrl}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`${baseUrl}/${entity.id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              {t("common.edit")}
            </Link>
          </Button>
          {onDelete && (
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              <Trash2 className="mr-2 h-4 w-4" />
              {isDeleting ? t("common.deleting") : t("common.delete")}
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <Button variant="outline" asChild>
            <Link href={baseUrl}>{t("common.back")}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
