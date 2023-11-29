import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    userInfo:{
        token: null,
        id: null
    } as any,
    lang: "tr"
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.userInfo = action.payload;
        },
        updateUser: (state, action: PayloadAction<any>) => {
            state.userInfo = {...state.userInfo, ...action.payload};
        },
        clear: (state) => {
            state.userInfo = {
                token : null,
                id : null
            }
        }
    }

})

export const userSliceActions = {...userSlice.actions}
export default userSlice.reducer