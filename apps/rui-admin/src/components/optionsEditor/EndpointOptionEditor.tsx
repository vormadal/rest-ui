import { useState } from 'react';
import { EndpointOptions } from 'rui-core/app';
import { Button, Input, Label, Popover, PopoverContent, PopoverTrigger } from '@ui';
import { ComponentOption, RuiAppSpec } from 'rui-core';
import { OpenApiNavigation } from '../OpenApiNavigation';
import { useQuery } from '@tanstack/react-query';

type Props = {
  option: ComponentOption;
  value?: string;
  onChange: (value: string) => void;
  appId?: string; // We'll need this to get the app data
};

/**
 * EndpointOptionEditor provides a selector for API endpoints using OpenAPI navigation.
 * Uses the OpenApiNavigation component to allow selecting endpoints from available APIs.
 */
export function EndpointOptionEditor({ option, value, onChange, appId }: Props) {
  const options = (option.options ?? {}) as EndpointOptions;
  const [open, setOpen] = useState(false);
  
  // Get the app data to access APIs
  const { data: app } = useQuery({
    queryKey: ['app', appId],
    queryFn: async () => {
      if (!appId) return null;
      const url = `/apps/${appId}`;
      const res = await fetch(url);
      const body = await res.json();
      return body as RuiAppSpec;
    },
    enabled: !!appId,
  });

  const handleEndpointSelect = (endpoint: string, method: string) => {
    const endpointValue = `${method.toUpperCase()}:${endpoint}`;
    onChange(endpointValue);
    setOpen(false);
  };

  const displayValue = value ? value : 'Select an endpoint...';

  return (
    <div>
      <Label htmlFor={option.name}>{option.name}</Label>
      {options.required && <span className="text-red-500 ml-1">*</span>}
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {displayValue}
            <svg 
              className="ml-2 h-4 w-4 shrink-0 opacity-50" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <div className="max-h-[300px] overflow-auto">
            {app?.apis && app.apis.length > 0 ? (
              app.apis.map((api) => (
                <OpenApiNavigation
                  key={api.name}
                  api={api}
                  allowedMethods={options.allowedMethods}
                  onSelectProperty={(path, schema, context) => {
                    if (context.endpoint && context.method) {
                      handleEndpointSelect(context.endpoint, context.method);
                    }
                  }}
                />
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No APIs available
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
      
      {/* Hidden input for form compatibility */}
      <Input
        id={option.name}
        type="hidden"
        name={option.name}
        value={value || ''}
        readOnly
      />
    </div>
  );
}
