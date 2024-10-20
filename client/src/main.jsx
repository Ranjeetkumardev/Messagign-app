import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './features/ThemeContext.jsx'
import { Toaster } from 'sonner';
import { store } from './store.js'
import { Provider } from 'react-redux'
 

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
  <ThemeProvider>
    <App />
  
   </ThemeProvider>
   </Provider>
  </StrictMode>,
)
