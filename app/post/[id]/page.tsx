import { getOGImage, sharedMetadata, size } from "@/app/shared-metadata"
import Post from "@/components/part/Post"
import GoBack from "@/components/ui/GoBack"
import SITE_CONFIG from "@/config/site.config"
import { getPostList, getSinglePostInfo } from "@/lib/notion"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const revalidate = 60

export default async function Page({ params }: { params: { id: string } }) {
	const page = await getSinglePostInfo(params.id)
	if (!page) notFound()

	return (
		<>
			{/* @ts-expect-error Async Server Component */}
			<Post id={params.id} title={page.title} />
			<GoBack className="mt-4" />
		</>
	)
}

export async function generateStaticParams() {
	const posts = await getPostList()
	if (!posts) return []

	return posts.map((post) => ({
		id: post.id,
	}))
}

export async function generateMetadata({
	params,
}: {
	params: { id: string }
}): Promise<Metadata> {
	const page = await getSinglePostInfo(params.id)
	const image = getOGImage(
		SITE_CONFIG.siteUrl.replace("https://", ""),
		page?.title || ""
	)

	return {
		title: page?.title,
		openGraph: {
			...sharedMetadata.openGraph,
			images: [
				{
					...size,
					url: image,
				},
			],
		},
	}
}
