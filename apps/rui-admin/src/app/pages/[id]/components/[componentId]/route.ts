import { ComponentRepository } from 'rui-database';

const repository = ComponentRepository.getInstance();

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ componentId: string; pageId: string }> }
) {
  const { componentId } = await params;
  console.log('componentId', componentId);
  const body = await request.json();
  const updatedComponent = await repository.updateComponent(body);
  return Response.json(updatedComponent);
}
