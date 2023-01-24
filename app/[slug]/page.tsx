import { Giscus } from '@/app/components/Comment'
import { getPostList } from '@/lib/notion'

import PostDetail from '../components/PostDetail'

export const revalidate = 60

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="flex flex-col items-center gap-4 max-w-[65ch] w-full mx-auto">
      {/* @ts-expect-error Server Component */}
      <PostDetail slug={params.slug} />
      <Giscus />
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await getPostList()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}