import { useState } from 'react';
import { ComponentOptionsContextType } from '../../context/ComponentOptionsContext';
import { StringOptionEditor } from './StringOptionEditor';
import { NumberOptionEditor } from './NumberOptionEditor';
import { EndpointOptionEditor } from './EndpointOptionEditor';
import { Button } from '@ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ComponentSpec } from 'rui-core';

export function OptionsEditor({
  pageId,
  componentOptions,
}: {
  pageId: string;
  componentOptions: ComponentOptionsContextType;
}) {
  const queryClient = useQueryClient();
  const save = useMutation({
    mutationFn: async (data: ComponentSpec) => {
      const url = `/pages/${pageId}/components/${data.id}`;
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error('Failed to save component options');
      }
      return res.json();
    },

    onSettled: () => {
        console.log('invalidating queries', pageId);
      return queryClient.invalidateQueries({
        queryKey: ['page', pageId, 'components'],
      });
    },
    // onMutate: async (updatedSpec: ComponentSpec) => {
    //   queryClient.setQueryData(
    //     ['page', pageId, 'components'],
    //     (old: ComponentSpec) => {
    //       // find the component in component tree and update it
    //     }
    //   );
    // },
  });
  const [values, setValues] = useState(componentOptions.spec.options ?? {});

  const handleChange = (name: string, value: string | number) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSave = () => {
    // Save logic here
    save.mutateAsync({
      ...componentOptions.spec,
      options: values,
    });
    console.log('Saving options:', values);
  };
  return (
    <div className="flex flex-col gap-2">
      {componentOptions.options.map((option) => {
        if (option.type === 'string') {
          return (
            <StringOptionEditor
              key={option.name}
              option={option}
              value={(values[option.name] ?? '') as string}
              onChange={(value: string) => handleChange(option.name, value)}
            />
          );
        }
        if (option.type === 'number') {
          return (
            <NumberOptionEditor
              key={option.name}
              option={option}
              value={(values[option.name] ?? 0) as number}
              onChange={(value: number) => handleChange(option.name, value)}
            />
          );
        }
        return null;
      })}
      <Button variant="outline" color="primary" onClick={handleSave}>
        Save Options
      </Button>
    </div>
  );
}
