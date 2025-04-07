
import { useState } from 'react';
import { 
  Zap, Shield, Database, Server, RotateCcw, Save
} from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface NFRFormProps {
  formData: {
    performance: {
      responseTime: string;
      throughput: string;
      resourceUsage: string;
    };
    scalability: {
      userBase: string;
      dataVolume: string;
      geographicDistribution: string;
    };
    security: {
      dataClassification: string;
      authenticationLevel: string;
      complianceRequirements: string;
    };
    reliability: {
      availability: string;
      faultTolerance: string;
      disasterRecovery: string;
    };
  };
  onSubmit: (data: NFRFormProps['formData']) => void;
}

export function NFRForm({ formData, onSubmit }: NFRFormProps) {
  const [localFormData, setLocalFormData] = useState(formData);

  const handleChange = (category: keyof typeof formData, field: string, value: string) => {
    setLocalFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(localFormData);
  };

  const handleReset = () => {
    setLocalFormData(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Non-Functional Requirements</CardTitle>
          <CardDescription>
            Define the performance, scalability, security, and reliability requirements for your system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" defaultValue={['performance']}>
            <AccordionItem value="performance">
              <AccordionTrigger className="gap-2">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span>Performance Requirements</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 py-2">
                  <div>
                    <Label htmlFor="response-time">Response Time</Label>
                    <Select
                      value={localFormData.performance.responseTime}
                      onValueChange={(value) => handleChange('performance', 'responseTime', value)}
                    >
                      <SelectTrigger id="response-time" className="mt-1.5">
                        <SelectValue placeholder="Select response time requirements" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (&lt; 1s response time)</SelectItem>
                        <SelectItem value="medium">Medium (&lt; 500ms response time)</SelectItem>
                        <SelectItem value="high">High (&lt; 100ms response time)</SelectItem>
                        <SelectItem value="critical">Critical (&lt; 50ms response time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="throughput">Throughput</Label>
                    <Select
                      value={localFormData.performance.throughput}
                      onValueChange={(value) => handleChange('performance', 'throughput', value)}
                    >
                      <SelectTrigger id="throughput" className="mt-1.5">
                        <SelectValue placeholder="Select throughput requirements" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (10 req/sec)</SelectItem>
                        <SelectItem value="medium">Medium (100 req/sec)</SelectItem>
                        <SelectItem value="high">High (1,000 req/sec)</SelectItem>
                        <SelectItem value="critical">Critical (10,000+ req/sec)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="resource-usage">Resource Usage</Label>
                    <Select
                      value={localFormData.performance.resourceUsage}
                      onValueChange={(value) => handleChange('performance', 'resourceUsage', value)}
                    >
                      <SelectTrigger id="resource-usage" className="mt-1.5">
                        <SelectValue placeholder="Select resource usage requirements" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Minimal resource constraints)</SelectItem>
                        <SelectItem value="medium">Medium (Standard resource allocation)</SelectItem>
                        <SelectItem value="high">High (Optimized resource usage)</SelectItem>
                        <SelectItem value="critical">Critical (Resource usage minimization)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="scalability">
              <AccordionTrigger className="gap-2">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-blue-500" />
                  <span>Scalability Requirements</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 py-2">
                  <div>
                    <Label htmlFor="user-base">User Base</Label>
                    <Select
                      value={localFormData.scalability.userBase}
                      onValueChange={(value) => handleChange('scalability', 'userBase', value)}
                    >
                      <SelectTrigger id="user-base" className="mt-1.5">
                        <SelectValue placeholder="Select user base scale" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Small (&lt; 1,000 users)</SelectItem>
                        <SelectItem value="medium">Medium (1,000 - 10,000 users)</SelectItem>
                        <SelectItem value="high">Large (10,000 - 100,000 users)</SelectItem>
                        <SelectItem value="critical">Enterprise (100,000+ users)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="data-volume">Data Volume</Label>
                    <Select
                      value={localFormData.scalability.dataVolume}
                      onValueChange={(value) => handleChange('scalability', 'dataVolume', value)}
                    >
                      <SelectTrigger id="data-volume" className="mt-1.5">
                        <SelectValue placeholder="Select data volume requirements" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Small (&lt; 10GB)</SelectItem>
                        <SelectItem value="medium">Medium (10GB - 100GB)</SelectItem>
                        <SelectItem value="high">Large (100GB - 1TB)</SelectItem>
                        <SelectItem value="critical">Very Large (1TB+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="geographic-distribution">Geographic Distribution</Label>
                    <Select
                      value={localFormData.scalability.geographicDistribution}
                      onValueChange={(value) => handleChange('scalability', 'geographicDistribution', value)}
                    >
                      <SelectTrigger id="geographic-distribution" className="mt-1.5">
                        <SelectValue placeholder="Select geographic distribution" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Single Region</SelectItem>
                        <SelectItem value="medium">Multi-Region (same continent)</SelectItem>
                        <SelectItem value="high">Global (multiple continents)</SelectItem>
                        <SelectItem value="critical">Global with compliance requirements</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="security">
              <AccordionTrigger className="gap-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-red-500" />
                  <span>Security Requirements</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 py-2">
                  <div>
                    <Label htmlFor="data-classification">Data Classification</Label>
                    <Select
                      value={localFormData.security.dataClassification}
                      onValueChange={(value) => handleChange('security', 'dataClassification', value)}
                    >
                      <SelectTrigger id="data-classification" className="mt-1.5">
                        <SelectValue placeholder="Select data classification" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="internal">Internal</SelectItem>
                        <SelectItem value="sensitive">Sensitive</SelectItem>
                        <SelectItem value="regulated">Regulated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="authentication-level">Authentication Level</Label>
                    <Select
                      value={localFormData.security.authenticationLevel}
                      onValueChange={(value) => handleChange('security', 'authenticationLevel', value)}
                    >
                      <SelectTrigger id="authentication-level" className="mt-1.5">
                        <SelectValue placeholder="Select authentication level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Basic (Username/Password)</SelectItem>
                        <SelectItem value="medium">Standard (OAuth, JWT)</SelectItem>
                        <SelectItem value="high">Advanced (MFA, SSO)</SelectItem>
                        <SelectItem value="critical">Enterprise (Biometric, Hardware tokens)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="compliance-requirements">Compliance Requirements</Label>
                    <Select
                      value={localFormData.security.complianceRequirements}
                      onValueChange={(value) => handleChange('security', 'complianceRequirements', value)}
                    >
                      <SelectTrigger id="compliance-requirements" className="mt-1.5">
                        <SelectValue placeholder="Select compliance requirements" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="low">Basic (Industry standards)</SelectItem>
                        <SelectItem value="medium">Standard (SOC2, ISO27001)</SelectItem>
                        <SelectItem value="high">Regulated (GDPR, HIPAA)</SelectItem>
                        <SelectItem value="critical">Critical (PCI-DSS, Financial)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="reliability">
              <AccordionTrigger className="gap-2">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-purple-500" />
                  <span>Reliability Requirements</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 py-2">
                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Select
                      value={localFormData.reliability.availability}
                      onValueChange={(value) => handleChange('reliability', 'availability', value)}
                    >
                      <SelectTrigger id="availability" className="mt-1.5">
                        <SelectValue placeholder="Select availability requirements" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Standard (99.0% uptime)</SelectItem>
                        <SelectItem value="medium">High (99.9% uptime)</SelectItem>
                        <SelectItem value="high">Very High (99.99% uptime)</SelectItem>
                        <SelectItem value="critical">Critical (99.999%+ uptime)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="fault-tolerance">Fault Tolerance</Label>
                    <Select
                      value={localFormData.reliability.faultTolerance}
                      onValueChange={(value) => handleChange('reliability', 'faultTolerance', value)}
                    >
                      <SelectTrigger id="fault-tolerance" className="mt-1.5">
                        <SelectValue placeholder="Select fault tolerance level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Basic (Graceful degradation)</SelectItem>
                        <SelectItem value="medium">Standard (Redundant components)</SelectItem>
                        <SelectItem value="high">High (Multi-region redundancy)</SelectItem>
                        <SelectItem value="critical">Critical (Zero data loss)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="disaster-recovery">Disaster Recovery</Label>
                    <Select
                      value={localFormData.reliability.disasterRecovery}
                      onValueChange={(value) => handleChange('reliability', 'disasterRecovery', value)}
                    >
                      <SelectTrigger id="disaster-recovery" className="mt-1.5">
                        <SelectValue placeholder="Select disaster recovery requirements" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Basic (Backup and restore)</SelectItem>
                        <SelectItem value="medium">Standard (Daily backups, RTO &lt; 24h)</SelectItem>
                        <SelectItem value="high">High (Warm standby, RTO &lt; 4h)</SelectItem>
                        <SelectItem value="critical">Critical (Hot standby, RTO &lt; 15min)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            type="button" 
            onClick={handleReset}
            className="gap-1"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </Button>
          <Button type="submit" className="gap-1">
            <Save className="h-4 w-4" />
            <span>Save & Generate Recommendations</span>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
