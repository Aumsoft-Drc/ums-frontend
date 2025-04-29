import { createGenericService } from "./generic-service"

export interface CourseSchedule {
  id: string
  courseOfferingId: string
  roomId: string
  dayOfWeek: string
  startTime: string
  endTime: string
  createdAt: string
  updatedAt: string
}

export const courseScheduleService = createGenericService<CourseSchedule>("courseSchedules")
