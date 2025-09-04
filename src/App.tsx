import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import IpoListing from './pages/IpoListing'
import IpoDetails from './pages/IpoDetails'

function App() {
  return (
    <div className='container mx-auto'>
          <nav>
            <Link to="/">Home</Link> | <Link to="/about">About</Link>
          </nav>
          <Routes>
            <Route path="/ipo-list" element={<IpoListing />} />
            <Route path="/ipo/:id" element={<IpoDetails />} />
          </Routes>
        </div>
  )
}

export default App
