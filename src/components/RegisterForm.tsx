import React, { useState } from 'react';
import { UserRegister } from '../types';
import { UnderArmourLogo } from './UnderArmourLogo';
import { motion } from 'motion/react';
import { User, Mail, Calendar, HelpCircle, ArrowRight } from 'lucide-react';

interface RegisterFormProps {
  onRegister: (data: UserRegister) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState<number | ''>('');
  const [genero, setGenero] = useState<'hombre' | 'mujer' | null>('mujer');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    } else if (nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Introduce un correo electrónico válido';
    }

    if (edad === '') {
      newErrors.edad = 'La edad es obligatoria';
    } else {
      const edadNum = Number(edad);
      if (isNaN(edadNum) || edadNum < 12 || edadNum > 100) {
        newErrors.edad = 'Debes tener entre 12 y 100 años para participar';
      }
    }

    if (!genero) {
      newErrors.genero = 'Seleccionar tu género para personalizar tus premios es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && genero) {
      onRegister({
        nombre: nombre.trim(),
        email: email.trim(),
        edad: Number(edad),
        genero,
      });
    }
  };

  return (
    <div id="register-container" className="w-full max-w-lg mx-auto bg-neutral-900/90 border border-neutral-800 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-md">
      {/* Header section with brand logo */}
      <div className="flex flex-col items-center mb-8">
        <UnderArmourLogo size={56} className="text-white mb-4" />
        <h1 className="font-display font-black text-2xl md:text-3xl text-center text-white tracking-tight uppercase">
          PERFORMANCE WHEEL
        </h1>
        <p className="text-gray-400 text-sm text-center mt-2 max-w-xs">
          Regístrate para girar la ruleta y ganar equipamiento exclusivo de Under Armour
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre Input */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
            Nombre Completo
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
              <User size={18} />
            </span>
            <input
              type="text"
              id="input-nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej. Carlos Mendoza"
              className="w-full pl-11 pr-4 py-3.5 bg-black/50 hover:bg-black/80 text-white rounded-xl border border-neutral-800 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none font-sans text-sm transition-all placeholder:text-neutral-600"
            />
          </div>
          {errors.nombre && (
            <p className="text-brand-accent text-xs mt-1 font-mono">{errors.nombre}</p>
          )}
        </motion.div>

        {/* Email Input */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
            Correo Electrónico
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
              <Mail size={18} />
            </span>
            <input
              type="email"
              id="input-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="carlos@google.com"
              className="w-full pl-11 pr-4 py-3.5 bg-black/50 hover:bg-black/80 text-white rounded-xl border border-neutral-800 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none font-sans text-sm transition-all placeholder:text-neutral-600"
            />
          </div>
          {errors.email && (
            <p className="text-brand-accent text-xs mt-1 font-mono">{errors.email}</p>
          )}
        </motion.div>

        {/* Edad Input */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
            Edad
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
              <Calendar size={18} />
            </span>
            <input
              type="number"
              id="input-edad"
              value={edad}
              onChange={(e) => {
                const val = e.target.value;
                setEdad(val === '' ? '' : Number(val));
              }}
              placeholder="Ej. 25"
              min="12"
              max="100"
              className="w-full pl-11 pr-4 py-3.5 bg-black/50 hover:bg-black/80 text-white rounded-xl border border-neutral-800 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none font-sans text-sm transition-all placeholder:text-neutral-600"
            />
          </div>
          {errors.edad && (
            <p className="text-brand-accent text-xs mt-1 font-mono">{errors.edad}</p>
          )}
        </motion.div>

        {/* Género Selección */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
            Categoría de Premios
          </label>
          <div className="grid grid-cols-1">
            <button
              type="button"
              id="btn-gender-female"
              onClick={() => setGenero('mujer')}
              className="flex flex-col items-center justify-center p-5 rounded-xl border-2 border-brand-accent bg-brand-accent/10 text-white font-semibold transition-all cursor-default"
            >
              <span className="text-xl font-display font-black uppercase tracking-wider text-gray-400">MUJER</span>
              <span className="text-[11px] uppercase tracking-widest font-mono text-brand-accent font-bold mt-1">
                GAMA FEMENINA ACTIVA
              </span>
            </button>
          </div>
          {errors.genero && (
            <p className="text-brand-accent text-xs mt-1 font-mono">{errors.genero}</p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          id="btn-submit-registration"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full mt-8 py-4 px-6 bg-white hover:bg-neutral-100 text-black font-display font-extrabold uppercase tracking-wider rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span>ACCEDER A LA RULETA</span>
          <ArrowRight size={18} className="translate-y-[0.5px]" />
        </motion.button>
      </form>
    </div>
  );
};
