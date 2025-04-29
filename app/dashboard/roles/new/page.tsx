"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { createRole } from "@/redux/slices/role-slice"
import { fetchAllPermissions } from "@/redux/slices/permission-slice"
import type { RootState, AppDispatch } from "@/redux/store"
import { Checkbox } from "@/components/ui/checkbox"

export default function NewRolePage() {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { toast } = useToast()
  const { permissions } = useSelector((state: RootState) => state.permissions)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    dispatch(fetchAllPermissions())
  }, [dispatch])

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
      await dispatch(createRole(formData)).unwrap()

      toast({
        title: t("roleCreated"),
        description: t("roleCreatedDescription"),
      })

      router.push("/dashboard/roles")
    } catch (error: any) {
      console.error("Error creating role:", error)
      toast({
        title: t("error"),
        description: error.message || t("errorCreatingRole"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("back")}
        </Button>
        <h1 className="text-3xl font-bold">{t("newRole")}</h1>
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
