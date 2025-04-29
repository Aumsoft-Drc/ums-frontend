import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { contactMessageService } from "@/services/contact-message-service"

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: string
  createdAt: string
  repliedAt?: string
  reply?: string
}

interface ContactMessageState {
  items: ContactMessage[]
  selectedItem: ContactMessage | null
  loading: boolean
  error: string | null
}

const initialState: ContactMessageState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
}

export const fetchAll = createAsyncThunk("contactMessages/fetchAll", async () => {
  const response = await contactMessageService.getAll()
  return response
})

export const fetchById = createAsyncThunk("contactMessages/fetchById", async (id: string) => {
  const response = await contactMessageService.getById(id)
  return response
})

export const create = createAsyncThunk("contactMessages/create", async (data: Partial<ContactMessage>) => {
  const response = await contactMessageService.create(data)
  return response
})

export const update = createAsyncThunk(
  "contactMessages/update",
  async ({ id, data }: { id: string; data: Partial<ContactMessage> }) => {
    const response = await contactMessageService.update(id, data)
    return response
  },
)

export const remove = createAsyncThunk("contactMessages/remove", async (id: string) => {
  await contactMessageService.remove(id)
  return id
})

const contactMessageSlice = createSlice({
  name: "contactMessages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAll.fulfilled, (state, action: PayloadAction<ContactMessage[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch contact messages"
      })
      .addCase(fetchById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchById.fulfilled, (state, action: PayloadAction<ContactMessage>) => {
        state.loading = false
        state.selectedItem = action.payload
      })
      .addCase(fetchById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch contact message"
      })
      .addCase(create.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(create.fulfilled, (state, action: PayloadAction<ContactMessage>) => {
        state.loading = false
        state.items.push(action.payload)
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to create contact message"
      })
      .addCase(update.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(update.fulfilled, (state, action: PayloadAction<ContactMessage>) => {
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
        state.error = action.error.message || "Failed to update contact message"
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
        state.error = action.error.message || "Failed to remove contact message"
      })
  },
})

export default contactMessageSlice.reducer
