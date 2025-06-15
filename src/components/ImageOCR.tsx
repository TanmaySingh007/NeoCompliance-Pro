import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Camera, Image as ImageIcon, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { createWorker } from 'tesseract.js';

interface ImageOCRProps {
  onTextExtracted: (text: string, fileName: string) => void;
  isProcessing?: boolean;
}

const ImageOCR: React.FC<ImageOCRProps> = ({
  onTextExtracted,
  isProcessing = false
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isExtracting, setIsExtracting] = useState(false);

  const validateImage = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (file.size > maxSize) {
      return 'Image size must be less than 10MB';
    }

    if (!file.type.startsWith('image/')) {
      return 'Please select a valid image file';
    }

    return null;
  };

  const processImage = async (file: File) => {
    setError(null);
    setOcrProgress(0);
    setSelectedImage(file);
    setExtractedText('');

    const validationError = validateImage(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    try {
      setIsExtracting(true);

      // Initialize Tesseract worker
      const worker = await createWorker('eng');

      // Set up progress tracking
      await worker.setParameters({
        tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz .,!?;:-()[]{}"\''
      });

      // Perform OCR with progress tracking
      const { data: { text } } = await worker.recognize(file);

      await worker.terminate();

      setExtractedText(text);
      setOcrProgress(100);
      onTextExtracted(text, file.name);

    } catch (err) {
      setError('Failed to extract text from image. Please try a different image.');
      setOcrProgress(0);
      console.error('OCR processing error:', err);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImage(e.dataTransfer.files[0]);
    }
  }, []);

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImage(e.target.files[0]);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setExtractedText('');
    setOcrProgress(0);
    setError(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  const useExtractedText = () => {
    if (extractedText && selectedImage) {
      onTextExtracted(extractedText, selectedImage.name);
    }
  };

  return (
    <Card className="w-full" data-id="a7hap1llh" data-path="src/components/ImageOCR.tsx">
      <CardContent className="p-6" data-id="zyq23iy4m" data-path="src/components/ImageOCR.tsx">
        <div className="space-y-4" data-id="4zu5sg2p3" data-path="src/components/ImageOCR.tsx">
          <div className="flex items-center justify-between" data-id="hz1f4gqp6" data-path="src/components/ImageOCR.tsx">
            <h3 className="text-lg font-semibold" data-id="toaw2vszb" data-path="src/components/ImageOCR.tsx">Image OCR Upload</h3>
            {selectedImage &&
            <Button
              variant="ghost"
              size="sm"
              onClick={clearImage}
              disabled={isProcessing || isExtracting} data-id="wpzfy3822" data-path="src/components/ImageOCR.tsx">

                Clear
              </Button>
            }
          </div>

          {error &&
          <Alert variant="destructive" data-id="h7cqdmbzw" data-path="src/components/ImageOCR.tsx">
              <AlertCircle className="h-4 w-4" data-id="goyb7ibkr" data-path="src/components/ImageOCR.tsx" />
              <AlertDescription data-id="oq8elusrs" data-path="src/components/ImageOCR.tsx">{error}</AlertDescription>
            </Alert>
          }

          <motion.div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ?
            "border-primary bg-primary/5" :
            "border-muted-foreground/25 hover:border-primary/50"} ${
            isProcessing || isExtracting ? "opacity-50 pointer-events-none" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }} data-id="403z05eh5" data-path="src/components/ImageOCR.tsx">

            <input
              type="file"
              accept="image/*"
              onChange={handleImageInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isProcessing || isExtracting} data-id="xwx2awup6" data-path="src/components/ImageOCR.tsx" />

            
            <div className="space-y-4" data-id="0fex48u8p" data-path="src/components/ImageOCR.tsx">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center" data-id="k5t417057" data-path="src/components/ImageOCR.tsx">
                <Camera className="h-6 w-6 text-primary" data-id="em6kpxhtr" data-path="src/components/ImageOCR.tsx" />
              </div>
              
              <div data-id="umc7cwp4u" data-path="src/components/ImageOCR.tsx">
                <p className="text-lg font-medium" data-id="vxmtiww5r" data-path="src/components/ImageOCR.tsx">
                  Drop an image here or click to browse
                </p>
                <p className="text-sm text-muted-foreground mt-1" data-id="s9x0piqog" data-path="src/components/ImageOCR.tsx">
                  Supported formats: JPG, PNG, GIF, WebP (max 10MB)
                </p>
                <p className="text-xs text-muted-foreground mt-1" data-id="9ezoe7ow3" data-path="src/components/ImageOCR.tsx">
                  Text will be automatically extracted from the image
                </p>
              </div>
            </div>
          </motion.div>

          {previewUrl &&
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4" data-id="595rfqj3t" data-path="src/components/ImageOCR.tsx">

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg" data-id="1pdbe1sde" data-path="src/components/ImageOCR.tsx">
                <ImageIcon className="h-5 w-5 text-primary" data-id="poryaov1c" data-path="src/components/ImageOCR.tsx" />
                <div className="flex-1 min-w-0" data-id="8jpz3z1ik" data-path="src/components/ImageOCR.tsx">
                  <p className="text-sm font-medium truncate" data-id="bvm20z3sy" data-path="src/components/ImageOCR.tsx">
                    {selectedImage?.name}
                  </p>
                  <p className="text-xs text-muted-foreground" data-id="03bq6l94z" data-path="src/components/ImageOCR.tsx">
                    {selectedImage && (selectedImage.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <div className="w-full max-w-md mx-auto" data-id="oo16tg03r" data-path="src/components/ImageOCR.tsx">
                <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-auto rounded-lg border shadow-sm" data-id="2pztl7zq0" data-path="src/components/ImageOCR.tsx" />

              </div>

              {isExtracting &&
            <div className="space-y-2" data-id="hvoqg4q06" data-path="src/components/ImageOCR.tsx">
                  <div className="flex items-center gap-2" data-id="82hh9zmbh" data-path="src/components/ImageOCR.tsx">
                    <Loader2 className="h-4 w-4 animate-spin" data-id="5ll2c7adv" data-path="src/components/ImageOCR.tsx" />
                    <span className="text-sm" data-id="074mn7u2h" data-path="src/components/ImageOCR.tsx">Extracting text from image...</span>
                  </div>
                  <Progress value={ocrProgress} className="h-2" data-id="p1vx121rj" data-path="src/components/ImageOCR.tsx" />
                  <p className="text-xs text-muted-foreground text-center" data-id="mvc5pkd1w" data-path="src/components/ImageOCR.tsx">
                    Processing...
                  </p>
                </div>
            }

              {extractedText && !isExtracting &&
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3" data-id="vee0onb90" data-path="src/components/ImageOCR.tsx">

                  <div className="flex items-center gap-2 text-sm text-green-600" data-id="lw38yc407" data-path="src/components/ImageOCR.tsx">
                    <CheckCircle className="h-4 w-4" data-id="lac3c94i5" data-path="src/components/ImageOCR.tsx" />
                    Text extracted successfully
                  </div>
                  
                  <div className="space-y-2" data-id="mdo4sbm8j" data-path="src/components/ImageOCR.tsx">
                    <label className="text-sm font-medium" data-id="mua8otjjl" data-path="src/components/ImageOCR.tsx">Extracted Text:</label>
                    <Textarea
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  placeholder="Extracted text will appear here..."
                  className="min-h-[120px] resize-none"
                  readOnly={false} data-id="z3kjcmeiq" data-path="src/components/ImageOCR.tsx" />

                  </div>

                  <Button
                onClick={useExtractedText}
                className="w-full"
                disabled={!extractedText.trim()} data-id="4bpyocboq" data-path="src/components/ImageOCR.tsx">

                    Use Extracted Text for Compliance Check
                  </Button>
                </motion.div>
            }
            </motion.div>
          }
        </div>
      </CardContent>
    </Card>);

};

export default ImageOCR;