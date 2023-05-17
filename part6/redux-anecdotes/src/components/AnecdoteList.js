import { useDispatch, useSelector } from "react-redux";
import { displayNotification } from "../helpers/notification.helper";
import { vote } from '../reducers/anecdoteReducer';
import Notifications from "./Notifications";

const AnecdoteList = () => {
  const anecdotes = useSelector(({filter, anecdotes }) => anecdotes.filter((anecdote) => anecdote.content.includes(filter)))
  const dispatch = useDispatch()

  const voteForAnecdote = (id, content) => {
    dispatch(vote(id))
    displayNotification(`You voted for: ${content}`)
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
            <button onClick={() => voteForAnecdote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList;