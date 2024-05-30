import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './views/Login';
import Auth from './views/Auth';
import Home from './views/Home';
import Results from './views/Results';
import Header from './components/Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const hideHeaderPaths = ['/login', '/register'];
  
  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      {children}
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={<Login />} 
        />
        <Route 
          path="/register" 
          element={<Auth />} 
        />
        <Route 
          path="/" 
          element={
            <Layout>
              <Home />
            </Layout>
          } 
        />
        <Route 
          path="/results" 
          element={
            <Layout>
              <Results />
            </Layout>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
