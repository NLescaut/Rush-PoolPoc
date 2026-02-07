import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ConnectionW from './Pages/ConnectionW.jsx'
import ScoreBord from './Pages/ScoreBord.jsx'
import {createBrowserRouter,Route,RouterProvider} from 'react-router-dom'
import Game from './Pages/Game.jsx'
import React from 'react'
import ReactDOM from "react-dom/client"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,

)
