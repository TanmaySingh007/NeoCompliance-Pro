
import { ComplianceResult, ComplianceGuideline } from '@/contexts/ComplianceContext';

export const analyzeCompliance = async (
file: File | string,
guideline: ComplianceGuideline)
: Promise<ComplianceResult[]> => {
  // Simulate AI analysis delay
  await new Promise((resolve) => setTimeout(resolve, 3000 + Math.random() * 2000));

  const fileName = typeof file === 'string' ? 'URL Content' : file.name;
  const fileType = typeof file === 'string' ? 'url' : file.type;

  console.log(`Analyzing ${fileName} against ${guideline.name} guidelines...`);

  switch (guideline.id) {
    case 'asci':
      return generateASCIResults(fileName, fileType);
    case 'wcag':
      return generateWCAGResults(fileName, fileType);
    case 'eaa2025':
      return generateEAAResults(fileName, fileType);
    case 'irdai':
      return generateIRDAIResults(fileName, fileType);
    case 'financial':
      return generateFinancialResults(fileName, fileType);
    default:
      return [];
  }
};

const generateASCIResults = (fileName: string, fileType: string): ComplianceResult[] => {
  const hasImage = fileType.includes('image') || fileName.toLowerCase().includes('.jpg') || fileName.toLowerCase().includes('.png');

  return [
  {
    id: 'truthful-honest',
    name: 'Truthful & Honest Representation',
    status: 'PASS',
    description: 'Advertisement content appears truthful and honest',
    reason: 'No misleading claims or exaggerated benefits detected in the content.'
  },
  {
    id: 'influencer-advertising',
    name: 'Influencer Advertising in Digital Media',
    status: hasImage ? 'WARNING' : 'PASS',
    description: hasImage ? 'Potential influencer content detected' : 'No influencer content detected',
    recommendation: hasImage ? 'Ensure proper disclosure of paid partnerships or sponsored content as per ASCI guidelines.' : undefined
  },
  {
    id: 'deceptive-patterns',
    name: 'Online Deceptive Design Patterns',
    status: 'PASS',
    description: 'No deceptive design patterns identified',
    reason: 'Content follows clear and transparent design principles without misleading elements.'
  },
  {
    id: 'vda-advertising',
    name: 'Virtual Digital Asset (VDA) Advertising',
    status: 'PASS',
    description: 'No cryptocurrency or VDA content detected',
    reason: 'Advertisement does not contain virtual digital asset promotions.'
  },
  {
    id: 'disclaimers',
    name: 'Disclaimers',
    status: 'WARNING',
    description: 'Disclaimer compliance needs verification',
    recommendation: 'Ensure all necessary disclaimers are clearly visible and comply with ASCI requirements for the product/service category.'
  },
  {
    id: 'harmful-products',
    name: 'Against Harmful Products or Messages',
    status: 'PASS',
    description: 'No harmful or prohibited content detected',
    reason: 'Content does not promote harmful products, substances, or discriminatory messages.'
  },
  {
    id: 'gender-stereotypes',
    name: 'Gender Stereotypes',
    status: 'PASS',
    description: 'No gender stereotyping detected',
    reason: 'Advertisement content avoids reinforcing harmful gender stereotypes.'
  },
  {
    id: 'charitable-cause',
    name: 'Charitable Cause Advertising',
    status: 'PASS',
    description: 'No charitable cause advertising detected',
    reason: 'Advertisement does not involve charitable cause promotions.'
  },
  {
    id: 'environmental-claims',
    name: 'Environmental/Green Claims',
    status: 'PASS',
    description: 'No environmental claims detected',
    reason: 'Advertisement does not make environmental or sustainability claims.'
  }];

};

const generateWCAGResults = (fileName: string, fileType: string): ComplianceResult[] => {
  const hasImage = fileType.includes('image');

  return [
  {
    id: 'color-contrast',
    name: 'Color Contrast',
    status: hasImage ? 'WARNING' : 'PASS',
    description: hasImage ? 'Color contrast needs verification' : 'No contrast issues detected',
    recommendation: hasImage ? 'Ensure minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text.' : undefined
  },
  {
    id: 'alt-text',
    name: 'Alternative Text',
    status: hasImage ? 'FAIL' : 'PASS',
    description: hasImage ? 'Missing alternative text for images' : 'No images requiring alt text',
    recommendation: hasImage ? 'Add descriptive alternative text for all informative images.' : undefined
  },
  {
    id: 'keyboard-navigation',
    name: 'Keyboard Navigation',
    status: 'PASS',
    description: 'Content structure supports keyboard navigation',
    reason: 'Content appears to follow logical structure for keyboard accessibility.'
  },
  {
    id: 'focus-indicators',
    name: 'Focus Indicators',
    status: 'PASS',
    description: 'Focus indicators present',
    reason: 'Interactive elements maintain visible focus indicators.'
  },
  {
    id: 'text-spacing',
    name: 'Text Spacing',
    status: 'PASS',
    description: 'Adequate text spacing maintained',
    reason: 'Text spacing allows for readability adjustments.'
  },
  {
    id: 'motion-animation',
    name: 'Motion & Animation',
    status: 'WARNING',
    description: 'Animation compliance needs verification',
    recommendation: 'Ensure animations can be paused, stopped, or hidden to prevent vestibular disorders.'
  }];

};

const generateEAAResults = (fileName: string, fileType: string): ComplianceResult[] => {
  return [
  {
    id: 'digital-accessibility',
    name: 'Digital Accessibility Requirements',
    status: 'WARNING',
    description: 'EAA compliance requires comprehensive review',
    recommendation: 'Ensure full compliance with EU Directive 2019/882 accessibility requirements.'
  },
  {
    id: 'assistive-technology',
    name: 'Assistive Technology Compatibility',
    status: 'PASS',
    description: 'Content structure compatible with assistive technologies',
    reason: 'Content follows semantic structure suitable for screen readers.'
  },
  {
    id: 'user-interface',
    name: 'User Interface Accessibility',
    status: 'WARNING',
    description: 'UI accessibility needs verification',
    recommendation: 'Verify all interactive elements meet EAA accessibility standards.'
  },
  {
    id: 'content-presentation',
    name: 'Content Presentation',
    status: 'PASS',
    description: 'Content presentation follows accessibility guidelines',
    reason: 'Text and media content structured for accessibility.'
  }];

};

const generateIRDAIResults = (fileName: string, fileType: string): ComplianceResult[] => {
  return [
  {
    id: 'insurance-disclosure',
    name: 'Insurance Product Disclosure',
    status: 'WARNING',
    description: 'Insurance disclosure requirements need verification',
    recommendation: 'Ensure all insurance products clearly display IRDAI registration numbers and necessary disclosures.'
  },
  {
    id: 'premium-illustration',
    name: 'Premium & Benefit Illustration',
    status: 'PASS',
    description: 'No misleading premium illustrations detected',
    reason: 'Content does not contain premium or benefit calculations.'
  },
  {
    id: 'risk-factors',
    name: 'Risk Factor Disclosure',
    status: 'WARNING',
    description: 'Risk factor disclosure needs verification',
    recommendation: 'Ensure adequate disclosure of risks associated with insurance products.'
  },
  {
    id: 'grievance-mechanism',
    name: 'Grievance Redressal Information',
    status: 'FAIL',
    description: 'Missing grievance redressal information',
    recommendation: 'Include IRDAI grievance redressal mechanism details as per regulations.'
  }];

};

const generateFinancialResults = (fileName: string, fileType: string): ComplianceResult[] => {
  return [
  {
    id: 'investment-disclosure',
    name: 'Investment Risk Disclosure',
    status: 'WARNING',
    description: 'Investment risk disclosure needs verification',
    recommendation: 'Ensure proper risk disclosure statements for all investment products.'
  },
  {
    id: 'regulatory-compliance',
    name: 'Regulatory Authority Compliance',
    status: 'PASS',
    description: 'Content follows general financial advertising guidelines',
    reason: 'No immediate regulatory violations detected.'
  },
  {
    id: 'performance-claims',
    name: 'Past Performance Claims',
    status: 'WARNING',
    description: 'Performance claims need verification',
    recommendation: 'Include standard disclaimer: "Past performance is not indicative of future results."'
  },
  {
    id: 'fee-disclosure',
    name: 'Fee & Charges Disclosure',
    status: 'FAIL',
    description: 'Missing fee and charges information',
    recommendation: 'Clearly disclose all applicable fees, charges, and costs associated with financial products.'
  },
  {
    id: 'target-audience',
    name: 'Target Audience Suitability',
    status: 'PASS',
    description: 'Content appropriate for general audience',
    reason: 'Advertisement content suitable for intended target audience.'
  }];

};