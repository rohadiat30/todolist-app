import { configureStore } from "@reduxjs/toolkit";
import { todosApi } from "./services/todosApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([todosApi.middleware]),
});

setupListeners(store.dispatch);