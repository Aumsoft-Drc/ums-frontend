import { createGenericSlice } from "./generic-slice"
import { assignmentService, type Assignment } from "@/services/assignment-service"

const { slice, actions, reducer } = createGenericSlice<Assignment>("assignments", assignmentService)

export const {
  fetchAll: fetchAllAssignments,
  fetchById: fetchAssignmentById,
  create: createAssignment,
  update: updateAssignment,
  remove: deleteAssignment,
  clearItems: clearAssignments,
  clearSelectedItem: clearSelectedAssignment,
  clearError: clearAssignmentError,
} = actions

export default reducer
