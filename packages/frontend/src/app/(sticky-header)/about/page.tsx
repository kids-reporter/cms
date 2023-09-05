import AuthorCard from '@/app/components/author-card'
import './page.scss'

// TODO: remove mockup
import { authorsMockup } from '@/app/mockup'

export default function About() {
  return <AuthorCard title="誰在為你服務" authors={authorsMockup} />
}
