import { useState } from 'react'

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({ name, value }) => <tr><td>{name}</td><td>{value}</td></tr>;

const Statistics = ({ good, neutral, bad }) => {
  const feedbackCounts = good + neutral + bad;
  const averageScore = (1 * good + (-1 * bad)) / feedbackCounts;
  const positiveFeedbackPercentage = good * 100 / feedbackCounts;

  if (feedbackCounts > 0) {
    return <table>
      <tbody>
        <StatisticLine name="good" value={good} />
        <StatisticLine name="neutral" value={neutral} />
        <StatisticLine name="bad" value={bad} />
        <StatisticLine name="all" value={feedbackCounts} />
        <StatisticLine name="average" value={averageScore} />
        <StatisticLine name="positive" value={positiveFeedbackPercentage} />
      </tbody>
    </table>
  }
  return <p>No feedback given</p>
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
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App