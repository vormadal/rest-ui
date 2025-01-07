'use client'

import NextAppOptions from '../lib/AppOptions'
import { OpenApiParser } from '../core/generator/OpenApiParser'
import { TestDocument1 } from '../samples/test'
import { RuiApp } from '../core/app/RuiApp'
import { AppContext } from '../lib/AppContext'

const appSpec = new OpenApiParser(TestDocument1).parse()
const app = new RuiApp(appSpec, NextAppOptions)

interface Props {
  children: React.ReactNode
}
export default function AppProvider({ children }: Props) {
  return <AppContext.Provider value={app}>{children}</AppContext.Provider>
}
