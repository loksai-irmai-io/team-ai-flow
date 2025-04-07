
import { useState } from 'react';
import { Upload, File, X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface MeetingUploaderProps {
  onFileUploaded: (file: File) => void;
}

export function MeetingUploader({ onFileUploaded }: MeetingUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    setProgress(0);
    setIsUploading(false);
  };

  const processFile = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate upload progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgress(100);
        setIsUploading(false);
        onFileUploaded(file);
      } else {
        setProgress(currentProgress);
      }
    }, 100);
  };

  return (
    <div className="space-y-6">
      {!file ? (
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
              <h3 className="text-lg font-medium">Upload meeting recording</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Drag and drop your audio file or click to browse
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              Supports MP3, WAV, M4A files up to 500MB
            </div>
            <label className="cursor-pointer">
              <Button variant="default">
                Select Audio File
              </Button>
              <input
                type="file"
                accept=".mp3,.wav,.m4a,.mp4"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded bg-secondary">
                <File className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • {
                    file.type.split('/')[1]?.toUpperCase() || 'Audio'
                  }
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={clearFile}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {isUploading ? (
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs text-muted-foreground">Uploading...</p>
                <p className="text-xs font-medium">{progress}%</p>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          ) : (
            <div className="mt-3 flex justify-end">
              <Button onClick={processFile} className="gap-1">
                <Play className="h-4 w-4" />
                <span>Process Recording</span>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
