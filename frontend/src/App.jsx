import React from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Enroll from './pages/signIn&signUp/Enroll';
import Workspace from './pages/workspace/Workspace';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Enroll />} />
        <Route path="/workspace" element={<Workspace/>} />
      </Routes>
    </>
  )
}

export default App
