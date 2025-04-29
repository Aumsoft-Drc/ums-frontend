import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { feePaymentService } from "@/services/fee-payment-service"

export interface FeePayment {
  id: string
  student: {
    id: string
    name: string
  }
  feeType: {
    id: string
    name: string
  }
  amount: number
  paymentDate: string
  paymentMethod: string
  status: string
  reference: string
  notes?: string
}

interface FeePaymentState {
  items: FeePayment[]
  selectedItem: FeePayment | null
  loading: boolean
  error: string | null
}

const initialState: FeePaymentState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
}

export const fetchAll = createAsyncThunk("feePayments/fetchAll", async () => {
  const response = await feePaymentService.getAll()
  return response
})

export const fetchById = createAsyncThunk("feePayments/fetchById", async (id: string) => {
  const response = await feePaymentService.getById(id)
  return response
})

export const create = createAsyncThunk("feePayments/create", async (data: Partial<FeePayment>) => {
  const response = await feePaymentService.create(data)
  return response
})

export const update = createAsyncThunk(
  "feePayments/update",
  async ({ id, data }: { id: string; data: Partial<FeePayment> }) => {
    const response = await feePaymentService.update(id, data)
    return response
  },
)

export const remove = createAsyncThunk("feePayments/remove", async (id: string) => {
  await feePaymentService.remove(id)
  return id
})

const feePaymentSlice = createSlice({
  name: "feePayments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAll.fulfilled, (state, action: PayloadAction<FeePayment[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch fee payments"
      })
      .addCase(fetchById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchById.fulfilled, (state, action: PayloadAction<FeePayment>) => {
        state.loading = false
        state.selectedItem = action.payload
      })
      .addCase(fetchById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch fee payment"
      })
      .addCase(create.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(create.fulfilled, (state, action: PayloadAction<FeePayment>) => {
        state.loading = false
        state.items.push(action.payload)
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to create fee payment"
      })
      .addCase(update.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(update.fulfilled, (state, action: PayloadAction<FeePayment>) => {
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
        state.error = action.error.message || "Failed to update fee payment"
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
        state.error = action.error.message || "Failed to remove fee payment"
      })
  },
})

export default feePaymentSlice.reducer
