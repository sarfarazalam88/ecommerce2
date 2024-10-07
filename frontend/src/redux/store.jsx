import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.jsx"
import messageReducer from "./messageSlice.jsx"
import socketReducer from "./socketSlice.js"
const store = configureStore({
    reducer: {
        user: userReducer,
        message: messageReducer,
        socket: socketReducer
    }
});
export default store;