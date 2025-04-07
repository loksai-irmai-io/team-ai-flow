
import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

interface QuickActionProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}

export function QuickAction({ 
  title, 
  description, 
  icon, 
  onClick 
}: QuickActionProps) {
  return (
    <button 
      className="flex items-start p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors text-left w-full"
      onClick={onClick}
    >
      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center mr-4 shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
      <ArrowRight className="h-5 w-5 text-muted-foreground mt-1" />
    </button>
  );
}
