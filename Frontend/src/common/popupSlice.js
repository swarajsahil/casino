import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {POPUP_API_URL} from "../app/constants";
const API_URL = import.meta.env.VITE_API_URL;
// Fetch popup
export const fetchPopup = createAsyncThunk("popup/fetchPopup", async () => {
  const response = await fetch(POPUP_API_URL);
  const data = await response.json();
  return data.popup || []; // Ensure response consistency
});

// Add new game
export const addPopup = createAsyncThunk("popup/addPopup", async (popupData) => {
  const response = await fetch(`${API_URL}/api/newPopup`, {
    method: "POST",
    body: popupData, // FormData for file uploads
  });
  const data = await response.json();
  return data.newPopup; // Ensure we return only the new game object
});


// Delete game
export const deletePopup = createAsyncThunk("popup/deletePopup", async () => {
  const data =await fetch(`${POPUP_API_URL}`, { method: "DELETE" });
  return data._id; // Ensure we return only the deleted game ID
});

// Slice
const popupSlice = createSlice({
  name: "popup",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopup.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopup.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPopup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addPopup.fulfilled, (state, action) => {
        // if (action.payload) {
        //   state.data = [action.payload, ...state.data]; // Add the new game at the top
        // }
        state.data.push(action.payload);
      })
      .addCase(deletePopup.fulfilled, (state, action) => {
        state.data = state.data.filter((g) => g._id !== action.payload);
      });
  },
});

export default popupSlice.reducer;