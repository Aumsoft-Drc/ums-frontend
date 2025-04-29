import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { appealService } from "@/services/appeal-service"

export interface Appeal {
  id: string
  student: {
    id: string
    name: string
  }
  course: {
    id: string
    name: string
  }
  examResult: {
    id: string
    score: number
  }
  reason: string
  status: string
  submissionDate: string
  resolutionDate?: string
  resolution?: string
}

interface AppealState {
  items: Appeal[]
  selectedItem: Appeal | null
  loading: boolean
  error: string | null
}

const initialState: AppealState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
}

export const fetchAll = createAsyncThunk("appeals/fetchAll", async () => {
  const response = await appealService.getAll()
  return response
})

export const fetchById = createAsyncThunk("appeals/fetchById", async (id: string) => {
  const response = await appealService.getById(id)
  return response
})

export const create = createAsyncThunk("appeals/create", async (data: Partial<Appeal>) => {
  const response = await appealService.create(data)
  return response
})

export const update = createAsyncThunk(
  "appeals/update",
  async ({ id, data }: { id: string; data: Partial<Appeal> }) => {
    const response = await appealService.update(id, data)
    return response
  },
)

export const remove = createAsyncThunk("appeals/remove", async (id: string) => {
  await appealService.remove(id)
  return id
})

const appealSlice = createSlice({
  name: "appeals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAll.fulfilled, (state, action: PayloadAction<Appeal[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch appeals"
      })
      .addCase(fetchById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchById.fulfilled, (state, action: PayloadAction<Appeal>) => {
        state.loading = false
        state.selectedItem = action.payload
      })
      .addCase(fetchById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch appeal"
      })
      .addCase(create.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(create.fulfilled, (state, action: PayloadAction<Appeal>) => {
        state.loading = false
        state.items.push(action.payload)
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to create appeal"
      })
      .addCase(update.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(update.fulfilled, (state, action: PayloadAction<Appeal>) => {
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
        state.error = action.error.message || "Failed to update appeal"
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
        state.error = action.error.message || "Failed to remove appeal"
      })
  },
})

export default appealSlice.reducer
