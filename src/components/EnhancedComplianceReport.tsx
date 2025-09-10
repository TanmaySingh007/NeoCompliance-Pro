import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Filter, CheckCircle, AlertTriangle, XCircle, FileText, Share2, Sparkles, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCompliance } from '@/contexts/ComplianceContext';
import { useToast } from '@/hooks/use-toast';
import { generatePDF, generateTextReport } from '@/services/pdfService';
import { initializeEmailJS, sendComplianceEmail, sendEmailFallback, generateEmailContent } from '@/services/emailService';

const EnhancedComplianceReport: React.FC = () => {
  const { currentReport } = useCompliance();
  const { toast } = useToast();
  const [filter, setFilter] = useState<'all' | 'passed' | 'warning' | 'failed'>('all');
  const [emailDialog, setEmailDialog] = useState(false);
  const [emailData, setEmailData] = useState({ to: '', subject: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Initialize EmailJS on component mount
  React.useEffect(() => {
    initializeEmailJS();
  }, []);

  // AI Suggestion Generator
  const generateAISuggestion = (result: any) => {
    const guideline = currentReport?.guideline?.name || '';

    // Context-aware suggestions based on guideline type and issue
    const suggestionMap: Record<string, Record<string, string>> = {
      'ASCI Guidelines': {
        'Disclaimers': 'Increase font size to at least 12pt, use contrasting colors (e.g., white text on dark background), and place disclaimers prominently at the bottom or within the first 3 seconds of video content. Ensure text is readable for at least 3 seconds.',
        'Claims Substantiation': 'Provide verifiable clinical studies or certifications. Include references to regulatory approvals or third-party testing. Add phrases like "Results may vary" or "Individual results not guaranteed".',
        'Comparative Claims': 'Use specific comparisons with proper attribution. Include market research data or independent testing results. Avoid superlatives without evidence.',
        'Celebrity Endorsement': 'Add clear disclosure about paid partnership. Include "#ad" or "Paid promotion" hashtags. Ensure celebrity testimonials reflect genuine experience.',
        'Targeting Vulnerable Groups': 'Remove content targeting children, elderly, or financially vulnerable. Use age-appropriate language and imagery. Include parental guidance disclaimers where applicable.'
      },
      'IRDAI Guidelines': {
        'Policy Terms': 'Clearly state policy tenure, premium payment frequency, and exclusions in readable font. Use simple language avoiding technical jargon.',
        'Benefit Illustrations': 'Show realistic returns using standardized rates. Include "illustrative purposes only" disclaimers. Display worst-case scenarios alongside best-case.',
        'Claim Settlement': 'Use actual claim settlement ratios from latest annual reports. Include time-bound claim processing information.',
        'Surrender Values': 'Clearly mention lock-in periods and surrender charges. Explain impact on returns if policy is surrendered early.',
        'Risk Disclosure': 'Prominently display market risks for ULIPs. Use warning statements like "Insurance is subject to market risks".'
      },
      'EAA 2025': {
        'Digital Accessibility': 'Ensure alt-text for images, keyboard navigation support, and screen reader compatibility. Use ARIA labels for interactive elements.',
        'Color Contrast': 'Maintain 4.5:1 contrast ratio for normal text and 3:1 for large text. Avoid relying solely on color to convey information.',
        'Text Readability': 'Use minimum 14px font size, clear typography, and adequate line spacing. Provide text alternatives for audio content.',
        'Navigation': 'Implement clear heading hierarchy (H1, H2, H3). Ensure all interactive elements are focusable and have visible focus indicators.',
        'Mobile Accessibility': 'Ensure touch targets are at least 44px, content reflows properly, and pinch-to-zoom functionality works.'
      },
      'WCAG 2.1 AA': {
        'Perceivable': 'Add captions for videos, transcripts for audio, and alt-text for images. Ensure content adapts to assistive technologies.',
        'Operable': 'Make all functionality keyboard accessible. Provide users enough time to read content. Avoid seizure-inducing content.',
        'Understandable': 'Use clear, simple language. Make text readable and understandable. Help users avoid and correct mistakes.',
        'Robust': 'Ensure compatibility with assistive technologies. Use valid, semantic HTML markup.'
      },
      'Financial Services': {
        'Investment Risks': 'Include standard risk disclaimers: "Mutual funds are subject to market risks, read offer documents carefully". Use SEBI-approved risk statements.',
        'Return Projections': 'Avoid guaranteeing returns. Use phrases like "expected returns" or "historical performance". Include "past performance does not guarantee future results".',
        'Fee Disclosure': 'Clearly mention all charges including management fees, exit loads, and transaction costs. Use standardized fee tables.',
        'Regulatory Compliance': 'Include SEBI registration numbers, grievance redressal contact information, and regulatory disclaimers.',
        'Target Audience': 'Specify suitable investor categories. Include risk profiling questionnaire results. Mention investment horizon requirements.'
      }
    };

    const guidelineKey = Object.keys(suggestionMap).find((key) =>
    guideline.toLowerCase().includes(key.toLowerCase().split(' ')[0])
    ) || 'ASCI Guidelines';

    const resultKey = Object.keys(suggestionMap[guidelineKey]).find((key) =>
    result.name.toLowerCase().includes(key.toLowerCase()) ||
    result.description.toLowerCase().includes(key.toLowerCase())
    );

    if (resultKey) {
      return suggestionMap[guidelineKey][resultKey];
    }

    // Fallback generic suggestions
    const genericSuggestions = {
      'WARNING': `Based on ${guideline} guidelines, consider: 1) Reviewing content clarity and transparency, 2) Adding appropriate disclaimers, 3) Ensuring claims are substantiated with evidence, 4) Checking compliance with accessibility standards.`,
      'FAIL': `Critical compliance issue detected for ${guideline}. Immediate action required: 1) Remove or modify non-compliant content, 2) Add mandatory regulatory disclaimers, 3) Ensure all claims are legally substantiated, 4) Review with legal compliance team before publication.`
    };

    return genericSuggestions[result.status as keyof typeof genericSuggestions] ||
    'Review the content according to the selected compliance guidelines and make necessary adjustments.';
  };

  if (!currentReport) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative" data-id="mbsy5ie53" data-path="src/components/EnhancedComplianceReport.tsx">

        <Card className="bg-gradient-to-br from-slate-900/60 to-slate-800/40 border-slate-700/50 backdrop-blur-xl glass-morphism" data-id="yfmfc8bl1" data-path="src/components/EnhancedComplianceReport.tsx">
          <CardContent className="p-12 text-center" data-id="wppfe00ba" data-path="src/components/EnhancedComplianceReport.tsx">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center crystal-pulse" data-id="glkzzk1du" data-path="src/components/EnhancedComplianceReport.tsx">

              <FileText className="w-10 h-10 text-white" data-id="oito351y7" data-path="src/components/EnhancedComplianceReport.tsx" />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }} data-id="zcd9311lh" data-path="src/components/EnhancedComplianceReport.tsx">

              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" data-id="ll3xa5sde" data-path="src/components/EnhancedComplianceReport.tsx">
                Ready for Analysis
              </h3>
              <p className="text-slate-400 mb-4" data-id="wi1gl3j2m" data-path="src/components/EnhancedComplianceReport.tsx">Upload a file and select guidelines to begin your magical compliance journey.</p>
              <div className="flex items-center justify-center space-x-2 text-sm text-slate-500" data-id="p2e30e54e" data-path="src/components/EnhancedComplianceReport.tsx">
                <Sparkles className="w-4 h-4" data-id="w4ucxgurn" data-path="src/components/EnhancedComplianceReport.tsx" />
                <span data-id="dtg5kqgxh" data-path="src/components/EnhancedComplianceReport.tsx">Powered by AI Magic</span>
                <Sparkles className="w-4 h-4" data-id="q4t7nrirc" data-path="src/components/EnhancedComplianceReport.tsx" />
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>);

  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PASS':
        return <CheckCircle className="w-5 h-5 text-emerald-400" data-id="etyt1ye2c" data-path="src/components/EnhancedComplianceReport.tsx" />;
      case 'WARNING':
        return <AlertTriangle className="w-5 h-5 text-amber-400" data-id="nkqjpsq3s" data-path="src/components/EnhancedComplianceReport.tsx" />;
      case 'FAIL':
        return <XCircle className="w-5 h-5 text-rose-400" data-id="ej1d9si4d" data-path="src/components/EnhancedComplianceReport.tsx" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PASS':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 bio-glow';
      case 'WARNING':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'FAIL':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30 pandora-glow';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const filteredResults = currentReport.results.filter((result) => {
    if (filter === 'all') return true;
    if (filter === 'passed') return result.status === 'PASS';
    if (filter === 'warning') return result.status === 'WARNING';
    if (filter === 'failed') return result.status === 'FAIL';
    return true;
  });

  const resultCounts = {
    all: currentReport.results.length,
    passed: currentReport.results.filter((r) => r.status === 'PASS').length,
    warning: currentReport.results.filter((r) => r.status === 'WARNING').length,
    failed: currentReport.results.filter((r) => r.status === 'FAIL').length
  };

  const handleDownloadPDF = async () => {
    try {
      setIsLoading(true);
      await generatePDF(currentReport);

      toast({
        title: "✨ PDF Downloaded!",
        description: "Your magical compliance report has been downloaded successfully."
      });

      console.log('Enhanced PDF report generated and downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "❌ Download Failed",
        description: "Failed to generate PDF report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadText = () => {
    try {
      generateTextReport(currentReport);

      toast({
        title: "📝 Text Downloaded!",
        description: "Your compliance report has been saved as a text file."
      });

      console.log('Enhanced text report generated and downloaded successfully');
    } catch (error) {
      console.error('Error generating text file:', error);
      toast({
        title: "❌ Download Failed",
        description: "Failed to generate text report. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSendEmail = async () => {
    if (!emailData.to) {
      toast({
        title: "❌ Email Required",
        description: "Please enter a recipient email address.",
        variant: "destructive"
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailData.to)) {
      toast({
        title: "❌ Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);

      // Generate email content
      const reportContent = generateEmailContent(currentReport);

      // Prepare email data
      const emailParams = {
        to: emailData.to,
        subject: emailData.subject || `Compliance Report - ${currentReport.guideline.name}`,
        message: emailData.message || `Please find the compliance analysis report for ${currentReport.guideline.name} guidelines.`,
        reportContent,
        guidelineName: currentReport.guideline.name
      };

      // Try to send email via EmailJS
      try {
        await sendComplianceEmail(emailParams);

        toast({
          title: "📧✨ Email Sent Successfully!",
          description: `Your magical compliance report has been sent to ${emailData.to}`
        });

        console.log('Email sent successfully via EmailJS');
      } catch (emailError) {
        console.warn('EmailJS failed, falling back to mailto:', emailError);

        // Fallback to mailto
        sendEmailFallback({
          to: emailData.to,
          subject: emailParams.subject,
          body: `${emailParams.message}\n\n${reportContent}`
        });

        toast({
          title: "📧 Email Client Opened!",
          description: "Your email client has been opened with the report details."
        });
      }

      setEmailDialog(false);
      setEmailData({ to: '', subject: '', message: '' });

    } catch (error) {
      console.error('Error in email handling:', error);
      toast({
        title: "❌ Email Failed",
        description: "Failed to send email. Please try again or check your email settings.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-6 relative" data-id="7sjev5uu4" data-path="src/components/EnhancedComplianceReport.tsx">

      {/* Magical background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-3xl" data-id="7vpg6mb03" data-path="src/components/EnhancedComplianceReport.tsx" />
      
      <Card className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/60 border-slate-700/50 backdrop-blur-xl glass-morphism crystal-pulse" data-id="6auvmrfpg" data-path="src/components/EnhancedComplianceReport.tsx">
        <CardHeader className="relative" data-id="fner8yg3n" data-path="src/components/EnhancedComplianceReport.tsx">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-rose-400/20 rounded-full blur-2xl" data-id="y7cruebm6" data-path="src/components/EnhancedComplianceReport.tsx" />
          
          <div className="flex items-center justify-between relative z-10" data-id="eboi6hiac" data-path="src/components/EnhancedComplianceReport.tsx">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }} data-id="g12633c26" data-path="src/components/EnhancedComplianceReport.tsx">

              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center" data-id="m2axd29tw" data-path="src/components/EnhancedComplianceReport.tsx">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="mr-3" data-id="u01mdjxo8" data-path="src/components/EnhancedComplianceReport.tsx">

                  ✨
                </motion.div>
                Compliance Analysis for {currentReport.guideline.name}
              </CardTitle>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-slate-400 mt-2" data-id="ay2f80r3j" data-path="src/components/EnhancedComplianceReport.tsx">

                {currentReport.overallRating === 'Compliant' ?
                'The advertisement aligns with most guidelines but has minor areas needing improvement.' :
                'The ad mostly aligns with the code but has some areas needing improvement.'}
              </motion.p>
            </motion.div>
            
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex space-x-2" data-id="nhedsk5en" data-path="src/components/EnhancedComplianceReport.tsx">

              <Button
                onClick={handleDownloadPDF}
                size="sm"
                disabled={isLoading}
                className="disney-gradient-blue hover:scale-105 transition-transform duration-200 text-white border-0" data-id="ip63vmmaa" data-path="src/components/EnhancedComplianceReport.tsx">

                <Download className="w-4 h-4 mr-2" data-id="281d120zl" data-path="src/components/EnhancedComplianceReport.tsx" />
                {isLoading ? 'Generating...' : 'PDF'}
              </Button>
              <Button
                onClick={handleDownloadText}
                size="sm"
                className="disney-gradient-purple hover:scale-105 transition-transform duration-200 text-white border-0" data-id="dyzgepw80" data-path="src/components/EnhancedComplianceReport.tsx">

                <Download className="w-4 h-4 mr-2" data-id="43k4zau1f" data-path="src/components/EnhancedComplianceReport.tsx" />
                Text
              </Button>
              <Dialog open={emailDialog} onOpenChange={setEmailDialog} data-id="mp0ltx0l8" data-path="src/components/EnhancedComplianceReport.tsx">
                <DialogTrigger asChild data-id="qybbjevzt" data-path="src/components/EnhancedComplianceReport.tsx">
                  <Button
                    size="sm"
                    className="disney-gradient-ocean hover:scale-105 transition-transform duration-200 text-white border-0" data-id="3096g58ia" data-path="src/components/EnhancedComplianceReport.tsx">

                    <Mail className="w-4 h-4 mr-2" data-id="cjbxbbbkn" data-path="src/components/EnhancedComplianceReport.tsx" />
                    Email
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 glass-morphism" data-id="zpkaa7ek5" data-path="src/components/EnhancedComplianceReport.tsx">
                  <DialogHeader data-id="6t5mgujna" data-path="src/components/EnhancedComplianceReport.tsx">
                    <DialogTitle className="text-slate-200 flex items-center" data-id="xrvve6kv8" data-path="src/components/EnhancedComplianceReport.tsx">
                      <Share2 className="w-5 h-5 mr-2 text-blue-400" data-id="fungoks2d" data-path="src/components/EnhancedComplianceReport.tsx" />
                      Share Report via Email
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4" data-id="mfqs4jzau" data-path="src/components/EnhancedComplianceReport.tsx">
                    <div data-id="5otcqn7ht" data-path="src/components/EnhancedComplianceReport.tsx">
                      <Label htmlFor="email-to" className="text-slate-200" data-id="dc4cdz3b0" data-path="src/components/EnhancedComplianceReport.tsx">To *</Label>
                      <Input
                        id="email-to"
                        type="email"
                        value={emailData.to}
                        onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
                        placeholder="recipient@example.com"
                        className="bg-slate-800/50 border-slate-600 text-slate-200 focus:border-blue-400"
                        required data-id="s4a5mblfl" data-path="src/components/EnhancedComplianceReport.tsx" />

                    </div>
                    <div data-id="tcst7nqai" data-path="src/components/EnhancedComplianceReport.tsx">
                      <Label htmlFor="email-subject" className="text-slate-200" data-id="f162c8551" data-path="src/components/EnhancedComplianceReport.tsx">Subject</Label>
                      <Input
                        id="email-subject"
                        value={emailData.subject}
                        onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                        placeholder={`Compliance Report - ${currentReport.guideline.name}`}
                        className="bg-slate-800/50 border-slate-600 text-slate-200 focus:border-blue-400" data-id="37b3ona28" data-path="src/components/EnhancedComplianceReport.tsx" />

                    </div>
                    <div data-id="c8kh0x0n2" data-path="src/components/EnhancedComplianceReport.tsx">
                      <Label htmlFor="email-message" className="text-slate-200" data-id="88uztr60z" data-path="src/components/EnhancedComplianceReport.tsx">Message</Label>
                      <Textarea
                        id="email-message"
                        value={emailData.message}
                        onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                        placeholder="Please find the compliance report attached..."
                        className="bg-slate-800/50 border-slate-600 text-slate-200 focus:border-blue-400" data-id="m3kxifcn1" data-path="src/components/EnhancedComplianceReport.tsx" />

                    </div>
                    <Button
                      onClick={handleSendEmail}
                      disabled={isLoading || !emailData.to}
                      className="w-full disney-gradient-blue hover:scale-105 transition-transform duration-200 text-white" data-id="s5bgheeox" data-path="src/components/EnhancedComplianceReport.tsx">

                      <Mail className="w-4 h-4 mr-2" data-id="7hwqt5h6b" data-path="src/components/EnhancedComplianceReport.tsx" />
                      {isLoading ? 'Sending...' : 'Send Email'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>
        </CardHeader>
        
        <CardContent className="relative" data-id="zueoff9yz" data-path="src/components/EnhancedComplianceReport.tsx">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between mb-8" data-id="kztcgy1yo" data-path="src/components/EnhancedComplianceReport.tsx">

            <div className="flex items-center space-x-4" data-id="ib8lt6yub" data-path="src/components/EnhancedComplianceReport.tsx">
              <div data-id="9bcc1o8w8" data-path="src/components/EnhancedComplianceReport.tsx">
                <div className="text-lg font-semibold text-slate-200 mb-2" data-id="97v801c3y" data-path="src/components/EnhancedComplianceReport.tsx">Overall Rating:</div>
                <Badge className={`text-lg px-4 py-2 font-bold ${
                currentReport.overallRating === 'Compliant' ?
                'disney-gradient-magic text-slate-800' :
                'disney-gradient-sunset text-white'}`
                } data-id="906c3yswi" data-path="src/components/EnhancedComplianceReport.tsx">
                  {currentReport.overallRating}
                </Badge>
              </div>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              className="text-xs text-slate-500 text-right bg-slate-800/30 p-4 rounded-lg border border-slate-700/30" data-id="cs8ufbma0" data-path="src/components/EnhancedComplianceReport.tsx">

              <p data-id="b6327ewxh" data-path="src/components/EnhancedComplianceReport.tsx">This report was generated by <span className="text-amber-400 font-semibold" data-id="ektqn4lhj" data-path="src/components/EnhancedComplianceReport.tsx">NeoCompliance-Pro</span> and may contain errors.</p>
              <p data-id="vby6qxqev" data-path="src/components/EnhancedComplianceReport.tsx"><span className="text-amber-400 font-semibold" data-id="l6dxu9ce2" data-path="src/components/EnhancedComplianceReport.tsx">NeoCompliance-Pro</span> is not liable for any decisions made based on its contents.</p>
            </motion.div>
          </motion.div>

          {/* Enhanced Filter Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8" data-id="3hc6o97io" data-path="src/components/EnhancedComplianceReport.tsx">

            <div className="flex items-center space-x-6 mb-6" data-id="30mq3zdoo" data-path="src/components/EnhancedComplianceReport.tsx">
              <div className="flex items-center space-x-2" data-id="gi0c6albs" data-path="src/components/EnhancedComplianceReport.tsx">
                <Filter className="w-5 h-5 text-blue-400" data-id="l1pzrx9p4" data-path="src/components/EnhancedComplianceReport.tsx" />
                <span className="text-lg font-semibold text-slate-200" data-id="gy46xz19x" data-path="src/components/EnhancedComplianceReport.tsx">Filter Results</span>
              </div>
              <div className="flex flex-wrap gap-3" data-id="4vmiofzif" data-path="src/components/EnhancedComplianceReport.tsx">
                {[
                { key: 'all', label: `All (${resultCounts.all})`, gradient: 'disney-gradient-blue' },
                { key: 'passed', label: `Passed (${resultCounts.passed})`, gradient: 'disney-gradient-magic' },
                { key: 'warning', label: `Warnings (${resultCounts.warning})`, gradient: 'disney-gradient-sunset' },
                { key: 'failed', label: `Failed (${resultCounts.failed})`, gradient: 'disney-gradient-purple' }].
                map((filterOption) =>
                <motion.div
                  key={filterOption.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }} data-id="ujkhdg3ur" data-path="src/components/EnhancedComplianceReport.tsx">

                    <Button
                    onClick={() => setFilter(filterOption.key as any)}
                    size="sm"
                    className={`transition-all duration-200 ${
                    filter === filterOption.key ?
                    `${filterOption.gradient} text-white crystal-pulse` :
                    'bg-slate-800/50 border-slate-600 hover:bg-slate-700/50 text-slate-300'}`
                    } data-id="fze8kvjq3" data-path="src/components/EnhancedComplianceReport.tsx">

                      {filterOption.label}
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Enhanced Results Section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-6" data-id="8l8ic40d0" data-path="src/components/EnhancedComplianceReport.tsx">

            {filteredResults.map((result, index) =>
            <motion.div
              key={result.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${getStatusColor(result.status)} glass-morphism`} data-id="v5kp5g8iy" data-path="src/components/EnhancedComplianceReport.tsx">

                <div className="flex items-start justify-between mb-4" data-id="xuhxbq2nv" data-path="src/components/EnhancedComplianceReport.tsx">
                  <div className="flex items-center space-x-4" data-id="5mgyysrvv" data-path="src/components/EnhancedComplianceReport.tsx">
                    <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }} data-id="fe6u0qjyl" data-path="src/components/EnhancedComplianceReport.tsx">

                      {getStatusIcon(result.status)}
                    </motion.div>
                    <div data-id="p8org7cs6" data-path="src/components/EnhancedComplianceReport.tsx">
                      <h4 className="font-bold text-lg" data-id="f9iwe8xcc" data-path="src/components/EnhancedComplianceReport.tsx">{result.name}</h4>
                      <Badge className={`text-sm mt-2 font-bold ${getStatusColor(result.status)}`} data-id="awdbgapjh" data-path="src/components/EnhancedComplianceReport.tsx">
                        {result.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4" data-id="pes72xslm" data-path="src/components/EnhancedComplianceReport.tsx">
                  <p className="text-sm opacity-90 leading-relaxed" data-id="ooc9dojmv" data-path="src/components/EnhancedComplianceReport.tsx">{result.description}</p>
                  
                  {result.reason && result.status === 'PASS' &&
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20 bio-glow" data-id="pgqd5euq1" data-path="src/components/EnhancedComplianceReport.tsx">

                      <span className="font-bold text-emerald-400 flex items-center" data-id="46yjo1qmy" data-path="src/components/EnhancedComplianceReport.tsx">
                        <CheckCircle className="w-4 h-4 mr-2" data-id="bcgen8hfa" data-path="src/components/EnhancedComplianceReport.tsx" />
                        Why it passed: 
                      </span>
                      <span className="text-emerald-300 block mt-1" data-id="jjpi6opmr" data-path="src/components/EnhancedComplianceReport.tsx">{result.reason}</span>
                    </motion.div>
                }
                  
                  {result.recommendation && (result.status === 'WARNING' || result.status === 'FAIL') &&
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className={`p-4 rounded-lg border ${
                  result.status === 'WARNING' ?
                  'bg-amber-500/10 border-amber-500/20' :
                  'bg-rose-500/10 border-rose-500/20'}`
                  } data-id="s8m58aodp" data-path="src/components/EnhancedComplianceReport.tsx">

                      <span className={`font-bold flex items-center ${
                  result.status === 'WARNING' ? 'text-amber-400' : 'text-rose-400'}`
                  } data-id="cdg957qzp" data-path="src/components/EnhancedComplianceReport.tsx">
                        {result.status === 'WARNING' ?
                    <AlertTriangle className="w-4 h-4 mr-2" data-id="u5w2c1kb0" data-path="src/components/EnhancedComplianceReport.tsx" /> :
                    <XCircle className="w-4 h-4 mr-2" data-id="op1l6dh82" data-path="src/components/EnhancedComplianceReport.tsx" />
                    }
                        Recommendation: 
                      </span>
                      <span className={`block mt-1 ${
                  result.status === 'WARNING' ? 'text-amber-300' : 'text-rose-300'}`
                  } data-id="zq2fdy5mk" data-path="src/components/EnhancedComplianceReport.tsx">
                        {result.recommendation}
                      </span>
                    </motion.div>
                }

                  {/* AI Suggestion for WARNING and FAIL cases */}
                  {(result.status === 'WARNING' || result.status === 'FAIL') &&
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-blue-500/20 crystal-pulse" data-id="g7z31f2af" data-path="src/components/EnhancedComplianceReport.tsx">
                    <span className="font-bold text-blue-400 flex items-center mb-2" data-id="0fmpk4p7t" data-path="src/components/EnhancedComplianceReport.tsx">
                      <Lightbulb className="w-4 h-4 mr-2" data-id="0p57g1sbk" data-path="src/components/EnhancedComplianceReport.tsx" />
                      AI-Suggested Fix:
                    </span>
                    <span className="text-blue-300 text-sm leading-relaxed" data-id="3a2x0k0fd" data-path="src/components/EnhancedComplianceReport.tsx">
                      {generateAISuggestion(result)}
                    </span>
                  </motion.div>
                }
                </div>
              </motion.div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>);

};

export default EnhancedComplianceReport;