import { createGenericSlice } from "./generic-slice"
import { academicPeriodService, type AcademicPeriod } from "@/services/academic-period-service"

const { slice, actions, reducer } = createGenericSlice<AcademicPeriod>("academicPeriods", academicPeriodService)

export const {
  fetchAll: fetchAllAcademicPeriods,
  fetchById: fetchAcademicPeriodById,
  create: createAcademicPeriod,
  update: updateAcademicPeriod,
  remove: deleteAcademicPeriod,
  clearItems: clearAcademicPeriods,
  clearSelectedItem: clearSelectedAcademicPeriod,
  clearError: clearAcademicPeriodError,
} = actions

export default reducer
