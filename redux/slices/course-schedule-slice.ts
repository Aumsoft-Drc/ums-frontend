import { createGenericSlice } from "./generic-slice"
import { courseScheduleService, type CourseSchedule } from "@/services/course-schedule-service"

const { slice, actions, reducer } = createGenericSlice<CourseSchedule>("courseSchedules", courseScheduleService)

export const {
  fetchAll: fetchAllCourseSchedules,
  fetchById: fetchCourseScheduleById,
  create: createCourseSchedule,
  update: updateCourseSchedule,
  remove: deleteCourseSchedule,
  clearItems: clearCourseSchedules,
  clearSelectedItem: clearSelectedCourseSchedule,
  clearError: clearCourseScheduleError,
} = actions

export default reducer
