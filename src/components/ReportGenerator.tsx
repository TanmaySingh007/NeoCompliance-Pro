import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Download, FileText, Share2, Mail, Loader2, Target, TrendingUp, Brain, Sparkles, Cpu, Scan } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ComplianceResult, AnalysisSummary } from '@/types/compliance';

// Declare global window interface for ezsite APIs
declare global {
  interface Window {
    ezsite: {
      apis: {
        sendEmail: (options: {
          from: string;
          to: string[];
          subject: string;
          text?: string;
          html?: string;
        }) => Promise<{error?: string;}>;
      };
    };
  }
}

interface ReportGeneratorProps {
  results: ComplianceResult[];
  documentName?: string;
  analysisText?: string;
  analysisSummary?: AnalysisSummary | null;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({
  results,
  documentName = 'Unnamed Document',
  analysisText = '',
  analysisSummary
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const [showShareForm, setShowShareForm] = useState(false);
  const { toast } = useToast();

  const generateReportData = () => {
    const totalChecks = results.length;
    const passedChecks = results.filter((r) => r.status === 'pass').length;
    const failedChecks = results.filter((r) => r.status === 'fail').length;
    const warningChecks = results.filter((r) => r.status === 'warning').length;
    const complianceScore = analysisSummary?.complianceScore || Math.round(passedChecks / totalChecks * 100);

    return {
      totalChecks,
      passedChecks,
      failedChecks,
      warningChecks,
      complianceScore,
      primaryCategory: analysisSummary?.primaryCategory || 'General',
      generatedAt: new Date().toLocaleString(),
      documentName,
      categoryResults: analysisSummary?.categoryResults || [],
      criticalIssues: analysisSummary?.criticalIssues || [],
      overallRecommendations: analysisSummary?.overallRecommendations || [],
      autoDetected: analysisSummary?.autoDetected || false,
      detectedStandards: analysisSummary?.detectedStandards || [],
      detectionConfidence: analysisSummary?.detectionConfidence || {}
    };
  };

  const downloadEnhancedPDFReport = async () => {
    setIsGenerating(true);
    try {
      const reportData = generateReportData();
      const pdf = new jsPDF();

      // Enhanced PDF with modern styling
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('🧠 AI-Powered Compliance Analysis Report', 20, 30);

      // Header section with enhanced styling
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`📄 Document: ${reportData.documentName}`, 20, 50);
      pdf.text(`🎯 Primary Category: ${reportData.primaryCategory}`, 20, 60);
      pdf.text(`🤖 Auto-Detected: ${reportData.autoDetected ? 'Yes' : 'No'}`, 20, 70);
      pdf.text(`📅 Generated: ${reportData.generatedAt}`, 20, 80);

      if (reportData.autoDetected && reportData.detectedStandards.length > 0) {
        pdf.text(`🔍 Detected Standards: ${reportData.detectedStandards.join(', ')}`, 20, 90);
      }

      // Executive Summary with visual elements
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('📊 Executive Summary', 20, 110);

      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`🎯 Overall Compliance Score: ${reportData.complianceScore}%`, 20, 125);

      // Add score interpretation
      const scoreInterpretation = reportData.complianceScore >= 80 ? '✅ Excellent' :
      reportData.complianceScore >= 60 ? '⚠️ Good' :
      '❌ Needs Improvement';
      pdf.text(`📈 Status: ${scoreInterpretation}`, 20, 135);

      pdf.setFontSize(12);
      pdf.text(`📋 Total Checks: ${reportData.totalChecks}`, 20, 150);
      pdf.text(`✅ Passed: ${reportData.passedChecks}`, 20, 160);
      pdf.text(`❌ Failed: ${reportData.failedChecks}`, 20, 170);
      pdf.text(`⚠️ Warnings: ${reportData.warningChecks}`, 20, 180);

      // Add AI Detection Info
      if (reportData.autoDetected) {
        pdf.addPage();
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('🧠 AI Detection Analysis', 20, 30);

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text('The AI system automatically detected the following compliance standards:', 20, 50);

        let yPos = 70;
        reportData.detectedStandards.forEach((standard, index) => {
          const confidence = reportData.detectionConfidence[standard] || 0;
          pdf.text(`${index + 1}. ${standard} (${Math.round(confidence)}% confidence)`, 30, yPos);
          yPos += 15;
        });
      }

      // Critical Issues section
      if (reportData.criticalIssues.length > 0) {
        pdf.addPage();
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('🚨 Critical Issues Requiring Immediate Attention', 20, 30);

        let yPos = 50;
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        reportData.criticalIssues.forEach((issue, index) => {
          if (yPos > 250) {
            pdf.addPage();
            yPos = 20;
          }
          pdf.text(`${index + 1}. ${issue.symbol || '⚠️'} ${issue.category}: ${issue.message}`, 20, yPos);
          if (issue.failureReason) {
            yPos += 10;
            pdf.text(`   Reason: ${issue.failureReason}`, 25, yPos);
          }
          if (issue.suggestion) {
            yPos += 10;
            pdf.text(`   💡 Solution: ${issue.suggestion.substring(0, 80)}...`, 25, yPos);
          }
          yPos += 20;
        });
      }

      // Enhanced Category Breakdown
      if (reportData.categoryResults.length > 0) {
        pdf.addPage();
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('📈 Detailed Category Analysis', 20, 30);

        let yPos = 50;
        pdf.setFontSize(12);
        reportData.categoryResults.forEach((category) => {
          if (yPos > 240) {
            pdf.addPage();
            yPos = 20;
          }

          pdf.setFont('helvetica', 'bold');
          pdf.text(`${category.icon} ${category.categoryName}`, 20, yPos);

          if (category.autoDetected) {
            pdf.setFont('helvetica', 'italic');
            pdf.text(`(Auto-detected with ${Math.round(category.detectionConfidence || 0)}% confidence)`, 25, yPos + 10);
            yPos += 10;
          }

          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(10);
          pdf.text(`📊 Score: ${category.complianceScore}%`, 30, yPos + 15);
          pdf.text(`📋 Status: ${category.overallStatus}`, 30, yPos + 25);
          pdf.text(`🔢 Rules: ${category.totalRules} total (${category.passedRules} passed, ${category.failedRules} failed)`, 30, yPos + 35);

          // Add top recommendations
          if (category.recommendations.length > 0) {
            pdf.text('💡 Key Recommendations:', 30, yPos + 50);
            category.recommendations.slice(0, 3).forEach((rec, idx) => {
              pdf.text(`  ${idx + 1}. ${rec.substring(0, 60)}${rec.length > 60 ? '...' : ''}`, 35, yPos + 60 + idx * 10);
            });
            yPos += 30 + category.recommendations.slice(0, 3).length * 10;
          }

          yPos += 60;
          pdf.setFontSize(12);
        });
      }

      // Enhanced Recommendations Section
      if (reportData.overallRecommendations.length > 0) {
        pdf.addPage();
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('💡 AI-Powered Recommendations', 20, 30);

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text('Our AI system recommends the following actions to improve compliance:', 20, 50);

        let yPos = 70;
        pdf.setFontSize(10);
        reportData.overallRecommendations.forEach((rec, index) => {
          if (yPos > 250) {
            pdf.addPage();
            yPos = 20;
          }
          pdf.text(`${index + 1}. ${rec}`, 20, yPos);
          yPos += 15;
        });
      }

      // Footer with enhanced branding
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'italic');
        pdf.text('Generated by Smart Compliance AI Engine - Advanced Regulatory Analysis', 20, 290);
        pdf.text(`Page ${i} of ${pageCount}`, 180, 290);
      }

      // Save with enhanced filename
      const timestamp = new Date().toISOString().slice(0, 10);
      pdf.save(`smart-compliance-report-${documentName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}-${timestamp}.pdf`);

      toast({
        title: "🚀 Enhanced Report Downloaded",
        description: "Your comprehensive AI-powered compliance report has been downloaded successfully with smart analysis insights."
      });

    } catch (error) {
      console.error('Error generating enhanced PDF:', error);
      toast({
        title: "Download Failed",
        description: "Failed to generate the enhanced PDF report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadJSONReport = () => {
    const reportData = {
      ...generateReportData(),
      results,
      analysisText,
      analysisSummary,
      metadata: {
        version: '2.0',
        aiPowered: true,
        autoDetected: analysisSummary?.autoDetected || false,
        exportedAt: new Date().toISOString()
      }
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const timestamp = new Date().toISOString().slice(0, 10);
    const exportFileDefaultName = `smart-compliance-data-${documentName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}-${timestamp}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    toast({
      title: "🔗 Data Export Complete",
      description: "Your smart compliance analysis data has been downloaded as JSON with full AI insights."
    });
  };

  const shareReport = async () => {
    if (!shareEmail.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter an email address to share the report.",
        variant: "destructive"
      });
      return;
    }

    setIsSharing(true);
    try {
      const reportData = generateReportData();

      const htmlContent = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 800px; margin: 0 auto; line-height: 1.6; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 20px; border-radius: 12px;">
          <div style="text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🧠 Smart Compliance Analysis Report</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">AI-Powered Regulatory Compliance Analysis</p>
          </div>
          
          <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1e293b; margin-top: 0; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">📄 Document Overview</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
              <p><strong>📄 Document:</strong> ${reportData.documentName}</p>
              <p><strong>🎯 Primary Category:</strong> ${reportData.primaryCategory}</p>
              <p><strong>🤖 AI Detection:</strong> ${reportData.autoDetected ? '✅ Auto-detected' : '❌ Manual'}</p>
              <p><strong>📅 Generated:</strong> ${reportData.generatedAt}</p>
            </div>
            ${reportData.autoDetected && reportData.detectedStandards.length > 0 ? `
              <div style="margin-top: 15px; padding: 15px; background: #f0f9ff; border-left: 4px solid #0ea5e9; border-radius: 8px;">
                <strong>🔍 AI-Detected Standards:</strong> ${reportData.detectedStandards.join(', ')}
              </div>
            ` : ''}
          </div>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 16px; margin: 30px 0; text-align: center; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);">
            <h2 style="margin-top: 0; font-size: 24px; display: flex; align-items: center; justify-content: center; gap: 10px;">
              <span>🎯</span> AI Compliance Analysis
            </h2>
            <div style="font-size: 48px; font-weight: bold; margin: 15px 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">${reportData.complianceScore}%</div>
            <div style="font-size: 18px; opacity: 0.9; margin-bottom: 20px;">
              ${reportData.complianceScore >= 80 ? '✅ Excellent Compliance' :
      reportData.complianceScore >= 60 ? '⚠️ Good Compliance' :
      '❌ Needs Improvement'}
            </div>
          </div>
          
          <div style="background: white; padding: 25px; border-radius: 12px; margin: 25px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1e293b; margin-top: 0; border-bottom: 2px solid #10b981; padding-bottom: 10px;">📊 Analysis Summary</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin-top: 20px;">
              <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); border-radius: 12px; border: 2px solid #10b981;">
                <div style="font-size: 24px; font-weight: bold; color: #059669; margin-bottom: 5px;">${reportData.passedChecks}</div>
                <div style="font-size: 14px; color: #047857; font-weight: 600;">✅ Passed</div>
              </div>
              <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border-radius: 12px; border: 2px solid #ef4444;">
                <div style="font-size: 24px; font-weight: bold; color: #dc2626; margin-bottom: 5px;">${reportData.failedChecks}</div>
                <div style="font-size: 14px; color: #b91c1c; font-weight: 600;">❌ Failed</div>
              </div>
              <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; border: 2px solid #f59e0b;">
                <div style="font-size: 24px; font-weight: bold; color: #d97706; margin-bottom: 5px;">${reportData.warningChecks}</div>
                <div style="font-size: 14px; color: #b45309; font-weight: 600;">⚠️ Warnings</div>
              </div>
              <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; border: 2px solid #3b82f6;">
                <div style="font-size: 24px; font-weight: bold; color: #2563eb; margin-bottom: 5px;">${reportData.totalChecks}</div>
                <div style="font-size: 14px; color: #1d4ed8; font-weight: 600;">📋 Total</div>
              </div>
            </div>
          </div>

          ${reportData.criticalIssues.length > 0 ? `
            <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 2px solid #fecaca; padding: 25px; border-radius: 12px; margin: 25px 0;">
              <h2 style="margin-top: 0; color: #dc2626; display: flex; align-items: center; gap: 10px;">
                <span>🚨</span> Critical Issues Requiring Immediate Attention (${reportData.criticalIssues.length})
              </h2>
              <ul style="margin: 15px 0; padding-left: 20px;">
                ${reportData.criticalIssues.map((issue) => `
                  <li style="margin-bottom: 12px; padding: 10px; background: white; border-radius: 8px; border-left: 4px solid #dc2626;">
                    <strong>${issue.symbol || '⚠️'} ${issue.category}:</strong> ${issue.message}
                    ${issue.suggestion ? `<br><span style="color: #059669; font-size: 14px;"><strong>💡 Solution:</strong> ${issue.suggestion}</span>` : ''}
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}

          ${reportData.categoryResults.length > 0 ? `
            <div style="background: white; padding: 25px; border-radius: 12px; margin: 25px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #1e293b; margin-top: 0; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">🎯 Smart Category Analysis</h2>
              <div style="margin-top: 20px;">
                ${reportData.categoryResults.map((cat) => `
                  <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 20px; margin: 15px 0; border-radius: 12px; border: 1px solid #e2e8f0;">
                    <h3 style="margin: 0 0 15px 0; color: #374151; display: flex; align-items: center; gap: 10px;">
                      <span style="font-size: 24px;">${cat.icon}</span>
                      ${cat.categoryName}
                      ${cat.autoDetected ? '<span style="background: #0ea5e9; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px; margin-left: 10px;">🤖 AI-Detected</span>' : ''}
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px;">
                      <div style="text-align: center; padding: 10px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
                        <div style="font-weight: bold; color: #059669;">${cat.complianceScore}%</div>
                        <div style="font-size: 12px; color: #64748b;">Score</div>
                      </div>
                      <div style="text-align: center; padding: 10px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
                        <div style="font-weight: bold; color: #2563eb;">${cat.overallStatus}</div>
                        <div style="font-size: 12px; color: #64748b;">Status</div>
                      </div>
                      <div style="text-align: center; padding: 10px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
                        <div style="font-weight: bold; color: #7c3aed;">${cat.totalRules}</div>
                        <div style="font-size: 12px; color: #64748b;">Rules</div>
                      </div>
                    </div>
                    ${cat.recommendations.length > 0 ? `
                      <div style="margin-top: 15px; padding: 15px; background: #eff6ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
                        <strong style="color: #1e40af;">💡 AI Recommendations:</strong>
                        <ul style="margin: 10px 0; padding-left: 20px;">
                          ${cat.recommendations.slice(0, 3).map((rec) => `<li style="margin-bottom: 5px; color: #374151;">${rec}</li>`).join('')}
                        </ul>
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          ${shareMessage ? `
            <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #bfdbfe; padding: 20px; border-radius: 12px; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #1e40af; display: flex; align-items: center; gap: 10px;">
                <span>💬</span> Personal Message
              </h3>
              <p style="margin: 10px 0; color: #374151; font-style: italic;">${shareMessage}</p>
            </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 40px; padding-top: 25px; border-top: 2px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">
              🧠 This report was generated by the <strong>Smart Compliance AI Engine</strong><br>
              Advanced regulatory analysis with intelligent detection and recommendations<br>
              <em>Powered by artificial intelligence for comprehensive compliance insights</em>
            </p>
          </div>
        </div>
      `;

      try {
        const { error } = await window.ezsite.apis.sendEmail({
          from: 'Smart Compliance AI <noreply@compliance.ai>',
          to: [shareEmail],
          subject: `🧠 AI Compliance Report - ${documentName} (${reportData.complianceScore}% Score) - ${reportData.autoDetected ? 'Auto-Detected' : 'Manual Analysis'}`,
          html: htmlContent,
          text: `Smart Compliance AI Analysis Report for ${documentName}\n\nPrimary Category: ${reportData.primaryCategory}\nCompliance Score: ${reportData.complianceScore}%\nAI Detection: ${reportData.autoDetected ? 'Auto-detected standards' : 'Manual analysis'}\n\nTotal Checks: ${reportData.totalChecks}\nPassed: ${reportData.passedChecks}\nFailed: ${reportData.failedChecks}\nWarnings: ${reportData.warningChecks}\n\n${reportData.autoDetected && reportData.detectedStandards.length > 0 ? `Detected Standards: ${reportData.detectedStandards.join(', ')}\n\n` : ''}${shareMessage ? `Message: ${shareMessage}\n\n` : ''}Generated: ${reportData.generatedAt}\n\nPowered by Smart Compliance AI Engine`
        });

        if (error) throw error;

        toast({
          title: "🚀 AI Report Shared",
          description: `Smart compliance analysis has been sent to ${shareEmail} with full AI insights`
        });

        // Reset form
        setShareEmail('');
        setShareMessage('');
        setShowShareForm(false);
      } catch (apiError) {
        console.error('Email API error:', apiError);
        toast({
          title: "Email Service Unavailable",
          description: "Email functionality is not available in this environment. Report can still be downloaded.",
          variant: "destructive"
        });
      }

    } catch (error) {
      console.error('Error sharing enhanced report:', error);
      toast({
        title: "Sharing Failed",
        description: "Failed to send the AI-powered report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSharing(false);
    }
  };

  const reportData = generateReportData();

  return (
    <Card className="backdrop-blur-sm bg-slate-900/80 border-emerald-500/30 shadow-xl" data-id="10kn8hlo8" data-path="src/components/ReportGenerator.tsx">
      <CardHeader className="bg-gradient-to-r from-emerald-900/20 to-teal-900/20" data-id="hvqhg3e3k" data-path="src/components/ReportGenerator.tsx">
        <CardTitle className="flex items-center gap-2 text-xl text-gray-100" data-id="gg9xctuqt" data-path="src/components/ReportGenerator.tsx">
          <Brain className="h-5 w-5 text-emerald-400" data-id="nmtgskewt" data-path="src/components/ReportGenerator.tsx" />
          Smart Compliance Report
          {reportData.autoDetected &&
          <Badge variant="outline" className="bg-cyan-900/30 border-cyan-500/30 text-cyan-300 ml-2" data-id="7kxb4hj9c" data-path="src/components/ReportGenerator.tsx">
              <Cpu className="h-3 w-3 mr-1" data-id="eh731ldvq" data-path="src/components/ReportGenerator.tsx" />
              AI-Powered
            </Badge>
          }
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6" data-id="1j069svcp" data-path="src/components/ReportGenerator.tsx">
        {/* Enhanced Report Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4" data-id="66glfm24p" data-path="src/components/ReportGenerator.tsx">
          <div className="col-span-2 md:col-span-1 text-center p-4 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-lg border border-purple-500/30" data-id="6li1koo72" data-path="src/components/ReportGenerator.tsx">
            <div className="text-3xl font-bold text-purple-300" data-id="a21o9kbyc" data-path="src/components/ReportGenerator.tsx">{reportData.complianceScore}%</div>
            <div className="text-sm text-purple-200" data-id="99d6blqoj" data-path="src/components/ReportGenerator.tsx">AI Score</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-emerald-900/40 to-green-900/40 rounded-lg border border-emerald-500/30" data-id="ajatp03i9" data-path="src/components/ReportGenerator.tsx">
            <div className="text-2xl font-bold text-emerald-300" data-id="5a9icmu1j" data-path="src/components/ReportGenerator.tsx">{reportData.passedChecks}</div>
            <div className="text-sm text-emerald-200" data-id="zo2fo81zv" data-path="src/components/ReportGenerator.tsx">Passed</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-red-900/40 to-rose-900/40 rounded-lg border border-red-500/30" data-id="j5xmrc2wi" data-path="src/components/ReportGenerator.tsx">
            <div className="text-2xl font-bold text-red-300" data-id="anbs634lp" data-path="src/components/ReportGenerator.tsx">{reportData.failedChecks}</div>
            <div className="text-sm text-red-200" data-id="20tg00rxz" data-path="src/components/ReportGenerator.tsx">Failed</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-amber-900/40 to-yellow-900/40 rounded-lg border border-amber-500/30" data-id="uv3w9g19l" data-path="src/components/ReportGenerator.tsx">
            <div className="text-2xl font-bold text-amber-300" data-id="kdzaqg8dv" data-path="src/components/ReportGenerator.tsx">{reportData.warningChecks}</div>
            <div className="text-sm text-amber-200" data-id="u297acia6" data-path="src/components/ReportGenerator.tsx">Warnings</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 rounded-lg border border-cyan-500/30" data-id="x03ptkkxj" data-path="src/components/ReportGenerator.tsx">
            <div className="text-2xl font-bold text-cyan-300" data-id="rh8ueldh4" data-path="src/components/ReportGenerator.tsx">{reportData.totalChecks}</div>
            <div className="text-sm text-cyan-200" data-id="ixyr6o4sh" data-path="src/components/ReportGenerator.tsx">Total</div>
          </div>
        </div>

        {/* AI Detection Info */}
        <div className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-slate-800/50 to-indigo-900/50 rounded-lg border border-purple-500/20" data-id="5vv8kse52" data-path="src/components/ReportGenerator.tsx">
          <Scan className="h-5 w-5 text-cyan-400" data-id="ekf1ihfra" data-path="src/components/ReportGenerator.tsx" />
          <span className="text-gray-300" data-id="bbv1lw3k3" data-path="src/components/ReportGenerator.tsx">Analysis Method:</span>
          <Badge variant="outline" className="bg-slate-800/50 border-purple-500/30 text-purple-300" data-id="byl8ok7qd" data-path="src/components/ReportGenerator.tsx">
            {reportData.autoDetected ? '🤖 AI Auto-Detection' : '👤 Manual Selection'}
          </Badge>
          {reportData.autoDetected &&
          <Badge variant="outline" className="bg-emerald-800/50 border-emerald-500/30 text-emerald-300" data-id="pdmf7gupr" data-path="src/components/ReportGenerator.tsx">
              {reportData.detectedStandards.length} Standards Detected
            </Badge>
          }
        </div>

        <Separator className="border-purple-500/30" data-id="otg7g0gjv" data-path="src/components/ReportGenerator.tsx" />

        {/* Download Options */}
        <div className="space-y-4" data-id="jc0hw66xh" data-path="src/components/ReportGenerator.tsx">
          <h4 className="font-semibold text-gray-200 flex items-center gap-2" data-id="05ri2hnhn" data-path="src/components/ReportGenerator.tsx">
            <Download className="h-4 w-4 text-emerald-400" data-id="oxtk0jewi" data-path="src/components/ReportGenerator.tsx" />
            Download AI-Enhanced Report
          </h4>
          <div className="flex flex-col sm:flex-row gap-3" data-id="6net2tzyd" data-path="src/components/ReportGenerator.tsx">
            <Button
              onClick={downloadEnhancedPDFReport}
              disabled={isGenerating}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700" data-id="2l5oa40k8" data-path="src/components/ReportGenerator.tsx">
              {isGenerating ?
              <Loader2 className="h-4 w-4 mr-2 animate-spin" data-id="aoue0xqph" data-path="src/components/ReportGenerator.tsx" /> :
              <Brain className="h-4 w-4 mr-2" data-id="jbwredqat" data-path="src/components/ReportGenerator.tsx" />
              }
              Download Smart PDF Report
            </Button>
            <Button
              onClick={downloadJSONReport}
              variant="outline"
              className="flex-1 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/20" data-id="0853nkml6" data-path="src/components/ReportGenerator.tsx">
              <Download className="h-4 w-4 mr-2" data-id="ajs0oosbw" data-path="src/components/ReportGenerator.tsx" />
              Download AI Data (JSON)
            </Button>
          </div>
        </div>

        <Separator className="border-purple-500/30" data-id="7qkp3kaxp" data-path="src/components/ReportGenerator.tsx" />

        {/* Share Options */}
        <div className="space-y-4" data-id="u0j5rz14y" data-path="src/components/ReportGenerator.tsx">
          <div className="flex items-center justify-between" data-id="hcaf9essr" data-path="src/components/ReportGenerator.tsx">
            <h4 className="font-semibold text-gray-200 flex items-center gap-2" data-id="5pdsipcm0" data-path="src/components/ReportGenerator.tsx">
              <Share2 className="h-4 w-4 text-cyan-400" data-id="d7edikeai" data-path="src/components/ReportGenerator.tsx" />
              Share Smart Analysis
            </h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowShareForm(!showShareForm)}
              className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/20" data-id="yk2lsoaod" data-path="src/components/ReportGenerator.tsx">
              <Share2 className="h-4 w-4 mr-2" data-id="1ip42vqc7" data-path="src/components/ReportGenerator.tsx" />
              Share AI Report
            </Button>
          </div>

          {showShareForm &&
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 p-4 border border-purple-500/30 rounded-lg bg-slate-800/50" data-id="l0xqpxhre" data-path="src/components/ReportGenerator.tsx">
              <div className="space-y-2" data-id="ooqgbrtj7" data-path="src/components/ReportGenerator.tsx">
                <Label htmlFor="shareEmail" className="text-gray-200" data-id="fy19cbfph" data-path="src/components/ReportGenerator.tsx">Recipient Email</Label>
                <Input
                id="shareEmail"
                type="email"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                placeholder="Enter email address"
                className="bg-slate-800/50 border-purple-500/30 text-gray-200" data-id="hjkb12lgb" data-path="src/components/ReportGenerator.tsx" />
              </div>
              
              <div className="space-y-2" data-id="ozs0wfygp" data-path="src/components/ReportGenerator.tsx">
                <Label htmlFor="shareMessage" className="text-gray-200" data-id="gcvfim8vf" data-path="src/components/ReportGenerator.tsx">Message (Optional)</Label>
                <Textarea
                id="shareMessage"
                value={shareMessage}
                onChange={(e) => setShareMessage(e.target.value)}
                placeholder="Add a personal message..."
                rows={3}
                className="bg-slate-800/50 border-purple-500/30 text-gray-200" data-id="ilvmtyf28" data-path="src/components/ReportGenerator.tsx" />
              </div>
              
              <div className="flex gap-2" data-id="xcp5bg2hv" data-path="src/components/ReportGenerator.tsx">
                <Button
                onClick={shareReport}
                disabled={isSharing || !shareEmail.trim()}
                className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700" data-id="2oxnsdlb2" data-path="src/components/ReportGenerator.tsx">
                  {isSharing ?
                <Loader2 className="h-4 w-4 mr-2 animate-spin" data-id="kxpn07tvr" data-path="src/components/ReportGenerator.tsx" /> :
                <Mail className="h-4 w-4 mr-2" data-id="3l8f10sau" data-path="src/components/ReportGenerator.tsx" />
                }
                  Send AI Report
                </Button>
                <Button
                variant="outline"
                onClick={() => setShowShareForm(false)}
                className="border-gray-500/30 text-gray-300" data-id="3nl6gnd88" data-path="src/components/ReportGenerator.tsx">
                  Cancel
                </Button>
              </div>
            </motion.div>
          }
        </div>

        {/* Enhanced Report Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300 bg-slate-800/30 p-4 rounded-lg border border-gray-500/20" data-id="yyecmqenb" data-path="src/components/ReportGenerator.tsx">
          <div className="space-y-1" data-id="7v7my372n" data-path="src/components/ReportGenerator.tsx">
            <p data-id="6h0ol45e7" data-path="src/components/ReportGenerator.tsx"><strong className="text-gray-200" data-id="5ogu44za9" data-path="src/components/ReportGenerator.tsx">Document:</strong> {reportData.documentName}</p>
            <p data-id="2crwxpok1" data-path="src/components/ReportGenerator.tsx"><strong className="text-gray-200" data-id="6d84hdegj" data-path="src/components/ReportGenerator.tsx">Primary Category:</strong> {reportData.primaryCategory}</p>
            <p data-id="cf65iscsn" data-path="src/components/ReportGenerator.tsx"><strong className="text-gray-200" data-id="92yvdq0k4" data-path="src/components/ReportGenerator.tsx">Analysis Type:</strong> {reportData.autoDetected ? '🤖 AI Auto-Detection' : '👤 Manual'}</p>
          </div>
          <div className="space-y-1" data-id="nvkz7qd8f" data-path="src/components/ReportGenerator.tsx">
            <p data-id="ygwca0v3q" data-path="src/components/ReportGenerator.tsx"><strong className="text-gray-200" data-id="asmror8fi" data-path="src/components/ReportGenerator.tsx">Total Checks:</strong> {reportData.totalChecks}</p>
            <p data-id="6a2gd7qbf" data-path="src/components/ReportGenerator.tsx"><strong className="text-gray-200" data-id="8tjhu0bw5" data-path="src/components/ReportGenerator.tsx">Categories Analyzed:</strong> {reportData.categoryResults.length}</p>
            <p data-id="0likv95ic" data-path="src/components/ReportGenerator.tsx"><strong className="text-gray-200" data-id="mn8eddh8o" data-path="src/components/ReportGenerator.tsx">Generated:</strong> {reportData.generatedAt}</p>
          </div>
        </div>
      </CardContent>
    </Card>);

};

export default ReportGenerator;