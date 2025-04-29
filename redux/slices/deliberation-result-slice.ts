import { createGenericSlice } from "./generic-slice"
import { deliberationResultService, type DeliberationResult } from "@/services/deliberation-result-service"

const { slice, actions, reducer } = createGenericSlice<DeliberationResult>(
  "deliberationResults",
  deliberationResultService,
)

export const {
  fetchAll: fetchAllDeliberationResults,
  fetchById: fetchDeliberationResultById,
  create: createDeliberationResult,
  update: updateDeliberationResult,
  remove: deleteDeliberationResult,
  clearItems: clearDeliberationResults,
  clearSelectedItem: clearSelectedDeliberationResult,
  clearError: clearDeliberationResultError,
} = actions

export default reducer
