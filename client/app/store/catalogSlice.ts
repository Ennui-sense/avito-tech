import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type DisplayStyle = "line" | "block";
export type Category = "auto" | "electronics" | "real_estate";
export type SortValue =
  | "new"
  | "old"
  | "min-name"
  | "max-name"
  | "min-price"
  | "max-price";

interface CatalogState {
  search: string;
  categories: Category[];
  needsRevision: boolean;
  sort: SortValue;
  displayStyle: DisplayStyle;
  currentPage: number;
}

const initialState: CatalogState = {
  search: "",
  categories: [],
  needsRevision: false,
  sort: "new",
  displayStyle: "block",
  currentPage: 1,
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.currentPage = 1;
    },

    toggleCategory(state, action: PayloadAction<Category>) {
      const category = action.payload;

      if (state.categories.includes(category)) {
        state.categories = state.categories.filter((item) => item !== category);
      } else {
        state.categories.push(category);
      }

      state.currentPage = 1;
    },

    setNeedsRevision(state, action: PayloadAction<boolean>) {
      state.needsRevision = action.payload;
      state.currentPage = 1;
    },

    setSort(state, action: PayloadAction<SortValue>) {
      state.sort = action.payload;
      state.currentPage = 1;
    },

    setDisplayStyle(state, action: PayloadAction<DisplayStyle>) {
      state.displayStyle = action.payload;
    },

    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    resetFilters(state) {
      state.categories = [];
      state.needsRevision = false;
      state.sort = "new";
      state.currentPage = 1;
    },
  },
});

export const {
  setSearch,
  toggleCategory,
  setNeedsRevision,
  setSort,
  setDisplayStyle,
  setCurrentPage,
  resetFilters,
} = catalogSlice.actions;

export default catalogSlice.reducer;