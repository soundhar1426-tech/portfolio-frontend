import React, { useState, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PasswordModal } from './components/modals/PasswordModal';
import { Toast } from './components/ui/Toast';
import './styles/index.css';
import './styles/app.css';

export function App() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Hero />
            <About />
            <Skills />
            <Projects addToast={addToast} />
            <Certifications addToast={addToast} />
            <Education />
            <Contact />
          </main>
          <Footer />

          {/* Global Management Password Modal */}
          <PasswordModal />

          {/* Dynamic Toasts */}
          <Toast toasts={toasts} removeToast={removeToast} />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
