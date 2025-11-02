"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider(props: ThemeProviderProps) {
  const { children, ...restProps } = props
  return <NextThemesProvider {...(restProps as any)}>{children}</NextThemesProvider>
}

