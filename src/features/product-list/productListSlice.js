import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchAllProducts,
  fetchBrands,
  fetchCategories,
  fetchProductById,
  fetchProductsByFilter,
  updateProduct,
} from "./productListApi";

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: "idle",
  totalItems: 0,
  selectedProducted: null,
};
export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);
export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilter",
  async ({ filter, sort, pagination }) => {
    // console.log({pagination: pagination});
    const response = await fetchProductsByFilter(filter, sort, pagination);

    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);
export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    clearSelectedProduct:(state)=>{
      state.selectedProducted = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProducted = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // let f;
        // var filteredElements = state.products.filter(function (product, index) {
        //   f = index;
        //   return product.id == action.payload.id;
        // });

        // if (!filteredElements.length) {
        //   return false;
        // }
        // state.products[f] = action.payload;

        if (Array.isArray(state.products)) {
          // Check if products is an array
          console.log("true");
          const index = state.products.findIndex(
            (product) => product.id === action.payload.id
          );

          state.products[index] = action.payload;
        } else {
          // Handle the case where products is not an array (e.g., initialize as an empty array)
          console.error("Products state is not an array!");
        }
      });
  },
});

export const { increment } = productSlice.actions;
export const {clearSelectedProduct} = productSlice.actions;

export const selectAllProducts = (state) => {
  const comingData = state.product.products;
  return comingData;
};
export const selectTotalItems = (state) => {
  const comingData = state.product.totalItems;
  return comingData;
};
export const selectBrands = (state) => {
  const comingData = state.product.brands;
  return comingData;
};
export const selectCategories = (state) => {
  const comingData = state.product.categories;
  return comingData;
};

export const selectProductById = (state) => {
  const comingData = state.product.selectedProducted;
  return comingData;
};
export default productSlice.reducer;
