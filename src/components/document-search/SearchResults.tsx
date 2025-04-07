
import { FileText, Clock, ThumbsUp, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SearchResult {
  id: string;
  title: string;
  type: string;
  relevance: number;
  lastModified: string;
  summary: string;
  highlights: string[];
}

interface SearchResultsProps {
  results: SearchResult[];
}

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">
          {results.length} results found
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select className="text-sm border rounded-md px-2 py-1 bg-background">
            <option>Relevance</option>
            <option>Date (newest)</option>
            <option>Date (oldest)</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {results.map((result) => (
          <div key={result.id} className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded bg-muted shrink-0">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h4 className="font-medium truncate">{result.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge variant="outline">{result.type}</Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{result.relevance}% match</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Modified {result.lastModified}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </Button>
                    <Button variant="default" size="sm" className="gap-1">
                      <span>View</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-sm text-muted-foreground">
                    {result.summary}
                  </p>
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-xs font-medium">Key highlights:</p>
                  <ul className="text-xs text-muted-foreground">
                    {result.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-primary/80" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
