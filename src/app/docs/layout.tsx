import { Layout, Navbar } from 'nextra-theme-docs'
import { Banner } from 'nextra/components'
import 'nextra-theme-docs/style.css'
import Footer from '@/components/Footer'
import { pageMap } from './[...slug]/page'

export const metadata = {
  title: 'KubeStellar - Multi-Cluster Kubernetes Orchestration',
  description: 'Official documentation for KubeStellar - Multi-cluster orchestration platform',
}
 
const banner = <Banner storageKey="kubestellar-demo">Welcome to KubeStellar Docs - Powered by Nextra! 🎉</Banner>
const navbar = (
  <Navbar
    logo={<b>KubeStellar Docs</b>}
    projectLink="https://github.com/kubestellar/kubestellar"
  />
)
const footer = <Footer />
 
export default function DocsLayout({ children }: { children: React.ReactNode }) {  
  return (
    <Layout
      banner={banner}
      navbar={navbar}
      pageMap={pageMap} // USE your imported pageMap
      docsRepositoryBase="https://github.com/kubestellar/kubestellar"
      footer={footer}
      darkMode={true}
    >
      {children}
    </Layout>
  )
}