
import { useState } from 'react';
import { CheckSquare, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface TestingStrategyProps {
  nfrRequirements: {
    performance: Record<string, string>;
    scalability: Record<string, string>;
    security: Record<string, string>;
    reliability: Record<string, string>;
  };
}

// Mock testing strategy data
const mockedTestingStrategy = [
  {
    id: 1,
    category: 'Performance Testing',
    description: 'Verify system response times under varying loads',
    testCases: [
      { id: 101, name: 'Response Time Test', status: 'pending', priority: 'high' },
      { id: 102, name: 'Load Test (100 concurrent users)', status: 'pending', priority: 'high' },
      { id: 103, name: 'Stress Test (1000+ concurrent users)', status: 'pending', priority: 'medium' },
      { id: 104, name: 'Endurance Test (24-hour continuous load)', status: 'pending', priority: 'low' },
    ]
  },
  {
    id: 2,
    category: 'Scalability Testing',
    description: 'Verify ability to handle growth in users, data, and geographic distribution',
    testCases: [
      { id: 201, name: 'Database Scaling Test', status: 'pending', priority: 'high' },
      { id: 202, name: 'Horizontal Scaling Test', status: 'pending', priority: 'medium' },
      { id: 203, name: 'Data Volume Growth Test', status: 'pending', priority: 'medium' },
    ]
  },
  {
    id: 3,
    category: 'Security Testing',
    description: 'Identify vulnerabilities and ensure compliance with security standards',
    testCases: [
      { id: 301, name: 'Authentication & Authorization Test', status: 'pending', priority: 'high' },
      { id: 302, name: 'Penetration Testing', status: 'pending', priority: 'high' },
      { id: 303, name: 'Data Encryption Test', status: 'pending', priority: 'high' },
      { id: 304, name: 'API Security Test', status: 'pending', priority: 'medium' },
      { id: 305, name: 'Session Management Test', status: 'pending', priority: 'medium' },
    ]
  },
  {
    id: 4,
    category: 'Reliability Testing',
    description: 'Ensure system stability, availability, and recoverability',
    testCases: [
      { id: 401, name: 'Availability Test', status: 'pending', priority: 'high' },
      { id: 402, name: 'Failover Test', status: 'pending', priority: 'high' },
      { id: 403, name: 'Disaster Recovery Test', status: 'pending', priority: 'medium' },
      { id: 404, name: 'Data Backup & Restore Test', status: 'pending', priority: 'medium' },
    ]
  }
];

export function TestingStrategy({ nfrRequirements }: TestingStrategyProps) {
  const [testStrategy, setTestStrategy] = useState(mockedTestingStrategy);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([1]);
  const [selectedTestCases, setSelectedTestCases] = useState<number[]>([]);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleTestCase = (testCaseId: number) => {
    setSelectedTestCases(prev => 
      prev.includes(testCaseId)
        ? prev.filter(id => id !== testCaseId)
        : [...prev, testCaseId]
    );
  };

  const toggleAll = (categoryId: number, selected: boolean) => {
    const category = testStrategy.find(cat => cat.id === categoryId);
    if (!category) return;
    
    const testCaseIds = category.testCases.map(tc => tc.id);
    
    if (selected) {
      // Add all test cases from this category
      setSelectedTestCases(prev => [...prev, ...testCaseIds.filter(id => !prev.includes(id))]);
    } else {
      // Remove all test cases from this category
      setSelectedTestCases(prev => prev.filter(id => !testCaseIds.includes(id)));
    }
  };

  const getRequirementSeverity = (category: string) => {
    let severity = 0;
    
    if (category === 'Performance Testing') {
      const perf = nfrRequirements.performance;
      severity += perf.responseTime === 'high' || perf.responseTime === 'critical' ? 2 : 1;
      severity += perf.throughput === 'high' || perf.throughput === 'critical' ? 2 : 1;
    } else if (category === 'Scalability Testing') {
      const scal = nfrRequirements.scalability;
      severity += scal.userBase === 'high' || scal.userBase === 'critical' ? 2 : 1;
      severity += scal.dataVolume === 'high' || scal.dataVolume === 'critical' ? 2 : 1;
    } else if (category === 'Security Testing') {
      const sec = nfrRequirements.security;
      severity += sec.dataClassification === 'sensitive' || sec.dataClassification === 'regulated' ? 2 : 1;
      severity += sec.authenticationLevel === 'high' || sec.authenticationLevel === 'critical' ? 2 : 1;
    } else if (category === 'Reliability Testing') {
      const rel = nfrRequirements.reliability;
      severity += rel.availability === 'high' || rel.availability === 'critical' ? 2 : 1;
      severity += rel.faultTolerance === 'high' || rel.faultTolerance === 'critical' ? 2 : 1;
    }
    
    return severity >= 4 ? 'Critical' : severity >= 3 ? 'High' : severity >= 2 ? 'Medium' : 'Low';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Testing Checklist
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Selected: {selectedTestCases.length}</span>
          <Button variant="outline" size="sm">
            Generate Test Plan
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {testStrategy.map(category => {
          const isExpanded = expandedCategories.includes(category.id);
          const allSelected = category.testCases.every(tc => selectedTestCases.includes(tc.id));
          const someSelected = category.testCases.some(tc => selectedTestCases.includes(tc.id));
          const requirementLevel = getRequirementSeverity(category.category);
          
          return (
            <div key={category.id} className="border rounded-lg overflow-hidden">
              <div 
                className="flex items-center justify-between p-4 bg-muted/30 cursor-pointer"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={allSelected}
                      onCheckedChange={(checked) => {
                        toggleAll(category.id, checked);
                        // Prevent the click from propagating to the category toggle
                        event?.stopPropagation();
                      }}
                      className={someSelected && !allSelected ? "data-[state=checked]:bg-amber-500" : ""}
                    />
                    <h3 className="font-medium">{category.category}</h3>
                  </div>
                  
                  <div className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    requirementLevel === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                    requirementLevel === 'High' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                    requirementLevel === 'Medium' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  }`}>
                    {requirementLevel} Priority
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {category.testCases.filter(tc => selectedTestCases.includes(tc.id)).length} / {category.testCases.length} selected
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
              
              {isExpanded && (
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10">Select</TableHead>
                        <TableHead>Test Case</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {category.testCases.map(testCase => (
                        <TableRow key={testCase.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Switch 
                                checked={selectedTestCases.includes(testCase.id)}
                                onCheckedChange={() => toggleTestCase(testCase.id)}
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{testCase.name}</TableCell>
                          <TableCell>
                            <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              testCase.priority === 'high' 
                                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                                : testCase.priority === 'medium'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                                : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            }`}>
                              {testCase.priority.charAt(0).toUpperCase() + testCase.priority.slice(1)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-amber-500" />
                              <span>Pending</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                              <CheckSquare className="h-3.5 w-3.5" />
                              <span>Details</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-end gap-3">
        <Button variant="outline">
          Save Checklist
        </Button>
        <Button>
          Export Test Plan
        </Button>
      </div>
    </div>
  );
}
