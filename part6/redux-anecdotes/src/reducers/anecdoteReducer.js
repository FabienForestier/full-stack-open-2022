import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdotesSlice =  createSlice({
  name: 'anecdotes',
  initialState: [],
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
    },
    setAnecdotes(_, { payload: anecdotes}) {
      return anecdotes;
    }
  }
});

export const { vote, newAnecdote, setAnecdotes } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;