import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product-list/productListSlice";
export const store =configureStore({
    reducer:{
        product:productReducer
    }
})