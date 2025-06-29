import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {GAMES_API_URL} from "../app/constants";
const API_URL = import.meta.env.VITE_API_URL;
// Fetch all games
export const fetchGames = createAsyncThunk("games/fetchGames", async () => {
  const response = await fetch(GAMES_API_URL);
  const data = await response.json();
  return data.games || []; // Ensure response consistency
});
// Fetch Game by ID
export const fetchGamesById = createAsyncThunk("games/fetchGamesById", async (id) => {
  const response = await fetch(`${GAMES_API_URL}/${id}`);
  const data = await response.json();
  return data.games || {}; // Assuming backend returns a single blog object
});
// Add new game
export const addGame = createAsyncThunk("games/addGame", async (gameData) => {
  const response = await fetch(`${API_URL}/api/newGames`, {
    method: "POST",
    body: gameData, // FormData for file uploads
  });
  const data = await response.json();
  return data.newGame; // Ensure we return only the new game object
});

// Update game
export const updateGame = createAsyncThunk("games/updateGame", async ({ id, gameData }) => {
  const response = await fetch(`${GAMES_API_URL}/${id}`, {
    method: "PUT",
    body: gameData, // Using FormData for image upload
  });
  const data = await response.json();
  return data.game;
});

// Delete game
export const deleteGame = createAsyncThunk("games/deleteGame", async (id) => {
  await fetch(`${GAMES_API_URL}/${id}`, { method: "DELETE" });
  return id;
});

// Slice
const gameSlice = createSlice({
  name: "games",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addGame.fulfilled, (state, action) => {
        // if (action.payload) {
        //   state.data = [action.payload, ...state.data]; // Add the new game at the top
        // }
        state.data.push(action.payload);
      })
      .addCase(updateGame.fulfilled, (state, action) => {
        const index = state.data.findIndex(game => game._id === action.payload?._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteGame.fulfilled, (state, action) => {
        state.data = state.data.filter((g) => g._id !== action.payload);
      });
  },
});

export default gameSlice.reducer;