import { ScrollArea } from "@/app/components/ScrollArea"
import ScrollIn from "@/app/components/ScrollIn"
import { getFeedInfoList } from "@/lib/notion"
import Image from "next/image"

export default function FeedInfoList({
	feedInfoList,
}: {
	feedInfoList: Awaited<ReturnType<typeof getFeedInfoList>>
}) {
	return (
		<div className="absolute top-0 right-0 translate-x-[130%] ">
			<ScrollArea className="h-[500px] rounded-md border border-neutral-200 dark:border-neutral-700 p-4 hidden xl:block">
				{feedInfoList &&
					feedInfoList
						// sort by title
						.sort((a, b) => a.title.localeCompare(b.title))
						.map((feedInfo) => (
							<ScrollIn
								key={feedInfo.id}
								className="flex items-center gap-4 my-2"
							>
								<Image
									src={feedInfo.avatar}
									alt="feed item avatar"
									width={40}
									height={40}
									className="h-[40px] w-[40px] rounded-full object-cover"
								/>
								<a
									href={feedInfo.url}
									target="_blank"
									rel="noopener noreferrer"
								>
									{feedInfo.title}
								</a>
							</ScrollIn>
						))}
			</ScrollArea>
		</div>
	)
}
