import {createSlice, type PayloadAction} from "@reduxjs/toolkit"
import type { Board, Card } from "../types/type";


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
        addCard:(state, action: PayloadAction<{boardId:string, card:Card}>) =>{
            const board = state.items[action.payload.boardId]
            board.cards.push(action.payload.card);
        },
        deleteCard:(state, action:PayloadAction<{boardId:string}>)=>{
            delete state.items[action.payload.boardId];
        },
    },
});

export const {createBoard,deleteCard ,addCard} = boardsSlice.actions;

export default boardsSlice.reducer;