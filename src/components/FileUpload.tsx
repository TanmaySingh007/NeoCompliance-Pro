import React, { useCallback, useState } from 'react';
import { motion } from 'motion/react';
import { Upload, File, X, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FileUploadProps {
  onFileSelect: (content: string, fileName: string) => void;
  acceptedTypes?: string;
  maxSize?: number; // in MB
  isProcessing?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedTypes = ".txt,.doc,.docx,.pdf",
  maxSize = 10,
  isProcessing = false
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const validateFile = (file: File): string | null => {
    const maxSizeBytes = maxSize * 1024 * 1024;

    if (file.size > maxSizeBytes) {
      return `File size must be less than ${maxSize}MB`;
    }

    const allowedTypes = acceptedTypes.split(',').map((type) => type.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!allowedTypes.includes(fileExtension)) {
      return `File type not supported. Allowed types: ${acceptedTypes}`;
    }

    return null;
  };

  const processFile = async (file: File) => {
    setError(null);
    setUploadProgress(0);
    setSelectedFile(file);

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // Simulate progress for better UX
      for (let i = 0; i <= 90; i += 10) {
        setUploadProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setUploadProgress(100);
        onFileSelect(content, file.name);
      };

      reader.onerror = () => {
        setError('Failed to read file');
        setUploadProgress(0);
      };

      reader.readAsText(file);
    } catch (err) {
      setError('Failed to process file');
      setUploadProgress(0);
      console.error('File processing error:', err);
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
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setError(null);
  };

  return (
    <Card className="w-full" data-id="k9gj4c5vm" data-path="src/components/FileUpload.tsx">
      <CardContent className="p-6" data-id="vhptugdmj" data-path="src/components/FileUpload.tsx">
        <div className="space-y-4" data-id="rltjls3zc" data-path="src/components/FileUpload.tsx">
          <div className="flex items-center justify-between" data-id="jdvp0xoxw" data-path="src/components/FileUpload.tsx">
            <h3 className="text-lg font-semibold" data-id="egndhc9do" data-path="src/components/FileUpload.tsx">Upload Document</h3>
            {selectedFile &&
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFile}
              disabled={isProcessing} data-id="dk1d39qsz" data-path="src/components/FileUpload.tsx">

                <X className="h-4 w-4" data-id="lcb365zgt" data-path="src/components/FileUpload.tsx" />
              </Button>
            }
          </div>

          {error &&
          <Alert variant="destructive" data-id="lfaowwtys" data-path="src/components/FileUpload.tsx">
              <AlertCircle className="h-4 w-4" data-id="07kh2pan2" data-path="src/components/FileUpload.tsx" />
              <AlertDescription data-id="xuqgqpytl" data-path="src/components/FileUpload.tsx">{error}</AlertDescription>
            </Alert>
          }

          <motion.div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ?
            "border-primary bg-primary/5" :
            "border-muted-foreground/25 hover:border-primary/50"} ${
            isProcessing ? "opacity-50 pointer-events-none" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }} data-id="se0qk62a7" data-path="src/components/FileUpload.tsx">

            <input
              type="file"
              accept={acceptedTypes}
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isProcessing} data-id="a9z63d6ay" data-path="src/components/FileUpload.tsx" />

            
            <div className="space-y-4" data-id="vy06h0yz2" data-path="src/components/FileUpload.tsx">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center" data-id="326l09mt4" data-path="src/components/FileUpload.tsx">
                <Upload className="h-6 w-6 text-primary" data-id="sibbn1q4o" data-path="src/components/FileUpload.tsx" />
              </div>
              
              <div data-id="xzf253v5w" data-path="src/components/FileUpload.tsx">
                <p className="text-lg font-medium" data-id="z5vb3wnvh" data-path="src/components/FileUpload.tsx">
                  Drop your file here or click to browse
                </p>
                <p className="text-sm text-muted-foreground mt-1" data-id="yddux537h" data-path="src/components/FileUpload.tsx">
                  Supported formats: {acceptedTypes} (max {maxSize}MB)
                </p>
              </div>
            </div>
          </motion.div>

          {selectedFile &&
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3" data-id="eztlyakei" data-path="src/components/FileUpload.tsx">

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg" data-id="q7sxtacii" data-path="src/components/FileUpload.tsx">
                <File className="h-5 w-5 text-primary" data-id="q0woscxq3" data-path="src/components/FileUpload.tsx" />
                <div className="flex-1 min-w-0" data-id="ec0wrojq2" data-path="src/components/FileUpload.tsx">
                  <p className="text-sm font-medium truncate" data-id="1j8mpnqn7" data-path="src/components/FileUpload.tsx">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground" data-id="nv9iysxy3" data-path="src/components/FileUpload.tsx">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Badge variant="secondary" data-id="74jxxcfol" data-path="src/components/FileUpload.tsx">
                  {selectedFile.type || 'Unknown'}
                </Badge>
              </div>

              {uploadProgress > 0 && uploadProgress < 100 &&
            <div className="space-y-2" data-id="k6tmfm0v7" data-path="src/components/FileUpload.tsx">
                  <div className="flex justify-between text-sm" data-id="sm0vpi4cg" data-path="src/components/FileUpload.tsx">
                    <span data-id="g6gdu1zr1" data-path="src/components/FileUpload.tsx">Processing...</span>
                    <span data-id="ywqzh5wnr" data-path="src/components/FileUpload.tsx">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" data-id="9wc40zn1a" data-path="src/components/FileUpload.tsx" />
                </div>
            }

              {uploadProgress === 100 &&
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-sm text-green-600" data-id="met6d364w" data-path="src/components/FileUpload.tsx">

                  <div className="w-2 h-2 bg-green-600 rounded-full" data-id="edm9d76hs" data-path="src/components/FileUpload.tsx" />
                  File processed successfully
                </motion.div>
            }
            </motion.div>
          }
        </div>
      </CardContent>
    </Card>);

};

export default FileUpload;