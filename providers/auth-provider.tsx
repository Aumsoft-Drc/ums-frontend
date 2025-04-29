"use client"

import { type ReactNode, useEffect } from "react"
import { useDispatch } from "react-redux"
import { login } from "@/redux/slices/auth-slice"
import { authService } from "@/services/auth-service"

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch()

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if user is already logged in
        const userData = await authService.getCurrentUser()
        if (userData) {
          dispatch(login(userData))
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error)
      }
    }

    initAuth()
  }, [dispatch])

  return <>{children}</>
}
