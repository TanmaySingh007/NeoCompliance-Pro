import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Eye, Sparkles } from 'lucide-react';

const UnderstandingGuidelines: React.FC = () => {
  const guidelines = [
  {
    icon: <Shield className="w-8 h-8" data-id="axennf263" data-path="src/components/UnderstandingGuidelines.tsx" />,
    title: "Why Compliance Matters",
    description: "Ensuring your advertisements comply with regulatory standards is crucial for maintaining brand integrity, avoiding legal issues, and building trust with your audience. Non-compliance can lead to penalties, reputational damage, and loss of customer confidence."
  },
  {
    icon: <Eye className="w-8 h-8" data-id="7ofhkvkqo" data-path="src/components/UnderstandingGuidelines.tsx" />,
    title: "WCAG Standards",
    description: "Web Content Accessibility Guidelines (WCAG) ensure your content is accessible to people with disabilities. Following these standards makes your advertisements inclusive and reaches a wider audience while meeting legal requirements in many jurisdictions, including the European Accessibility Act (EAA) which mandates digital accessibility across the EU."
  },
  {
    icon: <Sparkles className="w-8 h-8" data-id="kq2p52519" data-path="src/components/UnderstandingGuidelines.tsx" />,
    title: "NeoCompliance Pro's Role",
    description: "NeoCompliance Pro provides automated compliance checking tools that help you verify your advertisements against multiple regulatory frameworks. Our AI-powered system ensures accuracy and saves time while helping you maintain compliance with industry standards."
  }];


  return (
    <div className="w-full py-8" data-id="zkd1m0qdm" data-path="src/components/UnderstandingGuidelines.tsx">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8" data-id="8ge97jlun" data-path="src/components/UnderstandingGuidelines.tsx">
        <h2 className="text-3xl font-bold text-slate-200 mb-4" data-id="u5one6jvt" data-path="src/components/UnderstandingGuidelines.tsx">
          Understanding Compliance Standards
        </h2>
        <p className="text-slate-400 text-lg" data-id="dy543p0mj" data-path="src/components/UnderstandingGuidelines.tsx">
          Learn about the importance of compliance and how NeoCompliance Pro helps you maintain regulatory standards
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-id="xj9vs18dk" data-path="src/components/UnderstandingGuidelines.tsx">
        {guidelines.map((guideline, index) =>
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }} data-id="tf2tyh2fr" data-path="src/components/UnderstandingGuidelines.tsx">

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 h-full" data-id="h5aszaii7" data-path="src/components/UnderstandingGuidelines.tsx">
              <CardContent className="p-6" data-id="ci86apdxt" data-path="src/components/UnderstandingGuidelines.tsx">
                <motion.div
                className="w-16 h-16 mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }} data-id="g7zpp9xo7" data-path="src/components/UnderstandingGuidelines.tsx">
                  {guideline.icon}
                </motion.div>
                
                <h3 className="text-xl font-semibold text-slate-200 mb-3" data-id="ci532of1q" data-path="src/components/UnderstandingGuidelines.tsx">
                  {guideline.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed text-sm" data-id="rwfc6mcpj" data-path="src/components/UnderstandingGuidelines.tsx">
                  {guideline.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>);

};

export default UnderstandingGuidelines;