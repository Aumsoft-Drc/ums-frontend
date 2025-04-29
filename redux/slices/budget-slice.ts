import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { budgetService } from "@/services/budget-service"

export interface Budget {
  id: string
  name: string
  fiscalYear: string
  department: {
    id: string
    name: string
  }
  totalAmount: number
  allocatedAmount: number
  remainingAmount: number
  status: string
  description?: string
}

interface BudgetState {
  items: Budget[]
  selectedItem: Budget | null
  loading: boolean
  error: string | null
}

const initialState: BudgetState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
}

export const fetchAll = createAsyncThunk("budgets/fetchAll", async () => {
  const response = await budgetService.getAll()
  return response
})

export const fetchById = createAsyncThunk("budgets/fetchById", async (id: string) => {
  const response = await budgetService.getById(id)
  return response
})

export const create = createAsyncThunk("budgets/create", async (data: Partial<Budget>) => {
  const response = await budgetService.create(data)
  return response
})

export const update = createAsyncThunk(
  "budgets/update",
  async ({ id, data }: { id: string; data: Partial<Budget> }) => {
    const response = await budgetService.update(id, data)
    return response
  },
)

export const remove = createAsyncThunk("budgets/remove", async (id: string) => {
  await budgetService.remove(id)
  return id
})

const budgetSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAll.fulfilled, (state, action: PayloadAction<Budget[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch budgets"
      })
      .addCase(fetchById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchById.fulfilled, (state, action: PayloadAction<Budget>) => {
        state.loading = false
        state.selectedItem = action.payload
      })
      .addCase(fetchById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch budget"
      })
      .addCase(create.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(create.fulfilled, (state, action: PayloadAction<Budget>) => {
        state.loading = false
        state.items.push(action.payload)
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to create budget"
      })
      .addCase(update.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(update.fulfilled, (state, action: PayloadAction<Budget>) => {
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
        state.error = action.error.message || "Failed to update budget"
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
        state.error = action.error.message || "Failed to remove budget"
      })
  },
})

export default budgetSlice.reducer
