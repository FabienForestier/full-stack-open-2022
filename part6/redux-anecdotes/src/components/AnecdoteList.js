import { useDispatch, useSelector } from "react-redux";
import { voteForAnecdote } from '../reducers/anecdoteReducer';
import Notifications from "./Notifications";

const AnecdoteList = () => {
  const anecdotes = useSelector(({filter, anecdotes }) => anecdotes.filter((anecdote) => anecdote.content.includes(filter)))
  const dispatch = useDispatch()
  const vote = (id) => {
    dispatch(voteForAnecdote(id))
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notifications/>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList;