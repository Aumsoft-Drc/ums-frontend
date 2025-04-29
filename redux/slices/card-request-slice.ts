import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { CardRequestService } from "@/services/card-request-service"

interface CardRequest {
  id: string
  studentId: string
  studentName: string
  requestDate: string
  status: "pending" | "approved" | "rejected"
  cardType: string
  reason: string
  approvedBy?: string
  approvedDate?: string
}

interface CardRequestState {
  items: CardRequest[]
  selectedItem: CardRequest | null
  loading: boolean
  error: string | null
}

const initialState: CardRequestState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
}

export const fetchAllCardRequests = createAsyncThunk("cardRequests/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await CardRequestService.getAll()
    return response
  } catch (error) {
    return rejectWithValue("Failed to fetch card requests")
  }
})

export const fetchCardRequestById = createAsyncThunk(
  "cardRequests/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await CardRequestService.getById(id)
      return response
    } catch (error) {
      return rejectWithValue("Failed to fetch card request")
    }
  },
)

export const createCardRequest = createAsyncThunk(
  "cardRequests/create",
  async (data: Omit<CardRequest, "id">, { rejectWithValue }) => {
    try {
      const response = await CardRequestService.create(data)
      return response
    } catch (error) {
      return rejectWithValue("Failed to create card request")
    }
  },
)

export const updateCardRequest = createAsyncThunk(
  "cardRequests/update",
  async ({ id, data }: { id: string; data: Partial<CardRequest> }, { rejectWithValue }) => {
    try {
      const response = await CardRequestService.update(id, data)
      return response
    } catch (error) {
      return rejectWithValue("Failed to update card request")
    }
  },
)

export const removeCardRequest = createAsyncThunk("cardRequests/remove", async (id: string, { rejectWithValue }) => {
  try {
    await CardRequestService.remove(id)
    return id
  } catch (error) {
    return rejectWithValue("Failed to remove card request")
  }
})

const cardRequestSlice = createSlice({
  name: "cardRequests",
  initialState,
  reducers: {
    clearSelectedCardRequest: (state) => {
      state.selectedItem = null
    },
    clearCardRequestsError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllCardRequests.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllCardRequests.fulfilled, (state, action: PayloadAction<CardRequest[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchAllCardRequests.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch By Id
      .addCase(fetchCardRequestById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCardRequestById.fulfilled, (state, action: PayloadAction<CardRequest>) => {
        state.loading = false
        state.selectedItem = action.payload
      })
      .addCase(fetchCardRequestById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Create
      .addCase(createCardRequest.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createCardRequest.fulfilled, (state, action: PayloadAction<CardRequest>) => {
        state.loading = false
        state.items.push(action.payload)
      })
      .addCase(createCardRequest.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Update
      .addCase(updateCardRequest.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCardRequest.fulfilled, (state, action: PayloadAction<CardRequest>) => {
        state.loading = false
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
        if (state.selectedItem && state.selectedItem.id === action.payload.id) {
          state.selectedItem = action.payload
        }
      })
      .addCase(updateCardRequest.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Remove
      .addCase(removeCardRequest.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeCardRequest.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false
        state.items = state.items.filter((item) => item.id !== action.payload)
        if (state.selectedItem && state.selectedItem.id === action.payload) {
          state.selectedItem = null
        }
      })
      .addCase(removeCardRequest.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearSelectedCardRequest, clearCardRequestsError } = cardRequestSlice.actions
export default cardRequestSlice.reducer
