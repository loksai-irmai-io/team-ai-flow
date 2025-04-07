
import { useState } from 'react';
import { Upload, File, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface DocumentUploaderProps {
  onUploadComplete: () => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
}

export function DocumentUploader({ onUploadComplete }: DocumentUploaderProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map(file => ({
      id: Math.random().toString(36).substring(2, 11),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'uploading' as const
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach(file => {
      simulateFileUpload(file.id);
    });
  };

  const simulateFileUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => 
          prev.map(f => 
            f.id === fileId 
              ? { ...f, progress: 100, status: 'complete' } 
              : f
          )
        );
        
        // Check if all files are complete
        const allComplete = files.every(f => f.status === 'complete');
        if (allComplete) {
          toast.success('All documents uploaded successfully');
          onUploadComplete();
        }
      } else {
        setFiles(prev => 
          prev.map(f => 
            f.id === fileId 
              ? { ...f, progress: Math.round(progress) } 
              : f
          )
        );
      }
    }, 200);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/30'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleFileDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-3 rounded-full bg-secondary">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Drag & drop documents here</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Or click to browse from your computer
            </p>
          </div>
          <div className="text-xs text-muted-foreground">
            Supports PDF, Word, Excel, and text files up to 50MB
          </div>
          <label className="cursor-pointer">
            <Button variant="default">
              Select Documents
            </Button>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt,.xlsx,.ppt,.pptx"
              className="hidden"
              onChange={handleFileSelect}
            />
          </label>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Uploaded Documents</h3>
          <div className="space-y-3">
            {files.map((file) => (
              <div key={file.id} className="p-3 border rounded-lg flex items-center">
                <div className="p-2 rounded bg-secondary mr-3">
                  <File className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="truncate pr-4">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • {
                          file.type.split('/')[1]?.toUpperCase() || 'Document'
                        }
                      </p>
                    </div>
                    <div className="flex items-center">
                      {file.status === 'complete' ? (
                        <div className="p-1 rounded-full bg-green-100 dark:bg-green-900">
                          <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                      ) : (
                        <button
                          onClick={() => removeFile(file.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress value={file.progress} className="h-1.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
