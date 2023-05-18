import { useDispatch } from 'react-redux';
import { displayNotification } from '../helpers/notification.helper';
import { newAnecdote } from '../reducers/anecdoteReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const createAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = ''
    const anecdote = await anecdoteService.save(content);
    console.log(anecdote)
    dispatch(newAnecdote(anecdote))
    displayNotification(`Your anecdote "${content}" has been created`)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm;