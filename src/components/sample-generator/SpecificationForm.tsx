
import { useState } from 'react';
import { 
  Database, Plus, Trash2, Code, Zap, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface SpecificationFormProps {
  onSubmit: (data: any) => void;
  count: number;
  setCount: (count: number) => void;
  isGenerating: boolean;
}

interface Field {
  id: string;
  name: string;
  type: string;
  required: boolean;
}

export function SpecificationForm({ 
  onSubmit, 
  count, 
  setCount, 
  isGenerating 
}: SpecificationFormProps) {
  const [apiEndpoint, setApiEndpoint] = useState('/api/users');
  const [fields, setFields] = useState<Field[]>([
    { id: '1', name: 'id', type: 'string', required: true },
    { id: '2', name: 'firstName', type: 'string', required: true },
    { id: '3', name: 'lastName', type: 'string', required: true },
    { id: '4', name: 'email', type: 'string', required: true },
    { id: '5', name: 'role', type: 'string', required: false },
  ]);

  const addField = () => {
    const newId = `${Date.now()}`;
    setFields([...fields, { id: newId, name: '', type: 'string', required: false }]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const updateField = (id: string, updates: Partial<Field>) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      apiEndpoint,
      fields,
      count
    };
    onSubmit(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          <span>API Specification</span>
        </CardTitle>
        <CardDescription>
          Define your API structure to generate sample data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="apiEndpoint">API Endpoint</Label>
            <Input
              id="apiEndpoint"
              placeholder="e.g. /api/users"
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Fields</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addField}
                className="h-8 gap-1"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Field</span>
              </Button>
            </div>

            <div className="space-y-2">
              {fields.map((field) => (
                <div 
                  key={field.id}
                  className="grid grid-cols-[1fr,1fr,auto,auto] gap-2 items-center"
                >
                  <Input
                    placeholder="Field name"
                    value={field.name}
                    onChange={(e) => updateField(field.id, { name: e.target.value })}
                    className="h-8"
                  />
                  <Select
                    value={field.type}
                    onValueChange={(value) => updateField(field.id, { type: value })}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="string">String</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="boolean">Boolean</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="uuid">UUID</SelectItem>
                      <SelectItem value="object">Object</SelectItem>
                      <SelectItem value="array">Array</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`required-${field.id}`}
                      checked={field.required}
                      onChange={(e) => updateField(field.id, { required: e.target.checked })}
                      className="mr-1.5"
                    />
                    <Label htmlFor={`required-${field.id}`} className="text-xs cursor-pointer">
                      Req
                    </Label>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeField(field.id)}
                    className="h-8 w-8"
                    disabled={fields.length <= 1}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="recordCount">Sample Size: {count} records</Label>
            </div>
            <Slider
              id="recordCount"
              min={1}
              max={100}
              step={1}
              value={[count]}
              onValueChange={(value) => setCount(value[0])}
              className="py-2"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button 
          className="w-full gap-1" 
          onClick={handleSubmit}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Zap className="h-4 w-4" />
              <span>Generate Sample Data</span>
            </>
          )}
        </Button>
        <Button 
          variant="outline" 
          className="w-full gap-1" 
          type="button"
        >
          <Code className="h-4 w-4" />
          <span>Import from OpenAPI Spec</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
