
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { complianceGuidelines } from '@/data/complianceGuidelines';
import { useCompliance } from '@/contexts/ComplianceContext';
import { X, ExternalLink } from 'lucide-react';

const GuidelinesSelector: React.FC = () => {
  const { selectedGuideline, setSelectedGuideline } = useCompliance();

  const handleGuidelineChange = (value: string) => {
    const guideline = complianceGuidelines.find((g) => g.id === value);
    console.log(`Guideline ${guideline?.name || 'none'} selected`);
    setSelectedGuideline(guideline || null);
  };

  const handleDeselectGuideline = () => {
    console.log('Deselecting current guideline');
    setSelectedGuideline(null);
  };

  const handleViewGuideline = (url: string, name: string) => {
    console.log(`🔗 Opening ${name} guidelines at: ${url}`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="w-full bg-slate-900/50 border-slate-700/50 backdrop-blur-sm" data-id="qse4avcni" data-path="src/components/GuidelinesSelector.tsx">
      <CardHeader data-id="6a1kak5jx" data-path="src/components/GuidelinesSelector.tsx">
        <CardTitle className="text-xl font-bold text-slate-200 flex items-center" data-id="zigkuntyf" data-path="src/components/GuidelinesSelector.tsx">
          <span className="mr-2" data-id="8bxuexe7g" data-path="src/components/GuidelinesSelector.tsx">⚖️</span>
          Compliance Guidelines
        </CardTitle>
        <p className="text-sm text-slate-400" data-id="rh05nqv2q" data-path="src/components/GuidelinesSelector.tsx">
          Select <strong data-id="4k746itbi" data-path="src/components/GuidelinesSelector.tsx">one</strong> guideline to analyze your advertisement against.
        </p>
      </CardHeader>
      <CardContent className="space-y-4" data-id="v5aqa5awk" data-path="src/components/GuidelinesSelector.tsx">
        <div className="space-y-2" data-id="1jxs5q374" data-path="src/components/GuidelinesSelector.tsx">
          <label className="text-sm font-medium text-slate-300" data-id="9jmlt2lst" data-path="src/components/GuidelinesSelector.tsx">Choose Guideline</label>
          <Select
            value={selectedGuideline?.id || ""}
            onValueChange={handleGuidelineChange} data-id="3nlmmltut" data-path="src/components/GuidelinesSelector.tsx">

            <SelectTrigger className="w-full bg-slate-800/50 border-slate-600 text-slate-200 hover:bg-slate-700/50 focus:ring-blue-500 focus:border-blue-500" data-id="pwixocmpf" data-path="src/components/GuidelinesSelector.tsx">
              <SelectValue placeholder="Select a compliance guideline..." data-id="29ya4ps17" data-path="src/components/GuidelinesSelector.tsx" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600" data-id="0zh4lc36i" data-path="src/components/GuidelinesSelector.tsx">
              {complianceGuidelines.map((guideline) =>
              <SelectItem
                key={guideline.id}
                value={guideline.id}
                className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700 cursor-pointer" data-id="7at56nq9m" data-path="src/components/GuidelinesSelector.tsx">

                  <div className="flex items-center space-x-2 py-1" data-id="rcjgq1x6n" data-path="src/components/GuidelinesSelector.tsx">
                    <span className="text-lg" role="img" aria-label={guideline.name} data-id="5sfon8tex" data-path="src/components/GuidelinesSelector.tsx">
                      {guideline.icon}
                    </span>
                    <div className="flex flex-col" data-id="zkanv3i31" data-path="src/components/GuidelinesSelector.tsx">
                      <div className="flex items-center space-x-2" data-id="2tka0c2mh" data-path="src/components/GuidelinesSelector.tsx">
                        <span className="font-medium" data-id="fg1ivxjl3" data-path="src/components/GuidelinesSelector.tsx">{guideline.name}</span>
                        <Badge variant="outline" className="text-xs border-slate-500 text-slate-400" data-id="xle4pz5b2" data-path="src/components/GuidelinesSelector.tsx">
                          {guideline.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        {selectedGuideline &&
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg" data-id="hexdzpsvx" data-path="src/components/GuidelinesSelector.tsx">

            <div className="flex items-start space-x-3" data-id="cgy2zyioj" data-path="src/components/GuidelinesSelector.tsx">
              <span className="text-2xl mt-1" role="img" aria-label={selectedGuideline.name} data-id="pvp7m42od" data-path="src/components/GuidelinesSelector.tsx">
                {selectedGuideline.icon}
              </span>
              <div className="flex-1 space-y-2" data-id="8f8rfi9vt" data-path="src/components/GuidelinesSelector.tsx">
                <div className="flex items-center justify-between" data-id="zwgw4wpvi" data-path="src/components/GuidelinesSelector.tsx">
                  <div className="flex items-center space-x-2" data-id="vf8ldvnof" data-path="src/components/GuidelinesSelector.tsx">
                    <h3 className="font-semibold text-blue-200" data-id="b8f8fzqf2" data-path="src/components/GuidelinesSelector.tsx">{selectedGuideline.name}</h3>
                    <Badge variant="outline" className="text-xs border-blue-400 text-blue-300" data-id="0fwirfa45" data-path="src/components/GuidelinesSelector.tsx">
                      {selectedGuideline.category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2" data-id="1hfl5qmvc" data-path="src/components/GuidelinesSelector.tsx">
                    <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewGuideline(selectedGuideline.url, selectedGuideline.name)}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 px-2 py-1 h-auto" data-id="nsrsajy1y" data-path="src/components/GuidelinesSelector.tsx">
                      <ExternalLink className="w-3 h-3 mr-1" data-id="o3kccnjin" data-path="src/components/GuidelinesSelector.tsx" />
                      <span className="text-xs" data-id="gq90tg1b0" data-path="src/components/GuidelinesSelector.tsx">View</span>
                    </Button>
                    <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDeselectGuideline}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20 px-2 py-1 h-auto" data-id="eaictfh2m" data-path="src/components/GuidelinesSelector.tsx">
                      <X className="w-3 h-3 mr-1" data-id="h0gty158r" data-path="src/components/GuidelinesSelector.tsx" />
                      <span className="text-xs" data-id="vyw1hjb4z" data-path="src/components/GuidelinesSelector.tsx">Remove</span>
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-blue-300 leading-relaxed" data-id="5q7i5s89q" data-path="src/components/GuidelinesSelector.tsx">
                  {selectedGuideline.description}
                </p>
                <p className="text-xs text-blue-400 mt-2" data-id="gsw04pg1e" data-path="src/components/GuidelinesSelector.tsx">
                  ✓ Your advertisement will be analyzed against this guideline.
                </p>
              </div>
            </div>
          </motion.div>
        }

        {!selectedGuideline &&
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg" data-id="ck5vqtref" data-path="src/components/GuidelinesSelector.tsx">

            <p className="text-sm text-amber-200" data-id="caqv2i30n" data-path="src/components/GuidelinesSelector.tsx">
              <span className="font-medium" data-id="n6jy0wabh" data-path="src/components/GuidelinesSelector.tsx">⚠️ No guideline selected</span>
            </p>
            <p className="text-xs text-amber-300 mt-1" data-id="ix9g41gqh" data-path="src/components/GuidelinesSelector.tsx">
              Please select one guideline from the dropdown above to proceed with compliance analysis.
            </p>
          </motion.div>
        }
      </CardContent>
    </Card>);

};

export default GuidelinesSelector;