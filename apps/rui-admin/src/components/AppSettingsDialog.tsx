import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  Button,
} from '@ui';
import { useRouter } from 'next/navigation';
import { RuiAppSpec } from 'rui-core';

type Props = {
  app?: RuiAppSpec;
  children?: React.ReactNode;
};
export default function AppSettingsDialog({ app, children }: Props) {
  const router = useRouter();
  const handleDelete = async () => {
    if (!app) return;
    const url = `/apps/${app.id}`;
    await fetch(url, { method: 'DELETE' });
    router.push('/');
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{app?.name}</DialogTitle>
          <DialogDescription>
            TODO there should be some additional settings here
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
