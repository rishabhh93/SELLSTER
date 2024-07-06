import React from 'react'
import Home from './components/Home'
import Nav from './components/Nav'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Details from './components/Details'
import Create from './components/Create'
import Edit from './components/Edit'

function App() {
  const {search ,pathname} = useLocation();
  return (
    <div className='h-screen w-screen flex'>
        {(pathname != "/" || search.length > 0) && (<Link className="text-red-500 absolute left-[17.5%] top-[4%] text-2xl hover:text-green-900" to="/ ">Home</Link>)}  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create/>} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/edit/:id" element={<Edit/>}/>
          {/* <Route path="/category:${val}" element={<Home/>}/> */}
        </Routes>
    </div>

  )
}
export default App