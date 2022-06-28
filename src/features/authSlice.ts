import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "../app/store";

export interface AuthState {
  lastName: string | null;
  token: string | null;
}
const initialState: AuthState = {
  lastName: null,
  token: null,
};
export const authSlice=createSlice({
name:"auth",
initialState,
reducers:{
    setUser:(
      state,
        action:PayloadAction<{name:string;token:string}>
    )=>{
      localStorage.setItem(
        "user",
        JSON.stringify({
          name:action.payload.name,
          token:action.payload.token
        })
      )
      state.lastName=action.payload.name;
      state.token=action.payload.token


    },
    logout:(state)=>{
      localStorage.clear()
      state.lastName=null;
      state.token=null;
    }
}
})

 export const selectAuth=(state:RootState)=>state.auth;
 export const {setUser,logout}=authSlice.actions
 export default authSlice.reducer