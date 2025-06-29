import { AppRepository } from 'rui-database';
import { OpenApiNavigation } from '../../components/OpenApiNavigation';

export default async function DebugPage() {
  const apps = await AppRepository.getInstance().getAll();
  return (
    <div>
      <OpenApiNavigation api={apps[0].apis[0]} />
    </div>
  );
}
