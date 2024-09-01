import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Enroll from './pages/signIn&signUp/Enroll';
import Workspace from './pages/workspace/Workspace';
import EngageQuiz from './pages/publicEngageQuiz/EngageQuiz';
import NotFoundPage from './pages/notFound/NotFound';
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Enroll />} />
        <Route path="/workspace" element={<Workspace/>} />
        <Route path="/quiz/:id" element={<EngageQuiz/>} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
