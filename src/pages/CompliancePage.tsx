import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Play, Loader2, AlertCircle, Sparkles, Shield, Zap, Users, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Background3D from '@/components/Background3D';
import MagicalParticles from '@/components/MagicalParticles';
import FileUploader from '@/components/FileUploader';
import GuidelinesSelector from '@/components/GuidelinesSelector';
import EnhancedComplianceReport from '@/components/EnhancedComplianceReport';
import UnderstandingGuidelines from '@/components/UnderstandingGuidelines';
import { useCompliance } from '@/contexts/ComplianceContext';
import { analyzeCompliance } from '@/data/complianceAnalysis';

const CompliancePage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    selectedGuideline,
    currentReport,
    setCurrentReport,
    isAnalyzing,
    setIsAnalyzing
  } = useCompliance();

  const [uploadedFile, setUploadedFile] = useState<File | string | null>(null);

  // Enchanted Features moved from HomePage
  const features = [
  {
    icon: <Shield className="w-8 h-8" data-id="jtc2rzzje" data-path="src/pages/CompliancePage.tsx" />,
    title: "AI-Powered Compliance",
    description: "Advanced artificial intelligence analyzes your content against multiple compliance frameworks with magical precision.",
    gradient: "disney-gradient-blue"
  },
  {
    icon: <Zap className="w-8 h-8" data-id="bm8693owy" data-path="src/pages/CompliancePage.tsx" />,
    title: "Instant Analysis",
    description: "Get comprehensive compliance reports in seconds, not hours. Our magic works at the speed of light.",
    gradient: "disney-gradient-purple"
  },
  {
    icon: <Users className="w-8 h-8" data-id="2jcshvbfe" data-path="src/pages/CompliancePage.tsx" />,
    title: "Multi-Framework Support",
    description: "Support for ASCI, WCAG, EAA 2025, IRDAI, and financial guidelines all in one enchanted platform.",
    gradient: "disney-gradient-ocean"
  },
  {
    icon: <Award className="w-8 h-8" data-id="wxh5kt78x" data-path="src/pages/CompliancePage.tsx" />,
    title: "Detailed Recommendations",
    description: "Receive actionable suggestions to make your content compliant with crystal-clear guidance.",
    gradient: "disney-gradient-sunset"
  }];

  const handleFileSelect = (file: File | string) => {
    console.log('File selected for analysis:', typeof file === 'string' ? file : file.name);
    setUploadedFile(file);
    setCurrentReport(null); // Clear previous report
  };

  const handleStartAnalysis = async () => {
    // Enhanced validation with better UX
    if (!uploadedFile) {
      toast({
        title: "📁 No File Selected",
        description: "Please upload a file or provide a URL before starting the magical analysis.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedGuideline) {
      toast({
        title: "📋 Choose Your Guidelines",
        description: "Please select ONE compliance guideline to begin your analysis journey.",
        variant: "destructive"
      });
      return;
    }

    console.log('Starting magical compliance analysis...', {
      file: typeof uploadedFile === 'string' ? uploadedFile : uploadedFile.name,
      guideline: selectedGuideline.name
    });

    setIsAnalyzing(true);

    try {
      const results = await analyzeCompliance(uploadedFile, selectedGuideline);

      // Enhanced rating calculation
      const failedCount = results.filter((r) => r.status === 'FAIL').length;
      const warningCount = results.filter((r) => r.status === 'WARNING').length;

      let overallRating: 'Compliant' | 'Non-compliant' | 'Needs Review';
      if (failedCount > 0) {
        overallRating = 'Non-compliant';
      } else if (warningCount > 0) {
        overallRating = 'Non-compliant';
      } else {
        overallRating = 'Compliant';
      }

      const report = {
        guideline: selectedGuideline,
        overallRating,
        results,
        timestamp: new Date(),
        fileName: typeof uploadedFile === 'string' ? 'URL Content' : uploadedFile.name,
        fileUrl: typeof uploadedFile === 'string' ? uploadedFile : undefined
      };

      setCurrentReport(report);

      toast({
        title: "✨ Analysis Complete!",
        description: `Your advertisement has been magically analyzed against ${selectedGuideline.name} guidelines.`
      });

      console.log('Analysis completed:', report);

    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: "🔮 Analysis Failed",
        description: "The magic encountered an error. Please try again with your content.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden" data-id="wou4tu9ov" data-path="src/pages/CompliancePage.tsx">
      <Background3D data-id="b3urxt46u" data-path="src/pages/CompliancePage.tsx" />
      <MagicalParticles data-id="ytl1nvzfi" data-path="src/pages/CompliancePage.tsx" />
      
      {/* Enhanced Header with Disney Magic */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 py-6 px-8 border-b border-slate-800/50 backdrop-blur-sm glass-morphism" data-id="wsqi6fbup" data-path="src/pages/CompliancePage.tsx">

        <div className="container mx-auto flex justify-between items-center" data-id="xx08d7kjh" data-path="src/pages/CompliancePage.tsx">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')} data-id="dylskhakv" data-path="src/pages/CompliancePage.tsx">

            <motion.div
              className="w-14 h-14 rounded-xl flex items-center justify-center crystal-pulse"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }} data-id="knizu3i7l" data-path="src/pages/CompliancePage.tsx">

              <img
                src="https://newoaks.s3.us-west-1.amazonaws.com/AutoDev/23409/b424a59c-043d-4175-8f31-6c4b0ba5aa45.png"
                alt="NeoCompliance-Pro Logo"
                className="w-12 h-12 object-contain rounded-lg"
                onError={(e) => {
                  // Fallback to gradient background with sparkle
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">✨</div>';
                }} data-id="zao1zayyn" data-path="src/pages/CompliancePage.tsx" />

            </motion.div>
            <div data-id="5w6z7ymuz" data-path="src/pages/CompliancePage.tsx">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" data-id="lm992426n" data-path="src/pages/CompliancePage.tsx">
                NeoCompliance Pro
              </h1>
              <p className="text-xs text-slate-400" data-id="3al72pj9s" data-path="src/pages/CompliancePage.tsx">Powered By NeoCompliance Pro</p>
            </div>
          </motion.div>
          
          <nav className="space-x-4" data-id="khaj599bk" data-path="src/pages/CompliancePage.tsx">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200" data-id="85wylu61z" data-path="src/pages/CompliancePage.tsx">

              <Home className="w-4 h-4 mr-2" data-id="npv10bsjn" data-path="src/pages/CompliancePage.tsx" />
              Home
            </Button>
            <Button
              variant="ghost"
              className="text-blue-400 hover:text-blue-300 hover:bg-slate-800/50 disney-gradient-blue px-6 py-2 rounded-lg font-semibold transition-all duration-200" data-id="7l6v9eubj" data-path="src/pages/CompliancePage.tsx">

              Compliance Checker
            </Button>
          </nav>
        </div>
      </motion.header>

      {/* Understanding Compliance Standards Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10 container mx-auto py-8 px-4" data-id="w1xf88of2" data-path="src/pages/CompliancePage.tsx">

        <UnderstandingGuidelines data-id="tg3uslnzb" data-path="src/pages/CompliancePage.tsx" />
      </motion.section>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 container mx-auto py-12 px-4" data-id="g47rrnfcd" data-path="src/pages/CompliancePage.tsx">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" data-id="vlmz658ls" data-path="src/pages/CompliancePage.tsx">
          {/* Left Column - File Upload and Analysis */}
          <div className="lg:col-span-5 space-y-6" data-id="ppjq4mne8" data-path="src/pages/CompliancePage.tsx">
            <FileUploader
              onFileSelect={handleFileSelect}
              disabled={isAnalyzing} data-id="nulouddcz" data-path="src/pages/CompliancePage.tsx" />

            
            <GuidelinesSelector data-id="3z8ndpedb" data-path="src/pages/CompliancePage.tsx" />
            
            {/* Enhanced Analysis Button */}
            <Card className="bg-gradient-to-br from-slate-900/60 to-slate-800/40 border-slate-700/50 backdrop-blur-xl glass-morphism" data-id="04e9yulfi" data-path="src/pages/CompliancePage.tsx">
              <CardContent className="p-6" data-id="awn8ejwu7" data-path="src/pages/CompliancePage.tsx">
                <motion.div
                  whileHover={{ scale: !uploadedFile || !selectedGuideline || isAnalyzing ? 1 : 1.02 }}
                  whileTap={{ scale: !uploadedFile || !selectedGuideline || isAnalyzing ? 1 : 0.98 }} data-id="gy43gnnlt" data-path="src/pages/CompliancePage.tsx">

                  <Button
                    onClick={handleStartAnalysis}
                    disabled={!uploadedFile || !selectedGuideline || isAnalyzing}
                    className={`w-full py-6 text-lg font-bold transition-all duration-300 ${
                    !uploadedFile || !selectedGuideline || isAnalyzing ?
                    'bg-slate-700 text-slate-400 cursor-not-allowed' :
                    'disney-gradient-blue hover:shadow-2xl crystal-pulse text-white'}`
                    } data-id="tuvjybtka" data-path="src/pages/CompliancePage.tsx">

                    {isAnalyzing ?
                    <>
                        <Loader2 className="w-6 h-6 mr-3 animate-spin" data-id="1itwvle0a" data-path="src/pages/CompliancePage.tsx" />
                        ✨ Analyzing with AI Magic...
                      </> :

                    <>
                        <Play className="w-6 h-6 mr-3" data-id="pt4dlsozb" data-path="src/pages/CompliancePage.tsx" />
                        🚀 Analyse your ad now
                      </>
                    }
                  </Button>
                </motion.div>
                
                {/* Enhanced Requirements Checklist */}
                {(!uploadedFile || !selectedGuideline) &&
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg" data-id="0uzt1vhde" data-path="src/pages/CompliancePage.tsx">

                    <div className="flex items-center mb-3" data-id="rbx0b5e3e" data-path="src/pages/CompliancePage.tsx">
                      <AlertCircle className="w-5 h-5 text-amber-400 mr-2" data-id="bgkse51h2" data-path="src/pages/CompliancePage.tsx" />
                      <span className="font-semibold text-amber-400" data-id="m5ivkpta6" data-path="src/pages/CompliancePage.tsx">Required Steps:</span>
                    </div>
                    <div className="space-y-2 text-sm" data-id="a5weclmvo" data-path="src/pages/CompliancePage.tsx">
                      <div className={`flex items-center ${uploadedFile ? 'text-emerald-400' : 'text-amber-300'}`} data-id="p4od2m0q4" data-path="src/pages/CompliancePage.tsx">
                        <span className="mr-2" data-id="jpt38m7sn" data-path="src/pages/CompliancePage.tsx">{uploadedFile ? '✅' : '📁'}</span>
                        {uploadedFile ? 'File uploaded successfully!' : 'Upload a file or provide URL'}
                      </div>
                      <div className={`flex items-center ${selectedGuideline ? 'text-emerald-400' : 'text-amber-300'}`} data-id="c6puyv3xk" data-path="src/pages/CompliancePage.tsx">
                        <span className="mr-2" data-id="bl7lr8ffj" data-path="src/pages/CompliancePage.tsx">{selectedGuideline ? '✅' : '📋'}</span>
                        {selectedGuideline ? `${selectedGuideline.name} guidelines selected!` : 'Select ONE compliance guideline'}
                      </div>
                    </div>
                  </motion.div>
                }

                {/* Magic Status Indicator */}
                {uploadedFile && selectedGuideline &&
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-lg bio-glow" data-id="hpxyzv6np" data-path="src/pages/CompliancePage.tsx">

                    <div className="flex items-center justify-center text-emerald-400" data-id="0h1dxxly6" data-path="src/pages/CompliancePage.tsx">
                      <Sparkles className="w-5 h-5 mr-2 animate-pulse" data-id="7ydw9ty13" data-path="src/pages/CompliancePage.tsx" />
                      <span className="font-semibold" data-id="mhsftkfa4" data-path="src/pages/CompliancePage.tsx">Ready for Magic! ✨</span>
                    </div>
                    <p className="text-xs text-center text-slate-400 mt-2" data-id="66h7pnea1" data-path="src/pages/CompliancePage.tsx">
                      All requirements met. Click "Analyse your ad now" to begin!
                    </p>
                  </motion.div>
                }
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Enhanced Report */}
          <div className="lg:col-span-7 space-y-6" data-id="398wb7170" data-path="src/pages/CompliancePage.tsx">
            <EnhancedComplianceReport data-id="wd0lwqjjc" data-path="src/pages/CompliancePage.tsx" />
          </div>
        </div>
      </motion.main>

      {/* Enchanted Features Section (moved from HomePage) */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 container mx-auto py-20 px-4" data-id="18ft5ihca" data-path="src/pages/CompliancePage.tsx">

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16" data-id="jwwizusxz" data-path="src/pages/CompliancePage.tsx">

          <h2 className="text-4xl md:text-5xl font-bold mb-6" data-id="vkw23rn8f" data-path="src/pages/CompliancePage.tsx">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" data-id="kzf60j1fk" data-path="src/pages/CompliancePage.tsx">
              Enchanted Features
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto" data-id="vkhzdcdrv" data-path="src/pages/CompliancePage.tsx">
            Discover the magical capabilities that make compliance checking effortless and precise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-id="s9xqw84qw" data-path="src/pages/CompliancePage.tsx">
          {features.map((feature, index) =>
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="group" data-id="3m099u4i1" data-path="src/pages/CompliancePage.tsx">

              <Card className="h-full bg-slate-900/50 border-slate-700/50 backdrop-blur-sm glass-morphism hover:border-slate-600/50 transition-all duration-300" data-id="kq4hhfyji" data-path="src/pages/CompliancePage.tsx">
                <CardHeader className="pb-4" data-id="1t514daqn" data-path="src/pages/CompliancePage.tsx">
                  <div className={`w-16 h-16 rounded-xl ${feature.gradient} flex items-center justify-center mb-4 crystal-pulse group-hover:scale-110 transition-transform duration-200`} data-id="dw6aimwxq" data-path="src/pages/CompliancePage.tsx">
                    <div className="text-white" data-id="dcp9oz8bt" data-path="src/pages/CompliancePage.tsx">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-200 group-hover:text-white transition-colors duration-200" data-id="ljf16fsqa" data-path="src/pages/CompliancePage.tsx">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent data-id="jtblxxh8y" data-path="src/pages/CompliancePage.tsx">
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-200" data-id="eymuu5mgf" data-path="src/pages/CompliancePage.tsx">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Enhanced Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 py-12 mt-20 backdrop-blur-sm glass-morphism" data-id="r50br2k38" data-path="src/pages/CompliancePage.tsx">
        <div className="container mx-auto px-4 text-center text-slate-500" data-id="8ho64jy84" data-path="src/pages/CompliancePage.tsx">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-3 mb-4" data-id="78p617nsi" data-path="src/pages/CompliancePage.tsx">

            <motion.div
              className="w-10 h-10 rounded-lg flex items-center justify-center crystal-pulse"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }} data-id="meaq3nc1v" data-path="src/pages/CompliancePage.tsx">

              <img
                src="https://newoaks.s3.us-west-1.amazonaws.com/AutoDev/23409/b424a59c-043d-4175-8f31-6c4b0ba5aa45.png"
                alt="NeoCompliance-Pro Logo"
                className="w-8 h-8 object-contain rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-sm">✨</div>';
                }} data-id="ne7fa98al" data-path="src/pages/CompliancePage.tsx" />

            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" data-id="5u4orl3iv" data-path="src/pages/CompliancePage.tsx">
              NeoCompliance Pro
            </span>
          </motion.div>
          <p data-id="c3wsjxcem" data-path="src/pages/CompliancePage.tsx">© {new Date().getFullYear()} NeoCompliance Pro. All rights reserved.</p>
          <p className="text-sm mt-2 flex items-center justify-center" data-id="dk3hafha7" data-path="src/pages/CompliancePage.tsx">
            <Sparkles className="w-4 h-4 mr-2 text-amber-400" data-id="l7erf957s" data-path="src/pages/CompliancePage.tsx" />
            Ensuring advertisement compliance with magical AI technology.
            <Sparkles className="w-4 h-4 ml-2 text-amber-400" data-id="j8msqnqwe" data-path="src/pages/CompliancePage.tsx" />
          </p>
        </div>
      </footer>
    </div>);

};

export default CompliancePage;