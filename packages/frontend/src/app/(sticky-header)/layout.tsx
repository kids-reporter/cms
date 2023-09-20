import { StickyHeader } from '@/app/components/header'
import TopDetector from '@/app/components/top-detector'
import './layout.scss'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StickyHeader />
      <TopDetector />
      <div className="main-content">{children}</div>
    </>
  )
}
