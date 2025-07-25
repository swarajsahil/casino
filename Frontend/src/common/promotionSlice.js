import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {PROMOTION_API_URL} from "../app/constants";
// Fetch Promotion
export const fetchPromotion = createAsyncThunk("promotion/fetchPromotion", async () => {
  const response = await fetch(PROMOTION_API_URL);
  const data = await response.json();
  return data.promotions || [];
});

// Fetch Promotion by ID
export const fetchPromotionsById = createAsyncThunk("promotion/fetchPromotionsById", async (id) => {
  const response = await fetch(`${PROMOTION_API_URL}/${id}`);
  const data = await response.json();
  return data.promotions || {}; // Assuming backend returns a single blog object
});

// Add New Promotion
export const addPromotion = createAsyncThunk("promotion/newPromotion", async (promotionData) => {
  const response = await fetch(`${PROMOTION_API_URL}`, {
    method: "POST",
    body: promotionData, // No need to set headers; browser will handle it
  });
  return await response.json();
});
// Update Promotion
export const updatePromotion = createAsyncThunk("promotion/updatePromotion", async ({ id, updatedData }) => {
  const response = await fetch(`${PROMOTION_API_URL}/${id}`, {
    method: "PUT",
    body: updatedData, // Sending FormData directly
  });
  return await response.json();
});

// Delete Promotion
export const deletePromotion = createAsyncThunk("promotion/deletePromotion", async (id) => {
  await fetch(`${PROMOTION_API_URL}/${id}`, {
    method: "DELETE",
  });
  return id;
});

const promotionSlice = createSlice({
  name: "promotion",
  initialState: {
    promotion: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromotion.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPromotion.fulfilled, (state, action) => {
        state.loading = false;
        state.promotion = action.payload; 
      })
      .addCase(fetchPromotion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPromotionsById.fulfilled,(state,action)=>{
        state.loading=false;
        state.promotion=action.payload;
      })
      .addCase(addPromotion.fulfilled, (state, action) => {
        state.promotion.unshift(action.payload);
      })
      .addCase(updatePromotion.fulfilled, (state, action) => {
        state.promotion = state.promotion.map(promotion => 
          promotion._id === action.payload._id ? action.payload : promotion
        );
      })
      .addCase(deletePromotion.fulfilled, (state, action) => {
        state.promotion = state.promotion.filter(promotion => promotion._id !== action.payload);
      });
  },
});

export default promotionSlice.reducer;
