
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FAQSection: React.FC = () => {
  const faqs = [
  {
    question: "My Instagram promotion was not approved. Could it be accessibility?",
    answer: "Yes. Platforms are now factoring accessibility into ad approval—especially for EU users. Contrast issues, missing alt text, or image-based text can trigger rejections. Use NeoCompliance-Pro to find and fix these accessibility issues before submitting your ads."
  },
  {
    question: "How accurate is NeoCompliance Pro's analysis?",
    answer: "NeoCompliance Pro uses advanced AI with a 92% accuracy rate for compliance detection. However, this tool provides guidance and suggestions - final compliance decisions should always be verified with legal experts and official regulatory guidelines."
  },
  {
    question: "Which compliance guidelines should I choose for my advertisement?",
    answer: "Choose the guideline that matches your target market and industry. For EU markets, use EAA 2025 or WCAG. For Indian markets, select ASCI for general advertising, IRDAI for insurance products, or Financial Guidelines for investment/banking services."
  },
  {
    question: "Can I analyze video advertisements or only images?",
    answer: "Currently, NeoCompliance Pro supports image files (JPG, PNG), documents (PDF, DOC, DOCX), and URLs. Video analysis is planned for future updates. For video content, we recommend analyzing key frames or screenshots of your video advertisements."
  },
  {
    question: "What should I do if my ad fails compliance checks?",
    answer: "Review the detailed recommendations provided in the compliance report. Common fixes include improving color contrast, adding alternative text, including proper disclaimers, or modifying content to meet regulatory standards. Always consult with legal experts for complex compliance issues."
  }];


  const [openItems, setOpenItems] = React.useState<string[]>([]);

  const toggleItem = (item: string) => {
    setOpenItems((prev) =>
    prev.includes(item) ?
    prev.filter((i) => i !== item) :
    [...prev, item]
    );
  };

  return (
    <Card className="w-full bg-slate-900/50 border-slate-700/50 backdrop-blur-sm" data-id="lpqjhou20" data-path="src/components/FAQSection.tsx">
      <CardHeader data-id="w3kmh7466" data-path="src/components/FAQSection.tsx">
        <CardTitle className="text-2xl font-bold text-slate-200 text-center" data-id="x2kr7rwq6" data-path="src/components/FAQSection.tsx">
          Frequently Asked Questions
        </CardTitle>
        <p className="text-slate-400 text-center mt-2" data-id="mwt6du99g" data-path="src/components/FAQSection.tsx">
          Everything you need to know about creating compliant ads with AI
        </p>
      </CardHeader>
      <CardContent className="space-y-4" data-id="906ft7lv5" data-path="src/components/FAQSection.tsx">
        {faqs.map((faq, index) =>
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }} data-id="lekaau4zp" data-path="src/components/FAQSection.tsx">

            <Collapsible
            open={openItems.includes(`faq-${index}`)}
            onOpenChange={() => toggleItem(`faq-${index}`)} data-id="gkusdjd65" data-path="src/components/FAQSection.tsx">

              <CollapsibleTrigger asChild data-id="t69t8nf8g" data-path="src/components/FAQSection.tsx">
                <Button
                variant="ghost"
                className="w-full p-4 h-auto text-left justify-between hover:bg-slate-800/50 border border-slate-600/50 rounded-lg" data-id="obr7c1fn1" data-path="src/components/FAQSection.tsx">

                  <span className="font-medium text-slate-200 pr-4" data-id="6giwcl287" data-path="src/components/FAQSection.tsx">
                    Q{index + 1}: {faq.question}
                  </span>
                  <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                  openItems.includes(`faq-${index}`) ? 'rotate-180' : ''}`
                  } data-id="nhju71q2z" data-path="src/components/FAQSection.tsx" />

                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4" data-id="irgncrtd0" data-path="src/components/FAQSection.tsx">
                <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-3 text-sm text-slate-300 leading-relaxed" data-id="5ml8jfb2t" data-path="src/components/FAQSection.tsx">

                  {faq.answer}
                </motion.div>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>
        )}
      </CardContent>
    </Card>);

};

export default FAQSection;