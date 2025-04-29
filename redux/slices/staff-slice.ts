import { createGenericSlice } from "./generic-slice"
import { staffService, type Staff } from "@/services/staff-service"

const { slice, actions, reducer } = createGenericSlice<Staff>("staff", staffService)

export const {
  fetchAll: fetchAllStaff,
  fetchById: fetchStaffById,
  create: createStaff,
  update: updateStaff,
  remove: deleteStaff,
  clearItems: clearStaff,
  clearSelectedItem: clearSelectedStaff,
  clearError: clearStaffError,
} = actions

export default reducer
