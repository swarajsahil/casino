import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FAQ_API_URL } from "../app/constants";
const API_URL = import.meta.env.VITE_API_URL ;

// Fetch All FAQs
export const fetchFAQs = createAsyncThunk("faqs/fetchFAQs", async () => {
  const response = await fetch(FAQ_API_URL);
  const data = await response.json();
  return data || [];
});


// Add New FAQ
export const addFAQ = createAsyncThunk("faqs/addFAQ", async (faqData) => {
  const response = await fetch(`${API_URL}/api/newFaq`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(faqData),
  });
  return await response.json();
});

// Fetch FAQ by ID
export const fetchFAQById = createAsyncThunk("faqs/fetchFAQById", async (id) => {
  const response = await fetch(`${FAQ_API_URL}/${id}`);
  const data = await response.json();
  return data.faq || {};
});

// Update FAQ
export const updateFAQ = createAsyncThunk("faqs/updateFAQ", async ({ id, updatedData }) => {
  const response = await fetch(`${FAQ_API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  return await response.json();
});

// Delete FAQ
export const deleteFAQ = createAsyncThunk("faqs/deleteFAQ", async (id) => {
  await fetch(`${FAQ_API_URL}/${id}`, {
    method: "DELETE",
  });
  return id;
});

const faqSlice = createSlice({
  name: "faqs",
  initialState: {
    data: [],
    selectedFAQ: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFAQs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFAQs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFAQs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFAQById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFAQById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedFAQ = action.payload;
      })
      .addCase(fetchFAQById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addFAQ.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFAQ.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [action.payload, ...state.data];
      })
      .addCase(addFAQ.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateFAQ.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFAQ.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(faq => faq._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateFAQ.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteFAQ.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFAQ.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(faq => faq._id !== action.payload);
      })
      .addCase(deleteFAQ.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default faqSlice.reducer;