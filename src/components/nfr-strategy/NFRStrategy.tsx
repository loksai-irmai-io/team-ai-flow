
import { useState } from 'react';
import { FileCheck, Settings, Zap, Shield, Database, Server, Gauge, CheckCircle2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NFRForm } from './NFRForm';
import { TestingStrategy } from './TestingStrategy';
import { toast } from 'sonner';

// Mock NFR suggestions based on user input
const mockSuggestions = {
  performance: [
    "Implement caching for frequently accessed data",
    "Use pagination for large data sets",
    "Optimize database queries",
    "Consider using a CDN for static assets",
    "Implement request batching for API calls"
  ],
  scalability: [
    "Design for horizontal scaling",
    "Implement database sharding",
    "Use load balancers for traffic distribution",
    "Implement auto-scaling for cloud resources",
    "Design with stateless components where possible"
  ],
  security: [
    "Implement OAuth 2.0 with JWT for authentication",
    "Use HTTPS for all connections",
    "Implement rate limiting",
    "Regular security audits and penetration testing",
    "Follow secure coding practices"
  ],
  reliability: [
    "Implement circuit breakers for external services",
    "Design for graceful degradation",
    "Implement comprehensive error handling",
    "Set up automated health checks",
    "Implement retry mechanisms with exponential backoff"
  ]
};

export function NFRStrategy() {
  const [activeTab, setActiveTab] = useState('requirements');
  const [formData, setFormData] = useState({
    performance: {
      responseTime: 'medium',
      throughput: 'high',
      resourceUsage: 'medium'
    },
    scalability: {
      userBase: 'medium',
      dataVolume: 'high',
      geographicDistribution: 'low'
    },
    security: {
      dataClassification: 'sensitive',
      authenticationLevel: 'high',
      complianceRequirements: 'medium'
    },
    reliability: {
      availability: 'high',
      faultTolerance: 'medium',
      disasterRecovery: 'medium'
    }
  });
  
  const [suggestions, setSuggestions] = useState<Record<string, string[]>>(mockSuggestions);

  const handleFormSubmit = (newData: typeof formData) => {
    console.log('Form submitted with data:', newData);
    setFormData(newData);
    
    // In a real application, this would call an API to get AI suggestions
    // For demo purposes, we'll just update the UI
    toast.success('NFR requirements updated');
    
    // Simulate AI processing
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)), 
      {
        loading: 'Analyzing requirements with AI...',
        success: 'AI suggestions generated',
        error: 'Failed to generate suggestions'
      }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">NFR & Testing Strategy</h1>
        <p className="text-muted-foreground mt-1">
          Define non-functional requirements and generate testing strategies with AI assistance
        </p>
      </div>

      <Tabs defaultValue="requirements" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="requirements">NFR Requirements</TabsTrigger>
          <TabsTrigger value="testing">Testing Strategy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="requirements">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <NFRForm formData={formData} onSubmit={handleFormSubmit} />
            </div>
            
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span>AI Suggestions</span>
                </h3>
                
                <div className="space-y-4">
                  {Object.entries(suggestions).map(([category, items]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="text-sm font-medium capitalize">{category}</h4>
                      <ul className="space-y-1.5">
                        {items.slice(0, 3).map((item, index) => (
                          <li key={index} className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                  <p>Suggestions are based on your selected requirements and industry best practices.</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Server className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Infrastructure Recommendation</h4>
                    <p className="text-xs text-muted-foreground">
                      Auto-scaling cloud infrastructure with load balancing
                    </p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30">
                    <Gauge className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Performance Target</h4>
                    <p className="text-xs text-muted-foreground">
                      Response time &lt; 200ms, 99.9% availability
                    </p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
                    <Shield className="h-4 w-4 text-red-500 dark:text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Security Assessment</h4>
                    <p className="text-xs text-muted-foreground">
                      Medium risk profile, regular pen testing required
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="testing">
          <TestingStrategy nfrRequirements={formData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
