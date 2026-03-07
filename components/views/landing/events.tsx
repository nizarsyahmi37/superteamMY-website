import { archivo, archivo_black } from "@/lib/general/fonts";

import Image from "next/image";

export function ViewsLandingEvents() {
	return (
		<section
			className={`${archivo.className} grid gap-4 rounded-2xl p-3 md:min-h-[calc(50vh-0.75rem)] md:rounded-4xl md:p-6 md:gap-24`}
		>
			<div
				className={`grid grid-cols-9 grid-rows-[1fr_auto_3rem_auto_6rem] md:grid-rows-[auto_auto_auto_auto] gap-4`}
			>
				<div
					className={`z-110 grid gap-6 col-start-1 col-end-10 row-start-1 row-end-2 lg:col-start-1 lg:col-end-5 lg:row-start-1 lg:row-end-3`}
				>
					<h2
						className={`font-bold rounded-full bg-super-purple text-background w-fit h-fit px-4 py-1 mt-3 dark:text-foreground`}
					>
						Events
					</h2>
					<h3
						className={`uppercase text-5xl sm:text-6xl max-w-[85vw]`}
					>
						Where Malaysian Solana Community <span className={`${archivo_black.className}`}>Meets</span>
					</h3>
				</div>
				<p
					className={`z-110 grid gap-6 col-start-1 col-end-9 row-start-2 row-end-3 lg:col-start-1 lg:col-end-4 lg:row-start-3 lg:row-end-4`}
				>
					Connect with builders, creators, and innovators in the Solana ecosystem. Find your tribe, exchange ideas, and grow with the community shaping the future of Solana.
				</p>
				<Image
					className={`mt-0 col-start-1 col-end-10 row-start-3 row-end-5 lg:col-start-3 lg:col-end-10 lg:row-start-2 lg:row-end-5 lg:mt-auto`}
					src={`/assets/batik/floral-5.svg`}
					alt={`Superteam Malaysia - Floral Batik Motif 5`}
					width={1500}
					height={1500}
				/>
				<div
					className={`z-110 col-start-1 col-end-10 row-start-4 row-end-5 sm:col-start-2 sm:col-end-9 sm:row-start-4 sm:row-end-5 lg:col-start-6 lg:col-end-10 lg:row-start-1 lg:row-end-5 xl:col-end-9`}
				>
					<iframe
						src={`https://luma.com/embed/calendar/cal-sZfiZHfUS5piycU/events?lt=dark`}
						allowFullScreen
						aria-hidden="false"
						tabIndex={0}
						className={`mt-8 bg-foreground/30 w-full border-none rounded-2xl min-h-80 md:min-h-[75vh] md:rounded-4xl dark:bg-foreground/30 lg:mt-0`}
					/>
				</div>
				<Image
					className={`rotate-180 mt-auto col-start-1 col-end-10 row-start-4 row-end-6 lg:hidden`}
					src={`/assets/batik/floral-5.svg`}
					alt={`Superteam Malaysia - Floral Batik Motif 5`}
					width={1500}
					height={1500}
				/>
			</div>
		</section>
	);
}