import ComponentWrapper from '../../components/ComponentWrapper';
import { RuiContext } from '../../core/app/RuiContext';
import defaultAppProvider from '../../lib/AppProvider';
import { ComponentProps } from '../../lib/ComponentProps';

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
          <div key={page.route}>{page.route}</div>
        ))}
      </div>
    );
  const context: RuiContext<React.FC<ComponentProps>> = {
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
