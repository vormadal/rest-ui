import { ComponentSpec, RuiPageSpec } from 'rui-core';
import { EditorComponentWrapper } from './EditorComponentWrapper';
import { useQuery } from '@tanstack/react-query';

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
export interface PageWrapperProps {
  page: RuiPageSpec;
}
export function EditorPageWrapper({ page }: PageWrapperProps) {
  const [components, query] = useComponents(page.id);

  if (query.status === 'pending') return <div>Loading...</div>;

  return (
    <>
      {(components ?? []).map((x, i) => (
        <EditorComponentWrapper key={x.id} spec={x} priority={(i + 1) * 100} />
      ))}
    </>
  );
}
