import { Box, Stack } from "@mui/material"

import { LayoutProps } from "@/models"
import { Footer, Header } from "../commons"

export function MainLayout({ children }: LayoutProps) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">{children}</main>

      <Footer />
    </section>
  )
}
