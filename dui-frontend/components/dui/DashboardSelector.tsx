import type { DuiApp } from '../../dui-app/DuiApp'

interface Props {
  app: DuiApp
}
export function DashboardSelector({ app }: Props) {
  const Component = app.dashboard.component
  return <Component pages={app.dashboard.pages} />
}
