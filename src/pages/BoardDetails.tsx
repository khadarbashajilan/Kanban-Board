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
      <div className='flex flex-col gap-6 md:flex-row md:justify-between md:items-center'>
        <div className='flex flex-col gap-6 items-start md:flex-row md:items-center'>
          <button onClick={()=>navigate("/boards")}
            className='p-2 bg-primary rounded-full'>
            <ArrowLeft className='size-4 text-dark'/>
          </button>
          <h1 className='text-4xl font-bold text-primary text-center'>{board.title}</h1>
        </div>
        <div className='flex flex-col gap-4 *:grow *:px-4 *:py-2 *:rounded-sm *:border *:border-primary *:flex *:gap-4 *:justify-center 500px:flex-row md:self-center'>
          <button onClick={()=>setisAddingCard(true)}><Plus/>Add Card</button>
          <button onClick={()=>handleDeleteCard()}><Trash2/>Delete Card</button>
        </div>
      </div>

{     isAddingCard &&
      <form onSubmit={(e)=>{handleAddCard(e)}}
      className='flex flex-col gap-4 max-w-screen-500px'>
        <input type="text" placeholder='Card Title'
        value={newCardTitle}
        className='bg-primary text-dark px-4 py-2 rounded-sm placeholder:text-gray-600 outline-none'
        onChange={(e)=>setnewCardTitle(e.target.value)}
        />
          <div className="flex gap-2 *:grow *:px-4 *:py-2 *:rounded-sm *:border *:border-primary">
          <button onClick={()=>setisAddingCard(false)} type='button'>Cancel</button>
          <button type='submit'>Add</button>
        </div>
      </form>
}

      <div className="grid gap-4 grid-cols-1 500px:grid-cols-2 md:grid-cols-3">
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
