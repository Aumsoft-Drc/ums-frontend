import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { courseService } from "@/services/course-service"

export const fetchCourses = createAsyncThunk("courses/fetchCourses", async (_, { rejectWithValue }) => {
  try {
    const response = await courseService.getAllCourses()
    return response
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const fetchCourseById = createAsyncThunk("courses/fetchCourseById", async (id: string, { rejectWithValue }) => {
  try {
    const response = await courseService.getCourseById(id)
    return response
  } catch (error) {
    return rejectWithValue(error)
  }
})

interface CourseState {
  courses: any[]
  currentCourse: any | null
  loading: boolean
  error: string | null
}

const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  loading: false,
  error: null,
}

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    clearCurrentCourse: (state) => {
      state.currentCourse = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false
        state.courses = action.payload
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCourseById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.currentCourse = action.payload
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearCurrentCourse } = courseSlice.actions
export default courseSlice.reducer
