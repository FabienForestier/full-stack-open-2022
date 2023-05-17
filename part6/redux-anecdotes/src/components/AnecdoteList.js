import { useDispatch, useSelector } from "react-redux";
import { vote } from '../reducers/anecdoteReducer';
import Notification from "./Notification";

const AnecdoteList = () => {
  const anecdotes = useSelector(({filter, anecdotes }) => anecdotes.filter((anecdote) => anecdote.content.includes(filter)))
  const dispatch = useDispatch()

  const voteForAnecdote = (id) => {
    dispatch(vote(id))
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteForAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList;