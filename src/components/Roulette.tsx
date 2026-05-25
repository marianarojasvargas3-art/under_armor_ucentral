import React, { useState, useRef, useEffect } from 'react';
import { Product, UserRegister } from '../types';
import { AlertCircle, HelpCircle, Trophy } from 'lucide-react';
import { motion, useAnimation } from 'motion/react';

interface RouletteProps {
  products: Product[];
  user: UserRegister;
  onSpinComplete: (product: Product) => void;
}

export const Roulette: React.FC<RouletteProps> = ({ products, user, onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [activeLed, setActiveLed] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Wheel configuration
  const numSlices = 6;
  const sliceAngle = 360 / numSlices; // 60 degrees

  // Initialize Audio Context lazily on user interaction
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  // Sound generator: Ticking sound
  const playTickSound = () => {
    try {
      if (!audioContextRef.current) return;
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Audio fail-safe
    }
  };

  // Sound generator: Victory cheer arpeggio
  const playWinSound = () => {
    try {
      if (!audioContextRef.current) return;
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const chords = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5
      chords.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.6);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.6);
      });
    } catch (e) {
      // Audio fail-safe
    }
  };

  // LEDs around the roulette
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSpinning) {
      interval = setInterval(() => {
        setActiveLed((prev) => (prev + 1) % 12);
      }, 80);
    } else {
      interval = setInterval(() => {
        setActiveLed((prev) => (prev + 1) % 12);
      }, 500); // Standard breathe speed
    }
    return () => clearInterval(interval);
  }, [isSpinning]);

  // Handle spin event
  const handleSpin = () => {
    if (isSpinning) return;
    initAudio();

    setIsSpinning(true);
    setWinnerIndex(null);

    // Completely random winning index selection (0 to 5)
    const randomIndex = Math.floor(Math.random() * numSlices);

    // Calculate alignment rotation
    // Pointer is at TOP (12 o'clock, which is 270 degrees in trigonometric coordinates)
    const targetRelativeAngle = 270 - (randomIndex * sliceAngle + sliceAngle / 2);
    
    // Calculate new total rotation with a dramatic ease-out forward rotation
    const currentMod = currentRotation % 360;
    let angleDiff = targetRelativeAngle - currentMod;
    if (angleDiff <= 0) {
      angleDiff += 360;
    }
    
    const additionalSpins = 360 * 7; // 7 high-energy rotations
    const targetRotation = currentRotation + additionalSpins + angleDiff;

    // Simulate sound ticks as wheel spins
    let simulatedTicks = 0;
    const totalTicks = 38;
    const tickIntervalBase = 45; // ms
    
    const playTicksSequentially = (tickCount: number) => {
      if (tickCount >= totalTicks) return;
      
      // Calculate parabolic delays to match deceleration easing of progress wheel
      const progress = tickCount / totalTicks;
      const delay = tickIntervalBase + Math.pow(progress, 3.5) * 600;

      setTimeout(() => {
        playTickSound();
        playTicksSequentially(tickCount + 1);
      }, delay);
    };

    playTicksSequentially(0);
    setCurrentRotation(targetRotation);

    // End of animation trigger (takes 6 seconds)
    setTimeout(() => {
      setIsSpinning(false);
      setWinnerIndex(randomIndex);
      playWinSound();
      
      // Trigger callback with selected premium product after a short triumphant pause
      setTimeout(() => {
        onSpinComplete(products[randomIndex]);
      }, 1000);
    }, 6000);
  };

  // Generate SVG paths dynamically for slices
  const getSlicePath = (index: number) => {
    const r = 240; // radius
    const cx = 250;
    const cy = 250;
    const startAngle = (index * sliceAngle) * Math.PI / 180;
    const endAngle = ((index + 1) * sliceAngle) * Math.PI / 180;

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);

    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;
  };

  // Get content alignment coordinates for titles and thumbnails
  const getContentCoords = (index: number) => {
    const cx = 250;
    const cy = 250;
    const midAngle = (index * sliceAngle + sliceAngle / 2) * Math.PI / 180;
    
    // Radii of text labels and image avatars
    const rImg = 145;
    const rTxt = 205;

    return {
      xImg: cx + rImg * Math.cos(midAngle),
      yImg: cy + rImg * Math.sin(midAngle),
      xTxt: cx + rTxt * Math.cos(midAngle),
      yTxt: cy + rTxt * Math.sin(midAngle),
      angleDeg: (index * sliceAngle + sliceAngle / 2)
    };
  };

  return (
    <div id="roulette-pane" className="flex flex-col items-center justify-center w-full max-w-lg mx-auto py-4">
      
      {/* Target Marker Pointer at 12 o'clock */}
      <div className="relative mb-6 z-20">
        <div className="absolute top-[3px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[30px] border-t-brand-accent drop-shadow-[0_4px_10px_rgba(255,60,0,0.6)] animate-bounce" />
      </div>

      {/* Decorative Outer Ring with LED Bulbs */}
      <div className="relative p-3 bg-neutral-950/80 rounded-full border border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        
        {/* Glowing circular border overlay */}
        <div className="absolute inset-0 rounded-full border border-brand-accent/20 animate-pulse pointer-events-none" />

        {/* Dynamic LEDs around the bezel */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const radiusPercent = 48.4; // Position of LEDs on outer radius %
          const isActive = activeLed === i;
          return (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full transition-all duration-150 ${
                isActive 
                  ? 'bg-brand-accent scale-150 shadow-[0_0_12px_#b4001a]' 
                  : 'bg-neutral-800'
              }`}
              style={{
                top: `${50 + radiusPercent * Math.sin(angle)}%`,
                left: `${50 + radiusPercent * Math.cos(angle)}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          );
        })}

        {/* Spinning Wheel */}
        <motion.div
          id="spinning-wheel"
          animate={{ rotate: currentRotation }}
          transition={
            isSpinning 
              ? { ease: [0.15, 0.9, 0.2, 1], duration: 6 } // Realistic deceleration ease-out curve
              : { duration: 0 }
          }
          className="w-[300px] h-[300px] sm:w-[410px] sm:h-[410px] rounded-full overflow-hidden select-none bg-neutral-950"
        >
          <svg viewBox="0 0 500 500" className="w-full h-full">
            <defs>
              {/* Radial gradient overlay for metallic/depth feel */}
              <radialGradient id="wheel-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#252525" />
                <stop offset="65%" stopColor="#151515" />
                <stop offset="95%" stopColor="#080808" />
                <stop offset="100%" stopColor="#000000" />
              </radialGradient>

              {/* Clip path definitions for index-specific rounded images */}
              {products.map((_, i) => {
                const coords = getContentCoords(i);
                return (
                  <clipPath id={`avatar-clip-${i}`} key={i}>
                    <circle cx={coords.xImg} cy={coords.yImg} r="26" />
                  </clipPath>
                );
              })}
            </defs>

            {/* Backdrop Circle */}
            <circle cx="250" cy="250" r="248" fill="url(#wheel-gradient)" />

            {/* Roulette Slices */}
            {products.map((prod, i) => {
              const bgFill = i % 2 === 0 ? '#111111' : '#222222';
              const borderStroke = '#2d2d2d';
              const coords = getContentCoords(i);

              return (
                <g key={prod.id} className="group cursor-default">
                  {/* Background slice wedge */}
                  <path
                    d={getSlicePath(i)}
                    fill={bgFill}
                    stroke={borderStroke}
                    strokeWidth="1.5"
                    className="transition-colors duration-200"
                  />

                  {/* High contrast separator lines */}
                  <line 
                    x1="250" 
                    y1="250" 
                    x2={250 + 240 * Math.cos((i * sliceAngle) * Math.PI / 180)} 
                    y2={250 + 240 * Math.sin((i * sliceAngle) * Math.PI / 180)} 
                    stroke="#1a1a1a" 
                    strokeWidth="3.5" 
                  />

                  {/* Symmetrical white/accent dotted ticks near edge */}
                  <circle
                    cx={250 + 225 * Math.cos((i * sliceAngle + 30) * Math.PI / 180)}
                    cy={250 + 225 * Math.sin((i * sliceAngle + 30) * Math.PI / 180)}
                    r="3"
                    fill={i % 2 === 0 ? '#b4001a' : '#ffffff'}
                    opacity="0.8"
                  />

                  {/* Slice Text */}
                  <text
                    x={coords.xTxt}
                    y={coords.yTxt}
                    textAnchor="middle"
                    transform={`rotate(${coords.angleDeg - 90}, ${coords.xTxt}, ${coords.yTxt})`}
                    className="font-display font-black tracking-widest fill-white text-[10px] md:text-[11px] uppercase"
                  >
                    {prod.category}
                  </text>

                  {/* Circular Product Thumbnail */}
                  <image
                    href={prod.image}
                    x={coords.xImg - 26}
                    y={coords.yImg - 26}
                    width="52"
                    height="52"
                    clipPath={`url(#avatar-clip-${i})`}
                    preserveAspectRatio="xMidYMid slice"
                    referrerPolicy="no-referrer"
                  />

                  {/* Premium circular frame overlay for the thumbnail */}
                  <circle
                    cx={coords.xImg}
                    cy={coords.yImg}
                    r="26"
                    fill="none"
                    stroke={i % 2 === 0 ? '#b4001a' : '#ffffff'}
                    strokeWidth="2"
                    opacity="0.9"
                  />
                </g>
              );
            })}

            {/* Inner Metallic Bezel Hub */}
            <circle cx="250" cy="250" r="50" fill="#0c0c0c" stroke="#2a2a2a" strokeWidth="4" />
            <circle cx="250" cy="250" r="42" fill="#000000" />
            <circle cx="250" cy="250" r="38" fill="none" stroke="#252525" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* Center SPIN Trigger Button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          id="btn-spin-wheel"
          className={`absolute inset-0 m-auto flex flex-col items-center justify-center rounded-full transition-all duration-300 ${
            isSpinning
              ? 'w-16 h-16 sm:w-20 sm:h-20 bg-neutral-900 border-2 border-neutral-700 text-gray-500 cursor-not-allowed shadow-none'
              : 'w-20 h-20 sm:w-24 sm:h-24 bg-brand-accent hover:bg-neutral-900 hover:scale-110 hover:border-brand-accent active:scale-95 text-white shadow-[0_0_30px_rgba(180,0,26,0.75)] border-4 border-black font-display font-black text-xs md:text-sm uppercase tracking-wider cursor-pointer'
          }`}
          style={{ zIndex: 10 }}
        >
          {isSpinning ? (
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider animate-pulse">
              GIRANDO
            </span>
          ) : (
            <>
              <span className="text-center font-black leading-tight text-white drop-shadow-md">
                GIRAR
              </span>
              <span className="text-[8px] font-mono tracking-widest text-white/80 scale-90 leading-none mt-0.5">
                AHORA
              </span>
            </>
          )}
        </button>
      </div>

      {/* Wheel Legend Footer */}
      <div className="mt-6 flex flex-col items-center space-y-1 text-center">
        <div className="flex items-center space-x-2 text-xs text-gray-400 font-mono">
          <Trophy size={14} className="text-brand-accent" />
          <span>PREMIOS EXCLUSIVOS FILTRADOS POR GÉNERO:</span>
          <span className="text-white font-bold uppercase">{user.genero}</span>
        </div>
        <p className="text-[11px] text-gray-500 max-w-xs leading-relaxed">
          Nuestra ruleta calibrada de alto desempeño asegura un premio en cada turno único. Todas las celdas contienen equipamiento Under Armour oficial.
        </p>
      </div>
    </div>
  );
};
