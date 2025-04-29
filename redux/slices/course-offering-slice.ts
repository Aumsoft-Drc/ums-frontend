import { createGenericSlice } from "./generic-slice"
import { courseOfferingService, type CourseOffering } from "@/services/course-offering-service"

const { slice, actions, reducer } = createGenericSlice<CourseOffering>("courseOfferings", courseOfferingService)

export const {
  fetchAll: fetchAllCourseOfferings,
  fetchById: fetchCourseOfferingById,
  create: createCourseOffering,
  update: updateCourseOffering,
  remove: deleteCourseOffering,
  clearItems: clearCourseOfferings,
  clearSelectedItem: clearSelectedCourseOffering,
  clearError: clearCourseOfferingError,
} = actions

export default reducer
