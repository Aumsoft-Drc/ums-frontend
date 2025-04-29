import { createGenericSlice } from "./generic-slice"
import { roomService, type Room } from "@/services/room-service"

const { slice, actions, reducer } = createGenericSlice<Room>("rooms", roomService)

export const {
  fetchAll: fetchAllRooms,
  fetchById: fetchRoomById,
  create: createRoom,
  update: updateRoom,
  remove: deleteRoom,
  clearItems: clearRooms,
  clearSelectedItem: clearSelectedRoom,
  clearError: clearRoomError,
} = actions

export default reducer
