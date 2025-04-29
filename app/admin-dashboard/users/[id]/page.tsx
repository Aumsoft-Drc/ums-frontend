"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { adminService } from "@/services/admin-service"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function UserDetailPage() {
  const { t } = useTranslation()
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const userId = params.id as string

  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await adminService.getUserById(userId)
        setUser(data)
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

  const handleDelete = async () => {
    if (window.confirm(t("users.confirmDelete"))) {
      try {
        await adminService.deleteUser(userId)
        toast({
          title: t("users.deleteSuccess"),
          description: t("users.deleteSuccessDescription"),
        })
        router.push("/admin-dashboard/users")
      } catch (error) {
        console.error("Failed to delete user:", error)
        toast({
          variant: "destructive",
          title: t("users.deleteError"),
          description: t("users.deleteErrorDescription"),
        })
      }
    }
  }

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex items-center mb-6">
          <Button variant="outline" size="icon" className="mr-4" asChild>
            <Link href="/admin-dashboard/users">
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

  if (!user) {
    return (
      <div className="container py-10">
        <div className="flex items-center mb-6">
          <Button variant="outline" size="icon" className="mr-4" asChild>
            <Link href="/admin-dashboard/users">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{t("users.notFound")}</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <p>{t("users.notFoundDescription")}</p>
            <Button className="mt-4" asChild>
              <Link href="/admin-dashboard/users">{t("users.backToList")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="outline" size="icon" className="mr-4" asChild>
            <Link href="/admin-dashboard/users">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{t("users.userDetails")}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/admin-dashboard/users/${userId}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              {t("common.edit")}
            </Link>
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            {t("common.delete")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.username} />
                <AvatarFallback className="text-4xl">
                  {user.firstName?.charAt(0)}
                  {user.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-muted-foreground">{user.username}</p>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {user.roles.map((role: string) => (
                  <Badge key={role} variant="secondary">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t("users.information")}</CardTitle>
            <CardDescription>{t("users.informationDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic">
              <TabsList className="mb-4">
                <TabsTrigger value="basic">{t("users.basicInfo")}</TabsTrigger>
                <TabsTrigger value="contact">{t("users.contactInfo")}</TabsTrigger>
                <TabsTrigger value="security">{t("users.securityInfo")}</TabsTrigger>
              </TabsList>

              <TabsContent value="basic">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t("users.firstName")}</h3>
                    <p>{user.firstName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t("users.lastName")}</h3>
                    <p>{user.lastName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t("users.username")}</h3>
                    <p>{user.username}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t("users.status")}</h3>
                    <p>
                      <Badge variant={user.status === "active" ? "default" : "destructive"} className="mt-1">
                        {user.status}
                      </Badge>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t("users.createdAt")}</h3>
                    <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t("users.updatedAt")}</h3>
                    <p>{new Date(user.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t("users.email")}</h3>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t("users.phone")}</h3>
                    <p>{user.phone || t("users.notProvided")}</p>
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-muted-foreground">{t("users.address")}</h3>
                    <p>{user.address || t("users.notProvided")}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t("users.lastLogin")}</h3>
                    <p>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : t("users.never")}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t("users.twoFactorEnabled")}</h3>
                    <p>{user.twoFactorEnabled ? t("users.yes") : t("users.no")}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href={`/admin-dashboard/users/${userId}/edit`}>{t("users.editUser")}</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
