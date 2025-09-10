import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Brain, FileCheck, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const HowItWorks: React.FC = () => {
  const steps = [
  {
    icon: <Upload data-id="wzhefmy5p" data-path="src/components/HowItWorks.tsx" />,
    title: "Upload Your Ad",
    description: "Upload your advertisement image in any common format (JPG, PNG, etc.)"
  },
  {
    icon: <Brain data-id="cy0yq859e" data-path="src/components/HowItWorks.tsx" />,
    title: "AI Analysis",
    description: "NeoCompliance Pro analyzes your ad against the selected compliance standard"
  },
  {
    icon: <FileCheck data-id="692jpoi5p" data-path="src/components/HowItWorks.tsx" />,
    title: "Get Results",
    description: "Review detailed compliance report with actionable suggestions"
  }];


  return (
    <div className="w-full py-8" data-id="olj7s7r8f" data-path="src/components/HowItWorks.tsx">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8" data-id="i16vjjpj1" data-path="src/components/HowItWorks.tsx">

        <h2 className="text-3xl font-bold text-slate-200 mb-4" data-id="peuqse4v7" data-path="src/components/HowItWorks.tsx">
          How Compliance Checker Works
        </h2>
        <p className="text-slate-400 text-lg" data-id="a72pv0mnj" data-path="src/components/HowItWorks.tsx">
          Get your ad compliance results in three simple steps
        </p>
      </motion.div>

      <div className="relative" data-id="hb3nidukl" data-path="src/components/HowItWorks.tsx">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-id="3jteo0a23" data-path="src/components/HowItWorks.tsx">
          {steps.map((step, index) =>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative" data-id="xeubxw0jv" data-path="src/components/HowItWorks.tsx">

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300" data-id="66t395cp5" data-path="src/components/HowItWorks.tsx">
                <CardContent className="p-6 text-center" data-id="y316mnquu" data-path="src/components/HowItWorks.tsx">
                  <motion.div
                  className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }} data-id="6vb8hmk6g" data-path="src/components/HowItWorks.tsx">
                    {React.cloneElement(step.icon, { size: 24 })}
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-slate-200 mb-3" data-id="lk9cyb7wo" data-path="src/components/HowItWorks.tsx">
                    {step.title}
                  </h3>
                  
                  <p className="text-slate-400 leading-relaxed" data-id="sxxrwq5l8" data-path="src/components/HowItWorks.tsx">
                    {step.description}
                  </p>
                </CardContent>
              </Card>

              {/* Arrow between steps for desktop */}
              {index < steps.length - 1 &&
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (index + 1) * 0.2 }}
              className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10" data-id="13twab8k3" data-path="src/components/HowItWorks.tsx">
                  <div className="w-12 h-12 bg-slate-800/50 border border-slate-600/50 rounded-full flex items-center justify-center backdrop-blur-sm" data-id="t9h0pm1i3" data-path="src/components/HowItWorks.tsx">
                    <ArrowRight className="w-5 h-5 text-blue-400" data-id="9sq7wnyll" data-path="src/components/HowItWorks.tsx" />
                  </div>
                </motion.div>
            }
            </motion.div>
          )}
        </div>
      </div>
    </div>);

};

export default HowItWorks;