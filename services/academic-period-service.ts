import { createGenericService } from "./generic-service"

export interface AcademicPeriod {
  id: string
  name: string
  startDate: string
  endDate: string
  type: string
  status: string
}

export const academicPeriodService = createGenericService<AcademicPeriod>("academic-periods")
