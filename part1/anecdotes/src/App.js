import { useState, useEffect } from 'react'
import { getRandomInt } from './math.helper'
import { Anecdote } from './Anecdote'
import { Button } from './Button'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ];

  const pickRandomAnecdote = () => {
    const newIndex = getRandomInt(anecdotes.length);
    selectedIndex !== newIndex ? setSelectedIndex(newIndex) : pickRandomAnecdote();
  };
  const voteForCurrentAnecdote = () => {
    const votesCopy = [...votes];
    votesCopy[selectedIndex] += 1;
    setVotes(votesCopy);
  };

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [maxVoteIndex, setMaxVoteIndex] = useState(0)
  const [votes, setVotes] = useState(anecdotes.map(() => 0))
  useEffect(() => {
    const max = Math.max(...votes);
    const maxIndex = votes.indexOf(max);
    setMaxVoteIndex(maxIndex);
  }, [votes]);

  return (
    <div>
      <Anecdote type="Anecdote of the day" anecdote={anecdotes[selectedIndex]} votes={votes[selectedIndex]} />
      <Button text="Vote" onClick={voteForCurrentAnecdote} />
      <Button text="Next anecdote" onClick={pickRandomAnecdote} />
      <Anecdote type="Anecdote with most votes" anecdote={anecdotes[maxVoteIndex]} votes={votes[maxVoteIndex]} />
    </div>
  )
}

export default App