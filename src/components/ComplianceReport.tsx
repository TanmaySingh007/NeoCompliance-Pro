import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Filter, CheckCircle, AlertTriangle, XCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCompliance } from '@/contexts/ComplianceContext';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import emailjs from '@emailjs/browser';

const ComplianceReport: React.FC = () => {
  const { currentReport } = useCompliance();
  const { toast } = useToast();
  const [filter, setFilter] = useState<'all' | 'passed' | 'warning' | 'failed'>('all');
  const [emailDialog, setEmailDialog] = useState(false);
  const [emailData, setEmailData] = useState({ to: '', subject: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Initialize EmailJS
  React.useEffect(() => {
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key
  }, []);

  if (!currentReport) {
    return (
      <Card className="w-full bg-slate-900/50 border-slate-700/50 backdrop-blur-sm" data-id="4rcs2s4in" data-path="src/components/ComplianceReport.tsx">
        <CardContent className="p-8 text-center" data-id="2ikjbyg0q" data-path="src/components/ComplianceReport.tsx">
          <FileText className="w-12 h-12 mx-auto text-slate-400 mb-4" data-id="z3mmu80z2" data-path="src/components/ComplianceReport.tsx" />
          <p className="text-slate-400" data-id="oqhdhzmc7" data-path="src/components/ComplianceReport.tsx">No compliance report available. Upload a file and select guidelines to get started.</p>
        </CardContent>
      </Card>);

  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PASS':
        return <CheckCircle className="w-5 h-5 text-green-500" data-id="f8u0w3l6d" data-path="src/components/ComplianceReport.tsx" />;
      case 'WARNING':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" data-id="qje5fa8je" data-path="src/components/ComplianceReport.tsx" />;
      case 'FAIL':
        return <XCircle className="w-5 h-5 text-red-500" data-id="c163ohmt7" data-path="src/components/ComplianceReport.tsx" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PASS':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'WARNING':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'FAIL':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
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
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;
      let yPosition = 20;

      // Helper function to add new page if needed
      const checkPageSpace = (neededSpace: number) => {
        if (yPosition + neededSpace > pageHeight - 20) {
          pdf.addPage();
          yPosition = 20;
          return true;
        }
        return false;
      };

      // Title
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text('NeoCompliance-Pro - Compliance Report', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 20;

      // Guideline info
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      const titleText = `Compliance Analysis for ${currentReport.guideline.name}`;
      const titleLines = pdf.splitTextToSize(titleText, pageWidth - 40);
      pdf.text(titleLines, 20, yPosition);
      yPosition += titleLines.length * 8 + 10;

      // Summary
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      const summaryText = currentReport.overallRating === 'Compliant' ?
      'The advertisement aligns with most guidelines but has minor areas needing improvement.' :
      'The ad mostly aligns with the code but has some areas needing improvement.';
      const summaryLines = pdf.splitTextToSize(summaryText, pageWidth - 40);
      pdf.text(summaryLines, 20, yPosition);
      yPosition += summaryLines.length * 6 + 15;

      // Overall Rating
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Overall Rating: ${currentReport.overallRating}`, 20, yPosition);
      yPosition += 10;

      // Generated timestamp
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generated: ${currentReport.timestamp.toLocaleString()}`, 20, yPosition);
      yPosition += 20;

      // Filter Results Summary
      checkPageSpace(30);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Summary:', 20, yPosition);
      yPosition += 10;

      pdf.setFont('helvetica', 'normal');
      pdf.text(`Total Results: ${resultCounts.all}`, 20, yPosition);
      pdf.text(`Passed: ${resultCounts.passed}`, 80, yPosition);
      pdf.text(`Warnings: ${resultCounts.warning}`, 130, yPosition);
      pdf.text(`Failed: ${resultCounts.failed}`, 180, yPosition);
      yPosition += 20;

      // Detailed Results
      checkPageSpace(20);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Detailed Results:', 20, yPosition);
      yPosition += 15;

      currentReport.results.forEach((result, index) => {
        checkPageSpace(50);

        // Result name and status
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${index + 1}. ${result.name}`, 20, yPosition);
        yPosition += 8;

        // Status badge
        pdf.setFont('helvetica', 'normal');
        const statusColor = result.status === 'PASS' ? [0, 128, 0] :
        result.status === 'WARNING' ? [255, 165, 0] : [255, 0, 0];
        pdf.setTextColor(...statusColor);
        pdf.text(`Status: ${result.status}`, 25, yPosition);
        pdf.setTextColor(0, 0, 0);
        yPosition += 10;

        // Description
        const descLines = pdf.splitTextToSize(result.description, pageWidth - 50);
        pdf.text(descLines, 25, yPosition);
        yPosition += descLines.length * 6 + 5;

        // Reason (for PASS)
        if (result.reason && result.status === 'PASS') {
          pdf.setTextColor(0, 128, 0);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Why it passed: ', 25, yPosition);
          pdf.setFont('helvetica', 'normal');
          const reasonLines = pdf.splitTextToSize(result.reason, pageWidth - 70);
          pdf.text(reasonLines, 25, yPosition + 6);
          pdf.setTextColor(0, 0, 0);
          yPosition += reasonLines.length * 6 + 10;
        }

        // Recommendation (for WARNING/FAIL)
        if (result.recommendation && (result.status === 'WARNING' || result.status === 'FAIL')) {
          const recColor = result.status === 'WARNING' ? [255, 165, 0] : [255, 0, 0];
          pdf.setTextColor(...recColor);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Recommendation: ', 25, yPosition);
          pdf.setFont('helvetica', 'normal');
          const recLines = pdf.splitTextToSize(result.recommendation, pageWidth - 70);
          pdf.text(recLines, 25, yPosition + 6);
          pdf.setTextColor(0, 0, 0);
          yPosition += recLines.length * 6 + 10;
        }

        yPosition += 5;
      });

      // Footer disclaimer
      checkPageSpace(20);
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      const disclaimerLines = pdf.splitTextToSize(
        'This report was generated by NeoCompliance-Pro and may contain errors. NeoCompliance-Pro is not liable for any decisions made based on its contents.',
        pageWidth - 40
      );
      pdf.text(disclaimerLines, 20, yPosition);

      // Save the PDF
      const fileName = `${currentReport.guideline.name.replace(/[^a-z0-9]/gi, '_')}_compliance_report.pdf`;
      pdf.save(fileName);

      toast({
        title: "✅ PDF Downloaded Successfully!",
        description: "Your compliance report has been downloaded as a PDF file."
      });

      console.log('PDF report generated and downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "❌ PDF Download Failed",
        description: "Failed to generate PDF report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadText = () => {
    try {
      let content = `NeoCompliance-Pro - Compliance Report\n`;
      content += `=====================================\n\n`;
      content += `Compliance Analysis for ${currentReport.guideline.name}\n`;
      content += `Overall Rating: ${currentReport.overallRating}\n`;
      content += `Generated: ${currentReport.timestamp.toLocaleString()}\n\n`;

      content += `Summary:\n`;
      content += `--------\n`;
      content += `Total Results: ${resultCounts.all}\n`;
      content += `Passed: ${resultCounts.passed}\n`;
      content += `Warnings: ${resultCounts.warning}\n`;
      content += `Failed: ${resultCounts.failed}\n\n`;

      content += `Detailed Results:\n`;
      content += `-----------------\n\n`;

      currentReport.results.forEach((result, index) => {
        content += `${index + 1}. ${result.name}\n`;
        content += `Status: ${result.status}\n`;
        content += `Description: ${result.description}\n`;

        if (result.reason && result.status === 'PASS') {
          content += `Why it passed: ${result.reason}\n`;
        }

        if (result.recommendation && (result.status === 'WARNING' || result.status === 'FAIL')) {
          content += `Recommendation: ${result.recommendation}\n`;
        }
        content += `\n`;
      });

      content += `\nThis report was generated by NeoCompliance-Pro and may contain errors.\n`;
      content += `NeoCompliance-Pro is not liable for any decisions made based on its contents.\n`;

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentReport.guideline.name.replace(/[^a-z0-9]/gi, '_')}_compliance_report.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "📄 Text File Downloaded!",
        description: "Compliance report has been downloaded as text file."
      });

      console.log('Text report generated and downloaded successfully');
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

    try {
      setIsLoading(true);

      // Prepare email content
      const subject = emailData.subject || `Compliance Report - ${currentReport.guideline.name}`;

      let emailBody = emailData.message || `Please find the compliance analysis report for ${currentReport.guideline.name} guidelines.\n\n`;

      emailBody += `COMPLIANCE REPORT\n`;
      emailBody += `================\n\n`;
      emailBody += `Analysis for: ${currentReport.guideline.name}\n`;
      emailBody += `Overall Rating: ${currentReport.overallRating}\n`;
      emailBody += `Generated: ${currentReport.timestamp.toLocaleString()}\n\n`;

      emailBody += `SUMMARY:\n`;
      emailBody += `Total Results: ${resultCounts.all}\n`;
      emailBody += `Passed: ${resultCounts.passed}\n`;
      emailBody += `Warnings: ${resultCounts.warning}\n`;
      emailBody += `Failed: ${resultCounts.failed}\n\n`;

      emailBody += `DETAILED RESULTS:\n`;
      emailBody += `-----------------\n\n`;

      currentReport.results.forEach((result, index) => {
        emailBody += `${index + 1}. ${result.name} - ${result.status}\n`;
        emailBody += `   ${result.description}\n`;

        if (result.reason && result.status === 'PASS') {
          emailBody += `   Why it passed: ${result.reason}\n`;
        }

        if (result.recommendation && (result.status === 'WARNING' || result.status === 'FAIL')) {
          emailBody += `   Recommendation: ${result.recommendation}\n`;
        }
        emailBody += `\n`;
      });

      emailBody += `\nThis report was generated by NeoCompliance-Pro and may contain errors.\n`;
      emailBody += `NeoCompliance-Pro is not liable for any decisions made based on its contents.\n`;

      // Use EmailJS to send the email
      const templateParams = {
        to_email: emailData.to,
        from_name: 'NeoCompliance-Pro',
        subject: subject,
        message: emailBody,
        reply_to: 'noreply@neocompliance-pro.com'
      };

      // Note: Replace these with your actual EmailJS service details
      const result = await emailjs.send(
        'service_YOUR_SERVICE_ID', // Replace with your service ID
        'template_YOUR_TEMPLATE_ID', // Replace with your template ID
        templateParams
      );

      console.log('Email sent successfully:', result);

      toast({
        title: "📧 Email Sent Successfully!",
        description: `Compliance report has been sent to ${emailData.to}`
      });

      setEmailDialog(false);
      setEmailData({ to: '', subject: '', message: '' });

    } catch (error) {
      console.error('Error sending email:', error);

      // Fallback to mailto if EmailJS fails
      const subject = emailData.subject || `Compliance Report - ${currentReport.guideline.name}`;
      const body = emailData.message || `Please find the compliance analysis report for ${currentReport.guideline.name} guidelines.`;

      const mailtoUrl = `mailto:${emailData.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoUrl);

      toast({
        title: "📧 Email Client Opened",
        description: "Your default email client has been opened with the report details."
      });

      setEmailDialog(false);
      setEmailData({ to: '', subject: '', message: '' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-6" data-id="hraredxvm" data-path="src/components/ComplianceReport.tsx">

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm" data-id="vig4m3uso" data-path="src/components/ComplianceReport.tsx">
        <CardHeader data-id="ywkk1n198" data-path="src/components/ComplianceReport.tsx">
          <div className="flex items-center justify-between" data-id="4drp0rpc3" data-path="src/components/ComplianceReport.tsx">
            <div data-id="66cysg7wz" data-path="src/components/ComplianceReport.tsx">
              <CardTitle className="text-xl font-bold text-slate-200" data-id="9gy7o4oo8" data-path="src/components/ComplianceReport.tsx">
                Compliance Analysis for {currentReport.guideline.name}
              </CardTitle>
              <p className="text-slate-400 mt-1" data-id="sw8cgrvpu" data-path="src/components/ComplianceReport.tsx">
                {currentReport.overallRating === 'Compliant' ?
                'The advertisement aligns with most guidelines but has minor areas needing improvement.' :
                'The ad mostly aligns with the code but has some areas needing improvement.'
                }
              </p>
            </div>
            <div className="flex space-x-2" data-id="rvlm1pikd" data-path="src/components/ComplianceReport.tsx">
              <Button
                onClick={handleDownloadPDF}
                size="sm"
                variant="outline"
                disabled={isLoading}
                className="border-slate-600 hover:bg-slate-700" data-id="adqaqswda" data-path="src/components/ComplianceReport.tsx">
                <Download className="w-4 h-4 mr-2" data-id="ad5ymdqvs" data-path="src/components/ComplianceReport.tsx" />
                {isLoading ? 'Generating...' : 'PDF'}
              </Button>
              <Button
                onClick={handleDownloadText}
                size="sm"
                variant="outline"
                className="border-slate-600 hover:bg-slate-700" data-id="rubsvvjb5" data-path="src/components/ComplianceReport.tsx">
                <Download className="w-4 h-4 mr-2" data-id="bqemm8lgv" data-path="src/components/ComplianceReport.tsx" />
                Text
              </Button>
              <Dialog open={emailDialog} onOpenChange={setEmailDialog} data-id="gclz5yw1q" data-path="src/components/ComplianceReport.tsx">
                <DialogTrigger asChild data-id="g556canky" data-path="src/components/ComplianceReport.tsx">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-600 hover:bg-slate-700" data-id="s75btxtjm" data-path="src/components/ComplianceReport.tsx">
                    <Mail className="w-4 h-4 mr-2" data-id="zim6ufg6m" data-path="src/components/ComplianceReport.tsx" />
                    Email
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-slate-700" data-id="js0tj0k5t" data-path="src/components/ComplianceReport.tsx">
                  <DialogHeader data-id="ms0tj9qcn" data-path="src/components/ComplianceReport.tsx">
                    <DialogTitle className="text-slate-200" data-id="r1qm7fesd" data-path="src/components/ComplianceReport.tsx">Share Report via Email</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4" data-id="6pteqckic" data-path="src/components/ComplianceReport.tsx">
                    <div data-id="ohq4w89xw" data-path="src/components/ComplianceReport.tsx">
                      <Label htmlFor="email-to" className="text-slate-200" data-id="n6siguq0r" data-path="src/components/ComplianceReport.tsx">To *</Label>
                      <Input
                        id="email-to"
                        type="email"
                        value={emailData.to}
                        onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
                        placeholder="recipient@example.com"
                        className="bg-slate-800 border-slate-600 text-slate-200"
                        required data-id="7tn5j7sj4" data-path="src/components/ComplianceReport.tsx" />
                    </div>
                    <div data-id="lsobznwia" data-path="src/components/ComplianceReport.tsx">
                      <Label htmlFor="email-subject" className="text-slate-200" data-id="gbg0us1xv" data-path="src/components/ComplianceReport.tsx">Subject</Label>
                      <Input
                        id="email-subject"
                        value={emailData.subject}
                        onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                        placeholder={`Compliance Report - ${currentReport.guideline.name}`}
                        className="bg-slate-800 border-slate-600 text-slate-200" data-id="szfd15py5" data-path="src/components/ComplianceReport.tsx" />
                    </div>
                    <div data-id="epbrwagsl" data-path="src/components/ComplianceReport.tsx">
                      <Label htmlFor="email-message" className="text-slate-200" data-id="vg9wkn63h" data-path="src/components/ComplianceReport.tsx">Message</Label>
                      <Textarea
                        id="email-message"
                        value={emailData.message}
                        onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                        placeholder="Please find the compliance report attached..."
                        className="bg-slate-800 border-slate-600 text-slate-200" data-id="a0f8mmn10" data-path="src/components/ComplianceReport.tsx" />
                    </div>
                    <Button
                      onClick={handleSendEmail}
                      disabled={isLoading || !emailData.to}
                      className="w-full bg-blue-600 hover:bg-blue-700" data-id="xg9ae1bwo" data-path="src/components/ComplianceReport.tsx">
                      {isLoading ? 'Sending...' : 'Send Email'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent data-id="77phcbn32" data-path="src/components/ComplianceReport.tsx">
          <div className="flex items-center justify-between mb-6" data-id="jsh742gse" data-path="src/components/ComplianceReport.tsx">
            <div data-id="ot5oke125" data-path="src/components/ComplianceReport.tsx">
              <div className="text-lg font-semibold text-slate-200" data-id="dma4j2tzz" data-path="src/components/ComplianceReport.tsx">Overall Rating:</div>
              <Badge className={`text-sm mt-1 ${
              currentReport.overallRating === 'Compliant' ?
              'bg-green-500/20 text-green-400 border-green-500/30' :
              'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'}`
              } data-id="xvgzd0sf7" data-path="src/components/ComplianceReport.tsx">
                {currentReport.overallRating}
              </Badge>
            </div>
            <div className="text-xs text-slate-500 text-right" data-id="px1b9zohf" data-path="src/components/ComplianceReport.tsx">
              <p data-id="hrx8u4x0u" data-path="src/components/ComplianceReport.tsx">This report was generated by <span className="font-semibold text-blue-400" data-id="ipdjy21ns" data-path="src/components/ComplianceReport.tsx">NeoCompliance-Pro</span> and may contain errors.</p>
              <p data-id="a78xcv46y" data-path="src/components/ComplianceReport.tsx"><span className="font-semibold text-blue-400" data-id="7xlkgkqis" data-path="src/components/ComplianceReport.tsx">NeoCompliance-Pro</span> is not liable for any decisions made based on its contents.</p>
            </div>
          </div>

          <div className="mb-6" data-id="gvyco5jt4" data-path="src/components/ComplianceReport.tsx">
            <div className="flex items-center space-x-4 mb-4" data-id="h4re6jwrd" data-path="src/components/ComplianceReport.tsx">
              <span className="text-sm font-medium text-slate-200" data-id="qva0nas2u" data-path="src/components/ComplianceReport.tsx">Filter Results</span>
              <div className="flex space-x-2" data-id="0hmeihin3" data-path="src/components/ComplianceReport.tsx">
                <Button
                  onClick={() => setFilter('all')}
                  size="sm"
                  variant={filter === 'all' ? 'default' : 'outline'}
                  className={filter === 'all' ? 'bg-blue-600' : 'border-slate-600 hover:bg-slate-700'} data-id="c49b2olcp" data-path="src/components/ComplianceReport.tsx">
                  All ({resultCounts.all})
                </Button>
                <Button
                  onClick={() => setFilter('passed')}
                  size="sm"
                  variant={filter === 'passed' ? 'default' : 'outline'}
                  className={filter === 'passed' ? 'bg-green-600' : 'border-slate-600 hover:bg-slate-700'} data-id="mq8t8qy9j" data-path="src/components/ComplianceReport.tsx">
                  Passed ({resultCounts.passed})
                </Button>
                <Button
                  onClick={() => setFilter('warning')}
                  size="sm"
                  variant={filter === 'warning' ? 'default' : 'outline'}
                  className={filter === 'warning' ? 'bg-yellow-600' : 'border-slate-600 hover:bg-slate-700'} data-id="sy79271r9" data-path="src/components/ComplianceReport.tsx">
                  Warnings ({resultCounts.warning})
                </Button>
                <Button
                  onClick={() => setFilter('failed')}
                  size="sm"
                  variant={filter === 'failed' ? 'default' : 'outline'}
                  className={filter === 'failed' ? 'bg-red-600' : 'border-slate-600 hover:bg-slate-700'} data-id="vnd4r31te" data-path="src/components/ComplianceReport.tsx">
                  Failed ({resultCounts.failed})
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4" data-id="d9bx0n591" data-path="src/components/ComplianceReport.tsx">
            {filteredResults.map((result) =>
            <motion.div
              key={result.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-lg border ${getStatusColor(result.status)}`} data-id="dhykbf70b" data-path="src/components/ComplianceReport.tsx">

                <div className="flex items-start justify-between" data-id="bp4tnbv6v" data-path="src/components/ComplianceReport.tsx">
                  <div className="flex items-center space-x-3" data-id="3pye0uzs9" data-path="src/components/ComplianceReport.tsx">
                    {getStatusIcon(result.status)}
                    <div data-id="gw46xtpup" data-path="src/components/ComplianceReport.tsx">
                      <h4 className="font-medium" data-id="7wjqlpeue" data-path="src/components/ComplianceReport.tsx">{result.name}</h4>
                      <Badge className={`text-xs mt-1 ${getStatusColor(result.status)}`} data-id="dvrqcsq7z" data-path="src/components/ComplianceReport.tsx">
                        {result.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 space-y-2" data-id="pc09ak1az" data-path="src/components/ComplianceReport.tsx">
                  <p className="text-sm opacity-90" data-id="0g3mautpx" data-path="src/components/ComplianceReport.tsx">{result.description}</p>
                  
                  {result.reason && result.status === 'PASS' &&
                <div className="text-sm bg-green-500/10 p-2 rounded border border-green-500/20" data-id="80nen0c01" data-path="src/components/ComplianceReport.tsx">
                      <span className="font-medium text-green-400" data-id="93m2rzhsp" data-path="src/components/ComplianceReport.tsx">Why it passed: </span>
                      <span className="text-green-300" data-id="bo4mci7hu" data-path="src/components/ComplianceReport.tsx">{result.reason}</span>
                    </div>
                }
                  
                  {result.recommendation && (result.status === 'WARNING' || result.status === 'FAIL') &&
                <div className={`text-sm p-2 rounded border ${
                result.status === 'WARNING' ?
                'bg-yellow-500/10 border-yellow-500/20' :
                'bg-red-500/10 border-red-500/20'}`
                } data-id="oxqd626tq" data-path="src/components/ComplianceReport.tsx">
                      <span className={`font-medium ${
                  result.status === 'WARNING' ? 'text-yellow-400' : 'text-red-400'}`
                  } data-id="d076j3bm6" data-path="src/components/ComplianceReport.tsx">
                        Recommendation: 
                      </span>
                      <span className={`${
                  result.status === 'WARNING' ? 'text-yellow-300' : 'text-red-300'}`
                  } data-id="x0i42p6cs" data-path="src/components/ComplianceReport.tsx">
                        {result.recommendation}
                      </span>
                    </div>
                }
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>);

};

export default ComplianceReport;