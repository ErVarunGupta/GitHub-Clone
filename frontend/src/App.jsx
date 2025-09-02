
// import './App.css'
import {Routes, Route} from 'react-router-dom';
import { Signup } from './components/auth/Signup';
import { Login } from './components/auth/Login';
import { Dashboard } from './components/dashboard/Dashboard';
import { Profile } from './components/user/Profile';
import { NewRepo } from './components/repos/NewRepo';
import StartingWindow from './components/StartingWindow';

function App() {

  return (
    <>
      {
        <Routes>
          <Route path='/' element={<StartingWindow/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/new' element={<NewRepo/>}/>
        </Routes>
      }
    </>
  )
}

export default App
