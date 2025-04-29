"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useTranslation } from "@/hooks/use-translation"
import { ArrowLeft, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { fetchRoleById, updateRole, getRolePermissions } from "@/redux/slices/role-slice"
import { fetchAllPermissions } from "@/redux/slices/permission-slice"
import type { RootState, AppDispatch } from "@/redux/store"
import { Checkbox } from "@/components/ui/checkbox"

export default function EditRolePage({ params }: { params: { id: string } }) {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { toast } = useToast()
  const { selectedItem: role, loading, error } = useSelector((state: RootState) => state.roles)
  const { permissions } = useSelector((state: RootState) => state.permissions)

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    permissions: [] as string[],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadingPermissions, setLoadingPermissions] = useState(false)

  useEffect(() => {
    dispatch(fetchRoleById(params.id))
    dispatch(fetchAllPermissions())

    // Charger les permissions du rôle
    const loadPermissions = async () => {
      setLoadingPermissions(true)
      try {
        const resultAction = await dispatch(getRolePermissions(params.id))
        if (getRolePermissions.fulfilled.match(resultAction)) {
          const rolePermissions = resultAction.payload.map((p: any) => p.id)
          setFormData((prev) => ({ ...prev, permissions: rolePermissions }))
        }
      } catch (error) {
        console.error("Failed to load permissions:", error)
      } finally {
        setLoadingPermissions(false)
      }
    }

    loadPermissions()
  }, [dispatch, params.id])

  useEffect(() => {
    if (role) {
      setFormData((prev) => ({
        ...prev,
        id: role.id,
        name: role.name,
        description: role.description,
      }))
    }
  }, [role])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: checked ? [...prev.permissions, permissionId] : prev.permissions.filter((id) => id !== permissionId),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await dispatch(updateRole({ id: params.id, ...formData })).unwrap()

      toast({
        title: t("roleUpdated"),
        description: t("roleUpdatedDescription"),
      })

      router.push(`/dashboard/roles/${params.id}`)
    } catch (error: any) {
      console.error("Error updating role:", error)
      toast({
        title: t("error"),
        description: error.message || t("errorUpdatingRole"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading || loadingPermissions) {
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
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("back")}
        </Button>
        <h1 className="text-3xl font-bold">{t("editRole")}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>{t("roleInformation")}</CardTitle>
            <CardDescription>{t("roleInformationDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("name")}</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">{t("description")}</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>{t("permissions")}</Label>
              <div className="border rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`permission-${permission.id}`}
                        checked={formData.permissions.includes(permission.id)}
                        onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                      />
                      <Label htmlFor={`permission-${permission.id}`} className="cursor-pointer">
                        {permission.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
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
