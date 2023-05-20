const Anecdote = ({anecdote}) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>Author: {anecdote.author}</p>
      <p>For more info see: {anecdote.info}</p>
      <p>Number of votes: {anecdote.votes}</p>
    </div>
  )
}

export default Anecdote;