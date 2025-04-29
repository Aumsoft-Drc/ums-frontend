import { createGenericService } from "./generic-service"

export interface University {
  id: string
  name: string
  code: string
  address: string
  city: string
  country: string
  website: string
  phone: string
  email: string
  logo: string
  description: string
  createdAt: string
  updatedAt: string
}

export const universityService = createGenericService<University>("universities")
