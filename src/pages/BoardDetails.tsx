import { useDispatch, useSelector } from "react-redux";
import type { Card, RootState } from "../types/type";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { addCard, deleteBoard, updateCard } from "../store/boardSlice";

const BoardDetails = () => {
  // Extracting boardId from the URL parameters
  // This allows us to fetch the specific board details based on the ID in the URL
  const { boardId } = useParams<string>();

  // Using useNavigate to programmatically navigate between routes
  // This is useful for redirecting users after actions like adding or deleting a board
  const navigate = useNavigate();

  // Using useDispatch to dispatch actions to the Redux store
  // This allows us to modify the state, such as adding a card or deleting a board

  const dispatch = useDispatch();

  // The useSelector hook is used to access the Redux state
  // Here, we are selecting the board based on the boardId from the Redux store
  const board = useSelector((state: RootState) =>
    boardId ? state.boards.items[boardId] : null
  );

  // Defining the columns for the Kanban board
  // Each column represents a status of the cards in the board
  const columns = [
    { id: "todo", title: "To Do" },
    { id: "inprogress", title: "In Progress" },
    { id: "done", title: "Done" },
  ];

  // State variables for managing the UI
  // isAddingCard controls the visibility of the card addition form
  const [isAddingCard, setisAddingCard] = useState<boolean>(false);
  // newCardTitle holds the title of the new card being added
  // It is updated as the user types in the input field
  const [newCardTitle, setnewCardTitle] = useState<string>("");

  // DraggedCard holds the card that is currently being dragged
  // It is used to update the card's status when dropped into a different column
  const [DraggedCard, setdraggedCard] = useState<Card | null>(null);

  // Function to handle adding a new card
  function handleAddCard(e: React.FormEvent<HTMLFormElement>) {
    // It prevents the default form submission behavior, checks if the card title is not empty,
    e.preventDefault();
    if (newCardTitle.trim() && boardId) {
      // Creates a new card object with a unique ID, title, status, and creation date
      // The crypto.randomUUID() function generates a unique identifier for the card
      const newCard: Card = {
        id: crypto.randomUUID(),
        title: newCardTitle,
        description: "",
        status: "todo",
        createAt: new Date().toISOString(),
      };
      // and then dispatches the addCard action to the Redux store
      dispatch(addCard({ boardId, card: newCard }));
      setnewCardTitle("");
      setisAddingCard(false);
    }
  }

  // Function to handle deleting the board
  function handleDeleteBoard() {
    // It checks if the boardId exists and prompts the user for confirmation before proceeding
    if (
      boardId &&
      window.confirm("Are you sure you want to delete this board?")
    ) {
      dispatch(deleteBoard({ boardId }));
      setnewCardTitle("");
      setisAddingCard(false);
      navigate("/boards");
    }
  }
  // Drag
  // Drop functionality
  // This section handles the drag-and-drop functionality for cards within the board
  function handleDragStart(card: Card) {
    // When a card is dragged, it sets the DraggedCard state to the card being dragged
    // This allows us to track which card is currently being moved
    setdraggedCard(card);
  }

  // allowOnDrop prevents the default behavior of the dragover event
  // This is necessary to allow dropping elements onto the target area
  function allowOnDrop(e: React.DragEvent) {
    e.preventDefault();
  }

  // handleDrop updates the status of the dragged card when it is dropped into a new column
  function handleDrop(status: Card["status"]) {
    // It checks if the DraggedCard exists, the boardId is valid, and the new status is different from the current status of the card
    if (DraggedCard && boardId && status !== DraggedCard.status) {
      // If all conditions are met, it creates an updated card object with the new status and dispatches the updateCard action to the Redux store
      const updtdCard: Card = {
        ...DraggedCard,
        status,
      };
      // This updates the card's status to reflect its new position in the Kanban board
      // Finally, it dispatches the updateCard action to the Redux store to update the card
      dispatch(updateCard({ boardId, card: updtdCard }));
      // Finally, it resets the DraggedCard state to null
      setdraggedCard(null);
    }
  }

  return !board ? (
    <section className="grid justify-center gap-8">
      <h1 className="text-2xl text-primary font-bold text-center">
        Board not found
      </h1>
      <button
        className="border border-primary px-4 py-2 rounded-sm"
        onClick={() => navigate("/boards")}
      >
        Back to Boards
      </button>
    </section>
  ) : (
    <section className="flex flex-col gap-12">
      <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col gap-6 items-start md:flex-row md:items-center">
          <button
            onClick={() => navigate("/boards")}
            className="p-2 bg-primary rounded-full"
          >
            <ArrowLeft className="size-4 text-dark" />
          </button>
          <h1 className="text-4xl font-bold text-primary text-center">
            {board.title}
          </h1>
        </div>
        <div className="flex flex-col gap-4 *:grow *:px-4 *:py-2 *:rounded-sm *:border *:border-primary *:flex *:gap-4 *:justify-center 500px:flex-row md:self-center">
          <button onClick={() => setisAddingCard(true)}>
            <Plus />
            Add Card
          </button>
          <button onClick={() => handleDeleteBoard()}>
            <Trash2 />
            Delete Board
          </button>
        </div>
      </div>

      {isAddingCard && (
        <form
          onSubmit={(e) => {
            handleAddCard(e);
          }}
          className="flex flex-col gap-4 max-w-screen-500px"
        >
          <input
            type="text"
            placeholder="Card Title"
            value={newCardTitle}
            className="bg-primary text-dark px-4 py-2 rounded-sm placeholder:text-gray-600 outline-none"
            onChange={(e) => setnewCardTitle(e.target.value)}
          />
          <div className="flex gap-2 *:grow *:px-4 *:py-2 *:rounded-sm *:border *:border-primary">
            <button onClick={() => setisAddingCard(false)} type="button">
              Cancel
            </button>
            <button type="submit">Add</button>
          </div>
        </form>
      )}

      <div className="grid gap-4 grid-cols-1 500px:grid-cols-2 md:grid-cols-3">
        {columns.map((col) => (
          <div
            key={col.id}
            onDragOver={(e) => allowOnDrop(e)}
            onDrop={() => handleDrop(col.id as Card["status"])}
            className={`flex flex-col gap-4 items-start bg-dark-lighter rounded-sm p-4 ${
              DraggedCard ? "border-2 border-dashed border-primary/50" : ""
            }`}
          >
            <h2 className="text-2xl font-extrabold text-primary">
              {col.title}
            </h2>
            <div className="flex flex-wrap gap-2 *:bg-primary-light *:text-dark *:p-4 *:rounded-sm *:space-y-2">
              {board.cards
                .filter((card) => card.status === col.id)
                .map((card) => (
                  <div
                    key={card.id}
                    draggable
                    className={`cursor-move ${
                      DraggedCard?.id === card.id ? "opacity-50" : ""
                    }`}
                    onDragStart={() => handleDragStart(card)}
                    onClick={() =>
                      navigate(`/boards/${boardId}/card/${card.id}`)
                    }
                  >
                    <h3 className="font-bold">{card.title}</h3>
                    <p className="text-sm text-dark-light">
                      {new Date(card.createAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default BoardDetails;
