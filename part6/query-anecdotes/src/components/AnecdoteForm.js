import { useMutation, useQueryClient } from 'react-query';
import { useDisplayNotification } from '../NotificationContext';
import AnecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
  const displayNotification = useDisplayNotification();
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(AnecdoteService.create, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('anecdotes')
      displayNotification('Created anecdote: ' + data.content)
    },
    onError: () => {
      displayNotification('Too short, anecdote must be of 5 characters minimum.')
    }
  });
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
