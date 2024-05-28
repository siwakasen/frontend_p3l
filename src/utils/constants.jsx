"use client";

import { createSlice } from "@reduxjs/toolkit";

export const API_URL = "http://127.0.0.1:8000/api";
export const API_URL_IMAGE = "http://127.0.0.1:8000/storage/";

export function convertToSlug(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function slugToRealName(slug) {
  let query = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  if (query.includes("1 2")) query = query.replace("1 2", "1/2");

  return query;
}

const initialState = {
  activeDir: "ltr",
  activeMode: "light",
  SidebarWidth: 270,
  MiniSidebarWidth: 87,
  TopbarHeight: 70,
  isLayout: "boxed",
  isCollapse: false,
  isSidebarHover: false,
  isMobileSidebar: false,
  isHorizontal: false,
  isLanguage: "id",
  isCardShadow: true,
  borderRadius: 7,
};

const CustomizerSlice = createSlice({
  name: "customizer",
  initialState: initialState,
  reducers: {
    setTheme: (state, action) => {
      state.activeTheme = action.payload;
    },
    setDarkMode: (state, action) => {
      state.activeMode = action.payload;
    },

    setDir: (state, action) => {
      state.activeDir = action.payload;
    },
    setLanguage: (state, action) => {
      state.isLanguage = action.payload;
    },
    setCardShadow: (state, action) => {
      state.isCardShadow = action.payload;
    },
    toggleSidebar: (state) => {
      state.isCollapse = !state.isCollapse;
    },
    hoverSidebar: (state, action) => {
      state.isSidebarHover = action.payload;
    },
    toggleMobileSidebar: (state) => {
      state.isMobileSidebar = !state.isMobileSidebar;
    },
    toggleLayout: (state, action) => {
      state.isLayout = action.payload;
    },
    toggleHorizontal: (state, action) => {
      state.isHorizontal = action.payload;
    },
    setBorderRadius: (state, action) => {
      state.borderRadius = action.payload;
    },
  },
});

const user = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUserLogin: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserLogin } = user.actions;

export const userReducer = user.reducer;

export const {
  setTheme,
  setDarkMode,
  setDir,
  toggleSidebar,
  hoverSidebar,
  toggleMobileSidebar,
  toggleLayout,
  setBorderRadius,
  toggleHorizontal,
  setLanguage,
  setCardShadow,
} = CustomizerSlice.actions;

export default CustomizerSlice.reducer;
export const CustomizerReducer = CustomizerSlice.reducer;
