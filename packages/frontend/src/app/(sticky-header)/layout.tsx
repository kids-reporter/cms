import { StickyHeader } from '@/app/components/header'
import TopDetector from '@/app/components/top-detector'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StickyHeader />
      <TopDetector />
      <div className="flex flex-grow mt-16">{children}</div>
    </>
  )
}
