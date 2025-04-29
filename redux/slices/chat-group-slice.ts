import { createGenericSlice } from "./generic-slice"
import { chatGroupService } from "@/services/chat-group-service"

const chatGroupSlice = createGenericSlice({
  name: "chatGroups",
  service: chatGroupService,
})

export const chatGroupActions = chatGroupSlice.actions
export default chatGroupSlice.reducer
