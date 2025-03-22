import { getApp } from 'rui-database';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const app = await getApp(id);

  return Response.json(app);
}
