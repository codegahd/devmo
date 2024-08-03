import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { GameContextProvider } from "./context/GameContext";
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <GameContextProvider>
      <App />
      </GameContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
