
import { useState } from 'react';
import { Database, Copy, Download, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CodeDisplayCard } from './CodeDisplayCard';
import { SpecificationForm } from './SpecificationForm';
import { toast } from 'sonner';

// Mock sample data for display
const mockJsonData = {
  "users": [
    {
      "id": "usr_001",
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@example.com",
      "role": "admin",
      "permissions": ["read", "write", "delete"],
      "createdAt": "2023-05-15T08:30:00Z",
      "status": "active",
      "preferences": {
        "theme": "dark",
        "notifications": true,
        "language": "en-US"
      },
      "address": {
        "street": "123 Main St",
        "city": "Boston",
        "state": "MA",
        "zipCode": "02108",
        "country": "USA"
      }
    },
    {
      "id": "usr_002",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane.doe@example.com",
      "role": "user",
      "permissions": ["read", "write"],
      "createdAt": "2023-06-22T14:45:00Z",
      "status": "inactive",
      "preferences": {
        "theme": "light",
        "notifications": false,
        "language": "en-GB"
      },
      "address": {
        "street": "456 Elm Street",
        "city": "London",
        "state": null,
        "zipCode": "SW1A 1AA",
        "country": "UK"
      }
    }
  ]
};

const mockXmlData = `<?xml version="1.0" encoding="UTF-8"?>
<users>
  <user id="usr_001">
    <firstName>John</firstName>
    <lastName>Smith</lastName>
    <email>john.smith@example.com</email>
    <role>admin</role>
    <permissions>
      <permission>read</permission>
      <permission>write</permission>
      <permission>delete</permission>
    </permissions>
    <createdAt>2023-05-15T08:30:00Z</createdAt>
    <status>active</status>
    <preferences>
      <theme>dark</theme>
      <notifications>true</notifications>
      <language>en-US</language>
    </preferences>
    <address>
      <street>123 Main St</street>
      <city>Boston</city>
      <state>MA</state>
      <zipCode>02108</zipCode>
      <country>USA</country>
    </address>
  </user>
  <user id="usr_002">
    <firstName>Jane</firstName>
    <lastName>Doe</lastName>
    <email>jane.doe@example.com</email>
    <role>user</role>
    <permissions>
      <permission>read</permission>
      <permission>write</permission>
    </permissions>
    <createdAt>2023-06-22T14:45:00Z</createdAt>
    <status>inactive</status>
    <preferences>
      <theme>light</theme>
      <notifications>false</notifications>
      <language>en-GB</language>
    </preferences>
    <address>
      <street>456 Elm Street</street>
      <city>London</city>
      <state></state>
      <zipCode>SW1A 1AA</zipCode>
      <country>UK</country>
    </address>
  </user>
</users>`;

export function SampleGenerator() {
  const [activeTab, setActiveTab] = useState('json');
  const [jsonData, setJsonData] = useState(JSON.stringify(mockJsonData, null, 2));
  const [xmlData, setXmlData] = useState(mockXmlData);
  const [count, setCount] = useState(2);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (formData: any) => {
    console.log('Generating with form data:', formData);
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      toast.success(`Generated ${count} sample records`);
    }, 1500);
  };

  const handleCopy = (data: string) => {
    navigator.clipboard.writeText(data);
    toast.success('Copied to clipboard');
  };

  const handleDownload = (data: string, fileType: string) => {
    const blob = new Blob([data], { type: fileType === 'json' ? 'application/json' : 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sample-data.${fileType}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded sample-data.${fileType}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sample Data Generator</h1>
        <p className="text-muted-foreground mt-1">
          Generate realistic test data based on your API specifications
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <SpecificationForm 
            onSubmit={handleGenerate} 
            count={count}
            setCount={setCount}
            isGenerating={isGenerating}
          />
        </div>
        
        <div className="lg:col-span-3 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Generated Sample Data</h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleGenerate({})}
                disabled={isGenerating}
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>Regenerate</span>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="json" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-xs grid-cols-2">
              <TabsTrigger value="json">JSON</TabsTrigger>
              <TabsTrigger value="xml">XML</TabsTrigger>
            </TabsList>
            
            <TabsContent value="json">
              <CodeDisplayCard
                code={jsonData}
                language="json"
                title="User API Sample (JSON)"
                actions={(
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(jsonData)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      <span>Copy</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(jsonData, 'json')}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      <span>Download</span>
                    </Button>
                  </div>
                )}
              />
            </TabsContent>
            
            <TabsContent value="xml">
              <CodeDisplayCard
                code={xmlData}
                language="xml"
                title="User API Sample (XML)"
                actions={(
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(xmlData)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      <span>Copy</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(xmlData, 'xml')}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      <span>Download</span>
                    </Button>
                  </div>
                )}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
