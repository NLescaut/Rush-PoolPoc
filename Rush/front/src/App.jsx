import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ButtonS from './Pages/ButtonS'
import ConnectionW from './Pages/ConnectionW'
import ScoreBord from './Pages/ScoreBord'
import Game from './Pages/Game' 
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient= new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/connection' element ={<ConnectionW/>}/>
          <Route path='/Game' element ={<Game/>}/>
          <Route path='/scorebord'element ={<ScoreBord/>}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App