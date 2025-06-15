import React from 'react';
import { motion } from 'motion/react';
import { Shield, Menu, X, Zap, Brain, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl" data-id="03oiwtvg7" data-path="src/components/Header.tsx">

      <div className="container mx-auto px-4 py-4" data-id="fmshq2ooh" data-path="src/components/Header.tsx">
        <div className="flex items-center justify-between" data-id="vlbykz7lb" data-path="src/components/Header.tsx">
          {/* Enhanced 3D Logo and Brand */}
          <motion.div
            className="flex items-center space-x-4 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => navigate('/')} data-id="nelp37exn" data-path="src/components/Header.tsx">

            {/* 3D Logo Container */}
            <motion.div
              className="relative perspective-1000"
              whileHover={{ rotateY: 15, rotateX: 5 }}
              transition={{ duration: 0.6, ease: "easeInOut" }} data-id="qoe7fkjlv" data-path="src/components/Header.tsx">

              {/* Main Logo Container with 3D Effect */}
              <div className="relative w-16 h-16 transform-gpu" data-id="rvw1sd899" data-path="src/components/Header.tsx">
                {/* Background layers for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-2xl transform rotate-3 translate-x-1 translate-y-1 opacity-30 blur-sm" data-id="9tpnohwdh" data-path="src/components/Header.tsx"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 rounded-2xl transform -rotate-2 translate-x-0.5 translate-y-0.5 opacity-50" data-id="d1tdx25lj" data-path="src/components/Header.tsx"></div>
                
                {/* Main logo surface */}
                <div className="relative w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl border border-cyan-300/20" data-id="x2dtenhm7" data-path="src/components/Header.tsx">
                  
                  {/* Neural Network Pattern Background */}
                  <div className="absolute inset-0 opacity-20" data-id="9g3k4fw78" data-path="src/components/Header.tsx">
                    <svg className="w-full h-full" viewBox="0 0 64 64" data-id="wxuy98kf8" data-path="src/components/Header.tsx">
                      <defs data-id="tbavgjx0t" data-path="src/components/Header.tsx">
                        <pattern id="neural" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse" data-id="5v9l89mgf" data-path="src/components/Header.tsx">
                          <circle cx="8" cy="8" r="1" fill="currentColor" opacity="0.3" data-id="1pn63jdst" data-path="src/components/Header.tsx" />
                          <line x1="8" y1="8" x2="16" y2="0" stroke="currentColor" strokeWidth="0.5" opacity="0.2" data-id="kjy5y4p2f" data-path="src/components/Header.tsx" />
                          <line x1="8" y1="8" x2="0" y2="16" stroke="currentColor" strokeWidth="0.5" opacity="0.2" data-id="fnypju3uo" data-path="src/components/Header.tsx" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#neural)" className="text-white" data-id="gzkuo0g42" data-path="src/components/Header.tsx" />
                    </svg>
                  </div>

                  {/* Icon Container with 3D effect */}
                  <motion.div
                    className="relative z-10 flex items-center justify-center"
                    animate={{
                      rotateY: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }} data-id="7m7j1mx6s" data-path="src/components/Header.tsx">
                    
                    {/* Main Shield Icon */}
                    <Shield className="w-8 h-8 text-white drop-shadow-lg" data-id="etht96yi9" data-path="src/components/Header.tsx" />
                    
                    {/* Neural Network Overlay */}
                    <motion.div
                      className="absolute -top-1 -right-1"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }} data-id="4h6b8tlfm" data-path="src/components/Header.tsx">
                      <Brain className="w-4 h-4 text-cyan-200" data-id="l3th0v62a" data-path="src/components/Header.tsx" />
                    </motion.div>
                  </motion.div>

                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-2xl"
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }} data-id="qpzi07rnj" data-path="src/components/Header.tsx" />
                </div>

                {/* Floating particles effect */}
                <motion.div
                  className="absolute -top-2 -right-2 w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{
                    y: [-5, 5, -5],
                    x: [-2, 2, -2],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }} data-id="r6gptxk9i" data-path="src/components/Header.tsx" />
                
                <motion.div
                  className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-purple-400 rounded-full"
                  animate={{
                    y: [3, -3, 3],
                    x: [1, -1, 1],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }} data-id="33eibmv9z" data-path="src/components/Header.tsx" />
              </div>
            </motion.div>

            {/* Enhanced Text with 3D Effect */}
            <div className="flex flex-col" data-id="otp787884" data-path="src/components/Header.tsx">
              <motion.h1
                className="text-2xl font-bold relative"
                whileHover={{ scale: 1.02 }}
                style={{
                  background: 'linear-gradient(135deg, #67e8f9 0%, #3b82f6 50%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                }} data-id="eiw92zrdd" data-path="src/components/Header.tsx">
                <span className="relative" data-id="l7bg0ihn8" data-path="src/components/Header.tsx">
                  NeoCompliance Pro
                  {/* 3D text depth effect */}
                  <span
                    className="absolute top-0 left-0 -z-10 text-slate-700"
                    style={{
                      transform: 'translate(1px, 1px)',
                      opacity: 0.5
                    }} data-id="59obtjuii" data-path="src/components/Header.tsx">
                    NeoCompliance Pro
                  </span>
                  <span
                    className="absolute top-0 left-0 -z-20 text-slate-800"
                    style={{
                      transform: 'translate(2px, 2px)',
                      opacity: 0.3
                    }} data-id="pirnlez1l" data-path="src/components/Header.tsx">
                    NeoCompliance Pro
                  </span>
                </span>
              </motion.h1>
              
              <motion.p
                className="text-sm text-cyan-300/80 font-medium tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }} data-id="fuo0qhwyk" data-path="src/components/Header.tsx">
                <Network className="inline w-3 h-3 mr-1 opacity-70" data-id="btk45y5a8" data-path="src/components/Header.tsx" />
                Neural Compliance Intelligence
              </motion.p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" data-id="4f5cofu9i" data-path="src/components/Header.tsx">
            {[
            { label: 'Dashboard', path: '/' },
            { label: 'Compliance Check', path: '/compliance' },
            { label: 'Reports', path: '#' },
            { label: 'Settings', path: '#' }].
            map((item, index) =>
            <motion.a
              key={item.label}
              href={item.path}
              onClick={(e) => {
                if (item.path !== '#') {
                  e.preventDefault();
                  navigate(item.path);
                }
              }}
              className="text-cyan-300/80 hover:text-cyan-200 font-medium relative group cursor-pointer"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ transitionDelay: `${index * 0.1}s` }} data-id="4q7whxsnj" data-path="src/components/Header.tsx">

                {item.label}
                <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }} data-id="oqae9uvhn" data-path="src/components/Header.tsx" />

                <motion.div
                className="absolute inset-0 bg-cyan-400/10 rounded-lg opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }} data-id="ph4f8bba3" data-path="src/components/Header.tsx" />

              </motion.a>
            )}
          </nav>

          {/* Action Button */}
          <motion.div
            className="hidden md:block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }} data-id="yon0r8agv" data-path="src/components/Header.tsx">

            <Button
              onClick={() => navigate('/compliance')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 py-2 shadow-lg hover:shadow-cyan-500/20" data-id="cwey9naob" data-path="src/components/Header.tsx">

              <Zap className="w-4 h-4 mr-2" data-id="p0jss5mxw" data-path="src/components/Header.tsx" />
              Start Analysis
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div className="md:hidden" data-id="el7nffurk" data-path="src/components/Header.tsx">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10" data-id="m3yo52dur" data-path="src/components/Header.tsx">

              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }} data-id="6go6vdifx" data-path="src/components/Header.tsx">

                {isMenuOpen ? <X className="w-5 h-5" data-id="tufuf2etd" data-path="src/components/Header.tsx" /> : <Menu className="w-5 h-5" data-id="hgyk2mxef" data-path="src/components/Header.tsx" />}
              </motion.div>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }} data-id="kp8r6tgr2" data-path="src/components/Header.tsx">

          <nav className="py-4 space-y-2 border-t border-cyan-500/20 mt-4" data-id="j2f48ont6" data-path="src/components/Header.tsx">
            {[
            { label: 'Dashboard', path: '/' },
            { label: 'Compliance Check', path: '/compliance' },
            { label: 'Reports', path: '#' },
            { label: 'Settings', path: '#' }].
            map((item, index) =>
            <motion.a
              key={item.label}
              href={item.path}
              onClick={(e) => {
                if (item.path !== '#') {
                  e.preventDefault();
                  navigate(item.path);
                  setIsMenuOpen(false);
                }
              }}
              className="block py-3 px-4 text-cyan-300/80 hover:text-cyan-200 hover:bg-cyan-500/10 rounded-lg transition-colors cursor-pointer"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 10 }} data-id="aql8k4hgi" data-path="src/components/Header.tsx">

                {item.label}
              </motion.a>
            )}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-2" data-id="dgap0yn60" data-path="src/components/Header.tsx">

              <Button
                onClick={() => {
                  navigate('/compliance');
                  setIsMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold" data-id="vzhn5j4p8" data-path="src/components/Header.tsx">

                <Zap className="w-4 h-4 mr-2" data-id="eg3n0m80z" data-path="src/components/Header.tsx" />
                Start Analysis
              </Button>
            </motion.div>
          </nav>
        </motion.div>
      </div>
    </motion.header>);

};

export default Header;