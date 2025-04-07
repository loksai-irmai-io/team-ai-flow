
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CodeDisplayCardProps {
  code: string;
  language: string;
  title?: string;
  actions?: ReactNode;
}

export function CodeDisplayCard({ 
  code, 
  language, 
  title, 
  actions 
}: CodeDisplayCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      {(title || actions) && (
        <div className="flex justify-between items-center px-4 py-2 border-b bg-muted/30">
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          {actions && <div>{actions}</div>}
        </div>
      )}
      
      <div className="bg-muted p-4 overflow-auto max-h-[500px]">
        <pre className={cn(
          "text-sm font-mono",
          language === "json" ? "text-green-600 dark:text-green-400" : 
          language === "xml" ? "text-blue-600 dark:text-blue-400" : ""
        )}>
          {code}
        </pre>
      </div>
    </div>
  );
}
