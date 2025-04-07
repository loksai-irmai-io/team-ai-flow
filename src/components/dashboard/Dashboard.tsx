
import { 
  LayoutDashboard, Search, Database, 
  Mic, FileCheck, ArrowUp, ArrowDown 
} from 'lucide-react';
import { StatCard } from './StatCard';
import { ActivityCard } from './ActivityCard';
import { QuickAction } from './QuickAction';

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    type: 'document' as const,
    title: 'Processed 3 new documents',
    time: '2 hours ago',
    description: 'Technical requirements, API specs, and user stories'
  },
  {
    id: 2,
    type: 'meeting' as const,
    title: 'Weekly Planning Meeting',
    time: 'Yesterday',
    description: 'Created summary with 5 action items'
  },
  {
    id: 3,
    type: 'sample' as const,
    title: 'Generated test data',
    time: '2 days ago',
    description: 'Created 50 sample records for User API'
  },
  {
    id: 4,
    type: 'nfr' as const,
    title: 'Updated NFR strategy',
    time: '3 days ago',
    description: 'Added performance testing requirements'
  }
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your team's productivity and recent activities
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Processed Documents" 
          value={42}
          trend={{ value: 12, isPositive: true }}
          icon={<Search className="h-5 w-5 text-primary" />}
        />
        <StatCard 
          title="Sample Datasets" 
          value={18}
          trend={{ value: 5, isPositive: true }}
          icon={<Database className="h-5 w-5 text-primary" />}
        />
        <StatCard 
          title="Meeting Minutes" 
          value={7}
          trend={{ value: 2, isPositive: false }}
          icon={<Mic className="h-5 w-5 text-primary" />}
        />
        <StatCard 
          title="NFR Documents" 
          value={12}
          trend={{ value: 8, isPositive: true }}
          icon={<FileCheck className="h-5 w-5 text-primary" />}
        />
      </div>

      {/* Quick Actions and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <QuickAction 
              title="Upload Documents" 
              description="Process new requirements or specifications"
              icon={<Search className="h-5 w-5 text-primary" />}
              onClick={() => console.log('Navigate to document search')}
            />
            <QuickAction 
              title="Generate Test Data" 
              description="Create sample data based on API specs"
              icon={<Database className="h-5 w-5 text-primary" />}
              onClick={() => console.log('Navigate to sample generator')}
            />
            <QuickAction 
              title="Record Meeting" 
              description="Transcribe and summarize team discussions"
              icon={<Mic className="h-5 w-5 text-primary" />}
              onClick={() => console.log('Navigate to meeting assistant')}
            />
            <QuickAction 
              title="Plan NFR Strategy" 
              description="Define non-functional requirements"
              icon={<FileCheck className="h-5 w-5 text-primary" />}
              onClick={() => console.log('Navigate to NFR strategy')}
            />
          </div>
        </div>
        <div>
          <ActivityCard activities={recentActivities} />
        </div>
      </div>
    </div>
  );
}
