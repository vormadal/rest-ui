import GettingStartedForm from '../components/gettingStartedForm';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div className="container mx-auto bg-red-400">
      <h1 className="text-6xl font-bold text-center bg-red-50">Welcome to RUI Admin!</h1>

      <GettingStartedForm />
    </div>
  );
}
