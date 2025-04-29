import { createGenericSlice } from "./generic-slice"
import { feeTypeService } from "@/services/fee-type-service"

const feeTypeSlice = createGenericSlice({
  name: "feeTypes",
  service: feeTypeService,
})

export const feeTypeActions = feeTypeSlice.actions
export default feeTypeSlice.reducer
