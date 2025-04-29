import { createGenericService } from "./generic-service"

export interface Room {
  id: string
  name: string
  building: string
  floor: number
  capacity: number
  type: string
  description: string
  createdAt: string
  updatedAt: string
}

export const roomService = createGenericService<Room>("rooms")
