import React, { useState, useEffect } from 'react';
import { UserRegister, Product, HistoryItem } from './types';
import { PRODUCTS } from './data';
import { RegisterForm } from './components/RegisterForm';
import { Roulette } from './components/Roulette';
import { WinnerCard } from './components/WinnerCard';
import { HistorySection } from './components/HistorySection';
import { UnderArmourHeaderLogo, UnderArmourLogo } from './components/UnderArmourLogo';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronLeft, LogOut, ShieldCheck, Trophy, Dumbbell } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<UserRegister | null>(null);
  const [wonProduct, setWonProduct] = useState<Product | null>(null);
  const [step, setStep] = useState<'register' | 'roulette' | 'winner'>('register');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load winners history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ua_roulette_history');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading from localStorage", e);
    }
  }, []);

  // Save registration values
  const handleRegister = (athlete: UserRegister) => {
    setUser(athlete);
    setStep('roulette');
  };

  // Save wheel outcome
  const handleSpinComplete = (product: Product) => {
    if (!user) return;
    setWonProduct(product);
    setStep('winner');

    // Add to history
    const newItem: HistoryItem = {
      user: athleteDeepCopy(user),
      product,
      timestamp: new Date().toISOString()
    };
    
    setHistory(prev => {
      const updated = [newItem, ...prev];
      try {
        localStorage.setItem('ua_roulette_history', JSON.stringify(updated));
      } catch (err) {
        console.error("Error saving to localStorage", err);
      }
      return updated;
    });
  };

  // Helper deep copy
  function athleteDeepCopy(obj: UserRegister): UserRegister {
    return { ...obj };
  }

  // Clear history action
  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('ua_roulette_history');
    } catch (e) {
      console.error(e);
    }
  };

  // Reset core experience
  const handleReset = () => {
    setUser(null);
    setWonProduct(null);
    setStep('register');
  };

  // Go back from roulette to registration safely
  const handleGoBackToRegister = () => {
    setStep('register');
  };

  // Filter products by selected gender
  const currentGenderProducts = user 
    ? PRODUCTS.filter(p => p.gender === user.genero) 
    : [];

  return (
    <div className="min-h-screen bg-black premium-gradient text-white flex flex-col justify-between selection:bg-brand-accent selection:text-white font-sans antialiased">
      
      {/* Dynamic Header */}
      <header className="border-b border-neutral-900 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <UnderArmourHeaderLogo />

          {/* Active User mini widget indicator */}
          {user && (
            <div className="flex items-center space-x-3 bg-neutral-950 border border-neutral-800 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <div className="text-right hidden sm:block">
                <span className="block font-sans font-bold text-xs leading-none text-white max-w-[120px] truncate">
                  {user.nombre}
                </span>
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest leading-none">
                  Atleta Femenina
                </span>
              </div>
              <button
                onClick={handleReset}
                id="btn-header-logout"
                className="p-1 text-gray-400 hover:text-brand-accent bg-neutral-900 hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
                title="Cerrar Sesión / Nuevo Registro"
              >
                <LogOut size={14} />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Panel Content with clean animations */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 md:py-12 max-w-6xl w-full mx-auto">
        <AnimatePresence mode="wait">
          {step === 'register' && (
            <motion.div
              key="register-step"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center"
            >
              <RegisterForm onRegister={handleRegister} />
            </motion.div>
          )}

          {step === 'roulette' && user && (
            <motion.div
              key="roulette-step"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center"
            >
              {/* Back & Breadcrumb Controls */}
              <div className="w-full max-w-md flex items-center justify-between mb-6 px-1">
                <button
                  onClick={handleGoBackToRegister}
                  id="btn-back-to-register"
                  className="flex items-center space-x-1.5 text-xs text-gray-400 hover:text-white font-mono uppercase transition-colors cursor-pointer"
                >
                  <ChevronLeft size={16} />
                  <span>Ajustar Registro</span>
                </button>
                <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest flex items-center space-x-1">
                  <ShieldCheck size={12} className="text-brand-accent" />
                  <span>PROCESO SEGURO</span>
                </div>
              </div>

              {/* Title Greeting Header */}
              <div className="text-center mb-6">
                <h2 className="font-display font-extrabold text-lg md:text-xl text-white tracking-tight uppercase">
                  ¡BIENVENIDA, <span className="text-brand-accent font-black">{user.nombre.split(' ')[0]}</span>!
                </h2>
                <p className="text-xs text-gray-400 mt-1 max-w-xs md:max-w-md mx-auto">
                  La ruleta ha cargado la colección exclusiva <span className="font-black text-white uppercase">FEMENINA (MUJER)</span> de Under Armour. Haz clic en el botón central para girar.
                </p>
              </div>

              {/* Interactive Roulette Component */}
              <Roulette
                products={currentGenderProducts}
                user={user}
                onSpinComplete={handleSpinComplete}
              />
            </motion.div>
          )}

          {step === 'winner' && wonProduct && user && (
            <motion.div
              key="winner-step"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center"
            >
              <WinnerCard
                product={wonProduct}
                user={user}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Winners History Drawer (always rendered at bottom, except in active spin to reduce clutter) */}
        {step !== 'roulette' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full mt-8"
          >
            <HistorySection items={history} onClear={handleClearHistory} />
          </motion.div>
        )}
      </main>

      {/* Modern Compact Athletics Campaign Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950/60 py-6 text-center text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Dumbbell size={14} className="text-brand-accent" />
            <span className="font-mono tracking-widest text-[9px] uppercase">
              UNDER ARMOUR ATHLETICS INC. EVENTO EXCLUSIVO 2026
            </span>
          </div>
          <div className="text-[10px] text-gray-600 font-light">
            Sorteo aleatorio verificado electrónicamente. Cada participante tiene opción a un (1) giro por registro válido.
          </div>
        </div>
      </footer>
    </div>
  );
}
