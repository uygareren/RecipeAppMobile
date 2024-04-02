import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";



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
        logout: (state, action: PayloadAction<any>) => {

            const isLogout = action.payload;
            
            if(isLogout){
                state.userInfo = {
                    token:null,
                    id:null
                };
            }

           
        },
        setLang: (state, action: PayloadAction<any>) => {
            state.lang = action.payload;
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