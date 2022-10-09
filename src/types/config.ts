import { ReactNode } from 'react'

export interface RoutingProps {
  location?: Partial<Location> | string
}

export type AppProps = RoutingProps

export type ChildrenProps = {
  children: ReactNode
}

export type PromiseVoidType = () => Promise<void>

export type Word = {
  id: string
  category: string
  english: string
  spanish: string
  createdAt: number
}
