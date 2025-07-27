import { useSelector } from 'react-redux'
import type { RootState } from '../types/type'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const BoardDetails = () => {

  const {boardId}= useParams();

  const navigate = useNavigate();

  const board = useSelector((state:RootState) => boardId?  state.boards.items[boardId] : null)

  const columns = [
    {id:"todo", title:"To Do"},
    {id:"inprogress", title:"In Progress"},
    {id:"done", title:"Done"},
  ]

  const [isAddingCard, setisAddingCard] = useState<boolean>(false);



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
    <section>
      <div>
        <div>
          <button onClick={()=>navigate("/boards")}>
            <ArrowLeft/>
          </button>
          <h1>{board.title}</h1>
        </div>

        <div>
          <button onClick={()=>setisAddingCard(true)}><Plus/>Add Card</button>
          <button ><Trash2/>Delete Card</button>
        </div>
      </div>

{     isAddingCard &&
      <form>
        <input type="text" name="" id="" placeholder='Card Title'/>
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
