import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { categoryService } from "@/services/category-service"

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  postsCount: number
}

interface CategoryState {
  items: Category[]
  selectedItem: Category | null
  loading: boolean
  error: string | null
}

const initialState: CategoryState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
}

export const fetchAll = createAsyncThunk("categories/fetchAll", async () => {
  const response = await categoryService.getAll()
  return response
})

export const fetchById = createAsyncThunk("categories/fetchById", async (id: string) => {
  const response = await categoryService.getById(id)
  return response
})

export const create = createAsyncThunk("categories/create", async (data: Partial<Category>) => {
  const response = await categoryService.create(data)
  return response
})

export const update = createAsyncThunk(
  "categories/update",
  async ({ id, data }: { id: string; data: Partial<Category> }) => {
    const response = await categoryService.update(id, data)
    return response
  },
)

export const remove = createAsyncThunk("categories/remove", async (id: string) => {
  await categoryService.remove(id)
  return id
})

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAll.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch categories"
      })
      .addCase(fetchById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchById.fulfilled, (state, action: PayloadAction<Category>) => {
        state.loading = false
        state.selectedItem = action.payload
      })
      .addCase(fetchById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch category"
      })
      .addCase(create.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(create.fulfilled, (state, action: PayloadAction<Category>) => {
        state.loading = false
        state.items.push(action.payload)
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to create category"
      })
      .addCase(update.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(update.fulfilled, (state, action: PayloadAction<Category>) => {
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
        state.error = action.error.message || "Failed to update category"
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
        state.error = action.error.message || "Failed to remove category"
      })
  },
})

export default categorySlice.reducer
