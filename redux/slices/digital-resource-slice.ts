import { createGenericSlice } from "./generic-slice"
import { digitalResourceService } from "@/services/digital-resource-service"

const digitalResourceSlice = createGenericSlice({
  name: "digitalResources",
  service: digitalResourceService,
})

export const digitalResourceActions = digitalResourceSlice.actions
export default digitalResourceSlice.reducer
