import { createGenericSlice } from "./generic-slice"
import { deliberationSessionService, type DeliberationSession } from "@/services/deliberation-session-service"

const { slice, actions, reducer } = createGenericSlice<DeliberationSession>(
  "deliberationSessions",
  deliberationSessionService,
)

export const {
  fetchAll: fetchAllDeliberationSessions,
  fetchById: fetchDeliberationSessionById,
  create: createDeliberationSession,
  update: updateDeliberationSession,
  remove: deleteDeliberationSession,
  clearItems: clearDeliberationSessions,
  clearSelectedItem: clearSelectedDeliberationSession,
  clearError: clearDeliberationSessionError,
} = actions

export default reducer
