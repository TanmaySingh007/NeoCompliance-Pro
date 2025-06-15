export type GuidelineType =
'ASCI' |
'WCAG' |
'IRDAI' |
'Financial' |
'SEBI' |
'Pharma' |
'Food' |
'Telecom' |
'Automotive' |
'RealEstate' |
'AICompliance';

export type GuidelineCategory = GuidelineType;

export type ComplianceStatus = 'pass' | 'fail' | 'warning' | 'info';

export type ComplianceSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface GuidelineInfo {
  id: GuidelineType;
  name: string;
  description: string;
  applicableSectors: string[];
  keyRequirements: string[];
  icon: string;
  color: string;
}

export interface ComplianceRule {
  id: string;
  category: GuidelineCategory;
  guidelineType: GuidelineType;
  severity: ComplianceSeverity;
  message: string;
  suggestion: string;
  pattern?: RegExp;
  keywords?: string[];
  prohibited?: string[];
  required?: string[];
  symbol?: string;
  customCheck?: (content: string) => boolean;
}

export interface ComplianceResult {
  ruleId: string;
  category: GuidelineCategory;
  rule: string;
  status: ComplianceStatus;
  severity: ComplianceSeverity;
  message: string;
  suggestion: string;
  symbol?: string;
  matches?: string[];
  failureReason?: string;
  recommendation?: string;
}

export interface CategoryAnalysisResult {
  category: GuidelineType;
  categoryName: string;
  icon: string;
  color: string;
  overallStatus: 'compliant' | 'non-compliant' | 'partial';
  complianceScore: number;
  totalRules: number;
  passedRules: number;
  failedRules: number;
  warningRules: number;
  results: ComplianceResult[];
  recommendations: string[];
  criticalIssues: ComplianceResult[];
  priorityActions: string[];
  autoDetected?: boolean;
  detectionConfidence?: number;
}

export interface AnalysisSummary {
  totalRules: number;
  passedRules: number;
  failedRules: number;
  warningRules: number;
  complianceScore: number;
  primaryCategory: GuidelineType;
  categoryResults: CategoryAnalysisResult[];
  criticalIssues: ComplianceResult[];
  highPriorityIssues: ComplianceResult[];
  overallRecommendations: string[];
  categoryBreakdown: Record<GuidelineType, {
    total: number;
    passed: number;
    failed: number;
    warnings: number;
    complianceScore: number;
    autoDetected?: boolean;
    confidence?: number;
  }>;
  autoDetected?: boolean;
  detectedStandards?: GuidelineType[];
  detectionConfidence?: Record<GuidelineType, number>;
}

export interface DocumentClassification {
  primaryCategory: GuidelineType;
  confidence: number;
  alternativeCategories: {
    category: GuidelineType;
    confidence: number;
  }[];
  reasoning: string;
}

export interface DetectionResult {
  detectedStandards: GuidelineType[];
  confidence: Record<GuidelineType, number>;
  primaryCategory: GuidelineType;
}