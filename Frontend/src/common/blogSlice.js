import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {BLOG_API_URL} from "../app/constants";
const API_URL = import.meta.env.VITE_API_URL;
// Fetch All Blogs
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await fetch(BLOG_API_URL);
  const data = await response.json();
  return data.blogs || [];
});

// Fetch Blog by ID
export const fetchBlogsById = createAsyncThunk("blogs/fetchBlogsById", async (id) => {
  const response = await fetch(`${BLOG_API_URL}/${id}`);
  const data = await response.json();
  return data.blogs || {}; // Assuming backend returns a single blog object
});

// Add New Blog
export const addBlog = createAsyncThunk("blogs/addBlog", async (blogData) => {
  const response = await fetch(`${API_URL}/api/newBlogs`, {
    method: "POST",
    body: blogData, // No need to set headers; browser will handle it
  });
  return await response.json();
});
// Update Blog
export const updateBlog = createAsyncThunk("blogs/updateBlog", async ({ id, updatedData }) => {
  const response = await fetch(`${BLOG_API_URL}/${id}`, {
    method: "PUT",
    body: updatedData, // Sending FormData directly
  });
  return await response.json();
});

// Delete Blog
export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (id) => {
  await fetch(`${BLOG_API_URL}/${id}`, {
    method: "DELETE",
  });
  return id;
});

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBlogsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogsById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBlog = action.payload;
      })
      .addCase(fetchBlogsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      builder.addCase(addBlog.fulfilled, (state, action) => {
        state.data = [action.payload, ...state.data]; // Add new blog at the beginning
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.data.findIndex((blog) => blog._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.data = state.data.filter((blog) => blog._id !== action.payload);
      });
  },
});

export default blogSlice.reducer;
