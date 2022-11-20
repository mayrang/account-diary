import { configureStore, Reducer, AnyAction } from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import rootReducer, { RootStates } from "./reducers/RootReducer";


const makeStore = () => {
    const store = configureStore({
        reducer: rootReducer as Reducer<RootStates, AnyAction>,
        devTools: process.env.NODE_ENV === 'development',
    });
    return store;
};

const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV === 'development'
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>; // RootState 타입
export type AppDispatch = AppStore['dispatch'];


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default wrapper;