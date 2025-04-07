
import { useState, useEffect, useRef } from 'react';
import { Mic, Square, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface MeetingRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
}

export function MeetingRecorder({ onRecordingComplete }: MeetingRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState(0);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Clean up on unmount
    return () => {
      if (timerIntervalRef.current) {
        window.clearInterval(timerIntervalRef.current);
      }
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return [
      hrs > 0 ? hrs.toString().padStart(2, '0') : null,
      mins.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].filter(Boolean).join(':');
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mpeg' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        
        // Stop all tracks in the stream
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
      setTimer(0);
      
      // Start timer
      timerIntervalRef.current = window.setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
      
      toast.success('Recording started');
    } catch (error) {
      console.error('Error starting recording:', error);
      toast.error('Could not access microphone. Please check permissions.');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      
      if (timerIntervalRef.current) {
        window.clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      
      toast.info('Recording paused');
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      
      // Resume timer
      timerIntervalRef.current = window.setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
      
      toast.info('Recording resumed');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      
      if (timerIntervalRef.current) {
        window.clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      
      toast.success('Recording completed');
    }
  };

  const submitRecording = () => {
    if (audioChunksRef.current.length > 0) {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mpeg' });
      onRecordingComplete(audioBlob);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-6 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`p-4 rounded-full ${
            isRecording 
              ? isPaused 
                ? 'bg-amber-100 dark:bg-amber-900/50' 
                : 'bg-red-100 dark:bg-red-900/50 animate-pulse' 
              : 'bg-secondary'
          }`}>
            <Mic className={`h-8 w-8 ${
              isRecording 
                ? isPaused 
                  ? 'text-amber-500' 
                  : 'text-red-500' 
                : 'text-primary'
            }`} />
          </div>
          
          <div className="text-2xl font-mono font-medium">
            {formatTime(timer)}
          </div>
          
          <div className="text-muted-foreground text-sm">
            {!isRecording 
              ? 'Ready to record' 
              : isPaused 
                ? 'Recording paused' 
                : 'Recording in progress...'
            }
          </div>
          
          <div className="flex gap-3">
            {!isRecording ? (
              <Button onClick={startRecording} className="gap-1">
                <Mic className="h-4 w-4" />
                <span>Start Recording</span>
              </Button>
            ) : (
              <>
                {isPaused ? (
                  <Button onClick={resumeRecording} variant="outline" className="gap-1">
                    <Play className="h-4 w-4" />
                    <span>Resume</span>
                  </Button>
                ) : (
                  <Button onClick={pauseRecording} variant="outline" className="gap-1">
                    <Pause className="h-4 w-4" />
                    <span>Pause</span>
                  </Button>
                )}
                <Button onClick={stopRecording} variant="destructive" className="gap-1">
                  <Square className="h-4 w-4" />
                  <span>Stop</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {audioURL && (
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">Recording Preview</h3>
          <audio src={audioURL} controls className="w-full mb-4" />
          <div className="flex justify-end">
            <Button onClick={submitRecording} className="gap-1">
              <Play className="h-4 w-4" />
              <span>Process Recording</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
