
import './App.css'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Home from './pages/LandingPage'
import MintFortuneCookiePage from './pages/MintAFortuneCookie'
import GossipNetworkPage from './pages/GossipNetwork'
import FindMyMatchPage from './pages/MyMatchPage'


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/mint-a-fortune-cookie' element={<MintFortuneCookiePage/>}/>
        <Route path='/the-gossip-network' element={<GossipNetworkPage/>}/>
        <Route path='/find-my-match' element={<FindMyMatchPage/>}/>
      </Routes>
    </Router>
    
  )
}

export default App
