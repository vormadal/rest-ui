import exp from 'constants';
import { AppRepository } from 'rui-database';
const repository = AppRepository.getInstance();
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const app = await repository.getApp(id);

  return Response.json(app);
}


export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const app = await repository.deleteApp(id);

  return Response.json({});
}