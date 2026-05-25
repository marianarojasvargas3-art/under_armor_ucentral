import React, { useState } from 'react';
import { Product, UserRegister } from '../types';
import { motion } from 'motion/react';
import { UnderArmourLogo } from './UnderArmourLogo';
import { Check, Flame, Share2, RefreshCw, Smartphone, Hash, UserCheck, Mail, Award, CheckCircle2 } from 'lucide-react';

interface WinnerCardProps {
  product: Product;
  user: UserRegister;
  onReset: () => void;
}

export const WinnerCard: React.FC<WinnerCardProps> = ({ product, user, onReset }) => {
  const [copied, setCopied] = useState(false);
  // Generate a random redeem voucher code
  const redeemCode = `UA-${user.genero.substring(0, 1).toUpperCase()}${user.edad}-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(`¡Gané un(a) ${product.name} de Under Armour! Código de canje: ${redeemCode}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="winner-card-container" className="w-full max-w-2xl mx-auto py-2 px-1">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 18, stiffness: 90 }}
        className="relative bg-neutral-900 border-2 border-brand-accent/50 rounded-[2.5rem] shadow-[0_20px_50px_rgba(180,0,26,0.3)] overflow-hidden"
      >
        {/* Abstract Red/Silver Carbon Ambient Top Background Glow */}
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-brand-accent/20 to-transparent pointer-events-none" />
        
        {/* Diagonal Ribbon Tag "ATHLETE PASS" */}
        <div className="absolute top-6 right-6 z-10 bg-brand-accent text-white font-mono text-[9px] font-black uppercase px-3 py-1.5 rounded-full tracking-widest shadow-md flex items-center space-x-1">
          <Flame size={10} className="animate-pulse" />
          <span>PASE DE GANADOR</span>
        </div>

        {/* 1. PRODUCT FOCUS AREA (Ultra Premium styling) */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center border-b border-dashed border-neutral-800">
          
          {/* Main Huge High Resolution Image Container */}
          <div className="relative w-full md:w-1/2 aspect-square rounded-[1.8rem] overflow-hidden bg-neutral-950 border border-neutral-800 group shadow-inner">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
            />
            {/* Dark glass backdrop layout cover with price category */}
            <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md border border-neutral-800 px-3.5 py-1.5 rounded-xl">
              <span className="font-mono text-[10px] tracking-wider text-brand-accent font-bold uppercase">
                {product.category}
              </span>
            </div>
          </div>

          {/* Winning info & Title */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest font-extrabold">
                  ¡PREMIO CONSEGUIDO!
                </span>
              </div>
              
              <h2 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight uppercase leading-none">
                {product.name}
              </h2>

              <p className="font-sans text-sm text-neutral-300 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Event Stamp & Perks */}
            <div className="mt-6 pt-3 border-t border-neutral-800 space-y-2">
              <div className="flex items-center text-xs text-neutral-400 space-x-2">
                <CheckCircle2 size={14} className="text-brand-accent" />
                <span>Garantía oficial Under Armour® incluida.</span>
              </div>
              <div className="flex items-center text-xs text-neutral-400 space-x-2">
                <CheckCircle2 size={14} className="text-brand-accent" />
                <span>Canjeable de forma física u online.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. SECURITY PERFORATION SPLIT (Ticket effect with circular stubs at edges) */}
        <div className="relative h-2 flex items-center justify-between">
          <div className="absolute left-[-16px] w-8 h-8 rounded-full bg-black border border-neutral-800 z-10" />
          <div className="w-full border-t border-dashed border-neutral-800 mx-2" />
          <div className="absolute right-[-16px] w-8 h-8 rounded-full bg-black border border-neutral-800 z-10" />
        </div>

        {/* 3. PARTICIPANT REGISTRATION DATA AREA (La "tarjeta de registro") */}
        <div className="p-6 md:p-8 bg-neutral-950/60 backdrop-blur-sm">
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3.5">
              <div className="p-2 bg-neutral-800 rounded-lg">
                <UnderArmourLogo size={24} className="text-white" />
              </div>
              <div>
                <h4 className="font-display font-extrabold text-xs tracking-wider text-white uppercase">
                  TICKET DE VERIFICACIÓN
                </h4>
                <p className="font-mono text-[9px] text-gray-400 tracking-wider">
                  CÓDIGO DE RECLAMACIÓN: {redeemCode}
                </p>
              </div>
            </div>
            
            {/* VIP Label */}
            <div className="bg-white/10 px-2.5 py-1 rounded-md text-[10px] font-mono text-white tracking-widest font-black uppercase">
              VIP GUEST
            </div>
          </div>

          {/* Athlete Data Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 bg-black/60 border border-neutral-800 p-5 rounded-2xl">
            {/* Nombre */}
            <div className="space-y-1">
              <span className="block font-mono text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
                Atleta
              </span>
              <div className="flex items-center space-x-1.5 text-white">
                <UserCheck size={13} className="text-brand-accent/80 shrink-0" />
                <span className="font-sans font-extrabold text-xs md:text-sm truncate">
                  {user.nombre}
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1 col-span-1 md:col-span-1">
              <span className="block font-mono text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
                Contacto
              </span>
              <div className="flex items-center space-x-1.5 text-white">
                <Mail size={13} className="text-brand-accent/80 shrink-0" />
                <span className="font-sans font-medium text-xs truncate">
                  {user.email}
                </span>
              </div>
            </div>

            {/* Edad */}
            <div className="space-y-1">
              <span className="block font-mono text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
                Edad
              </span>
              <span className="block font-sans font-extrabold text-xs md:text-sm text-white">
                {user.edad} años
              </span>
            </div>

            {/* Género */}
            <div className="space-y-1">
              <span className="block font-mono text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
                Config. Género
              </span>
              <span className="block font-display font-black text-xs md:text-sm text-brand-accent uppercase tracking-wider">
                FEMENINA
              </span>
            </div>
          </div>

          {/* Barcode representation */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-800/80 pt-6">
            
            {/* Barcode design mimicking realistic barcode font using styling */}
            <div className="flex flex-col items-center sm:items-start space-y-1">
              <div className="flex h-11 items-end bg-white py-1.5 px-3 rounded-md overflow-hidden opacity-90">
                {/* Simulated vertical bars */}
                {[2,1,3,1,2,4,1,2,1,3,2,1,4,1,2,2,1,3,1,2,4,2,3,1,1,2,2,1,4,2,1,3,1,2].map((width, idx) => (
                  <div
                    key={idx}
                    style={{ width: `${width * 1.3}px` }}
                    className={`h-full ${idx % 2 === 0 ? 'bg-black' : 'bg-transparent'}`}
                  />
                ))}
              </div>
              <span className="font-mono text-[9px] text-gray-500 tracking-[0.2em] uppercase mt-1">
                {redeemCode} (UA AUTHENTICATED)
              </span>
            </div>

            {/* Action flow buttons inside the win layout */}
            <div className="flex space-x-3 w-full sm:w-auto">
              {/* Reset / New Register Button */}
              <button
                onClick={onReset}
                id="btn-restart-experience"
                className="flex-1 sm:flex-none flex items-center justify-center space-x-2 py-3 px-5 bg-brand-accent hover:bg-red-500 text-white rounded-xl font-display font-black text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
              >
                <RefreshCw size={14} className="animate-spin-hover" />
                <span>REGISTRAR OTRO</span>
              </button>

              <button
                onClick={handleShare}
                id="btn-share-prize"
                className="flex items-center justify-center space-x-2 py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-display font-black text-xs uppercase tracking-wider transition-all border border-neutral-700 cursor-pointer"
                title="Compartir"
              >
                <Share2 size={14} className={copied ? "text-green-500" : ""} />
                <span>{copied ? '¡COPIADO!' : 'COMPARTIR'}</span>
              </button>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};
