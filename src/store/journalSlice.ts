import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
}

interface JournalState {
  entries: JournalEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: JournalState = {
  entries: [],
  loading: false,
  error: null,
};

export const getEntries = createAsyncThunk('journal/getEntries', async (_, { getState }) => {
  const state = getState() as any;
  const response = await api.get('/journal', {
    headers: { Authorization: `Bearer ${state.auth.token}` },
  });
  return response.data;
});

export const addEntry = createAsyncThunk('journal/addEntry', async (entry: JournalEntry, { getState }) => {
  const state = getState() as any;
  const response = await api.post('/journal', entry, {
    headers: { Authorization: `Bearer ${state.auth.token}` },
  });
  return response.data;
});

export const updateEntry = createAsyncThunk('journal/updateEntry', async (entry: JournalEntry, { getState }) => {
  const state = getState() as any;
  const response = await api.put(`/journal`, entry, {
    headers: { Authorization: `Bearer ${state.auth.token}` },
  });
  return response.data;
});

export const deleteEntry = createAsyncThunk('journal/deleteEntry', async (id: number, { getState }) => {
  const state = getState() as any;
  await api.delete(`/journal`, {
    headers: { Authorization: `Bearer ${state.auth.token}` },
  });
  return id;
});

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEntries.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getEntries.fulfilled, (state, action) => {
      state.entries = action.payload;
      state.loading = false;
    });
    builder.addCase(getEntries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch entries';
    });
    builder.addCase(getEntryById.fulfilled, (state, action) => {
      const entry = action.payload;
      const existingEntry = state.entries.find(e => e.id === entry.id);
      if (existingEntry) {
        Object.assign(existingEntry, entry);
      } else {
        state.entries.push(entry);
      }
    });
    builder.addCase(addEntry.fulfilled, (state, action) => {
      state.entries.push(action.payload);
    });
    builder.addCase(updateEntry.fulfilled, (state, action) => {
      const updatedEntry = action.payload;
      const existingEntry = state.entries.find(e => e.id === updatedEntry.id);
      if (existingEntry) {
        Object.assign(existingEntry, updatedEntry);
      }
    });
    builder.addCase(deleteEntry.fulfilled, (state, action) => {
      state.entries = state.entries.filter(e => e.id !== action.payload);
    });
  },
});

export default journalSlice.reducer;
