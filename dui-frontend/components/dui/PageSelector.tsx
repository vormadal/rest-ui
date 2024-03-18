import { VBtn } from 'vuetify/components'
import type { DuiApp } from '../../dui-app/DuiApp'

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
    console.log('data route', dataRoute.substring(1))
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
    const endpoint = page?.submitDataTo?.getRoute(page, data, route)
    if (!endpoint) return
    if (!page) return

    const result = await app.fetch(page.submitDataTo?.method || 'POST', endpoint, data).then((x) => x.json())

    for (const action of page.postSubmit) {
      console.log('run action', action, result)
      await action.run(router, result)
    }
    console.log('submitting', JSON.stringify(data))
  }

  const Component = page.component
  return (
    <>
      {page.actions.map((x) => (
        <VBtn to={x.to}>{x.label}</VBtn>
      ))}
      <Component
        page={page}
        fetch={fetcher}
        fields={page.visibleFields}
        submit={submit}
      />
    </>
  )
}
