import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from '../services/anecdotes';

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
    newAnecdote(state, { payload: anecdote}) {
      state.push(anecdote)
    },
    setAnecdotes(_, { payload: anecdotes}) {
      return anecdotes;
    }
  }
});

export const { vote, newAnecdote, setAnecdotes } = anecdotesSlice.actions;
export const initializeAnecdotes = () => {
  return async dispatch => { 
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}
export default anecdotesSlice.reducer;