import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx';
import { ChatContextProvider } from './context/ChatContext.jsx';
import { InputContextProvider } from './context/InputContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(

  <AuthContextProvider>
    <ChatContextProvider>
      <InputContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </InputContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
)
