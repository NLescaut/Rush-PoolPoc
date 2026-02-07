import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ConnectionW from './ConnectionW.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConnectionW />
  </StrictMode>,
)
