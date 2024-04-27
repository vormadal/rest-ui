import type { DuiApp } from '../../dui-app/DuiApp'
import type { DuiActionContext } from '../../dui-app/actions/DuiActionContext'

interface Props {
  app: DuiApp<any>
  route: string
}
export function PageSelector({ app, route }: Props) {
  console.log('looking for page', route)
  const page = app.getPage(route)
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

  const fetcher = () => page.dataSource?.run(context)

  async function submit(data: any) {
    if (!page?.onSubmit) return
    context.data = data
    await page.onSubmit.run(context)
  }

  const Component = page.component
  const ActionsComponent = app.actionsComponent
  return (
    <>
      <ActionsComponent
        actions={page.actions}
        context={context}
      />
      <Component
        context={context}
        fetch={fetcher}
        fields={page.visibleFields}
        submit={submit}
      />
    </>
  )
}
