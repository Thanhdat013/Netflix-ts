import { EmptyLayout } from "@/components/layout"
import { AuthProvider } from "@/hooks/useAuth"
import { AppPropsWithLayout } from "@/models"
import "@/styles/globals.css"
import { RecoilRoot } from "recoil"

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout
  return (
    <RecoilRoot>
      {/* Hight Order Component */}
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </RecoilRoot>
  )
}
