import { getAppList } from 'rui-database';
import GettingStartedForm from '../components/gettingStartedForm';
import ProjectView from '../components/ProjectView';

export default async function Index() {
  const apps = await getAppList();
  return (
    <div className="container mx-auto">
      <h1 className="text-6xl font-bold text-center bg-red-50">
        Welcome to RUI Admin!
      </h1>
      <ProjectView apps={apps} />
      <GettingStartedForm />
    </div>
  );
}
