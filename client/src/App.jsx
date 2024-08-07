
import './App.css'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Home from './pages/LandingPage'
import MintFortuneCookiePage from './pages/MintAFortuneCookie'


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/mint-a-fortune-cookie' element={<MintFortuneCookiePage/>}/>
      </Routes>
    </Router>
    
  )
}

export default App
