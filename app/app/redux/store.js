import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import productReducer from "./productReducer";

export default configureStore ({
    reducer:{
        cart:cartReducer,
        product:productReducer
    }
})