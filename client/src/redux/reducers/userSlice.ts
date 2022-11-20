import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const asyncUserRegister = createAsyncThunk(
    'user/asyncUserRegister',
    async (data:object, {rejectWithValue}) => {
        try{
            const result = await axios.post("/user/register", data);
            return result.data;
        }catch(err:any){
            console.log(err);
            console.log(err.response.data);
            return rejectWithValue(err.response?.data?.error || err.response?.data?.email ||  err.response?.data?.nickname || err.response?.data?.password || "회원가입 에러");
        }
    }

);

export const asyncUserLogin = createAsyncThunk(
    'user/asyncUserLogin',
    async (data:object, {rejectWithValue}) => {
        try{
            const result = await axios.post("/user/login", data);
            return result.data;
        }catch(err:any){
            console.log(err);
            return rejectWithValue(err.response?.data?.error || err.response?.data?.email || err.response?.data?.password || "로그인 에러");
        }
    }
);

export const asyncUserLoadMyInfo = createAsyncThunk(
    'user/asyncUserLoadMyInfo',
    async (cookie:any, {rejectWithValue}) => {
        try{
            const result = await axios.get("/user/me", {
                headers: {
                    cookie: cookie
                }
            });
            return result.data;
        }catch(err:any){
            console.log(err);
            return rejectWithValue(err.response?.data?.error || "회원정보 확인 과정에서의 에러")
        }
    }
);

export const  asyncUserLogout = createAsyncThunk(
    'user/asyncUserLogout',
    async (_, {rejectWithValue}) => {
        try{
            await axios.get("/user/logout");
        }catch(err:any){
            console.log(err);
            return rejectWithValue(err.response?.data?.error || "로그아웃 에러");
        }
    }
);

export interface UserState {
    user: null|object;
    registerLoading: boolean;
    registerDone: boolean;
    registerError: any;
    loginLoading: boolean;
    loginDone: boolean;
    loginError: any;
    loadMyInfoLoading: boolean;
    loadMyInfoDone: boolean;
    loadMyInfoError: any;
    logoutLoading: boolean;
    logoutDone: boolean;
    logoutError: any;

}

const initialState:UserState = {
    user: null,
    registerLoading: false,
    registerDone: false,
    registerError: null,
    loginLoading: false,
    loginDone: false,
    loginError: null,
    loadMyInfoLoading: false,
    loadMyInfoDone: false,
    loadMyInfoError: null,
    logoutLoading: false,
    logoutDone: false,
    logoutError: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(asyncUserRegister.pending, (state, action) => {
            state.registerLoading = true;
            state.registerDone = false;
            state.registerError = null;
        });
        builder.addCase(asyncUserRegister.fulfilled, (state, action) => {
            state.registerLoading = false;
            state.registerDone = true;
            state.registerError = null;

        });
        builder.addCase(asyncUserRegister.rejected, (state, action) => {
            state.registerLoading = false;
            state.registerDone = false;
            state.registerError = action.payload;
        });
        builder.addCase(asyncUserLogin.pending, (state, action) => {
            state.loginLoading = true;
            state.loginDone = false;
            state.loginError = null;
        });
        builder.addCase(asyncUserLogin.fulfilled, (state, action) => {
            state.loginLoading = false;
            state.loginDone = true;
            state.loginError = null;
        });
        builder.addCase(asyncUserLogin.rejected, (state, action) => {
            state.loginLoading = false;
            state.loginDone = false;
            state.loginError = action.payload;
        });
        builder.addCase(asyncUserLoadMyInfo.pending, (state, action) => {
            state.loadMyInfoLoading = true;
            state.loadMyInfoDone = false;
            state.loadMyInfoError = null;
        });
        builder.addCase(asyncUserLoadMyInfo.fulfilled, (state, action) => {
            state.loadMyInfoDone = true;
            state.loadMyInfoLoading = false;
            state.user = action.payload;
            state.loadMyInfoError = null;
        });
        builder.addCase(asyncUserLoadMyInfo.rejected, (state, action) => {
            state.loadMyInfoDone = false;
            state.loadMyInfoLoading = false;
            state.loadMyInfoError = action.payload;
        });
        builder.addCase(asyncUserLogout.pending, (state, action) => {
            state.logoutLoading = true;
            state.logoutDone = false;
            state.logoutError = null;
        });
        builder.addCase(asyncUserLogout.fulfilled, (state, action) => {
            state.logoutLoading = false;
            state.logoutDone = true;
            state.logoutError = null;
            state.user = null;
        });
        builder.addCase(asyncUserLogout.rejected, (state, action) => {
            state.logoutLoading = false;
            state.logoutDone = false;
            state.logoutError = action.payload;
        });
    }
});

export default userSlice;