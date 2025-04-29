"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "@/hooks/use-translation"
import { usePermissions } from "@/hooks/use-permissions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { AppDispatch, RootState } from "@/redux/store"
import { Skeleton } from "@/components/ui/skeleton"

interface GenericDetailPageProps<T> {
  title: string
  description?: string
  entityName: string
  basePath: string
  id: string
  fetchAction: any
  deleteAction: any
  selector: (state: RootState) => { selectedItem: T | null; loading: boolean; error: string | null }
  renderDetails: (item: T) => React.ReactNode
  resourceName: string
}

export function GenericDetailPage<T extends { id: string }>({
  title,
  description,
  entityName,
  basePath,
  id,
  fetchAction,
  deleteAction,
  selector,
  renderDetails,
  resourceName,
}: GenericDetailPageProps<T>) {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedItem, loading, error } = useSelector(selector)
  const { canView, canEdit, canDelete } = usePermissions()

  useEffect(() => {
    if (canView(resourceName)) {
      dispatch(fetchAction(id))
    }
  }, [dispatch, fetchAction, id, canView, resourceName])

  const handleDelete = async () => {
    if (window.confirm(t("confirmDelete", { entity: entityName }))) {
      try {
        await dispatch(deleteAction(id)).unwrap()
        router.push(basePath)
      } catch (error) {
        console.error("Delete error:", error)
      }
    }
  }

  if (!canView(resourceName)) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">{t("accessDenied")}</h1>
        <p>{t("noPermissionToView", { resource: entityName })}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="outline" size="icon" className="mr-4" asChild>
            <Link href={basePath}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
        {selectedItem && (
          <div className="flex gap-2">
            {canEdit(resourceName) && (
              <Button variant="outline" asChild>
                <Link href={`${basePath}/${id}/edit`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  {t("edit")}
                </Link>
              </Button>
            )}
            {canDelete(resourceName) && (
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                {t("delete")}
              </Button>
            )}
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-6 w-full" />
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : selectedItem ? (
            renderDetails(selectedItem)
          ) : (
            <div>{t("itemNotFound", { entity: entityName })}</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
