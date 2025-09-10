
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Search, ExternalLink, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { complianceGuidelines } from '@/data/complianceGuidelines';

const ComplianceGuidelinesDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGuidelines = complianceGuidelines.filter((guideline) =>
  guideline.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  guideline.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  guideline.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    console.log('📋 Compliance Guidelines Dropdown toggled:', !isOpen);
  };

  const handleGuidelineClick = (guideline: any) => {
    console.log('🔗 Opening guideline:', guideline.name, 'at:', guideline.url);
    window.open(guideline.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto" data-id="gmj6ddmg9" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
      {/* Dropdown Toggle Button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }} data-id="gbxrtlyo4" data-path="src/components/ComplianceGuidelinesDropdown.tsx">

        <Button
          onClick={toggleDropdown}
          variant="outline"
          className="w-full h-14 bg-slate-900/50 border-slate-700/50 backdrop-blur-sm glass-morphism hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-200 text-slate-300 hover:text-white" data-id="yn1w8r3t3" data-path="src/components/ComplianceGuidelinesDropdown.tsx">

          <div className="flex items-center justify-between w-full" data-id="2cl2csb0d" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
            <div className="flex items-center space-x-3" data-id="aqm7v22bm" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
              <Info className="w-5 h-5 text-blue-400" data-id="ntzoxx9xu" data-path="src/components/ComplianceGuidelinesDropdown.tsx" />
              <span className="text-lg font-semibold" data-id="m1hxrv2by" data-path="src/components/ComplianceGuidelinesDropdown.tsx">View Compliance Guidelines</span>
              <Badge className="disney-gradient-blue text-white px-2 py-1 text-xs" data-id="dyi5sj9s4" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
                {complianceGuidelines.length} Guidelines
              </Badge>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }} data-id="fvrr5zfk9" data-path="src/components/ComplianceGuidelinesDropdown.tsx">

              <ChevronDown className="w-5 h-5" data-id="30dnetld2" data-path="src/components/ComplianceGuidelinesDropdown.tsx" />
            </motion.div>
          </div>
        </Button>
      </motion.div>

      {/* Dropdown Content */}
      <motion.div
        initial={{ opacity: 0, y: -10, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : -10,
          height: isOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden" data-id="051u28u08" data-path="src/components/ComplianceGuidelinesDropdown.tsx">

        {isOpen &&
        <Card className="mt-4 bg-slate-900/50 border-slate-700/50 backdrop-blur-sm glass-morphism" data-id="5iosva0uv" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
            <CardHeader className="pb-4" data-id="215ck0hfd" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" data-id="rugiwr2pd" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
                🔍 Compliance Guidelines Reference
              </CardTitle>
              <p className="text-sm text-slate-400 mt-2" data-id="8t32ooicb" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
                Click on any guideline below to visit the official documentation and learn more about specific requirements.
              </p>
              
              {/* Search Bar */}
              <div className="relative mt-4" data-id="teb36w3gr" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" data-id="zg4lkfln1" data-path="src/components/ComplianceGuidelinesDropdown.tsx" />
                <Input
                type="text"
                placeholder="Search guidelines by name, description, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-600/50 text-slate-300 placeholder:text-slate-500 focus:border-blue-400/50 focus:ring-blue-400/20" data-id="d32xoicnv" data-path="src/components/ComplianceGuidelinesDropdown.tsx" />

              </div>
            </CardHeader>

            <CardContent data-id="vn9m5d99c" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
              <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar" data-id="2uij6hk4y" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
                {filteredGuidelines.length > 0 ?
              filteredGuidelines.map((guideline, index) =>
              <motion.div
                key={guideline.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleGuidelineClick(guideline)}
                className="group cursor-pointer" data-id="3ntio6rgf" data-path="src/components/ComplianceGuidelinesDropdown.tsx">

                      <Card className="bg-slate-800/30 border-slate-600/30 hover:bg-slate-800/50 hover:border-slate-500/50 transition-all duration-200" data-id="ro97tbchn" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
                        <CardContent className="p-4" data-id="9tj2vw9ls" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
                          <div className="flex items-start space-x-4" data-id="gbaw9nyur" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
                            {/* Icon */}
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg disney-gradient-blue flex items-center justify-center text-2xl crystal-pulse group-hover:scale-110 transition-transform duration-200" data-id="3r1a0ow62" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
                              {guideline.icon}
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0" data-id="1i3pk8hhc" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
                              <div className="flex items-center justify-between mb-2" data-id="stpdm5lc4" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
                                <h3 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors duration-200" data-id="i1bs70mbl" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
                                  {guideline.name}
                                </h3>
                                <div className="flex items-center space-x-2" data-id="rbzyun0e8" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
                                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors duration-200" data-id="xdognz5dh" data-path="src/components/ComplianceGuidelinesDropdown.tsx" />
                                  <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-200" data-id="lzhl2xdj0" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
                                    Click to view
                                  </span>
                                </div>
                              </div>
                              
                              <p className="text-slate-400 text-sm leading-relaxed mb-3 group-hover:text-slate-300 transition-colors duration-200" data-id="dp22j1kng" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
                                {guideline.description}
                              </p>
                              
                              <div className="flex items-center justify-between" data-id="v2bupx7bj" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
                                <Badge
                            variant="outline"
                            className="text-xs border-slate-600/50 text-slate-400 bg-slate-700/30" data-id="ua0czcpkz" data-path="src/components/ComplianceGuidelinesDropdown.tsx">

                                  {guideline.category}
                                </Badge>
                                
                                <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-200" data-id="vtf9ojise" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
                                  ID: {guideline.id.toUpperCase()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
              ) :

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8" data-id="qwtqgv6ic" data-path="src/components/ComplianceGuidelinesDropdown.tsx">

                    <div className="text-slate-500 text-lg mb-2" data-id="dracmftt5" data-path="src/components/ComplianceGuidelinesDropdown.tsx">🔍</div>
                    <p className="text-slate-400 mb-2" data-id="zeja95cx7" data-path="src/components/ComplianceGuidelinesDropdown.tsx">No guidelines found matching your search.</p>
                    <p className="text-slate-500 text-sm" data-id="ecf4nvdt0" data-path="src/components/ComplianceGuidelinesDropdown.tsx">Try different keywords or clear the search.</p>
                  </motion.div>
              }
              </div>

              {/* Footer Info */}
              <div className="mt-6 pt-4 border-t border-slate-700/50" data-id="jkkh3tggx" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
                <div className="flex items-center justify-between text-sm text-slate-400" data-id="maehs92ff" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
                  <span data-id="vqivuo7gd" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
                    📊 Showing {filteredGuidelines.length} of {complianceGuidelines.length} guidelines
                  </span>
                  <span className="flex items-center" data-id="y1eibf4oq" data-path="src/components/ComplianceGuidelinesDropdown.tsx">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" data-id="kcj8o2t4h" data-path="src/components/ComplianceGuidelinesDropdown.tsx"></span>
                    Updated regularly
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        }
      </motion.div>

      {/* Custom Scrollbar Styles */}
      <style jsx global data-id="g128x8zad" data-path="src/components/ComplianceGuidelinesDropdown.tsx">{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.7);
        }
      `}</style>
    </div>);

};

export default ComplianceGuidelinesDropdown;