// This file defines TypeScript interfaces for a Kanban board application.


// The Card interface represents individual tasks with properties like id, title, description, status, and
// creation date. 
export interface Card{
    id:string;
    title:string;
    description:string;
    status:"todo" | "inprogress" | "done";
    createAt:string;
}

// The Board interface represents a collection of cards, and the RootState interface
// represents the overall state of the application, including a collection of boards, their loading status,
// and any error messages.
export interface Board{
    id:string;
    title:string;
    cards:Card[];
}

export interface RootState{
    boards:{
        items:Record<string, Board>
        // loading:boolean
        // error:string|null
    }
}
// It includes interfaces for Card and Board, as well as the overall RootState.