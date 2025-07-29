import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { Card, RootState } from "../types/type";
import { useState } from "react";
import { deleteCard, updateCard } from "../store/boardSlice";

const CardDetails = () => {
  // Extracting boardId and cardId from the URL parameters
  // This allows us to fetch the specific card details based on the IDs in the URL
  const { boardId = "", cardId = "" } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // The useSelector hook is used to access the Redux state
  // Here, we are selecting the card based on the boardId and cardId from the Redux store
  const card = useSelector((state: RootState) => {
    const board = state.boards.items[boardId!];
    return board.cards.find((card) => card.id === cardId);
  });
  // This allows us to display the details of the specific card in the UI
  // The card is found by matching the cardId with the id of each card in the board's cards array
  // If the boardId or cardId is not found, it returns null
  // This is useful for displaying the card details in the UI

  const [title, setTitle] = useState(card!.title);
  const [description, setdescription] = useState(card!.description);
  const [status, setStatus] = useState(card!.status);

  // Function to handle saving the updated card details
  function handleSave() {
    // It creates a new card object with the updated title, description, status, and creation date
    const updatedCard: Card = {
      id: card!.id,
      title,
      description,
      status,
      createAt: card!.createAt,
    };
    // Then it dispatches the updateCard action to update the card in the Redux store
    dispatch(updateCard({ boardId, card: updatedCard }));
  }

  // Function to handle deleting the card
  function handleDelete() {
    // It prompts the user for confirmation before deleting the card
    if (window.confirm("Really wanna delete this card ?")) {
      // If confirmed, it dispatches the deleteCard action to remove the card from the Redux store
      // The deleteCard action takes the boardId and the card to be deleted as parameters
      dispatch(deleteCard({ boardId, card: card! }));
      navigate(`/boards/${boardId}`);
    }
  }

  return (
    <section className="flex flex-col gap-12">
      <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col gap-6 items-start md:flex-row md:items-center">
          <button
            className="p-2 bg-primary rounded-full"
            onClick={() => navigate(`/boards/${boardId}`)}
          >
            <ArrowLeft className="size-4 text-dark" />
          </button>
        </div>

        <div className="flex flex-col gap-4 *:grow *:px-4 *:py-2 *:rounded-sm *:border *:border-primary *:flex *:gap-4 *:justify-center 500px:flex-row md:self-center">
          <button onClick={() => handleSave()}>
            <Save />
          </button>
          <button onClick={() => handleDelete()}>
            <Trash2 />
          </button>
        </div>
      </div>

      <form className="flex flex-col gap-4  max-w-screen-500px">
        <div className="flex flex-col gap-4">
          <label htmlFor="title">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            className="bg-primary text-dark px-4 py-2 rounded-sm placeholder:text-gray-600 outline-none"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
            className="bg-primary text-dark px-4 py-2 rounded-sm placeholder:text-gray-600 outline-none h-48"
          ></textarea>
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as Card["status"]);
            }}
            className="bg-dark border border-primary px-4 py-2 rounded-sm cursor-pointer text-sm"
          >
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <p className="text-xl font-bold text-primary">
          Created: {new Date(card!.createAt).toLocaleDateString()}
        </p>
      </form>
    </section>
  );
};

export default CardDetails;
