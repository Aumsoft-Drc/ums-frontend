import { createGenericSlice } from "./generic-slice"
import { submissionService, type Submission } from "@/services/submission-service"

const { slice, actions, reducer } = createGenericSlice<Submission>("submissions", submissionService)

export const {
  fetchAll: fetchAllSubmissions,
  fetchById: fetchSubmissionById,
  create: createSubmission,
  update: updateSubmission,
  remove: deleteSubmission,
  clearItems: clearSubmissions,
  clearSelectedItem: clearSelectedSubmission,
  clearError: clearSubmissionError,
} = actions

export default reducer
