import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer:{
        user: userReducer,
    }
})

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootStateType = ReturnType<typeof store.getState>

