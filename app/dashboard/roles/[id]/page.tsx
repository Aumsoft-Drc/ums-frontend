"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import { ArrowLeft, Edit, Trash2, Shield } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { fetchRoleById, deleteRole, getRolePermissions } from "@/redux/slices/role-slice"
import type { RootState, AppDispatch } from "@/redux/store"

export default function RoleDetailPage({ params }: { params: { id: string } }) {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedItem: role, loading, error } = useSelector((state: RootState) => state.roles)
  const [permissions, setPermissions] = useState<any[]>([])
  const [loadingPermissions, setLoadingPermissions] = useState(false)

  useEffect(() => {
    dispatch(fetchRoleById(params.id))

    // Charger les permissions du rôle
    const loadPermissions = async () => {
      setLoadingPermissions(true)
      try {
        const resultAction = await dispatch(getRolePermissions(params.id))
        if (getRolePermissions.fulfilled.match(resultAction)) {
          setPermissions(resultAction.payload)
        }
      } catch (error) {
        console.error("Failed to load permissions:", error)
      } finally {
        setLoadingPermissions(false)
      }
    }

    loadPermissions()
  }, [dispatch, params.id])

  const handleDelete = async () => {
    try {
      await dispatch(deleteRole(params.id)).unwrap()
      router.push("/dashboard/roles")
    } catch (error) {
      console.error("Failed to delete role:", error)
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

  if (error || !role) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back")}
          </Button>
          <h1 className="text-3xl font-bold">{t("roleNotFound")}</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <p>{error || t("roleNotFoundDescription")}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/dashboard/roles")}>{t("backToRoles")}</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back")}
          </Button>
          <h1 className="text-3xl font-bold">{role.name}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/dashboard/roles/${params.id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            {t("edit")}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                {t("delete")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("deleteRole")}</AlertDialogTitle>
                <AlertDialogDescription>{t("deleteRoleConfirmation")}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>{t("delete")}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>{t("roleInfo")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">{t("id")}</h3>
                <p>{role.id}</p>
              </div>
              <div>
                <h3 className="font-medium">{t("name")}</h3>
                <p>{role.name}</p>
              </div>
              <div>
                <h3 className="font-medium">{t("description")}</h3>
                <p>{role.description}</p>
              </div>
              <div>
                <h3 className="font-medium">{t("totalPermissions")}</h3>
                <p>{permissions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t("roleDetails")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="permissions">
              <TabsList className="mb-4">
                <TabsTrigger value="permissions">
                  <Shield className="mr-2 h-4 w-4" />
                  {t("permissions")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="permissions">
                {loadingPermissions ? (
                  <div className="flex justify-center p-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {permissions.length === 0 ? (
                      <p>{t("noPermissionsAssigned")}</p>
                    ) : (
                      permissions.map((permission) => (
                        <div key={permission.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold">{permission.name}</h3>
                              <p className="text-sm text-muted-foreground">{permission.code}</p>
                              <p className="mt-1">{permission.description}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
