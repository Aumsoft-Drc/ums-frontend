"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle, MessageSquare } from "lucide-react"
import { GenericListPage } from "@/components/crud/generic-list-page"
import { chatGroupActions } from "@/redux/slices/chat-group-slice"
import { useTranslation } from "@/hooks/use-translation"
import { usePermissions } from "@/hooks/use-permissions"

export default function ChatGroupsPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()
  const { hasPermission } = usePermissions()
  const { items, loading, error } = useSelector((state: any) => state.chatGroups)

  useEffect(() => {
    dispatch(chatGroupActions.fetchAll())
  }, [dispatch])

  const canCreate = hasPermission("chatGroups:create")
  const canView = hasPermission("chatGroups:view")
  const canEdit = hasPermission("chatGroups:edit")
  const canDelete = hasPermission("chatGroups:delete")
  const canChat = hasPermission("chatGroups:chat")

  const columns = [
    { header: t("chatGroup.name"), accessor: "name" },
    { header: t("chatGroup.description"), accessor: "description" },
    { header: t("chatGroup.type"), accessor: "type" },
    { header: t("chatGroup.createdBy"), accessor: "createdBy.fullName" },
    { header: t("chatGroup.createdAt"), accessor: "createdAt", type: "datetime" },
    { header: t("chatGroup.memberCount"), accessor: "memberCount" },
  ]

  const filters = [
    {
      name: "type",
      label: t("chatGroup.type"),
      type: "select",
      options: [
        { label: t("chatGroup.type.course"), value: "course" },
        { label: t("chatGroup.type.department"), value: "department" },
        { label: t("chatGroup.type.program"), value: "program" },
        { label: t("chatGroup.type.general"), value: "general" },
      ],
    },
    {
      name: "createdAt",
      label: t("chatGroup.createdAt"),
      type: "dateRange",
    },
  ]

  const handleOpenChat = (id: string) => {
    if (canChat) {
      router.push(`/dashboard/chat/${id}`)
    }
  }

  const rowActions = [
    {
      icon: <MessageSquare className="h-4 w-4" />,
      label: t("chatGroup.openChat"),
      onClick: handleOpenChat,
      show: canChat,
    },
  ]

  return (
    <GenericListPage
      title={t("chatGroup.chatGroups")}
      items={items}
      loading={loading}
      error={error}
      columns={columns}
      filters={filters}
      onView={(id) => canView && router.push(`/dashboard/chat-groups/${id}`)}
      onEdit={(id) => canEdit && router.push(`/dashboard/chat-groups/${id}/edit`)}
      onDelete={(id) => canDelete && dispatch(chatGroupActions.remove(id))}
      rowActions={rowActions}
      actions={
        canCreate && (
          <Button onClick={() => router.push("/dashboard/chat-groups/new")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {t("chatGroup.createChatGroup")}
          </Button>
        )
      }
    />
  )
}
