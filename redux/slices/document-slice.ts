import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { DocumentService } from "@/services/document-service"

interface Document {
  id: string
  title: string
  description: string
  fileUrl: string
  fileType: string
  fileSize: number
  uploadedBy: string
  uploadDate: string
  category: string
  tags: string[]
  isPublic: boolean
  downloadCount: number
}

interface DocumentState {
  items: Document[]
  selectedItem: Document | null
  loading: boolean
  error: string | null
}

const initialState: DocumentState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
}

export const fetchAllDocuments = createAsyncThunk("documents/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await DocumentService.getAll()
    return response
  } catch (error) {
    return rejectWithValue("Failed to fetch documents")
  }
})

export const fetchDocumentById = createAsyncThunk("documents/fetchById", async (id: string, { rejectWithValue }) => {
  try {
    const response = await DocumentService.getById(id)
    return response
  } catch (error) {
    return rejectWithValue("Failed to fetch document")
  }
})

export const createDocument = createAsyncThunk(
  "documents/create",
  async (data: Omit<Document, "id">, { rejectWithValue }) => {
    try {
      const response = await DocumentService.create(data)
      return response
    } catch (error) {
      return rejectWithValue("Failed to create document")
    }
  },
)

export const updateDocument = createAsyncThunk(
  "documents/update",
  async ({ id, data }: { id: string; data: Partial<Document> }, { rejectWithValue }) => {
    try {
      const response = await DocumentService.update(id, data)
      return response
    } catch (error) {
      return rejectWithValue("Failed to update document")
    }
  },
)

export const removeDocument = createAsyncThunk("documents/remove", async (id: string, { rejectWithValue }) => {
  try {
    await DocumentService.remove(id)
    return id
  } catch (error) {
    return rejectWithValue("Failed to remove document")
  }
})

const documentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    clearSelectedDocument: (state) => {
      state.selectedItem = null
    },
    clearDocumentsError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllDocuments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllDocuments.fulfilled, (state, action: PayloadAction<Document[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchAllDocuments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch By Id
      .addCase(fetchDocumentById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDocumentById.fulfilled, (state, action: PayloadAction<Document>) => {
        state.loading = false
        state.selectedItem = action.payload
      })
      .addCase(fetchDocumentById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Create
      .addCase(createDocument.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createDocument.fulfilled, (state, action: PayloadAction<Document>) => {
        state.loading = false
        state.items.push(action.payload)
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Update
      .addCase(updateDocument.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateDocument.fulfilled, (state, action: PayloadAction<Document>) => {
        state.loading = false
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
        if (state.selectedItem && state.selectedItem.id === action.payload.id) {
          state.selectedItem = action.payload
        }
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Remove
      .addCase(removeDocument.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeDocument.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false
        state.items = state.items.filter((item) => item.id !== action.payload)
        if (state.selectedItem && state.selectedItem.id === action.payload) {
          state.selectedItem = null
        }
      })
      .addCase(removeDocument.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearSelectedDocument, clearDocumentsError } = documentSlice.actions
export default documentSlice.reducer
