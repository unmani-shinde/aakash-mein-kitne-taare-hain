import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Web3Provider } from './config/Web3Provider'
import { ChainProvider } from './contextManager.jsx'
import { PredictionProvider } from './predictionContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChainProvider>
      <PredictionProvider>
      <Web3Provider>
            <App />
        </Web3Provider>

      </PredictionProvider>
        
    </ChainProvider>
  </React.StrictMode>,
)
