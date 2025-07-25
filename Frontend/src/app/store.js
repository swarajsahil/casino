import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../common/blogSlice";
import gameReducer from "../common/gameSlice";
import casinoReducer from "../common/casinoSlice";
import reviewReducer from "../common/reviewSlice";
import popupReducer from "../common/popupSlice";
import faqReducer from "../common/faqSlice";
import promotionReducer from "../common/promotionSlice";
import subscriberReducer from "../common/subscriberSlice";
const store = configureStore({
  reducer: {
    blogs: blogReducer,
    games: gameReducer,
    casinos: casinoReducer,
    reviews: reviewReducer,
    popup:popupReducer,
    faq:faqReducer,
    promotion:promotionReducer,
    subscriber:subscriberReducer
  },
});

export default store;