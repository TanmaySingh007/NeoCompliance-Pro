
import { ComplianceGuideline } from '@/contexts/ComplianceContext';

export const complianceGuidelines: ComplianceGuideline[] = [
{
  id: 'eaa2025',
  name: 'EAA 2025',
  description: 'European Accessibility Act - Ensures digital products meet accessibility standards for people with disabilities across the EU.',
  icon: '♿',
  category: 'Accessibility',
  url: 'https://ec.europa.eu/social/main.jsp?catId=1202&langId=en'
},
{
  id: 'asci',
  name: 'ASCI',
  description: 'Advertising Standards Council of India - Guidelines for honest, decent, and non-misleading advertising in India.',
  icon: '🇮🇳',
  category: 'Advertising Standards',
  url: 'https://ascionline.in/'
},
{
  id: 'wcag',
  name: 'WCAG 2.2',
  description: 'Web Content Accessibility Guidelines - International standards for making web content accessible to people with disabilities.',
  icon: '🌐',
  category: 'Web Accessibility',
  url: 'https://www.w3.org/WAI/WCAG22/quickref/'
},
{
  id: 'irdai',
  name: 'IRDAI',
  description: 'Insurance Regulatory and Development Authority of India - Regulations for insurance advertising ensuring transparency and consumer protection.',
  icon: '🏛️',
  category: 'Insurance Regulation',
  url: 'https://www.irdai.gov.in/'
},
{
  id: 'financial',
  name: 'Financial Guidelines',
  description: 'Comprehensive financial advertising regulations including SEBI, RBI, and other financial authority guidelines.',
  icon: '💰',
  category: 'Financial Regulation',
  url: 'https://www.sebi.gov.in/'
}];