import { GuidelineInfo, GuidelineCategory, ComplianceRule, GuidelineType } from '@/types/compliance';

export const guidelines: GuidelineInfo[] = [
{
  id: 'ASCI',
  name: 'Advertising Standards Council of India',
  description: 'Ensures ads are legal, decent, honest, truthful, and not hazardous to consumers',
  applicableSectors: ['All sectors', 'Consumer goods', 'Services', 'Digital advertising'],
  keyRequirements: [
  'Claims must be substantiated with evidence',
  'Ads must be truthful and not misleading',
  'Fair competition practices',
  'No harmful or offensive content',
  'Proper disclaimers and disclosures'],

  icon: '⚖️',
  color: 'from-red-400 to-red-600'
},
{
  id: 'WCAG',
  name: 'Web Content Accessibility Guidelines',
  description: 'Ensures digital content is accessible to people with disabilities',
  applicableSectors: ['Digital/Web advertising', 'Online platforms', 'Mobile apps'],
  keyRequirements: [
  'Alternative text for images',
  'Sufficient color contrast (4.5:1 minimum)',
  'Keyboard navigation support',
  'Screen reader compatibility',
  'Responsive design for all devices'],

  icon: '♿',
  color: 'from-green-400 to-green-600'
},
{
  id: 'IRDAI',
  name: 'Insurance Regulatory and Development Authority',
  description: 'Regulates insurance advertisement and marketing practices',
  applicableSectors: ['Life Insurance', 'General Insurance', 'Health Insurance'],
  keyRequirements: [
  'Mandatory disclosure: "For more details on risk factors, terms and conditions please read sales brochure carefully before concluding a sale"',
  'Risk factor warnings prominently displayed',
  'Clear terms and conditions',
  'No misleading benefit claims',
  'Premium calculation transparency'],

  icon: '🛡️',
  color: 'from-emerald-400 to-emerald-600'
},
{
  id: 'Financial',
  name: 'Financial Advertisement Guidelines (RBI)',
  description: 'RBI and general financial advertising regulations',
  applicableSectors: ['Banking', 'Financial Services', 'Credit Cards', 'Loans'],
  keyRequirements: [
  'Clear interest rate disclosure with APR',
  'No zero-interest claims without proper context',
  'Transparent fee structure display',
  'Risk warnings for investments',
  'Cooling-off period information'],

  icon: '🏦',
  color: 'from-rose-400 to-rose-600'
},
{
  id: 'SEBI',
  name: 'Securities and Exchange Board of India',
  description: 'Regulates mutual fund and securities advertising',
  applicableSectors: ['Mutual Funds', 'Securities', 'Stock Trading', 'Investment Advisory'],
  keyRequirements: [
  'Performance presented as CAGR for 1, 3, 5 years, and since inception',
  'Celebrity endorsement restrictions (not allowed)',
  'Risk disclosure: "Mutual fund investments are subject to market risks"',
  'Past performance disclaimers',
  'No guarantee of returns'],

  icon: '📈',
  color: 'from-red-500 to-green-500'
},
{
  id: 'Pharma',
  name: 'Pharmaceutical Advertising Guidelines',
  description: 'Regulates pharmaceutical and medical device advertising',
  applicableSectors: ['Pharmaceuticals', 'Medical Devices', 'Healthcare Products'],
  keyRequirements: [
  'Clinical evidence for therapeutic claims',
  'Side effects disclosure',
  'Dosage and administration warnings',
  'Contraindications clearly stated',
  'Professional consultation advice'],

  icon: '💊',
  color: 'from-blue-400 to-blue-600'
},
{
  id: 'Food',
  name: 'Food & Nutrition Advertisement Guidelines',
  description: 'FSSAI regulations for food and nutrition advertising',
  applicableSectors: ['Food & Beverages', 'Nutrition Supplements', 'Functional Foods'],
  keyRequirements: [
  'Nutritional claims substantiation',
  'No false health benefits',
  'Clear ingredient disclosure',
  'Allergen warnings',
  'FSSAI approval references'],

  icon: '🍎',
  color: 'from-orange-400 to-orange-600'
},
{
  id: 'Telecom',
  name: 'Telecom Regulatory Authority Guidelines',
  description: 'TRAI guidelines for telecom service advertising',
  applicableSectors: ['Telecommunications', 'Internet Services', 'Mobile Services'],
  keyRequirements: [
  'Transparent pricing with all charges',
  'Service availability disclaimers',
  'Terms and conditions clarity',
  'Data speed claims verification',
  'Fair usage policy disclosure'],

  icon: '📱',
  color: 'from-purple-400 to-purple-600'
},
{
  id: 'Automotive',
  name: 'Automotive Advertising Standards',
  description: 'Guidelines for automotive industry advertising',
  applicableSectors: ['Automobile Manufacturing', 'Auto Finance', 'Insurance'],
  keyRequirements: [
  'Fuel efficiency claims verification',
  'Safety rating disclosure',
  'Pricing transparency with taxes',
  'Feature availability clarity',
  'Performance claims substantiation'],

  icon: '🚗',
  color: 'from-gray-400 to-gray-600'
},
{
  id: 'RealEstate',
  name: 'Real Estate Advertising Regulations',
  description: 'RERA and real estate advertising guidelines',
  applicableSectors: ['Real Estate Development', 'Property Investment', 'Construction'],
  keyRequirements: [
  'RERA registration number display',
  'Project approval status',
  'Actual vs. projected delivery dates',
  'Amenities availability timeline',
  'Legal clearances disclosure'],

  icon: '🏠',
  color: 'from-teal-400 to-teal-600'
},
{
  id: 'AICompliance',
  name: 'AI Ethics & Compliance Guidelines',
  description: 'Emerging standards for AI-generated content and algorithmic transparency',
  applicableSectors: ['AI/ML Companies', 'Tech Platforms', 'Automated Content', 'Digital Services'],
  keyRequirements: [
  'AI-generated content disclosure',
  'Algorithm transparency requirements',
  'Data privacy and protection',
  'Bias prevention measures',
  'User consent for AI processing',
  'Explainable AI practices'],

  icon: '🤖',
  color: 'from-cyan-400 to-blue-600'
}];


export const complianceGuidelines: Record<GuidelineCategory, ComplianceRule[]> = {
  // General Advertising Standards
  ASCI: [
  {
    id: 'asci-misleading-claims',
    category: 'ASCI',
    guidelineType: 'ASCI',
    severity: 'critical',
    message: 'Potentially misleading claim detected',
    suggestion: 'Ensure all claims are substantiated with credible evidence. Avoid superlatives without proof.',
    pattern: /\b(guaranteed|100%|best|#1|fastest|cheapest|risk-free|instant|miracle|magic)\b/gi,
    prohibited: ['guaranteed profit', 'risk-free investment', '100% safe', 'no side effects', 'instant results'],
    symbol: '⚠️'
  },
  {
    id: 'asci-substantiation',
    category: 'ASCI',
    guidelineType: 'ASCI',
    severity: 'high',
    message: 'Claims require substantiation',
    suggestion: 'Provide credible source or evidence for claims. Include disclaimers where appropriate.',
    keywords: ['proven', 'scientifically tested', 'clinically proven', 'award-winning'],
    symbol: '🔍',
    customCheck: (content: string) => {
      const claimWords = ['proven', 'tested', 'certified', 'approved'];
      const evidenceWords = ['based on', 'according to', 'study shows', 'research indicates'];
      return claimWords.some((word) => content.toLowerCase().includes(word)) &&
      !evidenceWords.some((word) => content.toLowerCase().includes(word));
    }
  },
  {
    id: 'asci-comparison',
    category: 'ASCI',
    guidelineType: 'ASCI',
    severity: 'medium',
    message: 'Competitive comparison requires fair representation',
    suggestion: 'Ensure comparisons are fair, factual, and not disparaging to competitors.',
    keywords: ['better than', 'superior to', 'vs', 'compared to', 'unlike others'],
    pattern: /\b(better than|superior to|unlike others|vs\.?|compared to)\b/gi,
    symbol: '⚖️'
  },
  {
    id: 'asci-disclaimers',
    category: 'ASCI',
    guidelineType: 'ASCI',
    severity: 'high',
    message: 'Important disclaimers missing or insufficient',
    suggestion: 'Include clear, prominent disclaimers for conditions, limitations, or exceptions.',
    keywords: ['terms apply', 'conditions apply', 'subject to', 'eligibility'],
    symbol: '📝',
    customCheck: (content: string) => {
      const offerWords = ['free', 'discount', 'offer', 'limited time'];
      const disclaimerWords = ['terms', 'conditions', 'subject to', 'eligibility'];
      return offerWords.some((word) => content.toLowerCase().includes(word)) &&
      !disclaimerWords.some((word) => content.toLowerCase().includes(word));
    }
  }],


  // Web Accessibility Standards
  WCAG: [
  {
    id: 'wcag-alt-text',
    category: 'WCAG',
    guidelineType: 'WCAG',
    severity: 'high',
    message: 'Images require alternative text for accessibility',
    suggestion: 'Add descriptive alt text for all images. Use empty alt="" for decorative images.',
    pattern: /<img(?![^>]*alt=)/gi,
    symbol: '🖼️'
  },
  {
    id: 'wcag-color-contrast',
    category: 'WCAG',
    guidelineType: 'WCAG',
    severity: 'medium',
    message: 'Ensure sufficient color contrast for readability',
    suggestion: 'Maintain minimum 4.5:1 contrast ratio for normal text, 3:1 for large text.',
    keywords: ['color', 'contrast', 'text color', 'background'],
    symbol: '🎨'
  },
  {
    id: 'wcag-keyboard-navigation',
    category: 'WCAG',
    guidelineType: 'WCAG',
    severity: 'medium',
    message: 'Ensure keyboard accessibility',
    suggestion: 'All interactive elements must be accessible via keyboard navigation.',
    keywords: ['click here', 'mouse over', 'hover'],
    symbol: '⌨️'
  },
  {
    id: 'wcag-responsive-design',
    category: 'WCAG',
    guidelineType: 'WCAG',
    severity: 'high',
    message: 'Content must be responsive and mobile-friendly',
    suggestion: 'Ensure ad content adapts to different screen sizes and orientations.',
    keywords: ['mobile', 'responsive', 'viewport', 'device'],
    symbol: '📱'
  }],


  // Insurance Regulations
  IRDAI: [
  {
    id: 'irdai-mandatory-disclosure',
    category: 'IRDAI',
    guidelineType: 'IRDAI',
    severity: 'critical',
    message: 'Missing mandatory IRDAI disclosure statement',
    suggestion: 'Include: "For more details on risk factors, terms and conditions please read sales brochure carefully before concluding a sale"',
    required: ['For more details on risk factors', 'terms and conditions', 'sales brochure', 'before concluding a sale'],
    symbol: '🛡️'
  },
  {
    id: 'irdai-risk-factors',
    category: 'IRDAI',
    guidelineType: 'IRDAI',
    severity: 'critical',
    message: 'Risk factors must be prominently disclosed',
    suggestion: 'Clearly mention all relevant risk factors associated with the insurance product.',
    keywords: ['insurance', 'policy', 'coverage', 'premium'],
    required: ['risk factors', 'risks'],
    symbol: '⚠️'
  },
  {
    id: 'irdai-misleading-benefits',
    category: 'IRDAI',
    guidelineType: 'IRDAI',
    severity: 'high',
    message: 'Potentially misleading benefit claims',
    suggestion: 'Avoid absolute statements about benefits. Include conditions and limitations.',
    prohibited: ['guaranteed returns', 'assured income', 'no risk', 'complete protection'],
    pattern: /\b(guaranteed returns|assured income|no risk|complete protection)\b/gi,
    symbol: '🚫'
  },
  {
    id: 'irdai-premium-clarity',
    category: 'IRDAI',
    guidelineType: 'IRDAI',
    severity: 'medium',
    message: 'Premium information should be clear and transparent',
    suggestion: 'Provide clear information about premium amounts, payment terms, and any additional charges.',
    keywords: ['premium', 'payment', 'charges', 'fees'],
    symbol: '💰'
  }],


  // Financial Services Regulations
  Financial: [
  {
    id: 'financial-interest-disclosure',
    category: 'Financial',
    guidelineType: 'Financial',
    severity: 'critical',
    message: 'Interest rates must be clearly disclosed',
    suggestion: 'Display interest rates prominently with APR. Include all applicable charges.',
    keywords: ['interest', 'loan', 'credit', 'financing'],
    symbol: '💳',
    customCheck: (content: string) => {
      const loanWords = ['loan', 'credit', 'financing', 'borrow'];
      const rateWords = ['interest rate', 'apr', '%', 'per annum'];
      return loanWords.some((word) => content.toLowerCase().includes(word)) &&
      !rateWords.some((word) => content.toLowerCase().includes(word));
    }
  },
  {
    id: 'financial-zero-interest',
    category: 'Financial',
    guidelineType: 'Financial',
    severity: 'high',
    message: 'Zero-interest claims require proper context',
    suggestion: 'Clearly explain terms and conditions for zero-interest offers. Include processing fees if applicable.',
    pattern: /\b(zero.{0,5}interest|0%.{0,10}interest|no.{0,5}interest)\b/gi,
    required: ['terms and conditions', 'processing fee'],
    symbol: '🏷️'
  },
  {
    id: 'financial-investment-risk',
    category: 'Financial',
    guidelineType: 'Financial',
    severity: 'critical',
    message: 'Investment products must include risk warnings',
    suggestion: 'Include clear risk disclosure: "Investments are subject to market risks. Please read all documents carefully."',
    keywords: ['investment', 'returns', 'portfolio', 'wealth'],
    required: ['market risks', 'read all documents'],
    symbol: '⚠️'
  },
  {
    id: 'financial-cooling-off',
    category: 'Financial',
    guidelineType: 'Financial',
    severity: 'medium',
    message: 'Mention cooling-off period for financial products',
    suggestion: 'Inform customers about their right to cancel within the cooling-off period.',
    keywords: ['financial product', 'investment', 'insurance'],
    required: ['cooling-off period', 'right to cancel'],
    symbol: '⏰'
  }],


  // Securities & Investment Regulations
  SEBI: [
  {
    id: 'sebi-performance-format',
    category: 'SEBI',
    guidelineType: 'SEBI',
    severity: 'critical',
    message: 'Performance must be shown as CAGR for specified periods',
    suggestion: 'Present returns as CAGR for 1, 3, 5 years, and since inception. Avoid absolute returns.',
    pattern: /(\d+\.?\d*%\s*(?:return|growth|gain))/gi,
    symbol: '📊',
    customCheck: (content: string) => {
      const performancePattern = /(\d+\.?\d*%\s*(?:return|growth|gain))/gi;
      const cagrPattern = /CAGR.*(?:1\s*year|3\s*years|5\s*years|since\s*inception)/gi;
      return performancePattern.test(content) && !cagrPattern.test(content);
    }
  },
  {
    id: 'sebi-celebrity-endorsement',
    category: 'SEBI',
    guidelineType: 'SEBI',
    severity: 'critical',
    message: 'Celebrity endorsements not allowed for mutual funds',
    suggestion: 'Remove any celebrity endorsements or testimonials from mutual fund advertisements.',
    keywords: ['celebrity', 'star', 'endorses', 'recommends', 'testimonial'],
    prohibited: ['celebrity endorsement', 'star recommends', 'famous personality'],
    symbol: '🌟'
  },
  {
    id: 'sebi-risk-disclosure',
    category: 'SEBI',
    guidelineType: 'SEBI',
    severity: 'critical',
    message: 'Missing mandatory risk disclosure',
    suggestion: 'Include: "Mutual fund investments are subject to market risks. Please read all scheme related documents carefully."',
    keywords: ['mutual fund', 'investment', 'scheme'],
    required: ['subject to market risks', 'read all scheme related documents'],
    symbol: '⚠️'
  },
  {
    id: 'sebi-past-performance',
    category: 'SEBI',
    guidelineType: 'SEBI',
    severity: 'high',
    message: 'Past performance disclaimer required',
    suggestion: 'Include disclaimer: "Past performance is not indicative of future results."',
    keywords: ['performance', 'returns', 'past'],
    required: ['past performance', 'not indicative of future'],
    symbol: '⏮️'
  },
  {
    id: 'sebi-guarantee-prohibition',
    category: 'SEBI',
    guidelineType: 'SEBI',
    severity: 'critical',
    message: 'Guarantee of returns is prohibited',
    suggestion: 'Remove any language suggesting guaranteed returns or assured profits.',
    prohibited: ['guaranteed returns', 'assured returns', 'guaranteed profit', 'assured profit'],
    pattern: /\b(guaranteed|assured).{0,10}(returns|profit|income)\b/gi,
    symbol: '🚫'
  }],


  // Pharmaceutical Regulations
  Pharma: [
  {
    id: 'pharma-clinical-evidence',
    category: 'Pharma',
    guidelineType: 'Pharma',
    severity: 'critical',
    message: 'Therapeutic claims require clinical evidence',
    suggestion: 'Provide clinical trial data or regulatory approval for all therapeutic claims.',
    keywords: ['treats', 'cures', 'prevents', 'therapeutic', 'medical benefit'],
    required: ['clinical study', 'FDA approved', 'research data'],
    symbol: '🧪'
  },
  {
    id: 'pharma-side-effects',
    category: 'Pharma',
    guidelineType: 'Pharma',
    severity: 'critical',
    message: 'Side effects disclosure required',
    suggestion: 'Clearly state possible side effects and contraindications.',
    keywords: ['medicine', 'drug', 'pharmaceutical', 'treatment'],
    required: ['side effects', 'contraindications', 'adverse reactions'],
    symbol: '⚠️'
  },
  {
    id: 'pharma-dosage-warnings',
    category: 'Pharma',
    guidelineType: 'Pharma',
    severity: 'high',
    message: 'Dosage and administration warnings needed',
    suggestion: 'Include proper dosage instructions and administration guidelines.',
    keywords: ['dosage', 'administration', 'prescription'],
    required: ['consult doctor', 'as directed by physician'],
    symbol: '💊'
  },
  {
    id: 'pharma-professional-consultation',
    category: 'Pharma',
    guidelineType: 'Pharma',
    severity: 'high',
    message: 'Professional consultation advice required',
    suggestion: 'Include statement about consulting healthcare professionals.',
    keywords: ['health', 'medical', 'treatment', 'therapy'],
    required: ['consult your doctor', 'healthcare professional'],
    symbol: '👨‍⚕️'
  }],


  // Food & Nutrition Regulations
  Food: [
  {
    id: 'food-nutritional-claims',
    category: 'Food',
    guidelineType: 'Food',
    severity: 'critical',
    message: 'Nutritional claims require substantiation',
    suggestion: 'Provide scientific evidence for all nutritional and health claims.',
    keywords: ['nutritious', 'healthy', 'vitamin', 'mineral', 'protein'],
    required: ['FSSAI approved', 'nutritional facts'],
    symbol: '🍎'
  },
  {
    id: 'food-health-benefits',
    category: 'Food',
    guidelineType: 'Food',
    severity: 'high',
    message: 'Health benefit claims must be verified',
    suggestion: 'Avoid false health claims. Stick to verified nutritional benefits.',
    prohibited: ['cures disease', 'prevents illness', 'medical treatment'],
    pattern: /\b(cures|prevents|treats).{0,10}(disease|illness|condition)\b/gi,
    symbol: '🚫'
  },
  {
    id: 'food-allergen-warnings',
    category: 'Food',
    guidelineType: 'Food',
    severity: 'critical',
    message: 'Allergen warnings required',
    suggestion: 'Clearly mention all allergens present in the product.',
    keywords: ['contains', 'may contain', 'allergen'],
    required: ['allergen information', 'contains nuts', 'gluten free'],
    symbol: '⚠️'
  },
  {
    id: 'food-ingredient-disclosure',
    category: 'Food',
    guidelineType: 'Food',
    severity: 'medium',
    message: 'Clear ingredient disclosure needed',
    suggestion: 'List all ingredients clearly and prominently.',
    keywords: ['ingredients', 'contains', 'made with'],
    symbol: '📋'
  }],


  // Telecom Regulations
  Telecom: [
  {
    id: 'telecom-pricing-transparency',
    category: 'Telecom',
    guidelineType: 'Telecom',
    severity: 'critical',
    message: 'Transparent pricing with all charges required',
    suggestion: 'Display all charges including taxes, activation fees, and hidden costs.',
    keywords: ['price', 'plan', 'tariff', 'charges'],
    required: ['all taxes included', 'total cost'],
    symbol: '💰'
  },
  {
    id: 'telecom-service-availability',
    category: 'Telecom',
    guidelineType: 'Telecom',
    severity: 'high',
    message: 'Service availability disclaimers needed',
    suggestion: 'Mention service availability limitations and coverage areas.',
    keywords: ['available', 'coverage', 'network'],
    required: ['subject to coverage', 'network availability'],
    symbol: '📶'
  },
  {
    id: 'telecom-data-speed',
    category: 'Telecom',
    guidelineType: 'Telecom',
    severity: 'high',
    message: 'Data speed claims require verification',
    suggestion: 'Provide realistic speed claims with disclaimers about actual speeds.',
    keywords: ['speed', 'mbps', 'download', 'upload'],
    pattern: /\d+\s*(mbps|gbps|kb|mb)/gi,
    symbol: '⚡'
  },
  {
    id: 'telecom-fair-usage',
    category: 'Telecom',
    guidelineType: 'Telecom',
    severity: 'medium',
    message: 'Fair usage policy disclosure required',
    suggestion: 'Clearly explain fair usage policy and data limitations.',
    keywords: ['unlimited', 'fair usage', 'data limit'],
    required: ['fair usage policy', 'terms apply'],
    symbol: '📊'
  }],


  // Automotive Regulations
  Automotive: [
  {
    id: 'automotive-fuel-efficiency',
    category: 'Automotive',
    guidelineType: 'Automotive',
    severity: 'high',
    message: 'Fuel efficiency claims require verification',
    suggestion: 'Provide official ARAI certified mileage figures.',
    keywords: ['mileage', 'fuel efficiency', 'kmpl', 'fuel economy'],
    required: ['ARAI certified', 'under test conditions'],
    symbol: '⛽'
  },
  {
    id: 'automotive-safety-rating',
    category: 'Automotive',
    guidelineType: 'Automotive',
    severity: 'high',
    message: 'Safety rating disclosure required',
    suggestion: 'Mention official safety ratings from recognized authorities.',
    keywords: ['safety', 'crash test', 'star rating'],
    required: ['safety rating', 'crash test results'],
    symbol: '🛡️'
  },
  {
    id: 'automotive-pricing',
    category: 'Automotive',
    guidelineType: 'Automotive',
    severity: 'critical',
    message: 'Pricing transparency with taxes needed',
    suggestion: 'Show ex-showroom price and on-road price separately.',
    keywords: ['price', 'cost', 'starting at'],
    required: ['ex-showroom price', 'taxes extra'],
    symbol: '💰'
  },
  {
    id: 'automotive-features',
    category: 'Automotive',
    guidelineType: 'Automotive',
    severity: 'medium',
    message: 'Feature availability clarity required',
    suggestion: 'Specify which features are standard vs optional.',
    keywords: ['features', 'equipped with', 'comes with'],
    required: ['variant specific', 'optional'],
    symbol: '🔧'
  }],


  // Real Estate Regulations
  RealEstate: [
  {
    id: 'realestate-rera-number',
    category: 'RealEstate',
    guidelineType: 'RealEstate',
    severity: 'critical',
    message: 'RERA registration number must be displayed',
    suggestion: 'Display valid RERA registration number prominently.',
    keywords: ['project', 'development', 'construction'],
    required: ['RERA registration', 'registration number'],
    symbol: '🏠'
  },
  {
    id: 'realestate-approvals',
    category: 'RealEstate',
    guidelineType: 'RealEstate',
    severity: 'critical',
    message: 'Project approval status required',
    suggestion: 'Mention all necessary approvals and clearances obtained.',
    keywords: ['approved', 'sanctioned', 'clearance'],
    required: ['approvals obtained', 'clearances'],
    symbol: '✅'
  },
  {
    id: 'realestate-delivery-dates',
    category: 'RealEstate',
    guidelineType: 'RealEstate',
    severity: 'high',
    message: 'Realistic delivery dates required',
    suggestion: 'Provide realistic possession dates with disclaimers.',
    keywords: ['possession', 'delivery', 'ready to move'],
    required: ['tentative delivery', 'subject to approvals'],
    symbol: '📅'
  },
  {
    id: 'realestate-amenities',
    category: 'RealEstate',
    guidelineType: 'RealEstate',
    severity: 'medium',
    message: 'Amenities availability timeline needed',
    suggestion: 'Specify when advertised amenities will be available.',
    keywords: ['amenities', 'facilities', 'clubhouse'],
    required: ['proposed amenities', 'timeline'],
    symbol: '🏊‍♂️'
  }],

  // AI Ethics & Compliance Guidelines
  AICompliance: [
  {
    id: 'ai-content-disclosure',
    category: 'AICompliance',
    guidelineType: 'AICompliance',
    severity: 'critical',
    message: 'AI-generated content must be disclosed',
    suggestion: 'Clearly indicate when content is generated or assisted by AI systems.',
    keywords: ['AI generated', 'artificial intelligence', 'machine learning', 'automated content'],
    required: ['AI-generated', 'generated by AI', 'AI-assisted'],
    symbol: '🤖'
  },
  {
    id: 'ai-algorithm-transparency',
    category: 'AICompliance',
    guidelineType: 'AICompliance',
    severity: 'high',
    message: 'Algorithm transparency required for decision-making',
    suggestion: 'Provide information about how AI algorithms make decisions that affect users.',
    keywords: ['algorithm', 'automated decision', 'AI system', 'machine learning model'],
    required: ['how it works', 'decision criteria', 'algorithm explanation'],
    symbol: '📊'
  },
  {
    id: 'ai-data-privacy',
    category: 'AICompliance',
    guidelineType: 'AICompliance',
    severity: 'critical',
    message: 'Data privacy and protection measures required',
    suggestion: 'Clearly explain how user data is collected, processed, and protected by AI systems.',
    keywords: ['user data', 'personal information', 'data collection', 'privacy'],
    required: ['data protection', 'privacy policy', 'user consent'],
    symbol: '🔒'
  },
  {
    id: 'ai-bias-prevention',
    category: 'AICompliance',
    guidelineType: 'AICompliance',
    severity: 'high',
    message: 'Bias prevention and fairness measures needed',
    suggestion: 'Demonstrate efforts to prevent algorithmic bias and ensure fair treatment.',
    keywords: ['fair', 'unbiased', 'equal treatment', 'discrimination'],
    required: ['bias testing', 'fairness measures', 'equal opportunity'],
    symbol: '⚖️'
  },
  {
    id: 'ai-user-consent',
    category: 'AICompliance',
    guidelineType: 'AICompliance',
    severity: 'critical',
    message: 'User consent required for AI processing',
    suggestion: 'Obtain explicit user consent before processing data with AI systems.',
    keywords: ['consent', 'agree to AI', 'opt-in', 'user permission'],
    required: ['user consent', 'explicit agreement', 'opt-in consent'],
    symbol: '✅'
  },
  {
    id: 'ai-explainable',
    category: 'AICompliance',
    guidelineType: 'AICompliance',
    severity: 'medium',
    message: 'AI decisions should be explainable',
    suggestion: 'Provide explanations for AI-driven recommendations or decisions.',
    keywords: ['recommendation', 'AI decision', 'suggested', 'personalized'],
    required: ['explanation available', 'how we decide', 'reasoning provided'],
    symbol: '💡'
  },
  {
    id: 'ai-human-oversight',
    category: 'AICompliance',
    guidelineType: 'AICompliance',
    severity: 'high',
    message: 'Human oversight and intervention capability required',
    suggestion: 'Ensure human oversight is available for AI-driven processes.',
    keywords: ['automated', 'AI system', 'machine decision'],
    required: ['human oversight', 'manual review', 'human intervention'],
    symbol: '👥'
  },
  {
    id: 'ai-performance-monitoring',
    category: 'AICompliance',
    guidelineType: 'AICompliance',
    severity: 'medium',
    message: 'AI system performance monitoring and reporting needed',
    suggestion: 'Regularly monitor and report on AI system performance and accuracy.',
    keywords: ['AI performance', 'system accuracy', 'model performance'],
    required: ['performance metrics', 'accuracy reporting', 'system monitoring'],
    symbol: '📈'
  }]

};

// Export function to get guidelines by type
export const getGuidelinesByType = (types: GuidelineType[]): ComplianceRule[] => {
  const rules: ComplianceRule[] = [];
  types.forEach((type) => {
    if (complianceGuidelines[type]) {
      rules.push(...complianceGuidelines[type]);
    }
  });
  return rules;
};

// Export function to get guideline info by ID
export const getGuidelineInfo = (id: GuidelineType): GuidelineInfo | undefined => {
  return guidelines.find((guideline) => guideline.id === id);
};

// Export function to classify content into single best-matching category
export const classifyContent = (content: string): GuidelineType | null => {
  const categoryKeywords: Record<GuidelineType, string[]> = {
    'ASCI': ['advertisement', 'marketing', 'promotion', 'claim', 'offer'],
    'WCAG': ['website', 'digital', 'accessibility', 'web', 'online'],
    'IRDAI': ['insurance', 'policy', 'coverage', 'premium', 'life insurance'],
    'Financial': ['loan', 'credit', 'banking', 'finance', 'interest', 'investment'],
    'SEBI': ['mutual fund', 'securities', 'trading', 'stock', 'portfolio'],
    'Pharma': ['medicine', 'drug', 'pharmaceutical', 'treatment', 'therapy'],
    'Food': ['food', 'nutrition', 'supplement', 'dietary', 'beverage'],
    'Telecom': ['mobile', 'telecom', 'network', 'data', 'internet'],
    'Automotive': ['car', 'vehicle', 'automobile', 'bike', 'mileage'],
    'RealEstate': ['property', 'real estate', 'apartment', 'house', 'construction'],
    'AICompliance': ['AI', 'artificial intelligence', 'machine learning', 'algorithm', 'automated', 'neural', 'deep learning', 'chatbot', 'AI-generated', 'AI-powered']
  };

  const scores: Record<GuidelineType, number> = {
    'ASCI': 0, 'WCAG': 0, 'IRDAI': 0, 'Financial': 0, 'SEBI': 0,
    'Pharma': 0, 'Food': 0, 'Telecom': 0, 'Automotive': 0, 'RealEstate': 0, 'AICompliance': 0
  };

  const lowerContent = content.toLowerCase();

  // Calculate scores for each category
  Object.entries(categoryKeywords).forEach(([category, keywords]) => {
    keywords.forEach((keyword) => {
      const matches = (lowerContent.match(new RegExp(keyword, 'g')) || []).length;
      scores[category as GuidelineType] += matches;
    });
  });

  // Find category with highest score
  let maxScore = 0;
  let bestCategory: GuidelineType | null = null;

  Object.entries(scores).forEach(([category, score]) => {
    if (score > maxScore) {
      maxScore = score;
      bestCategory = category as GuidelineType;
    }
  });

  return maxScore > 0 ? bestCategory : 'ASCI'; // Default to ASCI if no specific category found
};