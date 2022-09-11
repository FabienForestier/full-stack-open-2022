export const Anecdote = ({ type, anecdote, votes }) => <div>
    <h1>{type}</h1>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
</div>