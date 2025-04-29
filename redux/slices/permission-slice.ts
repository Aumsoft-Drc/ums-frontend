import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { permissionService } from "@/services/permission-service"

interface Permission {
  id: string
  name: string
  code: string
  description: string
}

interface PermissionState {
  permissions: Permission[]
  userPermissions: string[]
  loading: boolean
  error: string | null
}

const initialState: PermissionState = {
  permissions: [],
  userPermissions: [],
  loading: false,
  error: null,
}

// Async thunks
export const fetchAllPermissions = createAsyncThunk("permissions/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await permissionService.getAllPermissions()
    return response
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch permissions")
  }
})

export const fetchUserPermissions = createAsyncThunk(
  "permissions/fetchUserPermissions",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await permissionService.getUserPermissions(userId)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user permissions")
    }
  },
)

const permissionSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    clearPermissions: (state) => {
      state.permissions = []
      state.userPermissions = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPermissions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllPermissions.fulfilled, (state, action: PayloadAction<Permission[]>) => {
        state.loading = false
        state.permissions = action.payload
      })
      .addCase(fetchAllPermissions.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchUserPermissions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserPermissions.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.loading = false
        state.userPermissions = action.payload
      })
      .addCase(fetchUserPermissions.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearPermissions } = permissionSlice.actions
export default permissionSlice.reducer
