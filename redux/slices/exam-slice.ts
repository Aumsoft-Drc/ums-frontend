import { createGenericSlice } from "./generic-slice"
import { examService, type Exam } from "@/services/exam-service"

const { slice, actions, reducer } = createGenericSlice<Exam>("exams", examService)

export const {
  fetchAll: fetchAllExams,
  fetchById: fetchExamById,
  create: createExam,
  update: updateExam,
  remove: deleteExam,
  clearItems: clearExams,
  clearSelectedItem: clearSelectedExam,
  clearError: clearExamError,
} = actions

export default reducer
