import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ButtonS from './Pages/ButtonS'
import ConnectionW from './Pages/ConnectionW'
import ScoreBord from './Pages/ScoreBord'
import Game from './Pages/Game' 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/connection' element ={<ConnectionW/>}/>
        <Route path='/Game' element ={<Game/>}/>
        <Route path='/scorebord'element ={<ScoreBord/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App