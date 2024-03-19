import { VBtn } from 'vuetify/components'
import type { DuiApp } from '../../dui-app/DuiApp'
import type { DuiActionContext } from '../../dui-app/actions/DuiActionContext'

interface Props {
  app: DuiApp
  route: string
}
export function PageSelector({ app, route }: Props) {
  console.log('looking for page', route)
  const page = app.getPage(route)
  const router = useRouter()

  if (!page) {
    return <p>page not found</p>
  }

  //resolve path
  const dataRoute = page.readDataFrom?.getRoute(page, null, route) || ''

  const fetcher = () => {
    return app
      .fetch(page.readDataFrom?.method || 'GET', dataRoute)
      .then((res) => res.json())
      .then((json) => {
        console.log('fetching...', json)
        if (page.readDataFrom?.dataField) {
          return json[page.readDataFrom?.dataField]
        }

        return json
      })
      .catch((e) => {
        console.log('fetch error', e)
      })
  }

  async function submit(data: any) {
    if (!page?.onSubmit) return

    const context: DuiActionContext = {
      app,
      page,
      path: router.currentRoute.value.fullPath ?? '',
      router,
      data
    }

    for (const action of page.onSubmit) {
      console.log('run action', action)
      const result = await action.run(context)
      context.data = result
    }
  }

  const Component = page.component
  const ActionsComponent = app.actionsComponent
  return (
    <>
      <ActionsComponent
        actions={page.actions}
        context={{
          app,
          page,
          path: router.currentRoute.value.fullPath ?? '',
          router
        }}
      />
      <Component
        page={page}
        fetch={fetcher}
        fields={page.visibleFields}
        submit={submit}
      />
    </>
  )
}
