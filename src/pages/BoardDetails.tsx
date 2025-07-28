import { useDispatch, useSelector } from 'react-redux'
import type {  Card, RootState } from '../types/type'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { addCard, deleteCard } from '../store/boardSlice';

const BoardDetails = () => {

  const {boardId}= useParams<string>();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const board = useSelector((state:RootState) => boardId?  state.boards.items[boardId] : null)

  const columns = [
    {id:"todo", title:"To Do"},
    {id:"inprogress", title:"In Progress"},
    {id:"done", title:"Done"},
  ]

  const [isAddingCard, setisAddingCard] = useState<boolean>(false);
  const [newCardTitle, setnewCardTitle] = useState<string>("");

  function handleAddCard(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(newCardTitle.trim() && boardId){

      const newCard:Card = {
        id:crypto.randomUUID(),
        title:newCardTitle,
        description:"",
        status:"todo",
        createAt: new Date().toISOString()

      }
      dispatch(addCard({ boardId , card:newCard}));
      setnewCardTitle("");
      setisAddingCard(false);
    }
  }

  function handleDeleteCard(){
    if(boardId){

      dispatch(deleteCard({boardId}));
      setnewCardTitle("");
      setisAddingCard(false);
      navigate("/boards");
    }
  }

  return !board?
  (
    <section className='grid justify-center gap-8'>
    <h1
    className='text-2xl text-primary font-bold text-center'
    >Board not found</h1>
    <button
    className='border border-primary px-4 py-2 rounded-sm'
    onClick={()=>navigate("/boards")}
    >Back to Boards</button>
    </section>
  ):(
    <section className='flex flex-col gap-12'>
      <div className='flex flex-col gap-6 md:flex-row'>
        <div>
          <button onClick={()=>navigate("/boards")}>
            <ArrowLeft/>
          </button>
          <h1>{board.title}</h1>
        </div>
        <div>
          <button onClick={()=>setisAddingCard(true)}><Plus/>Add Card</button>
          <button onClick={()=>handleDeleteCard()}><Trash2/>Delete Card</button>
        </div>
      </div>

{     isAddingCard &&
      <form onSubmit={(e)=>{handleAddCard(e)}}>
        <input type="text" name="" id="" placeholder='Card Title'
        value={newCardTitle}
        onChange={(e)=>setnewCardTitle(e.target.value)}
        />
        <div>
          <button onClick={()=>setisAddingCard(false)} type='button'>Cancel</button>
          <button type='submit'>Add</button>
        </div>
      </form>
}

    <div>
      {
        columns.map((col)=>(
          <div key={col.id}>
            <h2>{col.title}</h2>

            <div>
              {board.cards.filter(card=>card.status === col.id)
              .map((card)=>(
                <div key={card.id}>
                  <h3>{card.title}</h3>
                  <p>{new Date(card.createAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      }
    </div>

    </section>
  )
}
export default BoardDetails
