import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { tagService } from "@/services/tag-service"

export interface Tag {
  id: string
  name: string
  slug: string
  postsCount: number
}

interface TagState {
  items: Tag[]
  selectedItem: Tag | null
  loading: boolean
  error: string | null
}

const initialState: TagState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
}

export const fetchAll = createAsyncThunk("tags/fetchAll", async () => {
  const response = await tagService.getAll()
  return response
})

export const fetchById = createAsyncThunk("tags/fetchById", async (id: string) => {
  const response = await tagService.getById(id)
  return response
})

export const create = createAsyncThunk("tags/create", async (data: Partial<Tag>) => {
  const response = await tagService.create(data)
  return response
})

export const update = createAsyncThunk("tags/update", async ({ id, data }: { id: string; data: Partial<Tag> }) => {
  const response = await tagService.update(id, data)
  return response
})

export const remove = createAsyncThunk("tags/remove", async (id: string) => {
  await tagService.remove(id)
  return id
})

const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAll.fulfilled, (state, action: PayloadAction<Tag[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch tags"
      })
      .addCase(fetchById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchById.fulfilled, (state, action: PayloadAction<Tag>) => {
        state.loading = false
        state.selectedItem = action.payload
      })
      .addCase(fetchById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch tag"
      })
      .addCase(create.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(create.fulfilled, (state, action: PayloadAction<Tag>) => {
        state.loading = false
        state.items.push(action.payload)
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to create tag"
      })
      .addCase(update.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(update.fulfilled, (state, action: PayloadAction<Tag>) => {
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
        state.error = action.error.message || "Failed to update tag"
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
        state.error = action.error.message || "Failed to remove tag"
      })
  },
})

export default tagSlice.reducer
