import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import ShowCourse from './pages/ShowCourse';
import EditCourse from './pages/EditCourse';
import DeleteCourse from './pages/DeleteCourse';
import CreateCourse from './pages/CreateCourse';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/course/create' element={<CreateCourse />} />
      <Route path='/course/details/:id' element={<ShowCourse />} />
      <Route path='/course/edit/:id' element={<EditCourse/>} />
      <Route path='/course/delete/:id' element={<DeleteCourse />} />
      <Route path='/login' element={<Login />} />
      <Route path='/Signup' element={<Signup />} />
    </Routes>
  );
};

export default App;
