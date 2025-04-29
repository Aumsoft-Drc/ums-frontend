import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  avatarUrl?: string
  roles: string[]
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  },
})

export const { login, logout, updateUser } = authSlice.actions
export default authSlice.reducer
