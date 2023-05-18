import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDisplayNotification } from './NotificationContext';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import AnecdoteService from './services/anecdotes';

const App = () => {
  const displayNotification =  useDisplayNotification();
  const queryClient = useQueryClient()
  const voteForAnecdoteMutation = useMutation(AnecdoteService.vote, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('anecdotes')
      displayNotification('You voted for: ' +  data.content)
    }
  })

  const handleVote = (anecdote) => {
    voteForAnecdoteMutation.mutate(anecdote.id)
  }

  const { isLoading, data: anecdotes, isError } = useQuery('anecdotes', AnecdoteService.getAll, { retry: 1})

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />

      { isError && 'Anecdotes server is unavailable, please come back later.'}
      { isLoading && 'Anecdotes are loading...'}
      { anecdotes && anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
