"use client"

import { usePathname, useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { usePermissions } from "@/hooks/use-permissions"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import {
  BookOpen,
  Building,
  Calendar,
  ChevronDown,
  Cog,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Library,
  LogOut,
  MessageSquare,
  PieChart,
  School,
  User,
  Users,
  Wallet,
  FileBox,
  CreditCard,
  FileCheck,
  CheckSquare,
  DollarSign,
  Bell,
} from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "@/redux/slices/auth-slice"
import { authService } from "@/services/auth-service"
import type { RootState } from "@/redux/store"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function DashboardSidebar() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const { canView } = usePermissions()

  const handleLogout = async () => {
    await authService.logout()
    dispatch(logout())
    router.push("/")
  }

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <School className="h-6 w-6" />
          <span className="text-xl font-bold">UMS</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {canView("dashboard") && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                    <Link href="/dashboard">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>{t("dashboard")}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {(canView("faculty") ||
          canView("department") ||
          canView("program") ||
          canView("cohort") ||
          canView("room")) && (
          <SidebarGroup>
            <SidebarGroupLabel>{t("academic")}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <Collapsible>
                  <SidebarMenuItem className="group/collapsible">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <Building className="h-4 w-4" />
                        <span>{t("structure")}</span>
                        <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {canView("faculty") && (
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/dashboard/faculties")}>
                              <Link href="/dashboard/faculties">{t("faculties")}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )}
                        {canView("department") && (
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/dashboard/departments")}>
                              <Link href="/dashboard/departments">{t("departments")}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )}
                        {canView("program") && (
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/dashboard/programs")}>
                              <Link href="/dashboard/programs">{t("programs")}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )}
                        {canView("cohort") && (
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/dashboard/cohorts")}>
                              <Link href="/dashboard/cohorts">{t("cohorts")}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )}
                        {canView("room") && (
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/dashboard/rooms")}>
                              <Link href="/dashboard/rooms">{t("rooms")}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )}
                        {canView("academicPeriod") && (
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive("/dashboard/academic-periods")}>
                              <Link href="/dashboard/academic-periods">{t("academicPeriods")}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>

                {(canView("course") ||
                  canView("courseOffering") ||
                  canView("courseSchedule") ||
                  canView("enrollment")) && (
                  <Collapsible>
                    <SidebarMenuItem className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <BookOpen className="h-4 w-4" />
                          <span>{t("courses")}</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {canView("course") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/courses")}>
                                <Link href="/dashboard/courses">{t("allCourses")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                          {canView("courseOffering") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/course-offerings")}>
                                <Link href="/dashboard/course-offerings">{t("courseOfferings")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                          {canView("courseSchedule") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/course-schedules")}>
                                <Link href="/dashboard/course-schedules">{t("schedules")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                          {canView("enrollment") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/enrollments")}>
                                <Link href="/dashboard/enrollments">{t("enrollments")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )}

                {(canView("assignment") || canView("submission") || canView("exam")) && (
                  <Collapsible>
                    <SidebarMenuItem className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <FileText className="h-4 w-4" />
                          <span>{t("assessments")}</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {canView("assignment") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/assignments")}>
                                <Link href="/dashboard/assignments">{t("assignments")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                          {canView("submission") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/submissions")}>
                                <Link href="/dashboard/submissions">{t("submissions")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                          {canView("exam") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/exams")}>
                                <Link href="/dashboard/exams">{t("exams")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )}

                {(canView("examResult") ||
                  canView("courseResult") ||
                  canView("deliberationSession") ||
                  canView("deliberationResult") ||
                  canView("transcript") ||
                  canView("appeal")) && (
                  <Collapsible>
                    <SidebarMenuItem className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <GraduationCap className="h-4 w-4" />
                          <span>{t("results")}</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {canView("examResult") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/exam-results")}>
                                <Link href="/dashboard/exam-results">{t("examResults")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                          {canView("courseResult") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/course-results")}>
                                <Link href="/dashboard/course-results">{t("courseResults")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                          {canView("deliberationSession") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/deliberation-sessions")}>
                                <Link href="/dashboard/deliberation-sessions">{t("deliberationSessions")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                          {canView("deliberationResult") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/deliberation-results")}>
                                <Link href="/dashboard/deliberation-results">{t("deliberationResults")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                          {canView("transcript") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/transcripts")}>
                                <Link href="/dashboard/transcripts">{t("transcripts")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                          {canView("appeal") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/appeals")}>
                                <Link href="/dashboard/appeals">{t("appeals")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )}

                {canView("calendar") && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/calendar")}>
                      <Link href="/dashboard/calendar">
                        <Calendar className="h-4 w-4" />
                        <span>{t("calendar")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {(canView("student") ||
          canView("instructor") ||
          canView("staff") ||
          canView("role") ||
          canView("permission")) && (
          <SidebarGroup>
            <SidebarGroupLabel>{t("users")}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {canView("student") && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/students")}>
                      <Link href="/dashboard/students">
                        <Users className="h-4 w-4" />
                        <span>{t("students")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {canView("instructor") && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/instructors")}>
                      <Link href="/dashboard/instructors">
                        <User className="h-4 w-4" />
                        <span>{t("instructors")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {canView("staff") && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/staff")}>
                      <Link href="/dashboard/staff">
                        <User className="h-4 w-4" />
                        <span>{t("staff")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {canView("role") && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/roles")}>
                      <Link href="/dashboard/roles">
                        <User className="h-4 w-4" />
                        <span>{t("roles")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {canView("permission") && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/permissions")}>
                      <Link href="/dashboard/permissions">
                        <FileCheck className="h-4 w-4" />
                        <span>{t("permissions")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {(canView("feeType") ||
          canView("feePayment") ||
          canView("budget") ||
          canView("expenseRequest") ||
          canView("digitalResource") ||
          canView("category") ||
          canView("tag") ||
          canView("post") ||
          canView("notice") ||
          canView("notification") ||
          canView("contactMessage") ||
          canView("chatGroup") ||
          canView("cardRequest") ||
          canView("document")) && (
          <SidebarGroup>
            <SidebarGroupLabel>{t("other")}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {(canView("feeType") || canView("feePayment") || canView("budget") || canView("expenseRequest")) && (
                  <Collapsible>
                    <SidebarMenuItem className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <Wallet className="h-4 w-4" />
                          <span>{t("finance")}</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {canView("feeType") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/fee-types")}>
                                <Link href="/dashboard/fee-types">{t("feeTypes")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                          {canView("feePayment") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/fee-payments")}>
                                <Link href="/dashboard/fee-payments">{t("feePayments")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                          {canView("budget") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/budgets")}>
                                <Link href="/dashboard/budgets">{t("budgets")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                          {canView("expenseRequest") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/expense-requests")}>
                                <Link href="/dashboard/expense-requests">{t("expenseRequests")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )}

                {canView("digitalResource") && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/library")}>
                      <Link href="/dashboard/library">
                        <Library className="h-4 w-4" />
                        <span>{t("library")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                {(canView("category") || canView("tag") || canView("post")) && (
                  <Collapsible>
                    <SidebarMenuItem className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <FileBox className="h-4 w-4" />
                          <span>{t("blog")}</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {canView("post") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/posts")}>
                                <Link href="/dashboard/posts">{t("posts")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                          {canView("category") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/categories")}>
                                <Link href="/dashboard/categories">{t("categories")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                          {canView("tag") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/tags")}>
                                <Link href="/dashboard/tags">{t("tags")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )}

                {(canView("notice") ||
                  canView("notification") ||
                  canView("contactMessage") ||
                  canView("chatGroup")) && (
                  <Collapsible>
                    <SidebarMenuItem className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <MessageSquare className="h-4 w-4" />
                          <span>{t("communication")}</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {canView("notice") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/notices")}>
                                <Link href="/dashboard/notices">{t("notices")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                          {canView("notification") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/notifications")}>
                                <Link href="/dashboard/notifications">{t("notifications")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                          {canView("contactMessage") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/contact-messages")}>
                                <Link href="/dashboard/contact-messages">{t("contactMessages")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                          {canView("chatGroup") && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild isActive={isActive("/dashboard/chat-groups")}>
                                <Link href="/dashboard/chat-groups">{t("chatGroups")}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )}

                {canView("cardRequest") && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/card-requests")}>
                      <Link href="/dashboard/card-requests">
                        <CreditCard className="h-4 w-4" />
                        <span>{t("cardRequests")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                {canView("document") && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/documents")}>
                      <Link href="/dashboard/documents">
                        <FileText className="h-4 w-4" />
                        <span>{t("documents")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                {canView("reports") && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/reports")}>
                      <Link href="/dashboard/reports">
                        <PieChart className="h-4 w-4" />
                        <span>{t("reports")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {canView("exams") && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/exams")}>
                      <Link href="/dashboard/exams">
                        <FileText className="h-4 w-4" />
                        <span>{t("exam.exams")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {canView("examResults") && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/exam-results")}>
                      <Link href="/dashboard/exam-results">
                        <CheckSquare className="h-4 w-4" />
                        <span>{t("examResult.examResults")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {canView("transcripts") && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/transcripts")}>
                      <Link href="/dashboard/transcripts">
                        <FileText className="h-4 w-4" />
                        <span>{t("transcript.transcripts")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {canView("feeTypes") && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/fee-types")}>
                      <Link href="/dashboard/fee-types">
                        <DollarSign className="h-4 w-4" />
                        <span>{t("feeType.feeTypes")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {canView("digitalResources") && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/digital-resources")}>
                      <Link href="/dashboard/digital-resources">
                        <BookOpen className="h-4 w-4" />
                        <span>{t("digitalResource.digitalResources")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {canView("notifications") && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/notifications")}>
                      <Link href="/dashboard/notifications">
                        <Bell className="h-4 w-4" />
                        <span>{t("notification.notifications")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {canView("chatGroups") && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/chat-groups")}>
                      <Link href="/dashboard/chat-groups">
                        <MessageSquare className="h-4 w-4" />
                        <span>{t("chatGroup.chatGroups")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/settings")}>
              <Link href="/dashboard/settings">
                <Cog className="h-4 w-4" />
                <span>{t("settings")}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span>{t("logout")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
