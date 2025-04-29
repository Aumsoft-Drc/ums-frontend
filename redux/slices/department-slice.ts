import { createGenericSlice } from "./generic-slice"
import { departmentService, type Department } from "@/services/department-service"

const { slice, actions, reducer } = createGenericSlice<Department>("departments", departmentService)

export const {
  fetchAll: fetchAllDepartments,
  fetchById: fetchDepartmentById,
  create: createDepartment,
  update: updateDepartment,
  remove: deleteDepartment,
  clearItems: clearDepartments,
  clearSelectedItem: clearSelectedDepartment,
  clearError: clearDepartmentError,
} = actions

export default reducer
