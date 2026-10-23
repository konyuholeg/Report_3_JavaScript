import { LandingClient } from '../../../components/LandingClient'

type Props = { params: Promise<{ slug: string }> }

export default async function SlugPage({ params }: Props) {
  const { slug } = await params
  return <LandingClient slug={slug} />
}
