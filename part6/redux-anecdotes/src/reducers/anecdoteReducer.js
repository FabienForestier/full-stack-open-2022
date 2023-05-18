import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from '../services/anecdotes';

const anecdotesSlice =  createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    update(state, { payload: updatedAnecdote }) { 
      const index = state.findIndex((anecdote) => anecdote.id === updatedAnecdote.id);
      if(index === -1) {
        return state;
      }
      state.splice(index, 1, updatedAnecdote)
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

export const { update, newAnecdote, setAnecdotes } = anecdotesSlice.actions;
export const initializeAnecdotes = () => {
  return async dispatch => { 
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}
export const saveAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdotesService.save(content);
    dispatch(newAnecdote(anecdote))
  }
}
export const voteForAnecdote = (id) => {
  return async dispatch => {
    const anecdote = await anecdotesService.vote(id);
    dispatch(update(anecdote))
  }
}

export default anecdotesSlice.reducer;