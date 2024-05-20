import type { DuiApp } from '../../dui-app/DuiApp'
import type { DuiPage } from '../../dui-app/DuiPage'
import type { DuiActionContext } from '../../dui-app/actions/DuiActionContext'
import DefaultPagination from './DefaultPagination.vue'

interface Props {
  app: DuiApp<any>
  page: DuiPage<any>
  data: any | any[]
  pagination?: { pageNumber: number; pageSize: number; totalCount: number }
  fetchData: () => Promise<void>
  submitData: (data: any | any[]) => Promise<void>
  route: string
}
export function PageSelector({ app, page, route, data, fetchData, submitData, pagination }: Props) {
  const router = useRouter()

  if (!page) {
    return <p>page not found</p>
  }

  const context: DuiActionContext = {
    app,
    page,
    path: router.currentRoute.value.fullPath ?? '',
    router
  }

  const PageComponent = page.component
  const ActionsComponent = app.actionsComponent
  return (
    <>
      <ActionsComponent
        actions={page.actions}
        context={context}
      />
      <PageComponent
        data={data}
        context={context}
        fetchData={fetchData}
        submitData={submitData}
        fields={page.visibleFields}
      />
    </>
  )
}
