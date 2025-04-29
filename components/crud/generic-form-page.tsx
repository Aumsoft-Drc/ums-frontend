"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "@/hooks/use-translation"
import { usePermissions } from "@/hooks/use-permissions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { AppDispatch, RootState } from "@/redux/store"
import { useToast } from "@/components/ui/use-toast"

interface GenericFormPageProps<T> {
  title: string
  description?: string
  entityName: string
  basePath: string
  id?: string
  fetchAction?: any
  createAction: any
  updateAction: any
  selector: (state: RootState) => { selectedItem: T | null; loading: boolean; error: string | null }
  renderForm: (item: Partial<T>, isNew: boolean) => React.ReactNode
  resourceName: string
  defaultValues: Partial<T>
}

export function GenericFormPage<T extends { id: string }>({
  title,
  description,
  entityName,
  basePath,
  id,
  fetchAction,
  createAction,
  updateAction,
  selector,
  renderForm,
  resourceName,
  defaultValues,
}: GenericFormPageProps<T>) {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedItem, loading, error } = useSelector(selector)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { canCreate, canEdit } = usePermissions()
  const isNew = !id

  useEffect(() => {
    if (!isNew && fetchAction && canEdit(resourceName)) {
      dispatch(fetchAction(id))
    }
  }, [dispatch, fetchAction, id, isNew, canEdit, resourceName])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

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

      if (isNew) {
        await dispatch(createAction(data)).unwrap()
        toast({
          title: t("createSuccess"),
          description: t("createSuccessDescription", { entity: entityName }),
        })
      } else {
        await dispatch(updateAction({ id, data })).unwrap()
        toast({
          title: t("updateSuccess"),
          description: t("updateSuccessDescription", { entity: entityName }),
        })
      }

      router.push(basePath)
    } catch (error: any) {
      console.error("Form submission error:", error)
      toast({
        variant: "destructive",
        title: isNew ? t("createError") : t("updateError"),
        description: error.message || t("genericError"),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if ((isNew && !canCreate(resourceName)) || (!isNew && !canEdit(resourceName))) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">{t("accessDenied")}</h1>
        <p>
          {isNew
            ? t("noPermissionToCreate", { resource: entityName })
            : t("noPermissionToEdit", { resource: entityName })}
        </p>
      </div>
    )
  }

  const formData = isNew ? defaultValues : selectedItem || defaultValues

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="icon" className="mr-4" asChild>
          <Link href={basePath}>
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
          <CardContent className="space-y-6">
            {!isNew && loading ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              renderForm(formData, isNew)
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href={basePath}>{t("cancel")}</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting || (!isNew && loading)}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("saving")}
                </>
              ) : isNew ? (
                t("create")
              ) : (
                t("save")
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
