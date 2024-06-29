import { ReactNode } from "react"

export interface ITableHeader {
  text: string
  value: string
}

export interface ITableRow {
  [key: string]: string
}

export interface ITableProps {
  headers: ITableHeader[]
  rows: any[]
  onRowClick?: (row: any) => void
}