import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
const getId = () => (100000 * Math.random()).toFixed(0)
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const initialState = anecdotesAtStart.map(asObject)

const anecdotesSlice =  createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, { payload: anecdoteId }) { 
      const index = state.findIndex((anecdote) => anecdote.id === anecdoteId);
      if(index === -1) {
        return state;
      }
      state.splice(index, 1, {...state[index], votes: state[index].votes + 1})
      state.sort((a, b) => b.votes - a.votes)
    },
    newAnecdote(state, { payload: anecdoteContent}) {
      state.push({
        content: anecdoteContent,
        id: getId(),
        votes: 0
      })
    }
  }
});

export const { vote, newAnecdote } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;