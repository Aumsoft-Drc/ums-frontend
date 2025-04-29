"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { adminService } from "@/services/admin-service"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditUserPage() {
  const { t } = useTranslation()
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const userId = params.id as string

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  })

  const [roles, setRoles] = useState({
    ADMIN: false,
    INSTRUCTOR: false,
    STUDENT: false,
    STAFF: false,
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await adminService.getUserById(userId)
        setFormData({
          username: data.username || "",
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        })

        // Set roles
        const userRoles = data.roles || []
        setRoles({
          ADMIN: userRoles.includes("ADMIN"),
          INSTRUCTOR: userRoles.includes("INSTRUCTOR"),
          STUDENT: userRoles.includes("STUDENT"),
          STAFF: userRoles.includes("STAFF"),
        })
      } catch (error) {
        console.error("Failed to fetch user:", error)
        toast({
          variant: "destructive",
          title: t("users.fetchError"),
          description: t("users.fetchErrorDescription"),
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [userId, toast, t])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (role: keyof typeof roles) => {
    setRoles((prev) => ({ ...prev, [role]: !prev[role] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const selectedRoles = Object.entries(roles)
      .filter(([_, isSelected]) => isSelected)
      .map(([role]) => role)

    if (selectedRoles.length === 0) {
      toast({
        variant: "destructive",
        title: t("users.noRoles"),
        description: t("users.noRolesDescription"),
      })
      return
    }

    setIsSaving(true)

    try {
      const userData = {
        ...formData,
        roles: selectedRoles,
      }
      await adminService.updateUser(userId, userData)
      toast({
        title: t("users.updateSuccess"),
        description: t("users.updateSuccessDescription"),
      })
      router.push(`/admin-dashboard/users/${userId}`)
    } catch (error) {
      console.error("Failed to update user:", error)
      toast({
        variant: "destructive",
        title: t("users.updateError"),
        description: t("users.updateErrorDescription"),
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex items-center mb-6">
          <Button variant="outline" size="icon" className="mr-4" asChild>
            <Link href={`/admin-dashboard/users/${userId}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{t("users.loading")}</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="h-96 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="icon" className="mr-4" asChild>
          <Link href={`/admin-dashboard/users/${userId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{t("users.editUser")}</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{t("users.editUserDetails")}</CardTitle>
            <CardDescription>{t("users.editUserDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t("users.firstName")}</Label>
                <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t("users.lastName")}</Label>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">{t("users.username")}</Label>
              <Input id="username" name="username" value={formData.username} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("users.email")}</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">{t("users.phone")}</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">{t("users.address")}</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("users.roles")}</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="role-admin" checked={roles.ADMIN} onCheckedChange={() => handleRoleChange("ADMIN")} />
                  <Label htmlFor="role-admin" className="font-normal">
                    {t("users.roleAdmin")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="role-instructor"
                    checked={roles.INSTRUCTOR}
                    onCheckedChange={() => handleRoleChange("INSTRUCTOR")}
                  />
                  <Label htmlFor="role-instructor" className="font-normal">
                    {t("users.roleInstructor")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="role-student"
                    checked={roles.STUDENT}
                    onCheckedChange={() => handleRoleChange("STUDENT")}
                  />
                  <Label htmlFor="role-student" className="font-normal">
                    {t("users.roleStudent")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="role-staff" checked={roles.STAFF} onCheckedChange={() => handleRoleChange("STAFF")} />
                  <Label htmlFor="role-staff" className="font-normal">
                    {t("users.roleStaff")}
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href={`/admin-dashboard/users/${userId}`}>{t("common.cancel")}</Link>
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("common.saving")}
                </>
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
