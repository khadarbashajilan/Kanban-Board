import {createSlice, type PayloadAction} from "@reduxjs/toolkit"
import type { Board, Card } from "../types/type";

// This file defines a Redux slice for managing boards in a Kanban application.
interface BoardsState{
    items: Record<string, Board>;
}
// The BoardsState interface defines the structure of the state for boards, including a record of boards,

const initialState:BoardsState = {
    items:{},
};

// It includes actions for creating, updating, and deleting boards and cards,
// as well as the initial state and the reducer function.
const boardsSlice = createSlice({
    name:"boards",
    initialState,
    reducers:{
        // This action creates a new board with a given id and title, initializing it with an empty cards array.
        // The board is stored in the items object with the board id as the key.
        createBoard:(state, action: PayloadAction<{id:string, title:string}>)=>{
            state.items[action.payload.id]={
                id:action.payload.id,
                title:action.payload.title,
                cards:[],
            }
        },
        // This action adds a new card to a specific board by its id.
        addCard:(state, action: PayloadAction<{boardId:string, card:Card}>) =>{
            const board = state.items[action.payload.boardId]
            board.cards.push(action.payload.card);
        },
        // This action deletes a board by its id from the items object.
        deleteBoard:(state, action:PayloadAction<{boardId:string}>)=>{
            delete state.items[action.payload.boardId];
        },
        // This action updates a card in a specific board by finding the card by its id and replacing it with the new card data.
        updateCard:(state, action:PayloadAction<{boardId:string,card:Card}>)=>{
            const board = state.items[action.payload.boardId];
            if(board){
                const index = board.cards.findIndex(card=>card.id === action.payload.card.id)
                board.cards[index] = action.payload.card;
            }
        },
        // This action deletes a card from a specific board by filtering out the card with the given id.
        deleteCard:(state, action:PayloadAction<{boardId:string, card:Card}>)=>{
            const board = state.items[action.payload.boardId];
            board.cards = board.cards.filter((each)=> each.id != action.payload.card.id);
        }
    },
});

// The slice includes actions for creating a board, adding a card, deleting a board, updating a card, and deleting a card.
// It also exports the actions and the reducer for use in the store configuration.
export const {createBoard,deleteBoard, deleteCard, updateCard ,addCard} = boardsSlice.actions;

export default boardsSlice.reducer;