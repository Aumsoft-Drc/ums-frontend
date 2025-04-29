"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { logout } from "@/redux/slices/auth-slice"
import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { NotificationDropdown } from "@/components/notifications/notification-dropdown"
import type { RootState } from "@/redux/store"
import { authService } from "@/services/auth-service"
import { Menu, User, LogOut, Settings, BookOpen } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await authService.logout()
    dispatch(logout())
    router.push("/")
  }

  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false)
    }

    window.addEventListener("popstate", handleRouteChange)
    return () => {
      window.removeEventListener("popstate", handleRouteChange)
    }
  }, [])

  const getDashboardLink = () => {
    if (!user?.roles) return "/dashboard"

    if (user.roles.includes("ADMIN")) {
      return "/admin-dashboard"
    } else if (user.roles.includes("INSTRUCTOR")) {
      return "/instructor-dashboard"
    } else {
      return "/student-dashboard"
    }
  }

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl">
            UMS
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              {t("nav.home")}
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              {t("nav.about")}
            </Link>
            <Link href="/courses" className="text-sm font-medium transition-colors hover:text-primary">
              {t("nav.courses")}
            </Link>
            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
              {t("nav.contact")}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <LanguageToggle />

          {isAuthenticated && <NotificationDropdown />}

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatarUrl || "/placeholder.svg"} alt={user?.username} />
                    <AvatarFallback>
                      {user?.firstName?.charAt(0)}
                      {user?.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>{t("nav.profile")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={getDashboardLink()}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>{t("nav.dashboard")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{t("nav.settings")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t("nav.logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex gap-4">
              <Button asChild variant="ghost">
                <Link href="/login">{t("nav.login")}</Link>
              </Button>
              <Button asChild>
                <Link href="/register">{t("nav.register")}</Link>
              </Button>
            </div>
          )}

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="font-bold text-xl block mb-6">
                UMS
              </Link>
              <nav className="flex flex-col gap-4">
                <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                  {t("nav.home")}
                </Link>
                <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                  {t("nav.about")}
                </Link>
                <Link href="/courses" className="text-sm font-medium transition-colors hover:text-primary">
                  {t("nav.courses")}
                </Link>
                <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                  {t("nav.contact")}
                </Link>

                {!isAuthenticated && (
                  <>
                    <Link href="/login" className="text-sm font-medium transition-colors hover:text-primary">
                      {t("nav.login")}
                    </Link>
                    <Link href="/register" className="text-sm font-medium transition-colors hover:text-primary">
                      {t("nav.register")}
                    </Link>
                  </>
                )}

                {isAuthenticated && (
                  <>
                    <Link href="/profile" className="text-sm font-medium transition-colors hover:text-primary">
                      {t("nav.profile")}
                    </Link>
                    <Link
                      href={getDashboardLink()}
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      {t("nav.dashboard")}
                    </Link>
                    <Link href="/settings" className="text-sm font-medium transition-colors hover:text-primary">
                      {t("nav.settings")}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-sm font-medium transition-colors hover:text-primary text-left"
                    >
                      {t("nav.logout")}
                    </button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
