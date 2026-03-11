import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { archivo, archivo_black } from "@/lib/general/fonts";

import Image from "next/image";

export function ViewsLandingFaq() {
	return (
		<section
			className={`${archivo.className} grid grid-cols-1 gap-8 bg-super-yellow text-foreground rounded-2xl p-3 lg:grid-cols-2 md:min-h-[calc(30vh-0.75rem)] md:rounded-4xl md:p-6 md:gap-24 dark:text-background`}
		>
			<div
				className={`grid gap-6 grid-cols-1 grid-rows-[auto_1fr_auto] h-fit`}
			>
				<div>
					<Image
						className={`ml-auto max-w-[45vw] -mt-15 -mb-30 sm:-mt-30 sm:-mb-30 md:max-w-[30vw] md:-mt-30 md:-mb-30 lg:-mt-30 lg:-mb-45 xl:max-w-[24vw]`}
						src={`/assets/batik/floral-1.svg`}
						alt={`Superteam Malaysia - Floral Batik Motif 1`}
						width={450}
						height={450}
					/>
				</div>
				<h2
					className={`font-bold rounded-full bg-foreground text-background w-fit h-fit px-4 py-1 mt-3 dark:border-super-yellow dark:bg-background dark:text-foreground`}
				>
					FAQs
				</h2>
				<div
					className={`grid grid-cols-20 grid-rows-[auto_auto] h-fit gap-4`}
				>
					<h3
						className={`uppercase text-5xl col-start-1 col-end-19 row-start-1 row-end-2 sm:text-6xl lg:col-end-16`}
					>
						Your Questions, <span className={`${archivo_black.className}`}>Answered</span>
					</h3>
					<p
						className={`col-start-1 col-end-18 row-start-2 row-end-3`}
					>
						SuperLearn more about Superteam Malaysia, how to get involved, and the opportunities available in the Solana ecosystem.
					</p>
				</div>
			</div>
			<div>
				<Accordion
					type={`single`}
					collapsible
					defaultValue={`what-is-superteam-malaysia`}
					className={``}
				>
					<AccordionItem value={`what-is-superteam-malaysia`}>
						<AccordionTrigger
							className={`cursor-pointer px-2 text-xl font-bold rounded-none border-b border-b-background data-[state=open]:border-b-background/15 hover:scale-105`}
						>
							What is Superteam Malaysia?
						</AccordionTrigger>
						<AccordionContent
							className={`py-4 px-2 border-b border-b-background`}
						>
							Superteam Malaysia is a community of builders, creators, and operators working together to grow the Solana ecosystem in Malaysia. We support developers, designers, founders, and contributors through mentorship, events, grants, and opportunities to build impactful Web3 projects.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value={`how-do-i-join`}>
						<AccordionTrigger
							className={`cursor-pointer px-2 text-xl font-bold rounded-none border-b border-b-background data-[state=open]:border-b-background/15 hover:scale-105`}
						>
							How do I join?
						</AccordionTrigger>
						<AccordionContent
							className={`py-4 px-2 border-b border-b-background`}
						>
							Anyone can join the community. You can start by participating in our events, joining discussions, contributing to projects, or applying for opportunities shared within the ecosystem.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value={`what-opportunities-are-available`}>
						<AccordionTrigger
							className={`cursor-pointer px-2 text-xl font-bold rounded-none border-b border-b-background data-[state=open]:border-b-background/15 hover:scale-105`}
						>
							What opportunities are available?
						</AccordionTrigger>
						<AccordionContent
							className={`py-4 px-2 border-b border-b-background`}
						>
							Members can access a variety of opportunities including hackathons, grants, bounties, freelance work, full-time roles, mentorship, and collaborations with teams building in the Solana ecosystem.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value={`how-can-projects-collaborate-with-us`}>
						<AccordionTrigger
							className={`cursor-pointer px-2 text-xl font-bold rounded-none border-b border-b-background data-[state=open]:border-b-background/15 hover:scale-105`}
						>
							How can projects collaborate with us?
						</AccordionTrigger>
						<AccordionContent
							className={`py-4 px-2 border-b border-b-background`}
						>
							Projects can collaborate with Superteam Malaysia by hosting hackathons, offering grants or bounties, sponsoring events, or partnering with the community to support builders and grow the ecosystem.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value={`do-i-need-to-be-a-developer-to-join`}>
						<AccordionTrigger
							className={`cursor-pointer px-2 text-xl font-bold rounded-none border-b border-b-background data-[state=open]:border-b-background/15 hover:scale-105`}
						>
							Do I need to be a developer to join?
						</AccordionTrigger>
						<AccordionContent
							className={`py-4 px-2 border-b border-b-background`}
						>
							No. Superteam Malaysia welcomes people from many backgrounds including design, marketing, operations, research, community management, and more. If you want to contribute to Web3, there is a place for you.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</section>
	);
}