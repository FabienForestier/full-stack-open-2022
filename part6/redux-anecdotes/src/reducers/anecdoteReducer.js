import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from '../services/anecdotes';
import { notify } from "./notificationsReducer";

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
    dispatch(notify(`Your anecdote "${content}" has been created`, 5))
  }
}
export const voteForAnecdote = (id) => {
  return async dispatch => {
    const anecdote = await anecdotesService.vote(id);
    dispatch(update(anecdote))
    dispatch(notify(`You voted for: ${anecdote.content}`, 5))
  }
}

export default anecdotesSlice.reducer;