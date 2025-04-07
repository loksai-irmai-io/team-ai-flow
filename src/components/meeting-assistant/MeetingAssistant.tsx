
import { useState } from 'react';
import { 
  Mic, Upload, Play, Pause, Mail, 
  Download, Copy, CheckCircle, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MeetingUploader } from './MeetingUploader';
import { MeetingRecorder } from './MeetingRecorder';
import { MeetingSummary } from './MeetingSummary';
import { toast } from 'sonner';

// Mock meeting summary data
const mockMeetingSummary = {
  title: "Weekly Sprint Planning Meeting",
  date: "April 7, 2025",
  duration: "45 minutes",
  participants: ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
  summary: "The team discussed the upcoming sprint goals and assigned tasks for the new feature implementation. The focus will be on completing the user authentication flow and starting work on the dashboard analytics. There were concerns about the API integration timeline that need to be addressed with the backend team.",
  keyPoints: [
    "Sprint goals align with Q2 roadmap objectives",
    "User authentication flow to be completed by end of sprint",
    "Dashboard analytics development to start after authentication is complete",
    "API integration timeline needs clarification from backend team"
  ],
  actionItems: [
    { task: "Complete user authentication flow mockups", assignee: "Sarah", dueDate: "April 10" },
    { task: "Schedule meeting with backend team about API timeline", assignee: "John", dueDate: "April 8" },
    { task: "Update sprint board with new tasks", assignee: "Alex", dueDate: "Today" },
    { task: "Share analytics requirements with data team", assignee: "Jane", dueDate: "April 9" }
  ],
  followUpDate: "April 14, 2025"
};

// Mock transcript data (truncated for brevity)
const mockTranscript = `
[00:00:05] John: Welcome everyone to our weekly sprint planning meeting. Let's get started by reviewing our goals for this sprint.

[00:00:15] Jane: Before we dive in, I wanted to mention that we've finally received the design specs for the user authentication flow.

[00:00:27] Alex: Great! That was blocking our progress. How complete are the specs?

[00:00:34] Jane: They're pretty detailed. We have all the screens, user flows, and error states.

[00:00:45] Sarah: Perfect. I can start working on the mockups right away.

[00:00:52] John: Excellent. Let's make completing the authentication flow our main priority for this sprint.

[00:01:05] Alex: I agree. And once that's done, we should start on the dashboard analytics, as discussed last week.

[00:01:15] Jane: About the dashboard - do we have clear requirements from the data team?

[00:01:22] John: Not yet. Jane, could you schedule a meeting with them this week?

[00:01:30] Jane: Sure, I'll reach out today.

[00:01:35] Sarah: I'm a bit concerned about the API integration timeline. The backend team mentioned they might need more time.

[00:01:45] John: That's a good point. I'll schedule a meeting with them tomorrow to clarify the timeline.

[00:01:55] Alex: In the meantime, I'll update our sprint board with the new tasks.

[00:02:05] John: Sounds good. Any other concerns before we wrap up?

[00:02:12] Team: [No response]

[00:02:18] John: Alright then. Let's meet again next Monday to check on our progress. Thanks everyone!
`;

export function MeetingAssistant() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState<typeof mockMeetingSummary | null>(null);

  const handleFileUploaded = (file: File) => {
    console.log('File uploaded:', file.name);
    // Simulate processing
    setIsProcessing(true);
    setIsTranscribing(true);
    
    // Simulate transcription (would be real-time with actual API)
    const transcriptLines = mockTranscript.split('\n');
    let currentLine = 0;
    
    const transcriptionInterval = setInterval(() => {
      if (currentLine < transcriptLines.length) {
        setTranscript(prev => prev + transcriptLines[currentLine] + '\n');
        currentLine++;
      } else {
        clearInterval(transcriptionInterval);
        setIsTranscribing(false);
        
        // Once transcription is done, generate summary
        setTimeout(() => {
          setSummary(mockMeetingSummary);
          setIsProcessing(false);
          setHasProcessed(true);
          toast.success('Meeting processed successfully');
        }, 1500);
      }
    }, 300);
  };

  const handleRecordingComplete = (audioBlob: Blob) => {
    console.log('Recording complete, blob size:', audioBlob.size);
    // Similar processing logic as file upload
    setIsProcessing(true);
    setIsTranscribing(true);
    
    const transcriptLines = mockTranscript.split('\n');
    let currentLine = 0;
    
    const transcriptionInterval = setInterval(() => {
      if (currentLine < transcriptLines.length) {
        setTranscript(prev => prev + transcriptLines[currentLine] + '\n');
        currentLine++;
      } else {
        clearInterval(transcriptionInterval);
        setIsTranscribing(false);
        
        setTimeout(() => {
          setSummary(mockMeetingSummary);
          setIsProcessing(false);
          setHasProcessed(true);
          toast.success('Meeting processed successfully');
        }, 1500);
      }
    }, 300);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Meeting Assistant</h1>
        <p className="text-muted-foreground mt-1">
          Record, transcribe, and summarize meetings with AI-powered insights
        </p>
      </div>

      {!hasProcessed ? (
        <Tabs defaultValue="upload">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="upload">Upload Recording</TabsTrigger>
            <TabsTrigger value="record">Record Meeting</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <MeetingUploader onFileUploaded={handleFileUploaded} />
          </TabsContent>
          
          <TabsContent value="record">
            <MeetingRecorder onRecordingComplete={handleRecordingComplete} />
          </TabsContent>
        </Tabs>
      ) : null}

      {(isTranscribing || transcript) && (
        <div className="border rounded-lg p-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Transcript</h3>
              {isTranscribing && (
                <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full text-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  <span>Transcribing...</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  navigator.clipboard.writeText(transcript);
                  toast.success('Transcript copied to clipboard');
                }}
                disabled={isTranscribing || !transcript}
              >
                <Copy className="h-3.5 w-3.5 mr-1" />
                <span>Copy</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const blob = new Blob([transcript], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'meeting-transcript.txt';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                  toast.success('Transcript downloaded');
                }}
                disabled={isTranscribing || !transcript}
              >
                <Download className="h-3.5 w-3.5 mr-1" />
                <span>Download</span>
              </Button>
            </div>
          </div>
          <div className="bg-muted/30 p-4 rounded-md h-64 overflow-auto font-mono text-sm">
            {transcript || (
              <div className="text-muted-foreground italic">
                Transcript will appear here as the meeting is processed...
              </div>
            )}
          </div>
        </div>
      )}

      {summary && <MeetingSummary summary={summary} />}
    </div>
  );
}
