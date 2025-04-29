import { createGenericSlice } from "./generic-slice"
import { transcriptService, type Transcript } from "@/services/transcript-service"

const { slice, actions, reducer } = createGenericSlice<Transcript>("transcripts", transcriptService)

export const {
  fetchAll: fetchAllTranscripts,
  fetchById: fetchTranscriptById,
  create: createTranscript,
  update: updateTranscript,
  remove: deleteTranscript,
  clearItems: clearTranscripts,
  clearSelectedItem: clearSelectedTranscript,
  clearError: clearTranscriptError,
} = actions

export default reducer
