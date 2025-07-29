import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../types/type";
import { createBoard } from "../store/boardSlice";

const BoardsList = () => {
  // State variables for managing the UI
  // newBoardTitle holds the title of the new board being created
  const [newBoardTitle, setNewBoardTitle] = useState("");
  // isCreating controls the visibility of the board creation form
  // It is set to true when the user clicks the "New Board" button
  const [isCreating, setIsCreating] = useState(false);
  // useNavigate is used to programmatically navigate between routes
  const navigate = useNavigate();

  // Using useDispatch to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // The useSelector hook is used to access the Redux state
  // Here, we are selecting the boards from the Redux store
  // This allows us to display the list of boards in the UI
  // The boards are stored in the state.boards.items object
  const boards = useSelector((state: RootState) => state.boards.items);

  // Function to handle the submission of the new board form
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // It prevents the default form submission behavior, checks if the board title is not empty,
    e.preventDefault();
    if (newBoardTitle.trim()) {
      const id = crypto.randomUUID();
      // send title and Id to redux
      dispatch(createBoard({ id, title: newBoardTitle }));
      setNewBoardTitle("");
      setIsCreating(false);
      console.log(Object.values(boards)); //log the values of boards to verify creation
      navigate(`/boards/${id}`);
    }
  }

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-8 500px:flex-row 500px:justify-between">
        <h1 className="text-5xl font-bold text-primary text-center">
          My Boards
        </h1>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center justify-center gap-4 p-4 rounded-sm border border-primary font-bold"
        >
          <Plus className="size-5" /> New Borad
        </button>
      </div>
      {isCreating && (
        <>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-4 max-w-screen-500px"
          >
            <input
              type="text"
              placeholder="Bord Title"
              value={newBoardTitle}
              onChange={(e) => setNewBoardTitle(e.target.value)}
              className="bg-primary text-dark px-4 py-2 rounded-sm placeholder:text-gray-600 outline-none"
            />
            <div className="flex gap-2 *:grow *:px-4 *:py-2 *:rounded-sm *:border *:border-primary">
              <button onClick={() => setIsCreating(false)} type="button">
                Cancel
              </button>

              <button type="submit">Create</button>
            </div>
          </form>

          <div className="grid gap-4 grid-cols-1 500px:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Object.values(boards).map((board) => (
              <div
                key={board.id}
                onClick={() => navigate(`/boards/${board.id}`)}
                className="cursor-pointer bg-primary text-dark rounded-sm px-6   flex flex-col items-center gap-4"
              >
                <div className="flex flex-col gap-4 items-center">
                  <Layout className="size-8" />
                  <h2 className="text-xl font-semibold">{board.title}</h2>
                </div>

                <p>
                  {board.cards.length < 2
                    ? "1 Card"
                    : `${board.cards.length} Cards`}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default BoardsList;
