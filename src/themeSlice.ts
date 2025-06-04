import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./app/store";

interface ThemeState {
  isDark: boolean;
}

const initialState: ThemeState = {
  isDark: false,
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleMode: (state:ThemeState) => {
            state.isDark = !(state.isDark);
        },
    },
})

export const { toggleMode } = themeSlice.actions;

export const selectIsDark = (state: RootState) => state.theme.isDark;

export default themeSlice.reducer;