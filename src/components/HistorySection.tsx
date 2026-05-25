import React, { useState, useEffect } from 'react';
import { HistoryItem } from '../types';
import { Award, User, RefreshCw, Trash2, Calendar, ShoppingBag, AlertTriangle } from 'lucide-react';

interface HistorySectionProps {
  items: HistoryItem[];
  onClear: () => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({ items, onClear }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Auto-reset confirmation after 4 seconds
  useEffect(() => {
    if (confirmDelete) {
      const timer = setTimeout(() => {
        setConfirmDelete(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [confirmDelete]);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirmDelete) {
      onClear();
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
    }
  };

  if (items.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-8 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 text-center">
        <ShoppingBag size={30} className="text-neutral-700 mx-auto mb-2" />
        <h4 className="font-display font-bold text-sm text-neutral-400 uppercase tracking-wider">
          Historial de Ganadores Vacío
        </h4>
        <p className="text-xs text-neutral-500 mt-1">
          Los atletas que se registren y giren la ruleta aparecerán aquí con sus premios seleccionados.
        </p>
      </div>
    );
  }

  return (
    <div id="history-section" className="w-full max-w-2xl mx-auto mt-8 bg-neutral-900/80 border border-neutral-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-800">
        <div className="flex items-center space-x-2">
          <Award size={18} className="text-brand-accent" />
          <h3 className="font-display font-extrabold text-sm text-white uppercase tracking-wider">
            TABLERO DE CONSEGUIDORES HOY ({items.length})
          </h3>
        </div>
        <button
          onClick={handleButtonClick}
          id="btn-clear-history"
          className={`flex items-center space-x-1.5 py-1 px-3 rounded-md transition-all uppercase font-mono text-[10px] font-bold cursor-pointer border ${
            confirmDelete
              ? 'bg-red-600 text-white border-red-500 animate-pulse'
              : 'bg-neutral-800/60 hover:bg-neutral-700 hover:text-white text-neutral-400 border-neutral-700/50'
          }`}
          title={confirmDelete ? "Haz clic de nuevo para confirmar" : "Borrar Historial"}
        >
          {confirmDelete ? <AlertTriangle size={12} /> : <Trash2 size={12} />}
          <span>{confirmDelete ? '¿CONFIRMAR?' : 'LIMPIAR'}</span>
        </button>
      </div>

      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/40 hover:bg-black/80 border border-neutral-800/50 p-4 rounded-xl transition-all"
          >
            {/* Left: Athlete registration data */}
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-neutral-800 rounded-lg shrink-0 mt-0.5">
                <User size={16} className={item.user.genero === 'hombre' ? 'text-blue-400' : 'text-pink-400'} />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="font-sans font-bold text-xs text-white">
                    {item.user.nombre}
                  </span>
                  <span className="font-mono text-[9px] bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded">
                    {item.user.edad} años
                  </span>
                  <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                    item.user.genero === 'hombre' ? 'bg-blue-900/30 text-blue-300' : 'bg-pink-900/30 text-pink-300'
                  }`}>
                    {item.user.genero}
                  </span>
                </div>
                <p className="font-mono text-[10px] text-neutral-500 truncate max-w-xs sm:max-w-md">
                  {item.user.email}
                </p>
              </div>
            </div>

            {/* Right: Won product info */}
            <div className="flex items-center space-x-3 self-end sm:self-auto border-t sm:border-t-0 border-neutral-800/50 pt-2 sm:pt-0">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-neutral-800 shrink-0 bg-neutral-900">
                <img
                  src={productImgResize(item.product.image)}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-right">
                <span className="block font-mono text-[8px] text-brand-accent font-black tracking-widest uppercase">
                  GANÓ {item.product.category.toUpperCase()}
                </span>
                <span className="block font-sans font-bold text-xs text-white max-w-[150px] truncate">
                  {item.product.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper to provide slightly smaller image preview in history list
function productImgResize(url: string) {
  if (url.includes('unsplash.com')) {
    return `${url.split('?')[0]}?q=80&w=120&auto=format&fit=crop`;
  }
  return url;
}
