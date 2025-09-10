
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Background3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPercent = clientX / innerWidth * 100;
      const yPercent = clientY / innerHeight * 100;

      container.style.setProperty('--mouse-x', `${xPercent}%`);
      container.style.setProperty('--mouse-y', `${yPercent}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
          rgba(59, 130, 246, 0.15) 0%, 
          rgba(139, 92, 246, 0.1) 25%, 
          rgba(16, 185, 129, 0.05) 50%, 
          transparent 70%),
          linear-gradient(135deg, 
          rgba(15, 23, 42, 0.9) 0%, 
          rgba(30, 41, 59, 0.95) 50%, 
          rgba(15, 23, 42, 0.9) 100%)
        `
      }} data-id="chbfg1pmh" data-path="src/components/Background3D.tsx">

      {/* Animated particles */}
      {Array.from({ length: 50 }, (_, i) =>
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight
        }}
        animate={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight
        }}
        transition={{
          duration: Math.random() * 20 + 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear'
        }} data-id="72ouwxz2f" data-path="src/components/Background3D.tsx" />

      )}
      
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-20 h-20 border border-purple-500/30 rotate-45"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} data-id="fjkuk0dv7" data-path="src/components/Background3D.tsx" />

      
      <motion.div
        className="absolute top-3/4 right-1/3 w-16 h-16 border border-cyan-500/30 rounded-full"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} data-id="3gt2ad0qd" data-path="src/components/Background3D.tsx" />

      
      <motion.div
        className="absolute bottom-1/4 left-2/3 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rotate-12"
        animate={{ rotate: [12, 45, 12] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} data-id="yyx844opy" data-path="src/components/Background3D.tsx" />

    </div>);

};

export default Background3D;