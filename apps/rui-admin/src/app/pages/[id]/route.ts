import { PageRepository } from 'rui-database';

const repository = PageRepository.getInstance();

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  
  console.log('Updating page with id:', id, 'and body:', body);
  const updatedPage = await repository.updatePage(id, {
    name: body.name,
    showInMenu: body.showInMenu,
    route: body.route,
  });
  
  return Response.json(updatedPage);
}
