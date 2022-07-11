import React from 'react'
import Header from './components/Header'
import NotesListPage from './pages/NotesListPage'
import NotesDetailPage from './pages/NotesDetailPage'
import { BrowserRouter as Router,
    Routes,
    Route,
     
    } from 'react-router-dom'
import './App.css'


const App = () => {
  return (
    <div className='container dark'>
      <div className='app'>
      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<NotesListPage />} /> 
          <Route path='/note/:id' element={<NotesDetailPage />}/>
        </Routes>       
      </Router>
      </div>
    </div>
    
  )
}

export default App