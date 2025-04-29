import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { postService } from "@/services/post-service"

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: {
    id: string
    name: string
  }
  author: {
    id: string
    name: string
  }
  tags: {
    id: string
    name: string
  }[]
  status: string
  publishedAt: string
  updatedAt: string
  featuredImage?: string
}

interface PostState {
  items: Post[]
  selectedItem: Post | null
  loading: boolean
  error: string | null
}

const initialState: PostState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
}

export const fetchAll = createAsyncThunk("posts/fetchAll", async () => {
  const response = await postService.getAll()
  return response
})

export const fetchById = createAsyncThunk("posts/fetchById", async (id: string) => {
  const response = await postService.getById(id)
  return response
})

export const create = createAsyncThunk("posts/create", async (data: Partial<Post>) => {
  const response = await postService.create(data)
  return response
})

export const update = createAsyncThunk("posts/update", async ({ id, data }: { id: string; data: Partial<Post> }) => {
  const response = await postService.update(id, data)
  return response
})

export const remove = createAsyncThunk("posts/remove", async (id: string) => {
  await postService.remove(id)
  return id
})

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAll.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch posts"
      })
      .addCase(fetchById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchById.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false
        state.selectedItem = action.payload
      })
      .addCase(fetchById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch post"
      })
      .addCase(create.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(create.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false
        state.items.push(action.payload)
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to create post"
      })
      .addCase(update.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(update.fulfilled, (state, action: PayloadAction<Post>) => {
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
        state.error = action.error.message || "Failed to update post"
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
        state.error = action.error.message || "Failed to remove post"
      })
  },
})

export default postSlice.reducer
