import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import HomePage from '@/pages/HomePage';
import NotFound from '@/pages/NotFound';
import ComplianceChecker from '@/components/ComplianceChecker';
import Header from '@/components/Header';
import CustomCursor from '@/components/CustomCursor';
import PageTransition from '@/components/PageTransition';
import NavigationButtons from '@/components/NavigationButtons';
import { motion } from 'motion/react';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient} data-id="120m3fhop" data-path="src/App.tsx">
      <TooltipProvider data-id="7sv52ozwc" data-path="src/App.tsx">
        <Router data-id="wvgph0qwa" data-path="src/App.tsx">
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden" data-id="x5af3u06c" data-path="src/App.tsx">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none" data-id="foovplfi9" data-path="src/App.tsx">
              <motion.div
                className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-100/20 to-transparent rounded-full"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }} data-id="cjf1tn1qu" data-path="src/App.tsx" />

              <motion.div
                className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-100/20 to-transparent rounded-full"
                animate={{
                  rotate: -360,
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }} data-id="fdm8wsn87" data-path="src/App.tsx" />

            </div>

            <CustomCursor data-id="guwhdnbu9" data-path="src/App.tsx" />
            <Header data-id="cwk03shmx" data-path="src/App.tsx" />
            
            <motion.main
              className="relative z-10 pt-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }} data-id="wn2me29s0" data-path="src/App.tsx">

              <Routes data-id="t2hln6skc" data-path="src/App.tsx">
                <Route
                  path="/"
                  element={
                  <PageTransition data-id="6ajakpsnq" data-path="src/App.tsx">
                      <HomePage data-id="qmm3osfzy" data-path="src/App.tsx" />
                    </PageTransition>
                  } data-id="u8j1l0ta0" data-path="src/App.tsx" />

                <Route
                  path="/compliance"
                  element={
                  <PageTransition data-id="ge5cquhpl" data-path="src/App.tsx">
                      <ComplianceChecker data-id="oyxzbg1lp" data-path="src/App.tsx" />
                    </PageTransition>
                  } data-id="9e4wttwcr" data-path="src/App.tsx" />

                <Route
                  path="*"
                  element={
                  <PageTransition data-id="ek9r66g36" data-path="src/App.tsx">
                      <NotFound data-id="jt2ljeich" data-path="src/App.tsx" />
                    </PageTransition>
                  } data-id="xsvbkpfx5" data-path="src/App.tsx" />

              </Routes>
            </motion.main>
            
            {/* Navigation Buttons */}
            <NavigationButtons data-id="gpdvl2nfo" data-path="src/App.tsx" />
            
            <Toaster data-id="mia832vx5" data-path="src/App.tsx" />
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>);

}

export default App;