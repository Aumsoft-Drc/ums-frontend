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
import { adminService } from "@/services/admin-service"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export default function NewUserPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [roles, setRoles] = useState({
    ADMIN: false,
    INSTRUCTOR: false,
    STUDENT: false,
    STAFF: false,
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (role: keyof typeof roles) => {
    setRoles((prev) => ({ ...prev, [role]: !prev[role] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: t("users.passwordMismatch"),
        description: t("users.passwordMismatchDescription"),
      })
      return
    }

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

    setIsLoading(true)

    try {
      const userData = {
        ...formData,
        roles: selectedRoles,
      }
      await adminService.createUser(userData)
      toast({
        title: t("users.createSuccess"),
        description: t("users.createSuccessDescription"),
      })
      router.push("/admin-dashboard/users")
    } catch (error) {
      console.error("Failed to create user:", error)
      toast({
        variant: "destructive",
        title: t("users.createError"),
        description: t("users.createErrorDescription"),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("users.createNew")}</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{t("users.newUser")}</CardTitle>
            <CardDescription>{t("users.newUserDescription")}</CardDescription>
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
                <Label htmlFor="password">{t("users.password")}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t("users.confirmPassword")}</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
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
              <Link href="/admin-dashboard/users">{t("common.cancel")}</Link>
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("common.loading")}
                </>
              ) : (
                t("users.create")
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
