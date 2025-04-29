import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { noticeService } from "@/services/notice-service"

export interface Notice {
  id: string
  title: string
  content: string
  category: string
  status: string
  publishedAt: string
  expiresAt: string
  priority: string
  audience: string[]
}

interface NoticeState {
  items: Notice[]
  selectedItem: Notice | null
  loading: boolean
  error: string | null
}

const initialState: NoticeState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
}

export const fetchAll = createAsyncThunk("notices/fetchAll", async () => {
  const response = await noticeService.getAll()
  return response
})

export const fetchById = createAsyncThunk("notices/fetchById", async (id: string) => {
  const response = await noticeService.getById(id)
  return response
})

export const create = createAsyncThunk("notices/create", async (data: Partial<Notice>) => {
  const response = await noticeService.create(data)
  return response
})

export const update = createAsyncThunk(
  "notices/update",
  async ({ id, data }: { id: string; data: Partial<Notice> }) => {
    const response = await noticeService.update(id, data)
    return response
  },
)

export const remove = createAsyncThunk("notices/remove", async (id: string) => {
  await noticeService.remove(id)
  return id
})

const noticeSlice = createSlice({
  name: "notices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAll.fulfilled, (state, action: PayloadAction<Notice[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch notices"
      })
      .addCase(fetchById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchById.fulfilled, (state, action: PayloadAction<Notice>) => {
        state.loading = false
        state.selectedItem = action.payload
      })
      .addCase(fetchById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch notice"
      })
      .addCase(create.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(create.fulfilled, (state, action: PayloadAction<Notice>) => {
        state.loading = false
        state.items.push(action.payload)
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to create notice"
      })
      .addCase(update.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(update.fulfilled, (state, action: PayloadAction<Notice>) => {
        state.loading = false
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
        if (state.selectedItem && state.selectedItem.id === action.payload.id) {
          state.selectedItem = action.payload
        }
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to update notice"
      })
      .addCase(remove.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(remove.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false
        state.items = state.items.filter((item) => item.id !== action.payload)
        if (state.selectedItem && state.selectedItem.id === action.payload) {
          state.selectedItem = null
        }
      })
      .addCase(remove.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to remove notice"
      })
  },
})

export default noticeSlice.reducer
