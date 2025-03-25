import { RuiPageSpec } from '../../../../libs/rui-core/src';
import { EditorComponentWrapper } from './EditorComponentWrapper';

export interface PageWrapperProps {
  page: RuiPageSpec;
}
export function EditorPageWrapper({ page }: PageWrapperProps) {
  return (
    <>
      {(page.components ?? []).map((x, i) => (
        <EditorComponentWrapper key={x.id} spec={x} priority={(i + 1) * 100} />
      ))}
    </>
  );
}
