import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Navb from './Navb.jsx'
import DashboardLayoutBasic from './Dash.jsx'
import Menu from './Menu.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navb/>
    <App />
    <DashboardLayoutBasic/>
    <Menu/>
  </StrictMode>,
)
