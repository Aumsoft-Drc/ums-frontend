import { createGenericSlice } from "./generic-slice"
import { programService, type Program } from "@/services/program-service"

const { slice, actions, reducer } = createGenericSlice<Program>("programs", programService)

export const {
  fetchAll: fetchAllPrograms,
  fetchById: fetchProgramById,
  create: createProgram,
  update: updateProgram,
  remove: deleteProgram,
  clearItems: clearPrograms,
  clearSelectedItem: clearSelectedProgram,
  clearError: clearProgramError,
} = actions

export default reducer
