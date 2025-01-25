import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalContextProvider } from './contexts/AppContext'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </Router>
  </StrictMode>,
)
