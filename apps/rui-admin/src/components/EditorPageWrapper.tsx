import { RuiApp, RuiPage } from 'rui-core/app';
import { ReactRuiComponent } from 'rui-react-config';
import { EditorComponentWrapper } from './EditorComponentWrapper';

export interface PageWrapperProps {
  app: RuiApp<ReactRuiComponent>;
  page: RuiPage<ReactRuiComponent>;
}
export function EditorPageWrapper({ app, page }: PageWrapperProps) {
  return (
    <>
      {page.children.map((x, i) => (
        <EditorComponentWrapper
          key={x.id}
          app={app}
          component={x}
          priority={(i + 1) * 100}
        />
      ))}
    </>
  );
}
