'use client'
import { useRouter } from 'next/navigation'
import { RuiActionResponse } from '../core/app/actions/RuiAction'
import { RuiActionContext } from '../core/app/actions/RuiActionContext'
import { RuiApp } from '../core/app/RuiApp'
import { RuiAppSpec } from 'rui-core'
import { nextAppOptions } from '../lib/AppOptions'
import { FieldProps } from '../lib/FieldProps'
import { PageProps } from '../lib/PageProps'
import PageActionMenu from './rui/PageActionMenu'

interface Props {
  path: string
  spec: RuiAppSpec
  data: RuiActionResponse<unknown>
}
export default function PageWrapper({ path, data, spec }: Props) {
  const app = new RuiApp(spec, nextAppOptions)
  const page = app.getPage(path)!
  const router = useRouter()

  const context: RuiActionContext<React.FC<PageProps>, React.FC<FieldProps>> = {
    app,
    page,
    path,
    navigateTo(path) {
      router.push(path)
    }
  }
  const Component = page.Component
  return (
    <div>
      <PageActionMenu
        actions={page.actions}
        context={context}
      />
      <Component
        {...{
          fields: page.fields,
          dataSource: page.dataSource,
          onSubmit: page.onSubmit,
          actions: page.actions,
          response: data,
          context,
          page
        }}
      />
      {/* <JsonEditor
        data={spec}
        onChange={() => {}}
      /> */}
    </div>
  )
}
