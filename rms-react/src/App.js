import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './components/user/Main'
import AllJobs from './components/user/pages/AllJobs';
import Contact from './components/user/pages/Contact';
import Login from './components/user/pages/authentication/Login';
import SignUp from './components/user/pages/authentication/SignUp';
import ForgotPassword from './components/user/pages/authentication/ForgotPassword';
import JobDetails from './components/user/jobs/JobDetails';

const App = () => {
  return(
  <>
  <Routes>
    <>
      <Route path="/" element={<Main/>}/>
      <Route path="/jobs" element={<AllJobs/>}/>
      <Route path="/job-details/:id" element={<JobDetails/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
    </>
  </Routes>
  </>
  );
};

export default App;