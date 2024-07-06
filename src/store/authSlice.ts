import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk('auth/login', async (credentials: { email: string; password: string }) => {
  const response = await api.post('/auth/login', credentials);
  return response.data.token;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to login';
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
