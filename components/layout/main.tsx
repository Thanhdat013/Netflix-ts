import Footer from "@/components/commons/footer"
import { Header } from "@/components/commons/header"
import { LayoutProps } from "@/models"

export function MainLayout({ children }: LayoutProps) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">{children}</main>

      <Footer />
    </section>
  )
}
