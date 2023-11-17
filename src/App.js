import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CreatePost from './admin/CreatePost';
import Admin from './admin/AdminProfile';
import Account from './components/Account';
import AccountList from './admin/AccountList';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/CreatePost" element={<CreatePost />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Admin" element={<Admin/>}/>
          <Route path="/AccountList" element={<AccountList/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;