import { createGenericSlice } from "./generic-slice"
import { roleService, type Role } from "@/services/role-service"
import { createAsyncThunk } from "@reduxjs/toolkit"

const { slice, actions, reducer } = createGenericSlice<Role>("roles", roleService)

// Thunks spécifiques aux rôles
export const assignPermission = createAsyncThunk(
  "roles/assignPermission",
  async ({ roleId, permissionId }: { roleId: string; permissionId: string }, { rejectWithValue }) => {
    try {
      const response = await roleService.assignPermission(roleId, permissionId)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to assign permission")
    }
  },
)

export const removePermission = createAsyncThunk(
  "roles/removePermission",
  async ({ roleId, permissionId }: { roleId: string; permissionId: string }, { rejectWithValue }) => {
    try {
      const response = await roleService.removePermission(roleId, permissionId)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove permission")
    }
  },
)

export const getRolePermissions = createAsyncThunk(
  "roles/getRolePermissions",
  async (roleId: string, { rejectWithValue }) => {
    try {
      const response = await roleService.getRolePermissions(roleId)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to get role permissions")
    }
  },
)

export const {
  fetchAll: fetchAllRoles,
  fetchById: fetchRoleById,
  create: createRole,
  update: updateRole,
  remove: deleteRole,
  clearItems: clearRoles,
  clearSelectedItem: clearSelectedRole,
  clearError: clearRoleError,
} = actions

export default reducer
