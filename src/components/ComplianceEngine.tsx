import {
  ComplianceRule,
  ComplianceResult,
  ComplianceStatus,
  AnalysisSummary,
  CategoryAnalysisResult,
  GuidelineType,
  DocumentClassification } from
'@/types/compliance';
import { getGuidelineInfo, classifyContent, getGuidelinesByType } from '@/data/guidelines';

export class ComplianceEngine {
  private rules: ComplianceRule[];

  constructor(rules?: ComplianceRule[]) {
    // If no rules provided, start with empty array - will be populated by auto-detection
    this.rules = rules || [];
  }

  // Enhanced content analysis and auto-detection
  public autoDetectAndAnalyze(content: string): {
    detectedStandards: GuidelineType[];
    confidence: Record<GuidelineType, number>;
    primaryCategory: GuidelineType;
  } {
    const categoryKeywords: Record<GuidelineType, {keywords: string[];weight: number;}> = {
      'ASCI': {
        keywords: ['advertisement', 'marketing', 'promotion', 'claim', 'offer', 'best', 'guaranteed', 'superior', 'leading', 'award-winning'],
        weight: 1.0
      },
      'WCAG': {
        keywords: ['website', 'digital', 'accessibility', 'web', 'online', 'mobile app', 'responsive', 'screen reader', 'alt text', 'contrast'],
        weight: 1.2
      },
      'IRDAI': {
        keywords: ['insurance', 'policy', 'coverage', 'premium', 'life insurance', 'health insurance', 'claim', 'benefit', 'assured', 'protection'],
        weight: 1.5
      },
      'Financial': {
        keywords: ['loan', 'credit', 'banking', 'finance', 'interest', 'investment', 'apr', 'EMI', 'mortgage', 'financial'],
        weight: 1.3
      },
      'SEBI': {
        keywords: ['mutual fund', 'securities', 'trading', 'stock', 'portfolio', 'CAGR', 'returns', 'investment', 'SIP', 'NAV'],
        weight: 1.4
      },
      'Pharma': {
        keywords: ['medicine', 'drug', 'pharmaceutical', 'treatment', 'therapy', 'clinical', 'therapeutic', 'medical', 'health', 'cure'],
        weight: 1.4
      },
      'Food': {
        keywords: ['food', 'nutrition', 'supplement', 'dietary', 'beverage', 'FSSAI', 'healthy', 'vitamin', 'organic', 'natural'],
        weight: 1.2
      },
      'Telecom': {
        keywords: ['mobile', 'telecom', 'network', 'data', 'internet', 'mbps', 'plan', 'recharge', 'unlimited', 'coverage'],
        weight: 1.3
      },
      'Automotive': {
        keywords: ['car', 'vehicle', 'automobile', 'bike', 'mileage', 'fuel', 'ARAI', 'safety', 'performance', 'engine'],
        weight: 1.2
      },
      'RealEstate': {
        keywords: ['property', 'real estate', 'apartment', 'house', 'construction', 'RERA', 'possession', 'project', 'development', 'builder'],
        weight: 1.3
      },
      'AICompliance': {
        keywords: ['AI', 'artificial intelligence', 'machine learning', 'algorithm', 'automated', 'neural', 'deep learning', 'chatbot', 'AI-generated', 'AI-powered', 'smart', 'intelligent', 'recommendation engine', 'personalized', 'data analytics', 'predictive'],
        weight: 1.6
      }
    };

    const lowerContent = content.toLowerCase();
    const totalWords = content.split(/\s+/).length;
    const confidence: Record<GuidelineType, number> = {} as Record<GuidelineType, number>;

    // Calculate confidence scores for each category
    Object.entries(categoryKeywords).forEach(([category, { keywords, weight }]) => {
      let categoryScore = 0;
      keywords.forEach((keyword) => {
        const matches = (lowerContent.match(new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'gi')) || []).length;
        categoryScore += matches * weight;
      });

      // Normalize by content length and apply additional heuristics
      const normalizedScore = categoryScore / Math.max(totalWords / 100, 1) * 100;
      confidence[category as GuidelineType] = Math.min(normalizedScore, 100);
    });

    // Sort categories by confidence
    const sortedCategories = Object.entries(confidence).
    map(([category, score]) => ({ category: category as GuidelineType, score })).
    sort((a, b) => b.score - a.score).
    filter((item) => item.score > 5); // Only include categories with meaningful confidence

    // Determine detected standards (top categories with reasonable confidence)
    const detectedStandards = sortedCategories.
    filter((item) => item.score > 15) // Minimum confidence threshold
    .map((item) => item.category);

    // If no specific standards detected with high confidence, include ASCI as default
    if (detectedStandards.length === 0) {
      detectedStandards.push('ASCI');
      confidence['ASCI'] = Math.max(confidence['ASCI'] || 0, 25);
    }

    const primaryCategory = sortedCategories[0]?.category || 'ASCI';

    console.log('🧠 Auto-Detection Results:', {
      content: content.substring(0, 100) + '...',
      confidence,
      detectedStandards,
      primaryCategory
    });

    return {
      detectedStandards,
      confidence,
      primaryCategory
    };
  }

  // Classify document into single primary category with enhanced logic
  public classifyDocument(content: string): DocumentClassification {
    const detection = this.autoDetectAndAnalyze(content);

    const alternatives = Object.entries(detection.confidence).
    map(([category, confidence]) => ({ category: category as GuidelineType, confidence })).
    filter((item) => item.category !== detection.primaryCategory && item.confidence > 10).
    sort((a, b) => b.confidence - a.confidence).
    slice(0, 3);

    return {
      primaryCategory: detection.primaryCategory,
      confidence: detection.confidence[detection.primaryCategory] || 0,
      alternativeCategories: alternatives,
      reasoning: this.generateClassificationReasoning(content, detection.primaryCategory, detection.confidence[detection.primaryCategory] || 0)
    };
  }

  private generateClassificationReasoning(content: string, category: GuidelineType, confidence: number): string {
    const reasons: Record<GuidelineType, string> = {
      'ASCI': 'Contains general advertising content with marketing claims',
      'WCAG': 'Contains digital/web accessibility related content',
      'IRDAI': 'Contains insurance-related terms and policy information',
      'Financial': 'Contains financial services, banking, or loan-related content',
      'SEBI': 'Contains investment, mutual fund, or securities-related content',
      'Pharma': 'Contains pharmaceutical, medical, or healthcare-related content',
      'Food': 'Contains food, nutrition, or dietary supplement-related content',
      'Telecom': 'Contains telecommunications or mobile service-related content',
      'Automotive': 'Contains automotive, vehicle, or transportation-related content',
      'RealEstate': 'Contains real estate, property, or construction-related content',
      'AICompliance': 'Contains AI, machine learning, or automated system-related content'
    };

    return `${reasons[category]} (Confidence: ${Math.round(confidence)}%)`;
  }

  // Enhanced auto-analysis method
  public async autoAnalyze(content: string): Promise<ComplianceResult[]> {
    // Auto-detect relevant standards
    const detection = this.autoDetectAndAnalyze(content);

    // Get rules for detected standards
    const relevantRules = getGuidelinesByType(detection.detectedStandards);
    this.rules = relevantRules;

    console.log('🎯 Auto-analyzing with standards:', detection.detectedStandards);

    const results: ComplianceResult[] = [];
    for (const rule of this.rules) {
      const result = await this.checkRule(content, rule);
      if (result) {
        results.push(result);
      }
    }

    return results;
  }

  // Enhanced category-based analysis with auto-detection
  public async autoAnalyzeByCategory(content: string): Promise<AnalysisSummary> {
    const classification = this.classifyDocument(content);
    const detection = this.autoDetectAndAnalyze(content);

    // Use detected standards for analysis
    const allResults = await this.autoAnalyze(content);

    // Group results by category
    const categoryGroups: Record<GuidelineType, ComplianceResult[]> = {
      'ASCI': [], 'WCAG': [], 'IRDAI': [], 'Financial': [], 'SEBI': [],
      'Pharma': [], 'Food': [], 'Telecom': [], 'Automotive': [], 'RealEstate': [], 'AICompliance': []
    };

    allResults.forEach((result) => {
      categoryGroups[result.category as GuidelineType].push(result);
    });

    // Create category analysis results only for detected categories
    const categoryResults: CategoryAnalysisResult[] = [];
    const categoryBreakdown: Record<GuidelineType, any> = {} as any;

    detection.detectedStandards.forEach((category) => {
      const results = categoryGroups[category];
      if (results.length > 0) {
        const guidelineInfo = getGuidelineInfo(category);
        const passed = results.filter((r) => r.status === 'pass').length;
        const failed = results.filter((r) => r.status === 'fail').length;
        const warnings = results.filter((r) => r.status === 'warning').length;
        const complianceScore = results.length > 0 ? Math.round(passed / results.length * 100) : 100;

        const categoryResult: CategoryAnalysisResult = {
          category,
          categoryName: guidelineInfo?.name || category,
          icon: guidelineInfo?.icon || '📋',
          color: guidelineInfo?.color || 'from-gray-400 to-gray-600',
          overallStatus: failed > 0 ? 'non-compliant' : warnings > 0 ? 'partial' : 'compliant',
          complianceScore,
          totalRules: results.length,
          passedRules: passed,
          failedRules: failed,
          warningRules: warnings,
          results,
          recommendations: this.generateCategoryRecommendations(category, results),
          criticalIssues: results.filter((r) => r.severity === 'critical' && r.status === 'fail'),
          priorityActions: this.generatePriorityActions(category, results),
          autoDetected: true,
          detectionConfidence: detection.confidence[category] || 0
        };

        categoryResults.push(categoryResult);

        categoryBreakdown[category] = {
          total: results.length,
          passed,
          failed,
          warnings,
          complianceScore,
          autoDetected: true,
          confidence: detection.confidence[category] || 0
        };
      }
    });

    // Sort categories by relevance and confidence
    categoryResults.sort((a, b) => {
      if (a.category === classification.primaryCategory) return -1;
      if (b.category === classification.primaryCategory) return 1;
      return (b.detectionConfidence || 0) - (a.detectionConfidence || 0);
    });

    const totalRules = allResults.length;
    const passedRules = allResults.filter((r) => r.status === 'pass').length;
    const failedRules = allResults.filter((r) => r.status === 'fail').length;
    const warningRules = allResults.filter((r) => r.status === 'warning').length;
    const overallComplianceScore = totalRules > 0 ? Math.round(passedRules / totalRules * 100) : 100;

    return {
      totalRules,
      passedRules,
      failedRules,
      warningRules,
      complianceScore: overallComplianceScore,
      primaryCategory: classification.primaryCategory,
      categoryResults,
      criticalIssues: allResults.filter((r) => r.severity === 'critical' && r.status === 'fail'),
      highPriorityIssues: allResults.filter((r) => r.severity === 'high' && r.status === 'fail'),
      overallRecommendations: this.generateOverallRecommendations(allResults),
      categoryBreakdown,
      autoDetected: true,
      detectedStandards: detection.detectedStandards,
      detectionConfidence: detection.confidence
    };
  }

  private async checkRule(content: string, rule: ComplianceRule): Promise<ComplianceResult | null> {
    let status: ComplianceStatus = 'pass';
    let matches: string[] = [];
    let failureReason = '';
    let recommendation = rule.suggestion;

    // Pattern-based checking
    if (rule.pattern) {
      const patternMatches = content.match(rule.pattern);
      if (patternMatches) {
        matches = patternMatches;
        status = 'fail';
        failureReason = `Found prohibited patterns: ${matches.join(', ')}`;
      }
    }

    // Keyword-based checking
    if (rule.keywords) {
      const foundKeywords = rule.keywords.filter((keyword) =>
      content.toLowerCase().includes(keyword.toLowerCase())
      );
      if (foundKeywords.length > 0) {
        matches.push(...foundKeywords);
        if (status !== 'fail') {
          status = 'warning';
          failureReason = `Found keywords requiring attention: ${foundKeywords.join(', ')}`;
        }
      }
    }

    // Prohibited terms checking
    if (rule.prohibited) {
      const foundProhibited = rule.prohibited.filter((term) =>
      content.toLowerCase().includes(term.toLowerCase())
      );
      if (foundProhibited.length > 0) {
        matches.push(...foundProhibited);
        status = 'fail';
        failureReason = `Found prohibited terms: ${foundProhibited.join(', ')}`;
      }
    }

    // Required terms checking
    if (rule.required) {
      const missingRequired = rule.required.filter((term) =>
      !content.toLowerCase().includes(term.toLowerCase())
      );
      if (missingRequired.length > 0) {
        status = 'fail';
        failureReason = `Missing required terms: ${missingRequired.join(', ')}`;
        recommendation = `${rule.suggestion} Missing: ${missingRequired.join(', ')}`;
      }
    }

    // Custom checking
    if (rule.customCheck) {
      try {
        const customResult = rule.customCheck(content);
        if (customResult) {
          status = 'fail';
          if (!failureReason) {
            failureReason = 'Failed custom compliance check';
          }
        }
      } catch (error) {
        console.error('Custom check error:', error);
      }
    }

    // Only return results that have findings
    if (status === 'pass' && matches.length === 0 && !rule.required?.some((term) =>
    content.toLowerCase().includes(term.toLowerCase())
    )) {
      return null;
    }

    return {
      ruleId: rule.id,
      category: rule.category,
      rule: rule.message,
      status,
      severity: rule.severity,
      message: rule.message,
      suggestion: recommendation,
      symbol: rule.symbol,
      matches: matches.length > 0 ? matches : undefined,
      failureReason,
      recommendation
    };
  }

  private generateCategoryRecommendations(category: GuidelineType, results: ComplianceResult[]): string[] {
    const failedResults = results.filter((r) => r.status === 'fail');
    const recommendations: string[] = [];

    const categoryAdvice: Record<GuidelineType, string[]> = {
      'ASCI': [
      'Ensure all claims are substantiated with evidence',
      'Add proper disclaimers for offers and conditions',
      'Avoid superlative claims without proof',
      'Use factual comparisons only',
      'Include source references for claims'],

      'WCAG': [
      'Add alternative text for all images',
      'Ensure sufficient color contrast (4.5:1 minimum)',
      'Make content keyboard accessible',
      'Test with screen readers',
      'Implement responsive design'],

      'IRDAI': [
      'Include mandatory IRDAI disclosure statement',
      'Prominently display risk factors',
      'Avoid misleading benefit claims',
      'Clarify policy terms and conditions',
      'Show transparent premium calculations'],

      'Financial': [
      'Display interest rates with APR clearly',
      'Include investment risk warnings',
      'Mention cooling-off period information',
      'Show transparent fee structure',
      'Add regulatory compliance statements'],

      'SEBI': [
      'Present performance as CAGR for specified periods',
      'Remove celebrity endorsements',
      'Include mandatory risk disclosure',
      'Add past performance disclaimers',
      'Avoid guarantee language'],

      'Pharma': [
      'Provide clinical evidence for therapeutic claims',
      'Include side effects and contraindications',
      'Add professional consultation advice',
      'Show dosage and administration warnings',
      'Include regulatory approval references'],

      'Food': [
      'Substantiate nutritional claims',
      'Include allergen warnings',
      'Avoid false health benefit claims',
      'Add FSSAI approval references',
      'Show clear ingredient disclosure'],

      'Telecom': [
      'Display transparent pricing with all charges',
      'Include service availability disclaimers',
      'Mention fair usage policy',
      'Show realistic speed claims',
      'Add network coverage information'],

      'Automotive': [
      'Provide ARAI certified mileage figures',
      'Include official safety ratings',
      'Show pricing with tax breakdown',
      'Specify feature availability by variant',
      'Add performance claim substantiation'],

      'RealEstate': [
      'Display RERA registration number',
      'Mention all necessary approvals',
      'Provide realistic delivery timelines',
      'Show amenities availability schedule',
      'Include legal clearances information'],

      'AICompliance': [
      'Clearly disclose AI-generated content',
      'Provide algorithm transparency information',
      'Ensure robust data privacy measures',
      'Implement bias prevention protocols',
      'Obtain explicit user consent for AI processing',
      'Enable explainable AI features']

    };

    // Add specific recommendations based on failed rules
    failedResults.forEach((result) => {
      if (result.recommendation && !recommendations.includes(result.recommendation)) {
        recommendations.push(result.recommendation);
      }
    });

    // Add general category advice
    const generalAdvice = categoryAdvice[category] || [];
    generalAdvice.forEach((advice) => {
      if (!recommendations.some((rec) => rec.includes(advice.substring(0, 20)))) {
        recommendations.push(advice);
      }
    });

    return recommendations.slice(0, 6); // Limit to top 6 recommendations
  }

  private generatePriorityActions(category: GuidelineType, results: ComplianceResult[]): string[] {
    const criticalIssues = results.filter((r) => r.severity === 'critical' && r.status === 'fail');
    const highIssues = results.filter((r) => r.severity === 'high' && r.status === 'fail');

    const actions: string[] = [];

    criticalIssues.forEach((issue) => {
      actions.push(`🚨 CRITICAL: ${issue.message}`);
    });

    highIssues.forEach((issue) => {
      actions.push(`⚡ HIGH: ${issue.message}`);
    });

    return actions.slice(0, 4); // Limit to top 4 priority actions
  }

  private generateOverallRecommendations(results: ComplianceResult[]): string[] {
    const recommendations: string[] = [];
    const criticalCount = results.filter((r) => r.severity === 'critical' && r.status === 'fail').length;
    const highCount = results.filter((r) => r.severity === 'high' && r.status === 'fail').length;

    if (criticalCount > 0) {
      recommendations.push(`Address ${criticalCount} critical compliance issues immediately`);
    }

    if (highCount > 0) {
      recommendations.push(`Review and fix ${highCount} high-priority issues`);
    }

    recommendations.push('Review all failed checks and implement suggested improvements');
    recommendations.push('Consider legal review for critical compliance areas');
    recommendations.push('Implement regular compliance audits for ongoing monitoring');
    recommendations.push('Train content creators on compliance best practices');

    return recommendations;
  }

  // Legacy method for compatibility
  public async analyze(content: string): Promise<ComplianceResult[]> {
    return this.autoAnalyze(content);
  }

  // Legacy method for compatibility
  public async analyzeByCategory(content: string): Promise<AnalysisSummary> {
    return this.autoAnalyzeByCategory(content);
  }
}