import { CarouselItem } from "@/components/ui/carousel";
import { CarouselAdaptive } from "@/components/ui/carousel/adaptive";
import { Tweet } from "@/components/ui/tweet";
import { archivo, archivo_black } from "@/lib/general/fonts";

export function ViewsLandingCommunity() {
	return (
		<section
			className={`${archivo.className} grid gap-4 rounded-2xl p-3 md:min-h-[calc(50vh-0.75rem)] md:rounded-4xl md:p-6 md:gap-2`}
		>
			<div
				className={`grid gap-6 grid-cols-1 grid-rows-[auto_auto] h-fit lg:gap-24 lg:grid-cols-[auto_1fr]`}
			>
				<h2
					className={`font-bold rounded-full bg-foreground text-background w-fit h-fit px-4 py-1 mt-3`}
				>
					Feed
				</h2>
				<div
					className={`grid grid-cols-20 grid-rows-[auto_auto] h-fit gap-4`}
				>
					<h3
						className={`uppercase text-5xl col-start-1 col-end-19 row-start-1 row-end-2 sm:text-6xl lg:col-end-16`}
					>
						Built by the <span className={`${archivo_black.className}`}>Community</span>
					</h3>
					<p
						className={`col-start-1 col-end-18 row-start-2 row-end-3`}
					>
						Thoughts, updates, and highlights from builders, creators, and contributors across the Superteam Malaysia community.
					</p>
				</div>
			</div>
			<div
				className={`max-w-[calc(100vw-3rem)] md:max-w-[calc(100vw-6rem)]`}
			>
				<CarouselAdaptive
					className={`flex rounded-xl py-4 md:rounded-2xl lg:hidden`}
				>
					<CarouselItem
						className="h-fit basis-full md:basis-1/3"
					>
						<Tweet id="2031347596711833942" />
					</CarouselItem>
					<CarouselItem
						className="h-fit basis-full md:basis-1/3"
					>
						<Tweet id="2027696601184260131" />
					</CarouselItem>
					<CarouselItem
						className="h-fit basis-full md:basis-1/3"
					>
						<Tweet id="2027773071512506555" />
					</CarouselItem>
					<CarouselItem
						className="h-fit basis-full md:basis-1/3"
					>
						<Tweet id="2029765145044611519" />
					</CarouselItem>
					<CarouselItem
						className="h-fit basis-full md:basis-1/3"
					>
						<Tweet id="2027617673694351457" />
					</CarouselItem>
					<CarouselItem
						className="h-fit basis-full md:basis-1/3"
					>
						<Tweet id="2026296338221027583" />
					</CarouselItem>
				</CarouselAdaptive>
			</div>
			<div>
				<div
					className="hidden columns-1 lg:block lg:columns-2 xl:columns-3"
				>
					<div className="break-inside-avoid mx-2 mb-4 -mt-6">
						<Tweet id="2031347596711833942" />
					</div>
					<div className="break-inside-avoid mx-2 my-4">
						<Tweet id="2027696601184260131" />
					</div>
					<div className="break-inside-avoid mx-2 my-4">
						<Tweet id="2027773071512506555" />
					</div>
					<div className="break-inside-avoid mx-2 my-4">
						<Tweet id="2029765145044611519" />
					</div>
					<div className="break-inside-avoid mx-2 my-4">
						<Tweet id="2027617673694351457" />
					</div>
					<div className="break-inside-avoid mx-2 my-4">
						<Tweet id="2026296338221027583" />
					</div>
				</div>
			</div>
		</section>
	);
}