import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { archivo, archivo_black } from "@/lib/general/fonts";

import Image from "next/image";

export function ViewsLandingMission() {
	return (		
		<section
			className={`${archivo.className} grid gap-4 rounded-2xl p-3 md:min-h-[calc(50vh-0.75rem)] md:rounded-4xl md:p-6 md:gap-24`}
		>
			<div
				className={`grid gap-6 grid-cols-1 grid-rows-[auto_auto] h-fit lg:gap-24 lg:grid-cols-[auto_1fr]`}
			>
				<h2
					className={`font-bold rounded-full bg-foreground text-background w-fit h-fit px-4 py-1 mt-3`}
				>
					Mission
				</h2>
				<div
					className={`grid grid-cols-20 grid-rows-[auto_auto] h-fit gap-4`}
				>
					<h3
						className={`uppercase text-5xl col-start-1 col-end-19 row-start-1 row-end-2 sm:text-6xl lg:col-end-16`}
					>
						<span className={`${archivo_black.className}`}>Building</span> the Future of Web3 in Malaysia
					</h3>
					<p
						className={`col-start-1 col-end-18 row-start-2 row-end-3`}
					>
						Superteam Malaysia brings together developers, designers, founders, and operators to collaborate, build, and launch impactful projects in the Solana ecosystem, turning ideas into real products through mentorship, funding pathways, and community-driven initiatives.
					</p>
				</div>
				<div
					className={`col-span-1 lg:col-span-2`}
				>
					<Carousel
						opts={{
							align: "start",
						}}
						className={`rounded-xl py-4 md:rounded-2xl`}
					>
						<CarouselContent
							className={``}
						>
							<CarouselItem
								className="sm:basis-1/2 lg:basis-1/3"
							>
								<div
									className={`mx-3 h-full`}
								>
									<div
										className={`h-full grid gap-4 grid-rows-[auto_1fr] bg-foreground/5 rounded-xl p-4 md:rounded-2xl`}
									>
										<Image
											className={`rounded-lg md:rounded-xl`}
											src={`/assets/photos/superteam-mentorship.png`}
											alt={`Superteam Malaysia`}
											width={1000}
											height={1000}
										/>
										<div>
											<h4
												className={`${archivo_black.className} text-md mb-2 sm:text-lg lg:text-xl`}
											>
												Builder Support & Mentorship
											</h4>
											<p
												className={`text-sm md:text-base`}
											>
												We support builders at every stage with mentorship, guidance, and collaboration to help them build faster and better.
											</p>
										</div>
									</div>
								</div>
							</CarouselItem>
							<CarouselItem
								className="sm:basis-1/2 lg:basis-1/3"
							>
								<div
									className={`mx-3 h-full`}
								>
									<div
										className={`h-full grid gap-4 grid-rows-[auto_1fr] bg-foreground/5 rounded-xl p-4 md:rounded-2xl`}
									>
										<Image
											className={`rounded-lg md:rounded-xl`}
											src={`/assets/photos/superteam-hackathons.png`}
											alt={`Superteam Malaysia`}
											width={1000}
											height={1000}
										/>
										<div>
											<h4
												className={`${archivo_black.className} text-md mb-2 sm:text-lg lg:text-xl`}
											>
												Events & Hackathons
											</h4>
											<p
												className={`text-sm md:text-base`}
											>
												We host meetups, workshops, and hackathons that bring builders together to learn, collaborate, and showcase their ideas.
											</p>
										</div>
									</div>
								</div>
							</CarouselItem>
							<CarouselItem
								className="sm:basis-1/2 lg:basis-1/3"
							>
								<div
									className={`mx-3 h-full`}
								>
									<div
										className={`h-full grid gap-4 grid-rows-[auto_1fr] bg-foreground/5 rounded-xl p-4 md:rounded-2xl`}
									>
										<Image
											className={`rounded-lg md:rounded-xl`}
											src={`/assets/photos/superteam-funding.png`}
											alt={`Superteam Malaysia`}
											width={1000}
											height={1000}
										/>
										<div>
											<h4
												className={`${archivo_black.className} text-md mb-2 sm:text-lg lg:text-xl`}
											>
												Grants & Funding Access
											</h4>
											<p
												className={`text-sm md:text-base`}
											>
												We help builders access grants, funding, and ecosystem support to turn promising ideas into real products.
											</p>
										</div>
									</div>
								</div>
							</CarouselItem>
							<CarouselItem
								className="sm:basis-1/2 lg:basis-1/3"
							>
								<div
									className={`mx-3 h-full`}
								>
									<div
										className={`h-full grid gap-4 grid-rows-[auto_1fr] bg-foreground/5 rounded-xl p-4 md:rounded-2xl`}
									>
										<Image
											className={`rounded-lg md:rounded-xl`}
											src={`/assets/photos/superteam-opportunities.png`}
											alt={`Superteam Malaysia`}
											width={1000}
											height={1000}
										/>
										<div>
											<h4
												className={`${archivo_black.className} text-md mb-2 sm:text-lg lg:text-xl`}
											>
												Jobs, Bounties & Opportunities
											</h4>
											<p
												className={`text-sm md:text-base`}
											>
												We connect builders with jobs, bounties, and opportunities across the ecosystem.
											</p>
										</div>
									</div>
								</div>
							</CarouselItem>
							<CarouselItem
								className="sm:basis-1/2 lg:basis-1/3"
							>
								<div
									className={`mx-3 h-full`}
								>
									<div
										className={`h-full grid gap-4 grid-rows-[auto_1fr] bg-foreground/5 rounded-xl p-4 md:rounded-2xl`}
									>
										<Image
											className={`rounded-lg md:rounded-xl`}
											src={`/assets/photos/superteam-workshop.png`}
											alt={`Superteam Malaysia`}
											width={1000}
											height={1000}
										/>
										<div>
											<h4
												className={`${archivo_black.className} text-md mb-2 sm:text-lg lg:text-xl`}
											>
												Education & Workshops
											</h4>
											<p
												className={`text-sm md:text-base`}
											>
												We provide workshops and learning sessions to help the community gain the skills needed to build in Web3.
											</p>
										</div>
									</div>
								</div>
							</CarouselItem>
							<CarouselItem
								className="sm:basis-1/2 lg:basis-1/3"
							>
								<div
									className={`mx-3 h-full`}
								>
									<div
										className={`h-full grid gap-4 grid-rows-[auto_1fr] bg-foreground/5 rounded-xl p-4 md:rounded-2xl`}
									>
										<Image
											className={`rounded-lg md:rounded-xl`}
											src={`/assets/photos/superteam-connections.png`}
											alt={`Superteam Malaysia`}
											width={1000}
											height={1000}
										/>
										<div>
											<h4
												className={`${archivo_black.className} text-md mb-2 sm:text-lg lg:text-xl`}
											>
												Ecosystem Connections
											</h4>
											<p
												className={`text-sm md:text-base`}
											>
												We connect Malaysian builders with global teams and projects across the Solana ecosystem.
											</p>
										</div>
									</div>
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
				</div>
			</div>
		</section>
	);
}