import { ComponentRepository, DbComponent } from 'rui-database';
import { ComponentSpec } from 'rui-core';

const repository = ComponentRepository.getInstance();
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const components = await repository.getComponents(id);

  const componentTree = buildComponentTree(components);

  return Response.json(componentTree);
}

function buildComponentTree(
  components: DbComponent[],
  parentId: string | null = null
): ComponentSpec[] {
  return components
    .filter((x) => x.parentId === parentId)
    .map((x) => ({
      ...x,
      components: buildComponentTree(components, x.id),
    }));
}
