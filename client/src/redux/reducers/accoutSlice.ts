import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export interface AccountState {
    accountList: object[]|[];
    singleAccount: null|object;
    loadAccountListLoading: boolean;
    loadAccountListDone: boolean;
    loadAccountListError: any;
    loadSingleAccountLoading: boolean;
    loadSingleAccountDone: boolean;
    loadSingleAccountError: any;
    addSingleAccountLoading: boolean;
    addSingleAccountDone: boolean;
    addSingleAccountError: any;
    editSingleAccountLoading: boolean;
    editSingleAccountDone: boolean;
    editSingleAccountError: any;
    removeSingleAccountLoading: boolean;
    removeSingleAccountDone: boolean;
    removeSingleAccountError: any;
};


const initialState:AccountState = {
    accountList: [],
    singleAccount: null,
    loadAccountListLoading: false,
    loadAccountListDone: false,
    loadAccountListError: null,
    loadSingleAccountLoading: false,
    loadSingleAccountDone: false,
    loadSingleAccountError: null,
    addSingleAccountLoading: false,
    addSingleAccountDone: false,
    addSingleAccountError: null,
    editSingleAccountLoading: false,
    editSingleAccountDone: false,
    editSingleAccountError: null,
    removeSingleAccountLoading: false,
    removeSingleAccountDone: false,
    removeSingleAccountError: null,
}

export const asyncAddSinglePost = createAsyncThunk(
    'account/asyncAddSinglePost',
    async (data:object, {rejectWithValue}) => {
        try{
            const result = await axios.post("account/create", data);
            return result.data;
        }catch(err:any){
            console.log(err);
            return rejectWithValue(err.response?.data?.error || "텅장 추가 에러");
        }
    }
);

export const asyncLoadAccountList = createAsyncThunk(
    'account/asyncLoadAccountList',
    async ({year, month, cookie}:{year:string; month:string; cookie:string|undefined}, {rejectWithValue}) => {
        try{
            const result = await axios.get("account/loadList", {
                params: {
                    year,
                    month
                },
                headers: {
                    cookie
                }
            });
            return result.data;

        }catch(err:any){
            console.log(err);
            return rejectWithValue(err.response?.data?.error || "텅장 목록 에러");
        }
    }
)

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(asyncAddSinglePost.pending, (state, action) => {
            state.addSingleAccountLoading = true;
            state.addSingleAccountDone = false;
            state.addSingleAccountError = null;
        });
        builder.addCase(asyncAddSinglePost.fulfilled, (state, action) => {
            state.addSingleAccountDone = true;
            state.addSingleAccountLoading = false;
            state.addSingleAccountError = null;
        });
        builder.addCase(asyncAddSinglePost.rejected, (state, action) => {
            state.addSingleAccountLoading = false;
            state.addSingleAccountDone = false;
            state.addSingleAccountError = action.payload;

        });
        builder.addCase(asyncLoadAccountList.pending, (state, action) => {
            state.loadAccountListDone = false;
            state.loadAccountListLoading = true;
            state.loadAccountListError = null;
        });
        builder.addCase(asyncLoadAccountList.fulfilled, (state, action) => {
            state.loadAccountListLoading = false;
            state.loadAccountListDone = true;
            state.loadAccountListError = null;
            state.accountList = action.payload;
        });
        builder.addCase(asyncLoadAccountList.rejected, (state, action) => {
            state.loadAccountListLoading = false;
            state.loadAccountListDone = false;
            state.loadAccountListError = action.payload;
        })
    }
});

export default accountSlice;