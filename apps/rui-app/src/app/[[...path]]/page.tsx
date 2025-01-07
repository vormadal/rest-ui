import PageWrapper from '../../components/PageWrapper'
import { RuiApp } from '../../core/app/RuiApp'
import { OpenApiParser } from '../../core/generator/OpenApiParser'
import { nextAppOptions } from '../../lib/AppOptions'
import { TestDocument1 } from '../../samples/test'

interface Props {
  params: Promise<{ path: string[] }>
}
export default async function Home({ params }: Props) {
  const spec = new OpenApiParser(TestDocument1).parse()
  spec.baseUrl = 'http://localhost:5093'
  const app = new RuiApp(spec, nextAppOptions)
  const path = (await params).path?.join('/')

  if (!path)
    return (
      <div>
        {app.pages.map((page) => (
          <div key={page.route}>{page.route}</div>
        ))}
      </div>
    )
  const page = app.getPage(path)
  if (!page) return <div>Page not found</div>

  const data =
    (await page.dataSource?.run({
      app,
      page,
      path
    })) || {}
  return (
    <>
      <PageWrapper
        path={path}
        spec={spec}
        data={data}
      />
    </>
  )
}
