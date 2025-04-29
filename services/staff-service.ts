import { createGenericService } from "./generic-service"

export interface Staff {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
  department: string
  hireDate: string
  status: string
}

export const staffService = createGenericService<Staff>("staff")
