"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "@/hooks/use-translation"
import { fetchUserProfile, updateUserProfile, clearProfileState } from "@/redux/slices/profile-slice"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import type { RootState, AppDispatch } from "@/redux/store"

export default function EditProfilePage() {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { toast } = useToast()
  
  const { profile, loading, error, success } = useSelector((state: RootState) => state.profile)
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  })
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    dispatch(fetchUserProfile())
    
    return () => {
      dispatch(clearProfileState())
    }
  }, [dispatch])
  
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
        bio: profile.bio || "",
      })
    }
  }, [profile])
  
  useEffect(() => {
    if (success) {
      toast({
        title: t("profile.updateSuccess"),\
        description: t("profile.  {
      toast({
        title: t("profile.updateSuccess"),
        description: t("profile.profileUpdated"),
      })
      router.push("/profile")
    }
    
    if (error) {
      toast({
        variant: "destructive",
        title: t("profile.updateError"),
        description: error,
      })
    }
  }, [success, error, toast, t, router])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(updateUserProfile(formData))
  }
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        variant: "destructive",
        title: t("profile.passwordError"),
        description: t("profile.passwordMismatch"),
      })
      return
    }
    
    // In a real app, this would dispatch an action to update the password
    toast({
      title: t("profile.passwordSuccess"),
      description: t("profile.passwordUpdated"),
    })
    
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">{t("profile.editProfile")}</h1>
      
      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">{t("profile.generalInfo")}</TabsTrigger>
          <TabsTrigger value="password">{t("profile.changePassword")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <form onSubmit={handleProfileSubmit}>
              <CardHeader>
                <CardTitle>{t("profile.personalInformation")}</CardTitle>
                <CardDescription>{t("profile.updateYourPersonalInfo")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t("profile.firstName")}</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t("profile.lastName")}</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">{t("profile.email")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("profile.phone")}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">{t("profile.address")}</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">{t("profile.bio")}</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("common.loading")}
                    </>
                  ) : (
                    t("common.save")
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="password">
          <Card>
            <form onSubmit={handlePasswordSubmit}>
              <CardHeader>
                <CardTitle>{t("profile.changePassword")}</CardTitle>
                <CardDescription>{t("profile.updateYourPassword")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">{t("profile.currentPassword")}</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">{t("profile.newPassword")}</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t("profile.confirmPassword")}</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">
                  {t("profile.updatePassword")}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
