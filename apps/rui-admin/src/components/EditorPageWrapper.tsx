import { ComponentSpec, RuiPageSpec } from 'rui-core';
import { EditorComponentWrapper } from './EditorComponentWrapper';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

function useComponents(pageId: string) {
  const query = useQuery({
    queryKey: ['page', pageId, 'components'],
    queryFn: async () => {
      console.log('fetching components for page', pageId);
      const url = `/pages/${pageId}/components`;
      const res = await fetch(url);
      const body = await res.json();
      return body as ComponentSpec[];
    },
  });
  return [query.data, query] as const;
}

interface AddComponentButtonProps {
  index: number;
  pageId: string;
  onAddComponent?: () => void;
}

function AddComponentButton({
  index,
  pageId,
  onAddComponent,
}: AddComponentButtonProps) {
  const handleClick = () => {
    console.log(`Add component at index ${index} for page ${pageId}`);
    if (onAddComponent) {
      onAddComponent();
    }
    // Here you would typically open a modal or drawer to select component type
  };

  return (
    <div
      onClick={handleClick}
      className="w-full h-6 bg-transparent flex items-center justify-center cursor-pointer group"
    >
      <div className="h-1 w-24  group-hover:bg-green-500 transition-colors duration-200  flex items-center justify-center">
        <div className="h1 w-24 bg-gray-300 rounded-full"></div>
        <span className="h1 w-24 opacity-0 group-hover:opacity-100 text-xs font-medium transition-opacity duration-200">
          Add Component
        </span>
      </div>
    </div>
  );
}

export interface PageWrapperProps {
  page: RuiPageSpec;
}

export function EditorPageWrapper({ page }: PageWrapperProps) {
  const [components, query] = useComponents(page.id);

  if (query.status === 'pending') return <div>Loading...</div>;

  const componentArray = components ?? [];

  return (
    <>
      {/* Add component button at the beginning */}
      <AddComponentButton index={0} pageId={page.id} />

      {componentArray.map((x, i) => (
        <React.Fragment key={x.id}>
          <EditorComponentWrapper spec={x} priority={(i + 1) * 100} />
          {/* Add component button after each component */}
          <AddComponentButton index={i + 1} pageId={page.id} />
        </React.Fragment>
      ))}
    </>
  );
}
