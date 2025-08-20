import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {BLOG_API_URL} from "../app/constants";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
// Fetch All Blogs
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await fetch(BLOG_API_URL);
  const data = await response.json();
  return data.blogs || [];
});
// Fetch all blogs (for admin panel)
export const fetchAllBlogs= createAsyncThunk("blogs/fetchAllBlogs", async () => { 
  const response = await fetch(`${BLOG_API_URL}/all`);
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
// Approve a Blog
export const approveBlog = createAsyncThunk("blogs/approveReview", async (id) => {
    const response = await axios.patch(`${API_URL}/api/blogs/approve/${id}`);
    return response.data;
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
    blogs: [],          // For approved blogs (public view)
    allBlogs: [],        // For all blogs (admin view)
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
        state.blogs = action.payload;  // Store approved blogs here
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.allBlogs = action.payload;  // Store all blogs here
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBlogsById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBlog = action.payload;  // Store all blogs here
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.allBlogs.unshift(action.payload); // Add to allBlogs
      })
      .addCase(approveBlog.fulfilled, (state, action) => {
        state.allBlogs = state.allBlogs.map((blog) =>
          blog._id === action.payload.blog._id ? { ...blog, approved: true } : blog
        );
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        // Update in both arrays if needed
        state.allBlogs = state.allBlogs.map(blog => 
          blog._id === action.payload._id ? action.payload : blog
        );
        state.blogs = state.blogs.map(blog => 
          blog._id === action.payload._id ? action.payload : blog
        );
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.allBlogs = state.allBlogs.filter(blog => blog._id !== action.payload);
        state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
      });
  },
});

export default blogSlice.reducer;
