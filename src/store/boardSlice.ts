import {createSlice, type PayloadAction} from "@reduxjs/toolkit"
import type { Board } from "../types/type";


interface BoardsState{
    items: Record<string, Board>;
    loading:boolean
    error:string|null;
}

const initialState:BoardsState = {
    items:{},
    loading:false,
    error:null,
};

const boardsSlice = createSlice({
    name:"boards",
    initialState,
    reducers:{
        createBoard:(state, action: PayloadAction<{id:string, title:string}>)=>{
            state.items[action.payload.id]={
                id:action.payload.id,
                title:action.payload.title,
                cards:[],
            }
        },
    },
});

export const {createBoard} = boardsSlice.actions;

export default boardsSlice.reducer;