import { RuiContext } from 'rui-core/app';
import { ComponentWrapper, ReactRuiComponent } from 'rui-react-config';
import defaultAppProvider from '../../lib/AppProvider';

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
          <div key={page.id}>{page.route}</div>
        ))}
      </div>
    );
  const context: RuiContext<ReactRuiComponent> = {
    app,
    data: {},
    navigateTo: () => {
      console.log('routing not supported serverside');
    },
    dataSources: app.endpoints,
    route: path,
  };
  const page = app.getPage(context);
  if (!page) return <div>Page not found</div>;

  const data: { [key: string]: unknown } = {};
  for (const datasource of page.dataSources) {
    data[datasource.id] = await datasource.fetch({ ...context, data });
  }
  return (
    <ComponentWrapper
      appSpec={app.spec}
      componentSpec={page.spec}
      data={data}
      route={path}
    />
  );
}
