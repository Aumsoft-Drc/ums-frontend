"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "@/hooks/use-translation"
import { fetchNotifications, markAsRead } from "@/redux/slices/notification-slice"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { AppDispatch, RootState } from "@/redux/store"

export function NotificationDropdown() {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { notifications, unreadCount, loading } = useSelector((state: RootState) => state.notifications)

  useEffect(() => {
    dispatch(fetchNotifications())
  }, [dispatch])

  const handleNotificationClick = (id: string) => {
    dispatch(markAsRead(id))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">{t("notifications.toggle")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>{t("notifications.title")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-80">
          {loading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">{t("common.loading")}</div>
          ) : notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex flex-col items-start p-4 cursor-pointer ${!notification.read ? "bg-muted/50" : ""}`}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className="font-medium">{notification.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{notification.message}</div>
                <div className="text-xs text-muted-foreground mt-2">
                  {new Date(notification.createdAt).toLocaleString()}
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">{t("notifications.empty")}</div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
