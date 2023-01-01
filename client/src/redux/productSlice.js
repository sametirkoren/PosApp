import {createSlice} from "@reduxjs/toolkit";


const productSlice = createSlice({
    name:"product",
    initialState: {
        productItems: [],
    },
    reducers: {
        productList: (state, action) => {
            state.productItems = action.payload
        },
       
    },
})

export const {productList} = productSlice.actions
export default productSlice.reducer;