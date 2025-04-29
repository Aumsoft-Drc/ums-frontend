import { createGenericSlice } from "./generic-slice"
import { courseResultService, type CourseResult } from "@/services/course-result-service"

const { slice, actions, reducer } = createGenericSlice<CourseResult>("courseResults", courseResultService)

export const {
  fetchAll: fetchAllCourseResults,
  fetchById: fetchCourseResultById,
  create: createCourseResult,
  update: updateCourseResult,
  remove: deleteCourseResult,
  clearItems: clearCourseResults,
  clearSelectedItem: clearSelectedCourseResult,
  clearError: clearCourseResultError,
} = actions

export default reducer
