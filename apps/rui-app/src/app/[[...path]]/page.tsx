import { RuiContext } from 'rui-core/app';
import { ComponentWrapper, ReactRuiComponent } from 'rui-react-config';
import defaultAppProvider from '../../lib/AppProvider';
import { GeneralOptionSpec } from 'rui-core';

interface Props {
  params: Promise<{ path: string[] }>;
}
export default async function Home({ params }: Props) {
  const app = defaultAppProvider.app;
  const path = (await params).path?.join('/');

  if (!path)
    return (
      <div>
        {app.pages.map((page) => (
          <div key={page.id}>{page.route.template}</div>
        ))}
      </div>
    );
  const context: RuiContext<ReactRuiComponent> = {
    app,
    data: {},
    navigateTo: () => {
      console.log('routing not supported serverside');
    },
    route: path,
  };
  const page = app.getPage(context);
  if (!page) return <div>Page not found</div>;

  const data: GeneralOptionSpec = {};
  for (const datasource of page.dataSources) {
    data[datasource.id] = await datasource.fetch({ ...context, data });
  }

  return (
    <>
      {page.children.map((component) => (
        <ComponentWrapper
          key={component.id}
          appSpec={app.spec}
          componentSpec={component.componentSpec}
          data={data}
          route={path}
        />
      ))}
    </>
  );
}
