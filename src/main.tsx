import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import Users from './components/Users.tsx'
//import Async from './components/Async.tsx'
//import Cleanup from './components/Cleanup.tsx'
//import App from './App.tsx'
//import EffectDeps from './components/EffectDeps.tsx'
//import EffectHook from './components/EffectHook.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Users />
  </React.StrictMode>,
)
