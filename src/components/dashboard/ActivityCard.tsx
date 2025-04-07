
import { Clock } from 'lucide-react';

interface Activity {
  id: number;
  type: 'document' | 'meeting' | 'sample' | 'nfr';
  title: string;
  time: string;
  description: string;
}

interface ActivityCardProps {
  activities: Activity[];
}

// Helper function to get activity icon
const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'document':
      return <div className="w-2 h-2 rounded-full bg-blue-500" />;
    case 'meeting':
      return <div className="w-2 h-2 rounded-full bg-green-500" />;
    case 'sample':
      return <div className="w-2 h-2 rounded-full bg-amber-500" />;
    case 'nfr':
      return <div className="w-2 h-2 rounded-full bg-purple-500" />;
    default:
      return null;
  }
};

export function ActivityCard({ activities }: ActivityCardProps) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Recent Activity</h3>
        <button className="text-xs text-muted-foreground hover:text-foreground">
          View all
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-muted">
              {getActivityIcon(activity.type)}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {activity.title}
              </p>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
