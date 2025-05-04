import { PageRepository } from 'rui-database';

const repository = PageRepository.getInstance();

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  
  const updatedPage = await repository.updatePage(id, {
    name: body.name,
    showInMenu: body.showInMenu,
    route: {
      template: body.route,
      parameters: body.parameters
    }
  });
  
  return Response.json(updatedPage);
}
