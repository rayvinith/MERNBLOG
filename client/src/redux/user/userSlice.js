import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error: null,
   
 
}


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        signInStart:(state)=>{
            state.loading = true;
            state.error = null;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading = false;
            state.user = action.payload;
        },
        signInFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
        },
        updateStart:(state)=>{
            state.loading = true;
            state.error = null;
            },
        updateSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading = false;
            state.user = action.payload;
        },
    updateFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    deleteUserStart:(state)=>{
    state.loading = true;
    state.error = null;
    },
    deleteUserSuccess:(state)=>{
       state.currentUser = null;
       state.loading = false;
       state.error = null;

    },
    deleteUserFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    
    }

},
})
export const {signInStart,signInFailure, signInSuccess ,updateStart,updateSuccess,updateFailure,deleteUserFailure,deleteUserSuccess,deleteUserStart}=userSlice.actions;

export default userSlice.reducer;