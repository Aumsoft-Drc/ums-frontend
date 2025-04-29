import { createGenericSlice } from "./generic-slice"
import { examResultService, type ExamResult } from "@/services/exam-result-service"

const { slice, actions, reducer } = createGenericSlice<ExamResult>("examResults", examResultService)

export const {
  fetchAll: fetchAllExamResults,
  fetchById: fetchExamResultById,
  create: createExamResult,
  update: updateExamResult,
  remove: deleteExamResult,
  clearItems: clearExamResults,
  clearSelectedItem: clearSelectedExamResult,
  clearError: clearExamResultError,
} = actions

export default reducer
