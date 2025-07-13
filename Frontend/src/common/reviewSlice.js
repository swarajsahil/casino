// src/redux/reviewSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {REVIEW_API_URL} from "../app/constants";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

// Fetch approved reviews (for website display)
export const fetchReviews = createAsyncThunk("reviews/fetchReviews", async () => {
  const response = await axios.get(`${REVIEW_API_URL}`);
  return response.data;
});

// Fetch all reviews (for admin panel)
export const fetchAllReviews = createAsyncThunk("reviews/fetchAllReviews", async () => { 
  const response = await axios.get(`${REVIEW_API_URL}/all`);
  return response.data;
});

// Add a new review
export const addReview = createAsyncThunk("reviews/addReview", async (reviewData) => {
  const response = await axios.post(`${API_URL}/api/newReviews`, reviewData);
  return response.data;
});

// Approve a review
export const approveReview = createAsyncThunk("reviews/approveReview", async (id) => {
    const response = await axios.patch(`${API_URL}/api/reviews/approve/${id}`);
    return response.data;
  });

// Delete a review
export const deleteReview = createAsyncThunk("reviews/deleteReview", async (id) => {
  await axios.delete(`${REVIEW_API_URL}/${id}`);
  return id;
});

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    allReviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllReviews.fulfilled, (state, action) => {
        state.allReviews = action.payload;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.allReviews.push(action.payload.review);
      })
      .addCase(approveReview.fulfilled, (state, action) => {
        state.allReviews = state.allReviews.map((review) =>
          review._id === action.payload.review._id ? { ...review, approved: true } : review
        );
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.allReviews = state.allReviews.filter((review) => review._id !== action.payload);
      });
  },
});

export default reviewSlice.reducer;
