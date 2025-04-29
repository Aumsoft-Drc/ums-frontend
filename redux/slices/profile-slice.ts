import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { profileService } from "@/services/profile-service"

export const fetchUserProfile = createAsyncThunk("profile/fetchUserProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await profileService.getUserProfile()
    return response
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async (profileData: any, { rejectWithValue }) => {
    try {
      const response = await profileService.updateUserProfile(profileData)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

interface ProfileState {
  profile: any | null
  loading: boolean
  error: string | null
  success: boolean
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
  success: false,
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileState: (state) => {
      state.error = null
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.profile = action.payload
        state.success = true
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.success = false
      })
  },
})

export const { clearProfileState } = profileSlice.actions
export default profileSlice.reducer
