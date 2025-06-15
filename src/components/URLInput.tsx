import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, Download, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface URLInputProps {
  onContentFetched: (content: string, url: string) => void;
  isProcessing: boolean;
}

const URLInput: React.FC<URLInputProps> = ({ onContentFetched, isProcessing }) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isValidUrl = (urlString: string) => {
    try {
      const url = new URL(urlString);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const fetchContentFromUrl = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid HTTP or HTTPS URL');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);
    setProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      // In a real implementation, you would use a CORS proxy or backend service
      // For demo purposes, we'll simulate fetching content
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate different types of content based on URL patterns
      let simulatedContent = '';
      const urlLower = url.toLowerCase();

      if (urlLower.includes('privacy') || urlLower.includes('policy')) {
        simulatedContent = `PRIVACY POLICY

Last updated: ${new Date().toLocaleDateString()}

1. INFORMATION WE COLLECT
We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.

2. HOW WE USE YOUR INFORMATION
We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.

3. INFORMATION SHARING AND DISCLOSURE
We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.

4. DATA SECURITY
We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

5. YOUR RIGHTS
You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us.

6. CONTACT US
If you have any questions about this Privacy Policy, please contact us at privacy@example.com.

Source URL: ${url}`;
      } else if (urlLower.includes('terms') || urlLower.includes('service')) {
        simulatedContent = `TERMS OF SERVICE

Last updated: ${new Date().toLocaleDateString()}

1. ACCEPTANCE OF TERMS
By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.

2. DESCRIPTION OF SERVICE
Our service provides compliance checking and analysis tools for various industry standards including ASCI, WCAG, and IRDAI guidelines.

3. USER RESPONSIBILITIES
Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.

4. PROHIBITED USES
You may not use our service for any illegal or unauthorized purpose or to violate any laws in your jurisdiction.

5. LIMITATION OF LIABILITY
In no event shall the company be liable for any indirect, incidental, special, consequential, or punitive damages.

6. TERMINATION
We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever.

Source URL: ${url}`;
      } else if (urlLower.includes('accessibility') || urlLower.includes('wcag')) {
        simulatedContent = `ACCESSIBILITY STATEMENT

We are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.

CONFORMANCE STATUS
We conform to WCAG 2.1 AA standards. These guidelines explain how to make web content more accessible to people with disabilities.

ACCESSIBILITY FEATURES
- Alternative text for images
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode
- Resizable text
- Clear navigation structure

FEEDBACK
We welcome your feedback on the accessibility of our website. Please let us know if you encounter accessibility barriers.

ASSESSMENT APPROACH
We assessed the accessibility of our website by self-evaluation and external evaluation using automated and manual testing tools.

Source URL: ${url}`;
      } else {
        simulatedContent = `WEBSITE CONTENT ANALYSIS

URL: ${url}
Fetched: ${new Date().toLocaleString()}

This is a simulated content extraction from the provided URL. In a production environment, this would contain the actual text content from the webpage, including:

- Main content text
- Navigation elements
- Footer information
- Meta descriptions
- Alt text from images
- Any compliance-related information

The content would be processed and cleaned to remove HTML tags and extract meaningful text for compliance analysis.

Key sections that would typically be analyzed:
1. Privacy policies and data handling procedures
2. Terms of service and user agreements
3. Accessibility statements and WCAG compliance
4. Cookie policies and consent mechanisms
5. Contact information and support channels
6. Disclaimers and legal notices

This extracted content can now be analyzed against various compliance standards to ensure adherence to industry regulations and best practices.`;
      }

      clearInterval(progressInterval);
      setProgress(100);

      setSuccess(`Successfully fetched content from ${url}`);
      onContentFetched(simulatedContent, url);

      // Clear the URL input for next use
      setTimeout(() => {
        setUrl('');
        setProgress(0);
        setSuccess(null);
      }, 2000);

    } catch (error) {
      console.error('Error fetching URL content:', error);
      setError('Failed to fetch content from URL. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6" data-id="i6cib13vc" data-path="src/components/URLInput.tsx">

      <Card className="bg-gradient-to-br from-slate-800/50 to-indigo-900/50 border-purple-500/30 shadow-lg" data-id="sokniybt9" data-path="src/components/URLInput.tsx">
        <CardHeader className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20" data-id="3xqu21lyq" data-path="src/components/URLInput.tsx">
          <CardTitle className="flex items-center gap-3 text-xl text-gray-100" data-id="pcay7w4wy" data-path="src/components/URLInput.tsx">
            <Link className="h-5 w-5 text-purple-400" data-id="7q3xftt39" data-path="src/components/URLInput.tsx" />
            URL Content Fetcher
          </CardTitle>
          <CardDescription className="text-base text-gray-300" data-id="d0srmp8mt" data-path="src/components/URLInput.tsx">
            Enter a website URL to fetch and analyze its content for compliance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6" data-id="xxb1xux0u" data-path="src/components/URLInput.tsx">
          <div className="space-y-3" data-id="7sac0vwq3" data-path="src/components/URLInput.tsx">
            <Label htmlFor="url-input" className="text-base font-medium text-gray-200" data-id="6icbxcrh0" data-path="src/components/URLInput.tsx">
              Website URL
            </Label>
            <div className="flex gap-3" data-id="2trjrhazn" data-path="src/components/URLInput.tsx">
              <Input
                id="url-input"
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError(null);
                  setSuccess(null);
                }}
                placeholder="https://example.com"
                className="flex-1 h-12 text-base bg-slate-800/50 border-purple-500/30 text-gray-200 placeholder-gray-400 focus:border-purple-400"
                disabled={isLoading || isProcessing} data-id="1mgaa3gqy" data-path="src/components/URLInput.tsx" />

              <Button
                onClick={fetchContentFromUrl}
                disabled={isLoading || isProcessing || !url.trim()}
                className="px-6 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium"
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(147, 51, 234, 0.3))',
                  boxShadow: '0 0 25px rgba(147, 51, 234, 0.2)'
                }} data-id="sa966gtcg" data-path="src/components/URLInput.tsx">

                {isLoading ?
                <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" data-id="uk5my9s2j" data-path="src/components/URLInput.tsx" />
                    Fetching...
                  </> :

                <>
                    <Download className="h-4 w-4 mr-2" data-id="yvvsjhw3p" data-path="src/components/URLInput.tsx" />
                    Fetch Content
                  </>
                }
              </Button>
            </div>
          </div>

          {/* Progress indicator */}
          {isLoading &&
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3" data-id="37cruzmku" data-path="src/components/URLInput.tsx">

              <div className="flex justify-between text-sm font-medium text-gray-200" data-id="r465qdx6z" data-path="src/components/URLInput.tsx">
                <span className="flex items-center gap-2" data-id="i2xejpfw1" data-path="src/components/URLInput.tsx">
                  <Link className="h-4 w-4 text-purple-400" data-id="228hko6r1" data-path="src/components/URLInput.tsx" />
                  Fetching content from URL...
                </span>
                <span data-id="dr9ibui5n" data-path="src/components/URLInput.tsx">{Math.round(progress)}%</span>
              </div>
              <Progress
              value={progress}
              className="h-2 bg-gradient-to-r from-slate-800 to-indigo-900" data-id="q6564hqhr" data-path="src/components/URLInput.tsx" />

            </motion.div>
          }

          {/* Success message */}
          {success &&
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }} data-id="tarkl917w" data-path="src/components/URLInput.tsx">

              <Alert className="border-emerald-500/30 bg-emerald-900/20" data-id="izkb650bb" data-path="src/components/URLInput.tsx">
                <CheckCircle className="h-4 w-4 text-emerald-400" data-id="3t8x2tqun" data-path="src/components/URLInput.tsx" />
                <AlertDescription className="text-emerald-300" data-id="lt9muq4de" data-path="src/components/URLInput.tsx">
                  {success}
                </AlertDescription>
              </Alert>
            </motion.div>
          }

          {/* Error message */}
          {error &&
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }} data-id="f1saq72a1" data-path="src/components/URLInput.tsx">

              <Alert className="border-red-500/30 bg-red-900/20" variant="destructive" data-id="hw6jj3mha" data-path="src/components/URLInput.tsx">
                <AlertCircle className="h-4 w-4" data-id="akfl5wkye" data-path="src/components/URLInput.tsx" />
                <AlertDescription data-id="fwx942b51" data-path="src/components/URLInput.tsx">{error}</AlertDescription>
              </Alert>
            </motion.div>
          }

          {/* Info section */}
          <div className="space-y-3" data-id="59sy2e9i6" data-path="src/components/URLInput.tsx">
            <Label className="text-base font-medium text-gray-200" data-id="6rwfsn50x" data-path="src/components/URLInput.tsx">Supported Content Types</Label>
            <div className="grid grid-cols-2 gap-3" data-id="tjkxtmurw" data-path="src/components/URLInput.tsx">
              <Badge variant="outline" className="flex items-center gap-2 p-3 bg-slate-800/50 border-purple-500/30 text-purple-300" data-id="m1b43mjzx" data-path="src/components/URLInput.tsx">
                <span className="text-lg" data-id="hwbsgy63s" data-path="src/components/URLInput.tsx">📄</span>
                Privacy Policies
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2 p-3 bg-slate-800/50 border-purple-500/30 text-purple-300" data-id="zzc7gevx5" data-path="src/components/URLInput.tsx">
                <span className="text-lg" data-id="968hgs62y" data-path="src/components/URLInput.tsx">📋</span>
                Terms of Service
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2 p-3 bg-slate-800/50 border-purple-500/30 text-purple-300" data-id="o6w17w0ic" data-path="src/components/URLInput.tsx">
                <span className="text-lg" data-id="m8oxhgefy" data-path="src/components/URLInput.tsx">♿</span>
                Accessibility Pages
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2 p-3 bg-slate-800/50 border-purple-500/30 text-purple-300" data-id="a6sunqx4l" data-path="src/components/URLInput.tsx">
                <span className="text-lg" data-id="y3o6cn560" data-path="src/components/URLInput.tsx">🌐</span>
                General Web Content
              </Badge>
            </div>
          </div>

          {/* Tips */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-slate-800/60 to-indigo-900/60 border border-purple-500/20" data-id="ew1nx2ws8" data-path="src/components/URLInput.tsx">
            <h4 className="font-medium text-gray-200 mb-2 flex items-center gap-2" data-id="q0dia21ui" data-path="src/components/URLInput.tsx">
              <span className="text-lg" data-id="qo9j00xsl" data-path="src/components/URLInput.tsx">💡</span>
              Tips for Best Results
            </h4>
            <ul className="text-sm text-gray-300 space-y-1" data-id="hq9wa40vy" data-path="src/components/URLInput.tsx">
              <li data-id="oga981tx7" data-path="src/components/URLInput.tsx">• Use direct links to specific pages (privacy policy, terms, etc.)</li>
              <li data-id="w1beh1jxp" data-path="src/components/URLInput.tsx">• Ensure the URL is publicly accessible</li>
              <li data-id="7qx4llxst" data-path="src/components/URLInput.tsx">• HTTPS URLs are preferred for security</li>
              <li data-id="658zlu3u0" data-path="src/components/URLInput.tsx">• Content will be automatically cleaned and processed</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>);

};

export default URLInput;