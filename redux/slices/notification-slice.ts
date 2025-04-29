import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { notificationService } from "@/services/notification-service"

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await notificationService.getUserNotifications()
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const markAsRead = createAsyncThunk("notifications/markAsRead", async (id: string, { rejectWithValue }) => {
  try {
    const response = await notificationService.markAsRead(id)
    return response
  } catch (error) {
    return rejectWithValue(error)
  }
})

interface NotificationState {
  notifications: any[]
  unreadCount: number
  loading: boolean
  error: string | null
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
}

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.notifications = []
      state.unreadCount = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false
        state.notifications = action.payload
        state.unreadCount = action.payload.filter((notification) => !notification.read).length
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(markAsRead.fulfilled, (state, action: PayloadAction<any>) => {
        const index = state.notifications.findIndex((notification) => notification.id === action.payload.id)
        if (index !== -1) {
          state.notifications[index].read = true
          state.unreadCount = state.unreadCount > 0 ? state.unreadCount - 1 : 0
        }
      })
  },
})

export const { clearNotifications } = notificationSlice.actions
export default notificationSlice.reducer
