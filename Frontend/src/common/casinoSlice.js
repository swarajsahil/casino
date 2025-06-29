import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {CASINO_API_URL} from "../app/constants";
const API_URL = import.meta.env.VITE_API_URL;

// Fetch All Casinos
export const fetchCasinos = createAsyncThunk("casinos/fetchCasinos", async () => {
  const response = await fetch(CASINO_API_URL);
  const data = await response.json();
  return data.casinos || []; // Adjusted to match backend response
});

// Add New Casino
export const addCasino = createAsyncThunk("casinos/addCasino", async (casinoData) => {
  const response = await fetch(`${API_URL}/api/newCasino`, {
    method: "POST",
    body: casinoData, // Using FormData for image upload
  });
  const data = await response.json();
  return data.newCasino; // Match backend response
});

// Update Casino
export const updateCasino = createAsyncThunk("casinos/updateCasino", async ({ id, casinoData }) => {
  const response = await fetch(`${CASINO_API_URL}/${id}`, {
    method: "PUT",
    body: casinoData, // Using FormData for image upload
  });
  const data = await response.json();
  return data.casino; // Match backend response
});

// Delete Casino
export const deleteCasino = createAsyncThunk("casinos/deleteCasino", async (id) => {
  await fetch(`${CASINO_API_URL}/${id}`, {
    method: "DELETE",
  });
  return id; // Since backend doesn't return anything, we return the ID to remove it from state
});

const casinoSlice = createSlice({
  name: "casinos",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCasinos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCasinos.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCasinos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCasino.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateCasino.fulfilled, (state, action) => {
        const index = state.data.findIndex((casino) => casino._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteCasino.fulfilled, (state, action) => {
        state.data = state.data.filter((casino) => casino._id !== action.payload);
      });
  },
});

export default casinoSlice.reducer;