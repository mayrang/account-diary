import {combineReducers, CombinedState, AnyAction} from "@reduxjs/toolkit";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";
import accountSlice, { AccountState } from "./accountSlice";
import diarySlice, { DiaryState } from "./diarySlice";
import userSlice, { UserState } from "./userSlice";

export interface RootStates {
    user: UserState;
    account: AccountState;
    diary: DiaryState;
}

axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.withCredentials = true;

const rootReducer = (state:RootStates, action:AnyAction):CombinedState<RootStates>=> {
    switch(action.type){
        case HYDRATE:
            return action.payload;
        default: {
            const combineReducer = combineReducers({
                user: userSlice.reducer,
                account: accountSlice.reducer,
                diary: diarySlice.reducer
            });
            return combineReducer(state, action)
        }
    }
}

export default rootReducer;