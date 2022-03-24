import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from './UI/LoadingSpinner';

import './App.css';

const Navbar = React.lazy(() => import('./components/Navbar'));
const Home = React.lazy(() => import('./components/Home'));
const Register = React.lazy(() => import('./components/Register'));
const Login = React.lazy(() => import('./components/Login'));
const Profile = React.lazy(() => import('./components/Profile'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div><LoadingSpinner /></div>}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
