import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

export interface GenericState<T> {
  items: T[]
  selectedItem: T | null
  loading: boolean
  error: string | null
}

export function createGenericSlice<T extends { id: string }>(
  name: string,
  service: any,
  initialState: GenericState<T> = {
    items: [],
    selectedItem: null,
    loading: false,
    error: null,
  },
) {
  // Async thunks
  const fetchAll = createAsyncThunk(`${name}/fetchAll`, async (params = {}, { rejectWithValue }) => {
    try {
      const response = await service.getAll(params)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || `Failed to fetch ${name}`)
    }
  })

  const fetchById = createAsyncThunk(`${name}/fetchById`, async (id: string, { rejectWithValue }) => {
    try {
      const response = await service.getById(id)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || `Failed to fetch ${name} by id`)
    }
  })

  const create = createAsyncThunk(`${name}/create`, async (data: Partial<T>, { rejectWithValue }) => {
    try {
      const response = await service.create(data)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || `Failed to create ${name}`)
    }
  })

  const update = createAsyncThunk(
    `${name}/update`,
    async ({ id, data }: { id: string; data: Partial<T> }, { rejectWithValue }) => {
      try {
        const response = await service.update(id, data)
        return response
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || `Failed to update ${name}`)
      }
    },
  )

  const remove = createAsyncThunk(`${name}/delete`, async (id: string, { rejectWithValue }) => {
    try {
      await service.delete(id)
      return id
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || `Failed to delete ${name}`)
    }
  })

  // Create the slice
  const slice = createSlice({
    name,
    initialState,
    reducers: {
      clearItems: (state) => {
        state.items = []
      },
      clearSelectedItem: (state) => {
        state.selectedItem = null
      },
      clearError: (state) => {
        state.error = null
      },
    },
    extraReducers: (builder) => {
      // fetchAll
      builder
        .addCase(fetchAll.pending, (state) => {
          state.loading = true
          state.error = null
        })
        .addCase(fetchAll.fulfilled, (state, action: PayloadAction<T[]>) => {
          state.loading = false
          state.items = action.payload
        })
        .addCase(fetchAll.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload as string
        })

      // fetchById
      builder
        .addCase(fetchById.pending, (state) => {
          state.loading = true
          state.error = null
        })
        .addCase(fetchById.fulfilled, (state, action: PayloadAction<T>) => {
          state.loading = false
          state.selectedItem = action.payload
        })
        .addCase(fetchById.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload as string
        })

      // create
      builder
        .addCase(create.pending, (state) => {
          state.loading = true
          state.error = null
        })
        .addCase(create.fulfilled, (state, action: PayloadAction<T>) => {
          state.loading = false
          state.items.push(action.payload)
        })
        .addCase(create.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload as string
        })

      // update
      builder
        .addCase(update.pending, (state) => {
          state.loading = true
          state.error = null
        })
        .addCase(update.fulfilled, (state, action: PayloadAction<T>) => {
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
          state.error = action.payload as string
        })

      // delete
      builder
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
          state.error = action.payload as string
        })
    },
  })

  return {
    slice,
    actions: {
      ...slice.actions,
      fetchAll,
      fetchById,
      create,
      update,
      remove,
    },
    reducer: slice.reducer,
  }
}
