import { createGenericSlice } from "./generic-slice"
import { universityService, type University } from "@/services/university-service"

const { slice, actions, reducer } = createGenericSlice<University>("universities", universityService)

export const {
  fetchAll: fetchAllUniversities,
  fetchById: fetchUniversityById,
  create: createUniversity,
  update: updateUniversity,
  remove: deleteUniversity,
  clearItems: clearUniversities,
  clearSelectedItem: clearSelectedUniversity,
  clearError: clearUniversityError,
} = actions

export default reducer
