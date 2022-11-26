import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export interface DiaryState {
    diaryList: object[]|[];
    singleDiary: object|null;
    loadDiaryListLoading: boolean;
    loadDiaryListDone: boolean;
    loadDiaryListError: any;
    loadSingleDiaryLoading: boolean;
    loadSingleDiaryDone: boolean;
    loadSingleDiaryError: any;
    addSingleDiaryLoading: boolean;
    addSingleDiaryDone: boolean;
    addSingleDiaryError: any;
    editSingleDiaryLoading: boolean;
    editSingleDiaryDone: boolean;
    editSingleDiaryError: any;
    removeSingleDiaryLoading: boolean;
    removeSingleDiaryDone: boolean;
    removeSingleDiaryError: any;
    

};

const initialState:DiaryState = {
    diaryList: [],
    singleDiary: null,
    loadDiaryListLoading: false,
    loadDiaryListDone: false,
    loadDiaryListError: null,
    loadSingleDiaryLoading: false,
    loadSingleDiaryDone: false,
    loadSingleDiaryError: null,
    addSingleDiaryLoading: false,
    addSingleDiaryDone: false,
    addSingleDiaryError: null,
    editSingleDiaryLoading: false,
    editSingleDiaryDone: false,
    editSingleDiaryError: null,
    removeSingleDiaryLoading: false,
    removeSingleDiaryDone: false,
    removeSingleDiaryError: null,
};

export const asyncLoadDiaryList = createAsyncThunk(
    'diary/asyncLoadDiaryList',
    async ({year, month, cookie}:{year:string; month:string; cookie:string|undefined;}, {rejectWithValue}) => {
        try{
            const result = await axios.get("/diary/loadList", {
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
            return rejectWithValue(err.response?.data?.error || "일기 목록 불러오기 에러");
        }
    }
);

export const asyncAddSingleDiary = createAsyncThunk(
    'diary/asyncAddSingleDiary',
    async (data:object, {rejectWithValue}) => {
        try{
            const result = await axios.post("/diary/create", data);
            return result.data;
        }catch(err:any){
            console.log(err);
            return rejectWithValue(err.response?.data?.error || "일기 추가 에러");
        }
    }
);

export const asyncLoadSingleDiary = createAsyncThunk(
    'diary/asyncLoadSingleDiary',
    async ({postId, cookie}:{postId:string|string[]; cookie:string}, {rejectWithValue}) => {
        try{
            const result = await axios.get(`/diary/loadSingle/${postId}`, {
                headers: {
                    cookie
                }
            });
            return result.data;
        }catch(err:any){
            console.log(err);
            return rejectWithValue(err.response?.data?.error || "일기 로드 에러");
        }
    }
);

export const asyncEditSingleDiary = createAsyncThunk(
    'diary/asyncEditSingleDiary',
    async ({postId, title, content}:{postId: number; title:string; content:string;}, {rejectWithValue}) => {
        try{
            const result = await axios.put(`/diary/editSingle/${postId}`, {
                title,
                content
            });
            return result.data;
        }catch(err:any){
            console.log(err);
            return rejectWithValue(err.response?.data?.error || "일기 수정 에러");
        }
    }
);

export const asyncRemoveSingleDiary = createAsyncThunk(
    'diary/asyncRemoveSingleDiary',
    async (postId:number, {rejectWithValue}) => {
        try{
            const result = await axios.delete(`/diary/removeSingle/${postId}`);
            return result.data;
        }catch(err:any){
            console.log(err);
            return rejectWithValue(err.response?.data?.error || "일기 삭제 에러");
        }
    }
)

const diarySlice = createSlice({
    name: "diary",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(asyncLoadDiaryList.pending, (state, action) => {
            state.loadDiaryListLoading = true;
            state.loadDiaryListDone = false;
            state.loadDiaryListError = null;
        });
        builder.addCase(asyncLoadDiaryList.fulfilled, (state, action) => {
            state.loadDiaryListDone = true;
            state.loadDiaryListLoading = false;
            state.loadDiaryListError = null;
            state.diaryList = action.payload;
        });
        builder.addCase(asyncLoadDiaryList.rejected, (state, action) => {
            state.loadDiaryListLoading = false;
            state.loadDiaryListDone = false;
            state.loadDiaryListError = action.payload;

        });
        builder.addCase(asyncAddSingleDiary.pending, (state, action) => {
            state.addSingleDiaryLoading = true;
            state.addSingleDiaryDone = false;
            state.addSingleDiaryError = null;
        });
        builder.addCase(asyncAddSingleDiary.fulfilled, (state, action) => {
            state.addSingleDiaryDone = true;
            state.addSingleDiaryLoading = false;
            state.addSingleDiaryError = null;
        });
        builder.addCase(asyncAddSingleDiary.rejected, (state, action) => {
            state.addSingleDiaryLoading = false;
            state.addSingleDiaryDone = false;
            state.addSingleDiaryError = action.payload;
        });
        builder.addCase(asyncLoadSingleDiary.pending, (state, action) => {
            state.loadSingleDiaryLoading = true;
            state.loadDiaryListDone = false;
            state.loadDiaryListError = null;
        });
        builder.addCase(asyncLoadSingleDiary.fulfilled, (state, action) => {
            state.loadSingleDiaryLoading = false;
            state.loadSingleDiaryDone = true;
            state.loadDiaryListError = null;
            state.singleDiary = action.payload;
        });
        builder.addCase(asyncLoadSingleDiary.rejected, (state, action) => {
            state.loadSingleDiaryLoading = false;
            state.loadSingleDiaryDone = false;
            state.loadDiaryListError = action.payload;
        });
        builder.addCase(asyncEditSingleDiary.pending, (state, action) => {
            state.editSingleDiaryLoading = true;
            state.editSingleDiaryDone = false;
            state.editSingleDiaryError = null;
        });
        builder.addCase(asyncEditSingleDiary.fulfilled, (state, action) => {
            state.editSingleDiaryLoading = false;
            state.editSingleDiaryDone = true;
            state.editSingleDiaryError = null;
        });
        builder.addCase(asyncEditSingleDiary.rejected, (state, action) => {
            state.editSingleDiaryLoading = false;
            state.editSingleDiaryDone = false;
            state.editSingleDiaryError = action.payload;
        });
        builder.addCase(asyncRemoveSingleDiary.pending, (state, action) => {
            state.removeSingleDiaryLoading = true;
            state.removeSingleDiaryDone = false;
            state.removeSingleDiaryError = null;
        });
        builder.addCase(asyncRemoveSingleDiary.fulfilled, (state, action) => {
            state.removeSingleDiaryDone = true;
            state.removeSingleDiaryLoading = false;
            state.removeSingleDiaryError = null;
        });
        builder.addCase(asyncRemoveSingleDiary.rejected, (state, action) => {
            state.removeSingleDiaryLoading = false;
            state.removeSingleDiaryDone = false;
            state.removeSingleDiaryError = action.payload;
        })
    }
});

export default diarySlice;

