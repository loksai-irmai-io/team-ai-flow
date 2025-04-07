
import { useState } from 'react';
import { 
  CheckCircle, Clock, Calendar, Users, ListChecks, Mail, Copy, Download 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface ActionItem {
  task: string;
  assignee: string;
  dueDate: string;
}

interface MeetingSummaryProps {
  summary: {
    title: string;
    date: string;
    duration: string;
    participants: string[];
    summary: string;
    keyPoints: string[];
    actionItems: ActionItem[];
    followUpDate: string;
  };
}

export function MeetingSummary({ summary }: MeetingSummaryProps) {
  const [emailBody, setEmailBody] = useState(`
Dear Team,

Here is a summary of our "${summary.title}" meeting held on ${summary.date}:

SUMMARY:
${summary.summary}

KEY POINTS:
${summary.keyPoints.map(point => `- ${point}`).join('\n')}

ACTION ITEMS:
${summary.actionItems.map(item => `- ${item.task} (${item.assignee}) - Due: ${item.dueDate}`).join('\n')}

Our next follow-up meeting is scheduled for ${summary.followUpDate}.

Please let me know if you have any questions or need clarification on any items.

Best regards,
[Your Name]
  `);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailBody);
    toast.success('Email body copied to clipboard');
  };

  const handleDownloadSummary = () => {
    // Create a text version of the summary
    const summaryText = `
# ${summary.title}
Date: ${summary.date}
Duration: ${summary.duration}
Participants: ${summary.participants.join(', ')}

## Summary
${summary.summary}

## Key Points
${summary.keyPoints.map(point => `- ${point}`).join('\n')}

## Action Items
${summary.actionItems.map(item => `- ${item.task} (${item.assignee}) - Due: ${item.dueDate}`).join('\n')}

Follow-up Date: ${summary.followUpDate}
    `.trim();
    
    const blob = new Blob([summaryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meeting-summary.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Summary downloaded');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle>{summary.title}</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownloadSummary}
            className="gap-1"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download</span>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{summary.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{summary.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{summary.participants.length} participants</span>
            </div>
            <div className="flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{summary.actionItems.length} action items</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Summary</h3>
            <p className="text-sm text-muted-foreground">{summary.summary}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Key Points</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              {summary.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="mt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Action Items</h3>
            <ul className="text-sm space-y-2">
              {summary.actionItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2 p-2 rounded bg-muted/50">
                  <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 mt-0.5" />
                  <div>
                    <p className="font-medium">{item.task}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>Assignee: {item.assignee}</span>
                      <span>Due: {item.dueDate}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="email">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="email">Email Draft</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
        </TabsList>
        
        <TabsContent value="email">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md">Email Summary</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopyEmail}
                className="gap-1"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
              <div className="flex justify-end mt-4">
                <Button className="gap-1">
                  <Mail className="h-4 w-4" />
                  <span>Send Email</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="participants">
          <Card>
            <CardHeader>
              <CardTitle className="text-md">Meeting Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {summary.participants.map((participant, index) => (
                  <li key={index} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-sm">{participant.charAt(0)}</span>
                      </div>
                      <span>{participant}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {index === 0 ? 'Host' : 'Attendee'}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
