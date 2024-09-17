import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated:false,
    isLoading:true,
    user:null
}

export const registerUser = createAsyncThunk('/auth/signup',
    async(formData)=>{
        const response = await axios.post('http://localhost:5000/api/auth/signup', 
            formData,
            {
            withCredentials:true,
            }
        );
        return response.data;
    });

    export const loginUser = createAsyncThunk('/auth/signin',
    async(formData)=>{
        const response = await axios.post('http://localhost:5000/api/auth/signin', 
            formData,
            {
            withCredentials:true,
            }
        );
        return response.data;
    });

    export const checkAuth = createAsyncThunk(
        "/auth/check-auth",
      
        async () => {
          const response = await axios.get(
            "http://localhost:5000/api/auth/check-auth",
            {
              withCredentials: true,
              headers: {
                "Cache-Control":
                  "no-store, no-cache, must-revalidate, proxy-revalidate",
              },
            }
          );
      
          return response.data;
        }
      );
      

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:(state,action)=>{
        
    },
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending, (state)=>{
            state.isLoading=true;
        }).addCase(registerUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isAuthenticated = false;//this is registration so isAuthenticated=false
            state.user = null;
        }).addCase(registerUser.rejected, (state)=>{
            state.isAuthenticated = false;
            state.user = null;
            state.isLoading = false;
        }).addCase(loginUser.pending, (state)=>{
            state.isLoading=true;
        }).addCase(loginUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isAuthenticated = action.payload.success;//this is login so isAuthenticated=false
            state.user = action.payload.success ? action.payload.user:null;
        }).addCase(loginUser.rejected, (state)=>{
            state.isAuthenticated = false;
            state.user = null;
            state.isLoading = false;
        }) .addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
        }).addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success;
        }).addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
    }
})

export const {setUser} =authSlice.actions;
export default authSlice.reducer;