import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginSignUp from '../LoginSignup/LoginSignUp.jsx'
import Profile from '../Profile/Profile.jsx'
import Guest from '../Profile/Guest.jsx'
import Details from '../Details/Details.jsx'

export default function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<LoginSignUp />}/>
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/guest' element ={<Guest />} />
        <Route path='/details/item/:id' element={<Details />}/>
      </Routes>
    </>
  )
}

