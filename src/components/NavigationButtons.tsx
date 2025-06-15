import React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Home, Shield, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pages = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/compliance', label: 'Compliance Scanner', icon: Shield }];


  const currentPageIndex = pages.findIndex((page) => page.path === location.pathname);
  const prevPage = currentPageIndex > 0 ? pages[currentPageIndex - 1] : null;
  const nextPage = currentPageIndex < pages.length - 1 ? pages[currentPageIndex + 1] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50" data-id="m4798or6g" data-path="src/components/NavigationButtons.tsx">

      <div className="flex items-center gap-4 bg-slate-800/80 backdrop-blur-xl border border-cyan-500/30 rounded-full px-6 py-3 shadow-2xl" data-id="npz3vu2ij" data-path="src/components/NavigationButtons.tsx">
        {/* Previous Page Button */}
        {prevPage &&
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }} data-id="vaz3wypb7" data-path="src/components/NavigationButtons.tsx">

            <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(prevPage.path)}
            className="text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10 rounded-full px-4" data-id="dgx4urqc3" data-path="src/components/NavigationButtons.tsx">

              <ArrowLeft className="w-4 h-4 mr-2" data-id="a0r9308te" data-path="src/components/NavigationButtons.tsx" />
              {prevPage.label}
            </Button>
          </motion.div>
        }

        {/* Page Indicators */}
        <div className="flex items-center gap-2" data-id="sy9pxi04g" data-path="src/components/NavigationButtons.tsx">
          {pages.map((page, index) => {
            const Icon = page.icon;
            const isActive = location.pathname === page.path;

            return (
              <motion.div
                key={page.path}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }} data-id="cqggbhxth" data-path="src/components/NavigationButtons.tsx">

                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => navigate(page.path)}
                  className={`rounded-full w-10 h-10 p-0 ${
                  isActive ?
                  'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' :
                  'text-cyan-400 hover:text-cyan-200 hover:bg-cyan-500/10'}`
                  } data-id="r8fi6vrwm" data-path="src/components/NavigationButtons.tsx">

                  <Icon className="w-4 h-4" data-id="ad0y877aj" data-path="src/components/NavigationButtons.tsx" />
                </Button>
              </motion.div>);

          })}
        </div>

        {/* Next Page Button */}
        {nextPage &&
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }} data-id="bpwxw9x6x" data-path="src/components/NavigationButtons.tsx">

            <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(nextPage.path)}
            className="text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10 rounded-full px-4" data-id="kp6ajtv5o" data-path="src/components/NavigationButtons.tsx">

              {nextPage.label}
              <ArrowRight className="w-4 h-4 ml-2" data-id="h0tab81tt" data-path="src/components/NavigationButtons.tsx" />
            </Button>
          </motion.div>
        }
      </div>

      {/* Page Title Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mt-2" data-id="o4jhtmrud" data-path="src/components/NavigationButtons.tsx">

        <span className="text-xs text-cyan-400/70 bg-slate-800/60 backdrop-blur-sm px-3 py-1 rounded-full border border-cyan-500/20" data-id="0n78hb2cv" data-path="src/components/NavigationButtons.tsx">
          {pages[currentPageIndex]?.label || 'Unknown Page'}
        </span>
      </motion.div>
    </motion.div>);

};

export default NavigationButtons;