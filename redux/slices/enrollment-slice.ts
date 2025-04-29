import { createGenericSlice } from "./generic-slice"
import { enrollmentService, type Enrollment } from "@/services/enrollment-service"

const { slice, actions, reducer } = createGenericSlice<Enrollment>("enrollments", enrollmentService)

export const {
  fetchAll: fetchAllEnrollments,
  fetchById: fetchEnrollmentById,
  create: createEnrollment,
  update: updateEnrollment,
  remove: deleteEnrollment,
  clearItems: clearEnrollments,
  clearSelectedItem: clearSelectedEnrollment,
  clearError: clearEnrollmentError,
} = actions

export default reducer
