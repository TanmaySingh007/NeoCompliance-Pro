import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import {
  Search,
  FileText,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Upload,
  Camera,
  Link,
  Download,
  Share2,
  Zap,
  Shield,
  AlertCircle,
  Sparkles,
  Brain,
  Eye,
  Target,
  TrendingUp,
  Award,
  Info,
  Clock,
  ChevronDown,
  ChevronUp,
  Cpu,
  Scan,
  CheckSquare } from
'lucide-react';
import { guidelines, getGuidelinesByType } from '@/data/guidelines';
import { ComplianceEngine } from './ComplianceEngine';
import { ComplianceResult, GuidelineType, AnalysisSummary, CategoryAnalysisResult } from '@/types/compliance';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import FileUpload from './FileUpload';
import ImageOCR from './ImageOCR';
import URLInput from './URLInput';
import ReportGenerator from './ReportGenerator';

const ComplianceChecker: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Core state
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState<ComplianceResult[]>([]);
  const [analysisSummary, setAnalysisSummary] = useState<AnalysisSummary | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [documentName, setDocumentName] = useState('');

  // UI state
  const [activeTab, setActiveTab] = useState('upload');
  const [showResults, setShowResults] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [detectedStandards, setDetectedStandards] = useState<GuidelineType[]>([]);
  const [detectionConfidence, setDetectionConfidence] = useState<Record<GuidelineType, number>>({});

  const handleFileUpload = useCallback((content: string, fileName: string) => {
    setInputText(content);
    setDocumentName(fileName);
    setActiveTab('text');

    toast({
      title: "File Uploaded",
      description: `Successfully loaded content from ${fileName}. Ready for smart analysis.`
    });
  }, [toast]);

  const handleTextExtracted = useCallback((text: string, fileName: string) => {
    setInputText(text);
    setDocumentName(fileName);
    setActiveTab('text');

    toast({
      title: "Text Extracted",
      description: `Successfully extracted text from ${fileName}. AI analysis ready.`
    });
  }, [toast]);

  const handleURLContentFetched = useCallback((content: string, url: string) => {
    setInputText(content);
    setDocumentName(url);
    setActiveTab('text');

    toast({
      title: "URL Content Fetched",
      description: `Successfully fetched content from ${url}. Smart compliance analysis ready.`
    });
  }, [toast]);

  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const analyzeCompliance = async () => {
    if (!inputText.trim()) {
      toast({
        title: "No Content",
        description: "Please enter text, upload a file, extract text from an image, or fetch content from a URL first.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);
    setResults([]);
    setAnalysisSummary(null);
    setDetectedStandards([]);
    setDetectionConfidence({});

    try {
      // Create new compliance engine for auto-detection
      const engine = new ComplianceEngine();

      // Show smart analysis progress
      const progressSteps = [
      { step: 10, message: "Analyzing content structure..." },
      { step: 25, message: "Detecting compliance standards..." },
      { step: 45, message: "Identifying relevant regulations..." },
      { step: 65, message: "Running compliance checks..." },
      { step: 85, message: "Generating recommendations..." },
      { step: 95, message: "Preparing results..." }];


      let currentStep = 0;
      const progressInterval = setInterval(() => {
        if (currentStep < progressSteps.length) {
          setProgress(progressSteps[currentStep].step);
          currentStep++;
        } else {
          clearInterval(progressInterval);
        }
      }, 300);

      // Perform auto-detection and analysis
      const summary = await engine.autoAnalyzeByCategory(inputText);
      const allResults = await engine.autoAnalyze(inputText);

      clearInterval(progressInterval);
      setProgress(100);
      setResults(allResults);
      setAnalysisSummary(summary);
      setShowResults(true);

      // Set detected standards info
      if (summary.detectedStandards) {
        setDetectedStandards(summary.detectedStandards);
        setDetectionConfidence(summary.detectionConfidence || {});
      }

      // Auto-expand primary category
      if (summary.primaryCategory) {
        setExpandedCategories({ [summary.primaryCategory]: true });
      }

      // Show smart detection results
      const detectedCount = summary.detectedStandards?.length || 0;
      toast({
        title: "🧠 Smart Analysis Complete",
        description: `Auto-detected ${detectedCount} relevant compliance standard${detectedCount !== 1 ? 's' : ''}. Primary category: ${summary.primaryCategory}. Score: ${summary.complianceScore}%`
      });

    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "An error occurred during smart compliance analysis. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusIcon = (status: ComplianceResult['status']) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-4 w-4 text-emerald-400" data-id="vwjowk6mn" data-path="src/components/ComplianceChecker.tsx" />;
      case 'fail':
        return <XCircle className="h-4 w-4 text-red-400" data-id="skhvouzxr" data-path="src/components/ComplianceChecker.tsx" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-400" data-id="2451iyf3t" data-path="src/components/ComplianceChecker.tsx" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" data-id="n75vno91h" data-path="src/components/ComplianceChecker.tsx" />;
    }
  };

  const getStatusColor = (status: ComplianceResult['status']) => {
    switch (status) {
      case 'pass':
        return 'bg-gradient-to-r from-emerald-900/40 to-green-900/40 text-emerald-300 border-emerald-500/30';
      case 'fail':
        return 'bg-gradient-to-r from-red-900/40 to-rose-900/40 text-red-300 border-red-500/30';
      case 'warning':
        return 'bg-gradient-to-r from-amber-900/40 to-yellow-900/40 text-amber-300 border-amber-500/30';
      default:
        return 'bg-gradient-to-r from-gray-900/40 to-slate-900/40 text-gray-300 border-gray-500/30';
    }
  };

  const getCategoryStatusColor = (status: CategoryAnalysisResult['overallStatus']) => {
    switch (status) {
      case 'compliant':
        return 'from-emerald-500 to-green-500';
      case 'non-compliant':
        return 'from-red-500 to-rose-500';
      case 'partial':
        return 'from-amber-500 to-yellow-500';
      default:
        return 'from-gray-500 to-slate-500';
    }
  };

  const complianceScore = analysisSummary?.complianceScore || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 relative overflow-hidden" data-id="zw0z249xf" data-path="src/components/ComplianceChecker.tsx">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" data-id="8wa6ufmni" data-path="src/components/ComplianceChecker.tsx">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 0],
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            filter: 'drop-shadow(0 0 50px rgba(147, 51, 234, 0.3))',
            boxShadow: '0 0 100px rgba(147, 51, 234, 0.2), inset 0 0 100px rgba(6, 182, 212, 0.1)'
          }} data-id="ven3bcaif" data-path="src/components/ComplianceChecker.tsx" />

        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-500/20 to-violet-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [180, 0, 180],
            x: [0, -80, 0],
            y: [0, 60, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            filter: 'drop-shadow(0 0 60px rgba(6, 182, 212, 0.3))',
            boxShadow: '0 0 120px rgba(6, 182, 212, 0.2), inset 0 0 120px rgba(147, 51, 234, 0.1)'
          }} data-id="lx5sfokbm" data-path="src/components/ComplianceChecker.tsx" />

        {/* Additional floating particles */}
        {[...Array(8)].map((_, i) =>
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
          animate={{
            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            scale: [0.5, 1.5, 0.5],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2
          }}
          style={{
            filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.6))'
          }} data-id="tqu9lgz9n" data-path="src/components/ComplianceChecker.tsx" />
        )}
      </div>

      {/* Main Container - Made Wider */}
      <div className="container mx-auto px-4 py-6 relative z-10 max-w-[95vw]" data-id="5pk5jqreo" data-path="src/components/ComplianceChecker.tsx">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6" data-id="cipqqzl80" data-path="src/components/ComplianceChecker.tsx">

          {/* Enhanced Header */}
          <div className="text-center space-y-4" data-id="2ix2dg0lx" data-path="src/components/ComplianceChecker.tsx">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                rotateX: 5
              }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-cyan-900/40 backdrop-blur-sm rounded-full border border-purple-500/30 shadow-lg"
              style={{
                transform: 'perspective(1000px)',
                filter: 'drop-shadow(0 0 30px rgba(147, 51, 234, 0.5))',
                boxShadow: '0 0 50px rgba(147, 51, 234, 0.3), inset 0 0 30px rgba(6, 182, 212, 0.2)'
              }} data-id="79dv64x4g" data-path="src/components/ComplianceChecker.tsx">
              <Brain className="h-6 w-6 text-purple-400" data-id="v3cbrv6d0" data-path="src/components/ComplianceChecker.tsx" />
              <Sparkles className="h-5 w-5 text-cyan-400" data-id="t8bznfyx0" data-path="src/components/ComplianceChecker.tsx" />
              <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent" data-id="uuihtrrws" data-path="src/components/ComplianceChecker.tsx">Smart Compliance Engine</span>
              <Cpu className="h-5 w-5 text-indigo-400" data-id="7glugfk09" data-path="src/components/ComplianceChecker.tsx" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(147, 51, 234, 0.6))'
              }} data-id="hgeovjr78" data-path="src/components/ComplianceChecker.tsx">
              AI-Powered Compliance Analysis
            </motion.h1>
            
            {/* Auto-Detection Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-full border border-emerald-500/30" data-id="6vcknhxn8" data-path="src/components/ComplianceChecker.tsx">
              <Scan className="h-4 w-4 text-emerald-400" data-id="ujs13eobk" data-path="src/components/ComplianceChecker.tsx" />
              <span className="text-sm text-emerald-300" data-id="ymib2y2jy" data-path="src/components/ComplianceChecker.tsx">Automatically detects relevant compliance standards</span>
            </motion.div>
          </div>

          {/* Main Layout - Two Column */}
          <div className="grid grid-cols-12 gap-6" data-id="z9uny1cy4" data-path="src/components/ComplianceChecker.tsx">
            {/* Left Column - Input (40%) */}
            <div className="col-span-12 lg:col-span-5 space-y-6" data-id="p6022rijs" data-path="src/components/ComplianceChecker.tsx">
              {/* Input Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }} data-id="6ol8cvto5" data-path="src/components/ComplianceChecker.tsx">
                <Card className="backdrop-blur-sm bg-slate-900/70 border-purple-500/30 shadow-xl" data-id="o6vjtn5as" data-path="src/components/ComplianceChecker.tsx">
                  <CardHeader className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 pb-4" data-id="2l3e6xiws" data-path="src/components/ComplianceChecker.tsx">
                    <CardTitle className="flex items-center gap-3 text-xl text-gray-100" data-id="q017mr5vf" data-path="src/components/ComplianceChecker.tsx">
                      <FileText className="h-5 w-5 text-purple-400" data-id="tsizu79r7" data-path="src/components/ComplianceChecker.tsx" />
                      Content Input
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4" data-id="mws9636km" data-path="src/components/ComplianceChecker.tsx">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" data-id="mmfz250m9" data-path="src/components/ComplianceChecker.tsx">
                      <TabsList className="grid w-full grid-cols-4 h-12 bg-gradient-to-r from-slate-800 to-indigo-900 border border-purple-500/30" data-id="8bizvf2wu" data-path="src/components/ComplianceChecker.tsx">
                        <TabsTrigger value="upload" className="flex items-center gap-2 text-xs py-2 text-gray-200 data-[state=active]:bg-purple-900/50" data-id="ibh2e3y8p" data-path="src/components/ComplianceChecker.tsx">
                          <Upload className="h-3 w-3" data-id="86ac9qpk7" data-path="src/components/ComplianceChecker.tsx" />
                          Upload
                        </TabsTrigger>
                        <TabsTrigger value="ocr" className="flex items-center gap-2 text-xs py-2 text-gray-200 data-[state=active]:bg-purple-900/50" data-id="6umrezhwm" data-path="src/components/ComplianceChecker.tsx">
                          <Camera className="h-3 w-3" data-id="lduqmqr65" data-path="src/components/ComplianceChecker.tsx" />
                          Image
                        </TabsTrigger>
                        <TabsTrigger value="url" className="flex items-center gap-2 text-xs py-2 text-gray-200 data-[state=active]:bg-purple-900/50" data-id="ugqwfmlgm" data-path="src/components/ComplianceChecker.tsx">
                          <Link className="h-3 w-3" data-id="jl8nfg5n8" data-path="src/components/ComplianceChecker.tsx" />
                          URL
                        </TabsTrigger>
                        <TabsTrigger value="text" className="flex items-center gap-2 text-xs py-2 text-gray-200 data-[state=active]:bg-purple-900/50" data-id="3hl00zl8x" data-path="src/components/ComplianceChecker.tsx">
                          <FileText className="h-3 w-3" data-id="s2b29do2l" data-path="src/components/ComplianceChecker.tsx" />
                          Text
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="upload" className="mt-4" data-id="s5gqmn0by" data-path="src/components/ComplianceChecker.tsx">
                        <FileUpload
                          onFileSelect={handleFileUpload}
                          isProcessing={isAnalyzing} data-id="1rtbvrhg8" data-path="src/components/ComplianceChecker.tsx" />
                      </TabsContent>

                      <TabsContent value="ocr" className="mt-4" data-id="z2np40r57" data-path="src/components/ComplianceChecker.tsx">
                        <ImageOCR
                          onTextExtracted={handleTextExtracted}
                          isProcessing={isAnalyzing} data-id="zqkj84ib5" data-path="src/components/ComplianceChecker.tsx" />
                      </TabsContent>

                      <TabsContent value="url" className="mt-4" data-id="thv9j41kt" data-path="src/components/ComplianceChecker.tsx">
                        <URLInput
                          onContentFetched={handleURLContentFetched}
                          isProcessing={isAnalyzing} data-id="v5j9rp5eq" data-path="src/components/ComplianceChecker.tsx" />
                      </TabsContent>

                      <TabsContent value="text" className="space-y-4 mt-4" data-id="go3k9zsjn" data-path="src/components/ComplianceChecker.tsx">
                        <div className="space-y-2" data-id="0dhxv32cc" data-path="src/components/ComplianceChecker.tsx">
                          <Label htmlFor="document-name" className="text-sm font-medium text-gray-200" data-id="qgjwxhpb7" data-path="src/components/ComplianceChecker.tsx">Document Name (Optional)</Label>
                          <Input
                            id="document-name"
                            value={documentName}
                            onChange={(e) => setDocumentName(e.target.value)}
                            placeholder="Enter document name..."
                            className="h-10 bg-slate-800/50 border-purple-500/30 text-gray-200 placeholder-gray-400 focus:border-purple-400" data-id="vp6x6rra7" data-path="src/components/ComplianceChecker.tsx" />
                        </div>
                        
                        <div className="space-y-2" data-id="yf5quhzzm" data-path="src/components/ComplianceChecker.tsx">
                          <Label htmlFor="content" className="text-sm font-medium text-gray-200" data-id="irkpf52ny" data-path="src/components/ComplianceChecker.tsx">Content to Analyze</Label>
                          <Textarea
                            id="content"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Paste your text content here..."
                            className="min-h-[200px] resize-none bg-slate-800/50 border-purple-500/30 text-gray-200 placeholder-gray-400 focus:border-purple-400" data-id="warwz6yb8" data-path="src/components/ComplianceChecker.tsx" />
                          <div className="flex justify-between items-center text-xs text-gray-400" data-id="r4woyn6ir" data-path="src/components/ComplianceChecker.tsx">
                            <span data-id="akjev43cv" data-path="src/components/ComplianceChecker.tsx">{inputText.length} characters</span>
                            <div className="flex items-center gap-2" data-id="uvb6hw36i" data-path="src/components/ComplianceChecker.tsx">
                              <Sparkles className="h-3 w-3" data-id="88ap8lsur" data-path="src/components/ComplianceChecker.tsx" />
                              <span data-id="o07ria0u8" data-path="src/components/ComplianceChecker.tsx">AI-powered analysis ready</span>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Smart Analysis Controls */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }} data-id="gz5qqb8ke" data-path="src/components/ComplianceChecker.tsx">
                <Card className="backdrop-blur-sm bg-slate-900/70 border-cyan-500/30 shadow-xl" data-id="0gz86jahf" data-path="src/components/ComplianceChecker.tsx">
                  <CardHeader className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 pb-4" data-id="3l5p2k5zq" data-path="src/components/ComplianceChecker.tsx">
                    <CardTitle className="flex items-center gap-3 text-xl text-gray-100" data-id="xzv959wbf" data-path="src/components/ComplianceChecker.tsx">
                      <Brain className="h-5 w-5 text-cyan-400" data-id="uhez5u1a1" data-path="src/components/ComplianceChecker.tsx" />
                      Smart Analysis Engine
                    </CardTitle>
                    <CardDescription className="text-gray-300" data-id="tpp90ay0h" data-path="src/components/ComplianceChecker.tsx">
                      AI automatically detects and applies relevant compliance standards
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-4" data-id="o6d1yiyji" data-path="src/components/ComplianceChecker.tsx">
                    {/* Auto-Detection Features */}
                    <div className="grid grid-cols-1 gap-3" data-id="qb2epgw44" data-path="src/components/ComplianceChecker.tsx">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-500/20" data-id="aqxxh6e61" data-path="src/components/ComplianceChecker.tsx">
                        <CheckSquare className="h-4 w-4 text-emerald-400" data-id="kzos35u4q" data-path="src/components/ComplianceChecker.tsx" />
                        <span className="text-sm text-emerald-300" data-id="47dtforts" data-path="src/components/ComplianceChecker.tsx">Automatic compliance standard detection</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/20" data-id="ewbojbnbz" data-path="src/components/ComplianceChecker.tsx">
                        <Target className="h-4 w-4 text-blue-400" data-id="48ndtcf94" data-path="src/components/ComplianceChecker.tsx" />
                        <span className="text-sm text-blue-300" data-id="uevnr4kpu" data-path="src/components/ComplianceChecker.tsx">Context-aware regulation analysis</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-900/30 to-violet-900/30 border border-purple-500/20" data-id="iarme48uv" data-path="src/components/ComplianceChecker.tsx">
                        <Award className="h-4 w-4 text-purple-400" data-id="zjklim81p" data-path="src/components/ComplianceChecker.tsx" />
                        <span className="text-sm text-purple-300" data-id="ry528xvhy" data-path="src/components/ComplianceChecker.tsx">Intelligent recommendation system</span>
                      </div>
                    </div>

                    {/* Detected Standards Display */}
                    {detectedStandards.length > 0 &&
                    <div className="space-y-3" data-id="c1rojfhky" data-path="src/components/ComplianceChecker.tsx">
                        <Label className="text-sm font-medium text-gray-200 flex items-center gap-2" data-id="asr485moa" data-path="src/components/ComplianceChecker.tsx">
                          <Scan className="h-4 w-4 text-cyan-400" data-id="42rrjl4p9" data-path="src/components/ComplianceChecker.tsx" />
                          Auto-Detected Standards
                        </Label>
                        <div className="grid grid-cols-1 gap-2" data-id="1hfernkxg" data-path="src/components/ComplianceChecker.tsx">
                          {detectedStandards.map((standard) => {
                          const confidence = detectionConfidence[standard] || 0;
                          const guideline = guidelines.find((g) => g.id === standard);
                          return (
                            <div
                              key={standard}
                              className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-slate-800/50 to-indigo-900/50 border border-purple-500/20" data-id="sxa9nbqwn" data-path="src/components/ComplianceChecker.tsx">
                                <div className="flex items-center gap-2" data-id="o37f3rf67" data-path="src/components/ComplianceChecker.tsx">
                                  <span className="text-lg" data-id="gfx6n5but" data-path="src/components/ComplianceChecker.tsx">{guideline?.icon || '📋'}</span>
                                  <span className="text-sm font-medium text-gray-200" data-id="nl6aygkeq" data-path="src/components/ComplianceChecker.tsx">{standard}</span>
                                </div>
                                <Badge variant="outline" className="bg-cyan-900/30 border-cyan-500/30 text-cyan-300" data-id="719erwyga" data-path="src/components/ComplianceChecker.tsx">
                                  {Math.round(confidence)}% confidence
                                </Badge>
                              </div>);

                        })}
                        </div>
                      </div>
                    }

                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} data-id="x22dg9y6g" data-path="src/components/ComplianceChecker.tsx">
                      <Button
                        onClick={analyzeCompliance}
                        disabled={isAnalyzing || !inputText.trim()}
                        className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 shadow-lg text-white"
                        size="lg" data-id="16v4mbn5k" data-path="src/components/ComplianceChecker.tsx">
                        {isAnalyzing ?
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" data-id="sh5m4qojp" data-path="src/components/ComplianceChecker.tsx" />
                            Analyzing with AI...
                          </> :
                        <>
                            <Brain className="h-4 w-4 mr-2" data-id="vo4vsnulr" data-path="src/components/ComplianceChecker.tsx" />
                            <Sparkles className="h-3 w-3 mr-1" data-id="oowhu63up" data-path="src/components/ComplianceChecker.tsx" />
                            Start Smart Analysis
                          </>
                        }
                      </Button>
                    </motion.div>

                    {isAnalyzing &&
                    <div className="space-y-2" data-id="z2zshxkxs" data-path="src/components/ComplianceChecker.tsx">
                        <div className="flex justify-between text-sm font-medium text-gray-200" data-id="mswsxuux4" data-path="src/components/ComplianceChecker.tsx">
                          <span className="flex items-center gap-2" data-id="256warl2c" data-path="src/components/ComplianceChecker.tsx">
                            <Brain className="h-3 w-3 text-purple-400" data-id="jkx8mwl1j" data-path="src/components/ComplianceChecker.tsx" />
                            AI Analysis Progress
                          </span>
                          <span data-id="skqqejrls" data-path="src/components/ComplianceChecker.tsx">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2 bg-gradient-to-r from-slate-800 to-indigo-900" data-id="usvrelwb7" data-path="src/components/ComplianceChecker.tsx" />
                        <div className="text-xs text-gray-400 text-center" data-id="lvt8h5exu" data-path="src/components/ComplianceChecker.tsx">
                          {progress < 25 ? "Analyzing content structure..." :
                        progress < 45 ? "Detecting compliance standards..." :
                        progress < 65 ? "Identifying relevant regulations..." :
                        progress < 85 ? "Running compliance checks..." :
                        progress < 95 ? "Generating recommendations..." :
                        "Preparing results..."}
                        </div>
                      </div>
                    }
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Results (60%) */}
            <div className="col-span-12 lg:col-span-7 space-y-6" data-id="dbz7md8r6" data-path="src/components/ComplianceChecker.tsx">
              {showResults && analysisSummary &&
              <>
                  {/* Overall Score Card with Auto-Detection Info */}
                  <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }} data-id="5e852zw82" data-path="src/components/ComplianceChecker.tsx">
                    <Card className="backdrop-blur-sm bg-slate-900/80 border-purple-500/30 shadow-2xl overflow-hidden" data-id="9czkfhkoo" data-path="src/components/ComplianceChecker.tsx">
                      <CardHeader className="text-center bg-gradient-to-r from-purple-900/20 to-cyan-900/20 p-6" data-id="ohaw6luk1" data-path="src/components/ComplianceChecker.tsx">
                        <div className="flex items-center justify-center gap-4 mb-4" data-id="1hliq3sfl" data-path="src/components/ComplianceChecker.tsx">
                          <Badge variant="outline" className="text-sm font-semibold bg-slate-800/50 border-purple-500/30 text-purple-300 flex items-center gap-2" data-id="r0bnjv3s8" data-path="src/components/ComplianceChecker.tsx">
                            <Scan className="h-3 w-3" data-id="kbrhwrrbq" data-path="src/components/ComplianceChecker.tsx" />
                            Auto-Detected: {analysisSummary.primaryCategory}
                          </Badge>
                          {analysisSummary.detectedStandards &&
                        <Badge variant="outline" className="text-sm font-semibold bg-cyan-800/50 border-cyan-500/30 text-cyan-300" data-id="vqz4npru5" data-path="src/components/ComplianceChecker.tsx">
                              {analysisSummary.detectedStandards.length} Standards Applied
                            </Badge>
                        }
                        </div>
                        <CardTitle className="text-xl mb-4 text-gray-100" data-id="0enqinsec" data-path="src/components/ComplianceChecker.tsx">AI Compliance Analysis Results</CardTitle>
                        <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className={`text-5xl font-bold mb-4 ${complianceScore >= 80 ? 'text-emerald-400' : complianceScore >= 60 ? 'text-amber-400' : 'text-red-400'}`}
                        style={{
                          filter: `drop-shadow(0 0 20px ${complianceScore >= 80 ? 'rgba(52, 211, 153, 0.6)' : complianceScore >= 60 ? 'rgba(251, 191, 36, 0.6)' : 'rgba(248, 113, 113, 0.6)'})`
                        }} data-id="jqj7hsg7k" data-path="src/components/ComplianceChecker.tsx">
                          {complianceScore}%
                        </motion.div>
                        <div className="grid grid-cols-3 gap-4" data-id="7lnc569pe" data-path="src/components/ComplianceChecker.tsx">
                          <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="text-center p-3 rounded-lg bg-emerald-900/30 border border-emerald-500/30" data-id="ops4mvnip" data-path="src/components/ComplianceChecker.tsx">
                            <div className="text-xl font-bold text-emerald-400 mb-1" data-id="tohj3gku7" data-path="src/components/ComplianceChecker.tsx">
                              {analysisSummary.passedRules}
                            </div>
                            <div className="text-xs text-emerald-300 font-medium" data-id="1eibisbmx" data-path="src/components/ComplianceChecker.tsx">Passed</div>
                          </motion.div>
                          <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.7 }}
                          className="text-center p-3 rounded-lg bg-red-900/30 border border-red-500/30" data-id="70fw6n9vi" data-path="src/components/ComplianceChecker.tsx">
                            <div className="text-xl font-bold text-red-400 mb-1" data-id="9h00cgqkb" data-path="src/components/ComplianceChecker.tsx">
                              {analysisSummary.failedRules}
                            </div>
                            <div className="text-xs text-red-300 font-medium" data-id="0wsh0tjz7" data-path="src/components/ComplianceChecker.tsx">Failed</div>
                          </motion.div>
                          <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.8 }}
                          className="text-center p-3 rounded-lg bg-amber-900/30 border border-amber-500/30" data-id="rd6yshm3x" data-path="src/components/ComplianceChecker.tsx">
                            <div className="text-xl font-bold text-amber-400 mb-1" data-id="z4n1eopvm" data-path="src/components/ComplianceChecker.tsx">
                              {analysisSummary.warningRules}
                            </div>
                            <div className="text-xs text-amber-300 font-medium" data-id="clbnpot9f" data-path="src/components/ComplianceChecker.tsx">Warnings</div>
                          </motion.div>
                        </div>
                      </CardHeader>
                    </Card>
                  </motion.div>

                  {/* Category-Based Results */}
                  <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }} data-id="cngq5s7n7" data-path="src/components/ComplianceChecker.tsx">
                    <Card className="backdrop-blur-sm bg-slate-900/80 border-cyan-500/30 shadow-xl" data-id="767voh5b2" data-path="src/components/ComplianceChecker.tsx">
                      <CardHeader data-id="kbggyxv1l" data-path="src/components/ComplianceChecker.tsx">
                        <CardTitle className="text-xl flex items-center gap-2 text-gray-100" data-id="q9yzknxbc" data-path="src/components/ComplianceChecker.tsx">
                          <Eye className="h-5 w-5 text-cyan-400" data-id="ne72dekgm" data-path="src/components/ComplianceChecker.tsx" />
                          Smart Category Analysis
                        </CardTitle>
                        <CardDescription className="text-gray-300" data-id="vj75qzuna" data-path="src/components/ComplianceChecker.tsx">
                          AI-detected compliance standards with detailed analysis
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 p-6" data-id="rprhd0vtq" data-path="src/components/ComplianceChecker.tsx">
                        {analysisSummary.categoryResults.map((categoryResult, index) =>
                      <motion.div
                        key={categoryResult.category}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-purple-500/30 rounded-xl overflow-hidden bg-gradient-to-r from-slate-900/50 to-slate-800/50" data-id="jraau894u" data-path="src/components/ComplianceChecker.tsx">
                            
                            {/* Category Header */}
                            <div
                          onClick={() => toggleCategoryExpansion(categoryResult.category)}
                          className={`p-4 cursor-pointer transition-all duration-200 bg-gradient-to-r ${categoryResult.color} bg-opacity-20 hover:bg-opacity-30`} data-id="oobanjfrd" data-path="src/components/ComplianceChecker.tsx">
                              <div className="flex items-center justify-between" data-id="1vkaso8hz" data-path="src/components/ComplianceChecker.tsx">
                                <div className="flex items-center gap-3" data-id="n1mpp2mfy" data-path="src/components/ComplianceChecker.tsx">
                                  <span className="text-2xl" data-id="kitdzxs15" data-path="src/components/ComplianceChecker.tsx">{categoryResult.icon}</span>
                                  <div data-id="34x3vwn08" data-path="src/components/ComplianceChecker.tsx">
                                    <h3 className="font-semibold text-lg text-gray-100 flex items-center gap-2" data-id="124r1e872" data-path="src/components/ComplianceChecker.tsx">
                                      {categoryResult.categoryName}
                                      <Badge variant="outline" className="bg-cyan-900/30 border-cyan-500/30 text-cyan-300 text-xs" data-id="fd4i0khtz" data-path="src/components/ComplianceChecker.tsx">
                                        Auto-detected
                                      </Badge>
                                    </h3>
                                    <p className="text-sm text-gray-300" data-id="zkvvmieg6" data-path="src/components/ComplianceChecker.tsx">
                                      {categoryResult.totalRules} rules • {categoryResult.complianceScore}% compliant
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3" data-id="8a7zgakob" data-path="src/components/ComplianceChecker.tsx">
                                  <Badge
                                variant="outline"
                                className={`bg-gradient-to-r ${getCategoryStatusColor(categoryResult.overallStatus)} text-white border-transparent`} data-id="m4j6saeub" data-path="src/components/ComplianceChecker.tsx">
                                    {categoryResult.overallStatus}
                                  </Badge>
                                  {expandedCategories[categoryResult.category] ?
                              <ChevronUp className="h-5 w-5 text-gray-400" data-id="estllp3sf" data-path="src/components/ComplianceChecker.tsx" /> :
                              <ChevronDown className="h-5 w-5 text-gray-400" data-id="uzxp85xkz" data-path="src/components/ComplianceChecker.tsx" />
                              }
                                </div>
                              </div>
                            </div>

                            {/* Category Details */}
                            <AnimatePresence data-id="w3txdhrgl" data-path="src/components/ComplianceChecker.tsx">
                              {expandedCategories[categoryResult.category] &&
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-purple-500/30" data-id="4ap3r7ez3" data-path="src/components/ComplianceChecker.tsx">
                                  <div className="p-4 space-y-4" data-id="0adsddguk" data-path="src/components/ComplianceChecker.tsx">
                                    
                                    {/* Category Stats */}
                                    <div className="grid grid-cols-3 gap-3" data-id="lloqvdsj7" data-path="src/components/ComplianceChecker.tsx">
                                      <div className="text-center p-2 rounded bg-emerald-900/20 border border-emerald-500/30" data-id="jhjpa972j" data-path="src/components/ComplianceChecker.tsx">
                                        <div className="text-lg font-bold text-emerald-400" data-id="cg92vr30j" data-path="src/components/ComplianceChecker.tsx">{categoryResult.passedRules}</div>
                                        <div className="text-xs text-emerald-300" data-id="ptvkpgjca" data-path="src/components/ComplianceChecker.tsx">Passed</div>
                                      </div>
                                      <div className="text-center p-2 rounded bg-red-900/20 border border-red-500/30" data-id="3bbbll868" data-path="src/components/ComplianceChecker.tsx">
                                        <div className="text-lg font-bold text-red-400" data-id="0lly469cf" data-path="src/components/ComplianceChecker.tsx">{categoryResult.failedRules}</div>
                                        <div className="text-xs text-red-300" data-id="unfco1awa" data-path="src/components/ComplianceChecker.tsx">Failed</div>
                                      </div>
                                      <div className="text-center p-2 rounded bg-amber-900/20 border border-amber-500/30" data-id="iwhski51m" data-path="src/components/ComplianceChecker.tsx">
                                        <div className="text-lg font-bold text-amber-400" data-id="2fs8dm8q6" data-path="src/components/ComplianceChecker.tsx">{categoryResult.warningRules}</div>
                                        <div className="text-xs text-amber-300" data-id="5890pkjed" data-path="src/components/ComplianceChecker.tsx">Warnings</div>
                                      </div>
                                    </div>

                                    {/* Critical Issues */}
                                    {categoryResult.criticalIssues.length > 0 &&
                              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3" data-id="zyflgvugo" data-path="src/components/ComplianceChecker.tsx">
                                        <h4 className="font-semibold text-red-400 flex items-center gap-2 mb-2" data-id="g4ogxdy87" data-path="src/components/ComplianceChecker.tsx">
                                          <AlertTriangle className="h-4 w-4" data-id="nuvvop4s0" data-path="src/components/ComplianceChecker.tsx" />
                                          Critical Issues ({categoryResult.criticalIssues.length})
                                        </h4>
                                        <div className="space-y-2" data-id="l3rxn9luq" data-path="src/components/ComplianceChecker.tsx">
                                          {categoryResult.criticalIssues.map((issue, idx) =>
                                  <div key={idx} className="text-sm text-red-300 flex items-start gap-2" data-id="rqr7azyyw" data-path="src/components/ComplianceChecker.tsx">
                                              <span className="text-lg" data-id="u0660s7s3" data-path="src/components/ComplianceChecker.tsx">{issue.symbol}</span>
                                              <div data-id="tuqkxfzra" data-path="src/components/ComplianceChecker.tsx">
                                                <div className="font-medium" data-id="4zr46dxfc" data-path="src/components/ComplianceChecker.tsx">{issue.message}</div>
                                                {issue.failureReason &&
                                      <div className="text-xs text-red-400 mt-1" data-id="m35ol6g3v" data-path="src/components/ComplianceChecker.tsx">Reason: {issue.failureReason}</div>
                                      }
                                              </div>
                                            </div>
                                  )}
                                        </div>
                                      </div>
                              }

                                    {/* AI Recommendations */}
                                    {categoryResult.recommendations.length > 0 &&
                              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3" data-id="lx83ntuxm" data-path="src/components/ComplianceChecker.tsx">
                                        <h4 className="font-semibold text-blue-400 flex items-center gap-2 mb-2" data-id="gru5j9vlc" data-path="src/components/ComplianceChecker.tsx">
                                          <Brain className="h-4 w-4" data-id="oefkvptni" data-path="src/components/ComplianceChecker.tsx" />
                                          AI Recommendations
                                        </h4>
                                        <ul className="space-y-1" data-id="k6lu61wd7" data-path="src/components/ComplianceChecker.tsx">
                                          {categoryResult.recommendations.map((rec, idx) =>
                                  <li key={idx} className="text-sm text-blue-300 flex items-start gap-2" data-id="m2kmlkepd" data-path="src/components/ComplianceChecker.tsx">
                                              <span className="text-blue-500 mt-1" data-id="mo87fxzy8" data-path="src/components/ComplianceChecker.tsx">•</span>
                                              {rec}
                                            </li>
                                  )}
                                        </ul>
                                      </div>
                              }

                                    {/* All Rule Results */}
                                    <div className="space-y-2" data-id="qa3luhuyw" data-path="src/components/ComplianceChecker.tsx">
                                      <h4 className="font-semibold text-gray-300 text-sm" data-id="do68x4duw" data-path="src/components/ComplianceChecker.tsx">Detailed Analysis Results:</h4>
                                      <div className="max-h-48 overflow-y-auto space-y-2" data-id="o2u3rmgjw" data-path="src/components/ComplianceChecker.tsx">
                                        {categoryResult.results.map((result, idx) =>
                                  <div
                                    key={idx}
                                    className={`p-3 rounded-lg border ${getStatusColor(result.status)} transition-all duration-200`} data-id="4bht220o1" data-path="src/components/ComplianceChecker.tsx">
                                            <div className="flex items-start gap-3" data-id="w0o95vn6q" data-path="src/components/ComplianceChecker.tsx">
                                              <div className="flex items-center gap-2" data-id="m380vhxor" data-path="src/components/ComplianceChecker.tsx">
                                                {result.symbol && <span className="text-lg" data-id="zd96uv8fj" data-path="src/components/ComplianceChecker.tsx">{result.symbol}</span>}
                                                {getStatusIcon(result.status)}
                                              </div>
                                              <div className="flex-1 min-w-0" data-id="v0sy0cbj3" data-path="src/components/ComplianceChecker.tsx">
                                                <div className="font-medium text-sm mb-1" data-id="ahbgf7e8t" data-path="src/components/ComplianceChecker.tsx">{result.rule}</div>
                                                {result.failureReason &&
                                        <div className="text-xs mb-2 opacity-80" data-id="810ee4n6r" data-path="src/components/ComplianceChecker.tsx">
                                                    <strong data-id="cng4koduw" data-path="src/components/ComplianceChecker.tsx">Issue:</strong> {result.failureReason}
                                                  </div>
                                        }
                                                {result.suggestion &&
                                        <div className="text-xs p-2 bg-slate-800/60 rounded border border-purple-500/20" data-id="dz9h8j6d6" data-path="src/components/ComplianceChecker.tsx">
                                                    <strong data-id="3h309j8xv" data-path="src/components/ComplianceChecker.tsx">💡 AI Suggestion:</strong> {result.suggestion}
                                                  </div>
                                        }
                                              </div>
                                            </div>
                                          </div>
                                  )}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                          }
                            </AnimatePresence>
                          </motion.div>
                      )}
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Enhanced Report Generation */}
                  <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }} data-id="ofuoveyvl" data-path="src/components/ComplianceChecker.tsx">
                    <ReportGenerator
                    results={results}
                    documentName={documentName || 'Smart Compliance Analysis'}
                    analysisText={inputText}
                    analysisSummary={analysisSummary} data-id="vo72iu5cs" data-path="src/components/ComplianceChecker.tsx" />
                  </motion.div>
                </>
              }

              {/* Enhanced Help Card */}
              {!showResults &&
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }} data-id="mxpn5kc4h" data-path="src/components/ComplianceChecker.tsx">
                  <Card className="backdrop-blur-sm bg-slate-900/70 border-indigo-500/30 shadow-xl" data-id="kqfq921kt" data-path="src/components/ComplianceChecker.tsx">
                    <CardHeader data-id="dedurc43f" data-path="src/components/ComplianceChecker.tsx">
                      <CardTitle className="text-xl flex items-center gap-2 text-gray-100" data-id="but8cvp00" data-path="src/components/ComplianceChecker.tsx">
                        <Brain className="h-5 w-5 text-indigo-400" data-id="n4baychgr" data-path="src/components/ComplianceChecker.tsx" />
                        How Smart Analysis Works
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6" data-id="vg71edpbf" data-path="src/components/ComplianceChecker.tsx">
                      {[
                    { icon: '🧠', text: 'AI automatically analyzes your content to identify relevant compliance standards' },
                    { icon: '🎯', text: 'Smart detection applies only the most relevant regulations for your specific content' },
                    { icon: '⚡', text: 'Instant comprehensive analysis across all detected compliance categories' },
                    { icon: '📊', text: 'Detailed visual reports with category-specific recommendations' },
                    { icon: '💡', text: 'AI-powered suggestions for improving compliance scores' },
                    { icon: '📋', text: 'Professional reports ready for download and sharing' }].
                    map((step, index) =>
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-slate-800/50 to-indigo-900/50 border border-purple-500/20" data-id="tuv7i0v25" data-path="src/components/ComplianceChecker.tsx">
                          <div className="text-xl" data-id="nw2px8twd" data-path="src/components/ComplianceChecker.tsx">{step.icon}</div>
                          <div className="flex-1 text-gray-300 text-sm" data-id="22tmv0cnp" data-path="src/components/ComplianceChecker.tsx">{step.text}</div>
                        </motion.div>
                    )}
                    </CardContent>
                  </Card>
                </motion.div>
              }
            </div>
          </div>
        </motion.div>
      </div>
    </div>);

};

export default ComplianceChecker;