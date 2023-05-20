import { useState } from 'react'
import { Navigate, Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import { ANECDOTES } from './anecdotes.const'
import About from './components/About'
import Anecdote from './components/Anecdote'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Notification from './components/Notification'

const App = () => {
  const [anecdotes, setAnecdotes] = useState(ANECDOTES)
  const [notification, setNotification] = useState('')
  const match = useMatch('/anecdotes/:id')
  const navigate = useNavigate();
  const anecdote = match 
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  const addNew = (anecdote) => {
    setAnecdotes(anecdotes.concat({ ...anecdote, id: Math.round(Math.random() * 10000)}));
    navigate('/');
    displayNotification(`You added a new anecdote: ${anecdote.content}`)

  }
  const displayNotification = (message) => {
    setNotification(message);
    setTimeout(() => { setNotification(undefined) }, 5000)
  }
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)
  const vote = (id) => {
    const anecdote = anecdoteById(id)
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification} ></Notification>
      <Routes>
        <Route path='/' element={<Navigate replace to="/anecdotes" />}/>
        <Route path='/anecdotes' element={<AnecdoteList anecdotes={anecdotes} />}/>
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />}/>
        <Route path='/about' element={<About />}/>
        <Route path='create' element={<CreateNew addNew={addNew} />}/>
      </Routes> 
      <Footer />
    </div>
  )
}

export default App
