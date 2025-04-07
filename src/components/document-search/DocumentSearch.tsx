
import { useState } from 'react';
import { Search, Upload, FileText, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentUploader } from './DocumentUploader';
import { SearchResults } from './SearchResults';

// Mock data for search results
const mockResults = [
  {
    id: '1',
    title: 'System Architecture Document',
    type: 'PDF',
    relevance: 95,
    lastModified: '2023-12-10',
    summary: 'This document outlines the overall system architecture including microservices, APIs, data flows, and integration points with third-party systems.',
    highlights: [
      'Microservice architecture with 12 core services',
      'RESTful API design principles and standards',
      'Event-driven communication using Kafka'
    ]
  },
  {
    id: '2',
    title: 'API Technical Specification',
    type: 'Word',
    relevance: 87,
    lastModified: '2024-01-05',
    summary: 'Detailed specification of the User Management API including endpoints, request/response formats, authentication mechanisms, and error handling.',
    highlights: [
      'OAuth 2.0 and JWT authentication',
      'Rate limiting implementation',
      'Pagination and filtering capabilities'
    ]
  },
  {
    id: '3',
    title: 'Performance Testing Strategy',
    type: 'PDF',
    relevance: 82,
    lastModified: '2023-11-20',
    summary: 'Strategy document for load and performance testing including test scenarios, tools, environments, and acceptance criteria.',
    highlights: [
      'JMeter test plans for core APIs',
      'Performance benchmarks for 10,000 concurrent users',
      'Response time requirements per endpoint'
    ]
  },
  {
    id: '4',
    title: 'Database Schema Documentation',
    type: 'Text',
    relevance: 78,
    lastModified: '2024-02-15',
    summary: 'Comprehensive database schema documentation with entity relationships, indexes, and optimization strategies.',
    highlights: [
      'Normalized schema for transaction processing',
      'Denormalized views for reporting',
      'Indexing strategy for performance optimization'
    ]
  }
];

export function DocumentSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('search');
  const [results, setResults] = useState<typeof mockResults>([]);

  const handleSearch = () => {
    // In a real app, this would call an API
    console.log('Searching for:', searchQuery);
    setResults(mockResults);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Document Search Engine</h1>
        <p className="text-muted-foreground mt-1">
          Upload, search, and analyze technical documents with AI-powered insights
        </p>
      </div>

      <Tabs defaultValue="search" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="search">Search Documents</TabsTrigger>
          <TabsTrigger value="upload">Upload Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="search" className="space-y-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10 pr-20"
              placeholder="Search for API specifications, requirements, architectures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8" 
              size="sm"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>

          <div className="bg-muted/30 border rounded-lg p-4 flex gap-4 items-start max-w-2xl">
            <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">
                Try natural language queries like <strong>"API authentication methods"</strong> or <strong>"performance requirements for the payment service"</strong>. 
                Our AI will understand context and extract relevant information.
              </p>
            </div>
          </div>

          {results.length > 0 && <SearchResults results={results} />}
        </TabsContent>
        
        <TabsContent value="upload">
          <DocumentUploader 
            onUploadComplete={() => {
              // In a real app, this would process the uploaded documents
              console.log('Upload complete');
              // Switch back to search tab
              setActiveTab('search');
            }} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
