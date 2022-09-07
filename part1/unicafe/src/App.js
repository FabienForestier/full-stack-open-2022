import { useState } from 'react'

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>
}

const Statistics = ({ good, neutral, bad }) => {
  const computeFeedbackCounts = () => good + neutral + bad;
  const computeAverageScore = () => (1 * good + (-1 * bad)) / computeFeedbackCounts();
  const computePositiveFeedbackPercentage = () => good * 100 / computeFeedbackCounts();

  return (<>
    <h1>Statistics</h1>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {computeFeedbackCounts()}</p>
    <p>average {computeAverageScore()}</p>
    <p>positive {computePositiveFeedbackPercentage()}%</p>
  </>)
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App