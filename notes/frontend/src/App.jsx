import { Routes,Route } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

const App = () => {
  return (
    <Routes>
        <Route path='/' element={<RegisterPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/homepage' element={<Homepage />}/>
    </Routes>
  )
}

export default App