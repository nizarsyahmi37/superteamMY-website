import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { archivo, archivo_black } from "@/lib/general/fonts";

export function ViewsLandingStats() {
	return (
		<section
			className={`${archivo.className} grid gap-4 rounded-2xl p-3 md:min-h-[calc(50vh-0.75rem)] md:rounded-4xl md:p-6 md:gap-24`}
		>
			<div
				className={`grid gap-6 grid-cols-1 lg:gap-24 lg:grid-cols-[auto_1fr]`}
			>
				<h2
					className={`font-bold rounded-full bg-super-yellow text-foreground w-fit h-fit px-4 py-1 mt-3 dark:text-background`}
				>
					Highlights
				</h2>
				<h3
					className={`uppercase text-5xl sm:text-6xl max-w-[85vw]`}
				>
					Real <span className={`${archivo_black.className}`}>impact</span>.
					<br className={`block xl:hidden`} /> Real <span className={`${archivo_black.className}`}>builders</span>.
					<br /> Real <span className={`${archivo_black.className}`}>results</span>.
				</h3>
			</div>
			<div
				className={`grid grid-cols-9 gap-4 lg:gap-8`}
			>
				<p
					className={`col-start-1 col-end-10 row-start-1 row-end-2 rounded-xl p-0 sm:col-end-9 md:p-4 md:rounded-2xl md:col-start-2 md:col-end-6 md:row-start-1 md:row-end-2 lg:col-start-3`}
				>
					Superteam Malaysia is built on collaboration, experience, and a deep understanding of the Solana ecosystem. Every project we support is driven by efficiency, precision, and long-term impact.
				</p>
				<p
					className={`col-start-1 col-end-10 row-start-2 row-end-3 rounded-xl p-0 sm:col-end-9 md:p-4 md:rounded-2xl md:col-start-7 md:col-end-10 md:row-start-1 md:row-end-2 lg:col-start-8 `}
				>
					We don&apos;t just help projects launch — we ensure they grow and succeed, project after project.
				</p>
				<Carousel
					opts={{
						align: "start",
					}}
					className={`col-start-1 col-end-10 row-start-3 row-end-4 rounded-xl py-4 md:rounded-2xl md:hidden`}
				>
					<CarouselContent
						className={``}
					>
						<CarouselItem
							className="sm:basis-1/2"
						>
							<div
								className={`h-full grid grid-rows-[1fr_auto] bg-foreground/5 rounded-xl p-4 md:rounded-2xl`}
							>
								<div>
									<h4
										className={`${archivo_black.className} text-base text-super-purple dark:text-super-yellow lg:text-xl`}
									>
										Members
									</h4>
									<p
										className={`${archivo_black.className} text-5xl my-2 lg:text-6xl`}
									>
										200+
									</p>
								</div>
								<p>
									Developers, designers, founders, and operators building the future of Solana in Malaysia.
								</p>
							</div>
						</CarouselItem>
						<CarouselItem
							className="sm:basis-1/2"
						>
							<div
								className={`h-full grid grid-rows-[1fr_auto] bg-foreground/15 rounded-xl p-4 md:rounded-2xl`}
							>
								<div>
									<h4
										className={`${archivo_black.className} text-base text-super-purple dark:text-super-yellow lg:text-xl`}
									>
										Events
									</h4>
									<p
										className={`${archivo_black.className} text-5xl my-2 lg:text-6xl`}
									>
										150+
									</p>
								</div>
								<p>
									Workshops, hackathons, and meetups across Malaysia.
								</p>
							</div>
						</CarouselItem>
						<CarouselItem
							className="sm:basis-1/2"
						>
							<div
								className={`h-full grid grid-rows-[1fr_auto] bg-foreground/10 rounded-xl p-4 md:rounded-2xl`}
							>
								<div>
									<h4
										className={`${archivo_black.className} text-base text-super-purple dark:text-super-yellow lg:text-xl`}
									>
										Projects
									</h4>
									<p
										className={`${archivo_black.className} text-5xl my-2 lg:text-6xl`}
									>
										50+
									</p>
								</div>
								<p>
									Startups, tools, and open-source products launched by members.
								</p>
							</div>
						</CarouselItem>
						<CarouselItem
							className="sm:basis-1/2"
						>
							<div
								className={`h-full grid grid-rows-[1fr_auto] bg-foreground/15 rounded-xl p-4 md:rounded-2xl`}
							>
								<div>
									<h4
										className={`${archivo_black.className} text-base text-super-purple dark:text-super-yellow lg:text-xl`}
									>
										Bounties
									</h4>
									<p
										className={`${archivo_black.className} text-5xl my-2 lg:text-6xl`}
									>
										30+
									</p>
								</div>
								<p>
									Paid opportunities completed by Malaysian builders.
								</p>
							</div>
						</CarouselItem>
						<CarouselItem
							className="sm:basis-1/2"
						>
							<div
								className={`h-full grid grid-rows-[1fr_auto] bg-foreground/5 rounded-xl p-4 md:rounded-2xl`}
							>
								<div>
									<h4
										className={`${archivo_black.className} text-base text-super-purple dark:text-super-yellow lg:text-xl`}
									>
										Reaches
									</h4>
									<p
										className={`${archivo_black.className} text-5xl my-2 lg:text-6xl`}
									>
										500+
									</p>
								</div>
								<p>
									Developers, founders, and creators engaged across our ecosystem.
								</p>
							</div>
						</CarouselItem>
					</CarouselContent>
					<CarouselPrevious
						className={`cursor-pointer -left-4 disabled:hidden border-2 border-super-purple dark:border-super-yellow hover:scale-110`}
					/>
					<CarouselNext
						className={`cursor-pointer -right-4 disabled:hidden border-2 border-super-purple dark:border-super-yellow hover:scale-110`}
					/>
				</Carousel>
				<div
					className={`hidden grid-rows-[1fr_auto] bg-foreground/5 col-start-1 col-end-5 row-start-2 row-end-3 rounded-xl p-4 md:grid md:rounded-2xl lg:col-start-1 lg:col-end-4 lg:row-start-2 lg:row-end-3`}
				>
					<div>
						<h4
							className={`${archivo_black.className} text-base text-super-purple dark:text-super-yellow lg:text-xl`}
						>
							Members
						</h4>
						<p
							className={`${archivo_black.className} text-5xl my-2 lg:text-6xl`}
						>
							200+
						</p>
					</div>
					<p>
						Developers, designers, founders, and operators building the future of Solana in Malaysia.
					</p>
				</div>
				<div
					className={`hidden grid-rows-[1fr_auto] bg-foreground/15 col-start-5 col-end-9 row-start-2 row-end-3 rounded-xl p-4 md:grid md:rounded-2xl lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3 `}
				>
					<div>
						<h4
							className={`${archivo_black.className} text-base text-super-purple dark:text-super-yellow lg:text-xl`}
						>
							Events
						</h4>
						<p
							className={`${archivo_black.className} text-5xl my-2 lg:text-6xl`}
						>
							150+
						</p>
					</div>
					<p>
						Workshops, hackathons, and meetups across Malaysia.
					</p>
				</div>
				<div
					className={`hidden grid-rows-[1fr_auto] bg-foreground/10 col-start-2 col-end-6 row-start-3 row-end-4 rounded-xl p-4 md:grid md:rounded-2xl lg:col-start-8 lg:col-end-10 lg:row-start-2 lg:row-end-3`}
				>
					<div>
						<h4
							className={`${archivo_black.className} text-base text-super-purple dark:text-super-yellow lg:text-xl`}
						>
							Projects
						</h4>
						<p
							className={`${archivo_black.className} text-5xl my-2 lg:text-6xl`}
						>
							50+
						</p>
					</div>
					<p>
						Startups, tools, and open-source products launched by members.
					</p>
				</div>
				<div
					className={`hidden grid-rows-[1fr_auto] bg-foreground/15 col-start-6 col-end-10 row-start-3 row-end-4 rounded-xl p-4 md:grid md:rounded-2xl lg:col-start-4 lg:col-end-6 lg:row-start-3 lg:row-end-4`}
				>
					<div>
						<h4
							className={`${archivo_black.className} text-base text-super-purple dark:text-super-yellow lg:text-xl`}
						>
							Bounties
						</h4>
						<p
							className={`${archivo_black.className} text-5xl my-2 lg:text-6xl`}
						>
							30+
						</p>
					</div>
					<p>
						Paid opportunities completed by Malaysian builders.
					</p>
				</div>
				<div
					className={`hidden grid-rows-[1fr_auto] bg-foreground/5 col-start-3 col-end-7 row-start-4 row-end-5 rounded-xl p-4 md:grid md:rounded-2xl lg:col-start-6 lg:col-end-8 lg:row-start-3 lg:row-end-4`}
				>
					<div>
						<h4
							className={`${archivo_black.className} text-base text-super-purple dark:text-super-yellow lg:text-xl`}
						>
							Reaches
						</h4>
						<p
							className={`${archivo_black.className} text-5xl my-2 lg:text-6xl`}
						>
							500+
						</p>
					</div>
					<p>
						Developers, founders, and creators engaged across our ecosystem.
					</p>
				</div>
			</div>
		</section>
	);
}