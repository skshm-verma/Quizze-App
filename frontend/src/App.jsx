import React from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Enroll from './pages/signIn&signUp/Enroll';
import Workspace from './pages/workspace/Workspace';
import EngageQuiz from './pages/publicEngageQuiz/EngageQuiz';
import { useState } from 'react';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Enroll />} />
        <Route path="/workspace" element={<Workspace/>} />
        <Route path="/quizName/:id" element={<EngageQuiz/>} />
      </Routes>
    </>
  )
}

export default App
