import React from 'react';
import './App.css';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Main from './Main/Main';
import Auth from './Auth/Auth';
import Nav from './Nav/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav />
        <Routes>
          <Route path="" element={<Main />}/>
          <Route path="/auth" element={<Auth />}/>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;