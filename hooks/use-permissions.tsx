import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"

export function usePermissions() {
  const { userPermissions } = useSelector((state: RootState) => state.permissions)

  const hasPermission = (permission: string | string[]): boolean => {
    if (Array.isArray(permission)) {
      return permission.some((p) => userPermissions.includes(p))
    }
    return userPermissions.includes(permission)
  }

  const canView = (resource: string): boolean => {
    return hasPermission(`view:${resource}`)
  }

  const canCreate = (resource: string): boolean => {
    return hasPermission(`create:${resource}`)
  }

  const canEdit = (resource: string): boolean => {
    return hasPermission(`edit:${resource}`)
  }

  const canDelete = (resource: string): boolean => {
    return hasPermission(`delete:${resource}`)
  }

  return {
    hasPermission,
    canView,
    canCreate,
    canEdit,
    canDelete,
  }
}
