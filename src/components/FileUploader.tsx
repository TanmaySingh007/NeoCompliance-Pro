
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Link, FileText, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

interface FileUploaderProps {
  onFileSelect: (file: File | string) => void;
  disabled?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, disabled }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      console.log('File dropped:', file.name, file.type, file.size);
      onFileSelect(file);
    }
  }, [onFileSelect, disabled]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      console.log('File selected:', file.name, file.type, file.size);
      onFileSelect(file);
    }
  }, [onFileSelect, disabled]);

  const handleUrlSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || !urlInput.trim()) return;

    console.log('URL submitted:', urlInput);
    onFileSelect(urlInput.trim());
    setUrlInput('');
  }, [onFileSelect, disabled, urlInput]);

  return (
    <Card className="w-full bg-slate-900/50 border-slate-700/50 backdrop-blur-sm" data-id="iy4kd49au" data-path="src/components/FileUploader.tsx">
      <CardContent className="p-6" data-id="a6w754n6c" data-path="src/components/FileUploader.tsx">
        <Tabs defaultValue="file" className="w-full" data-id="mzpus999w" data-path="src/components/FileUploader.tsx">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800/50" data-id="mq7bul7cd" data-path="src/components/FileUploader.tsx">
            <TabsTrigger value="file" className="data-[state=active]:bg-blue-600" data-id="gv2jv3zki" data-path="src/components/FileUploader.tsx">
              <FileText className="w-4 h-4 mr-2" data-id="lrwa3qppt" data-path="src/components/FileUploader.tsx" />
              Upload File
            </TabsTrigger>
            <TabsTrigger value="url" className="data-[state=active]:bg-blue-600" data-id="4m6agoa3n" data-path="src/components/FileUploader.tsx">
              <Link className="w-4 h-4 mr-2" data-id="olmuz2m06" data-path="src/components/FileUploader.tsx" />
              URL
            </TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="space-y-4" data-id="8z5lwkx26" data-path="src/components/FileUploader.tsx">
            <motion.div
              className={`
                relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300
                ${dragActive ?
              'border-blue-500 bg-blue-500/10' :
              'border-slate-600 hover:border-slate-500'}
                ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-slate-800/30'}
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              whileHover={!disabled ? { scale: 1.02 } : undefined}
              whileTap={!disabled ? { scale: 0.98 } : undefined} data-id="jtncs7zoc" data-path="src/components/FileUploader.tsx">

              <input
                type="file"
                accept="image/*,.pdf,.doc,.docx,.txt"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={disabled} data-id="0cc9z76v8" data-path="src/components/FileUploader.tsx" />

              
              <div className="space-y-4" data-id="1kwywebmv" data-path="src/components/FileUploader.tsx">
                <motion.div
                  animate={{ y: dragActive ? -5 : 0 }}
                  transition={{ duration: 0.2 }} data-id="fyf34znb6" data-path="src/components/FileUploader.tsx">

                  {selectedFile ?
                  <div className="flex items-center justify-center space-x-2 text-green-400" data-id="cjoovb68y" data-path="src/components/FileUploader.tsx">
                      {selectedFile.type.startsWith('image/') ?
                    <Image className="w-8 h-8" data-id="7v67jnl37" data-path="src/components/FileUploader.tsx" /> :

                    <FileText className="w-8 h-8" data-id="28uencvox" data-path="src/components/FileUploader.tsx" />
                    }
                      <span className="font-medium" data-id="2x73szak8" data-path="src/components/FileUploader.tsx">{selectedFile.name}</span>
                    </div> :

                  <Upload className="w-12 h-12 mx-auto text-slate-400" data-id="rkjbld5ii" data-path="src/components/FileUploader.tsx" />
                  }
                </motion.div>
                
                <div className="space-y-2" data-id="qct2s73dr" data-path="src/components/FileUploader.tsx">
                  <p className="text-lg font-medium text-slate-200" data-id="6d4b6asys" data-path="src/components/FileUploader.tsx">
                    {selectedFile ? 'File Selected' : 'Drop your advertisement here'}
                  </p>
                  <p className="text-sm text-slate-400" data-id="jurdemykd" data-path="src/components/FileUploader.tsx">
                    Supports JPG, PNG, PDF, DOC, DOCX, TXT files up to 10MB
                  </p>
                </div>

                {!selectedFile &&
                <Button variant="outline" className="mt-4 border-slate-600 hover:bg-slate-700" data-id="hrm8bjn04" data-path="src/components/FileUploader.tsx">
                    Choose File
                  </Button>
                }
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="url" className="space-y-4" data-id="sd1iby76t" data-path="src/components/FileUploader.tsx">
            <form onSubmit={handleUrlSubmit} className="space-y-4" data-id="6fuif2ju4" data-path="src/components/FileUploader.tsx">
              <div className="space-y-2" data-id="78it6itsy" data-path="src/components/FileUploader.tsx">
                <Label htmlFor="url-input" className="text-slate-200" data-id="92g3ng18j" data-path="src/components/FileUploader.tsx">
                  Advertisement URL
                </Label>
                <Input
                  id="url-input"
                  type="url"
                  placeholder="https://example.com/your-advertisement"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="bg-slate-800/50 border-slate-600 text-slate-200 placeholder:text-slate-400"
                  disabled={disabled} data-id="9itwrhnl2" data-path="src/components/FileUploader.tsx" />

              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={disabled || !urlInput.trim()} data-id="585tgz6qr" data-path="src/components/FileUploader.tsx">

                <Link className="w-4 h-4 mr-2" data-id="j2l1diy0o" data-path="src/components/FileUploader.tsx" />
                Analyze URL
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>);

};

export default FileUploader;