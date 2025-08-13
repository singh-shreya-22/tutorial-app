import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {CalorieTrackerApp} from './CalorieTrackerApp'
import "./App.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CalorieTrackerApp />
  </StrictMode>,
)
