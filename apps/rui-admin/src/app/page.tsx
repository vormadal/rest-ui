import GettingStartedForm from '../components/gettingStartedForm';
import ProjectView from '../components/ProjectView';
import { AppRepository } from 'rui-database';

export default async function Index() {
  const apps = await AppRepository.getInstance().getAll();
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
