import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Track mouse movement
    window.addEventListener('mousemove', updateMousePosition);

    // Track hover states for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, [role="button"]');

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }} data-id="8goiwmsoq" data-path="src/components/CustomCursor.tsx" />

      
      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border-2 border-blue-400/30 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 2 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 1
        }} data-id="mmz19jkax" data-path="src/components/CustomCursor.tsx" />

    </>);

};

export default CustomCursor;