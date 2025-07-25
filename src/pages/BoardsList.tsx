import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Layout, Plus } from "lucide-react";

const BoardsList = () => {
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newBoardTitle) {
      const id = crypto.randomUUID();
      // send title and Id to redux
      setNewBoardTitle("");
      setIsCreating(false);
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
            <div className="cursor-pointer bg-primary text-dark rounded-sm px-6   flex flex-col items-center gap-4">
              <div className="flex flex-col gap-4 items-center">
                <Layout className="size-8" />
                <h2 className="text-xl font-semibold">Borad Title</h2>
              </div>

              <p>2 Cards</p>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default BoardsList;
