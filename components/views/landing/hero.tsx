import { Button } from "@/components/ui/button";
import { archivo, archivo_black } from "@/lib/general/fonts";

import Image from "next/image";
import Link from "next/link";

export function ViewsLandingHero() {
	return (
		<section
			className={`${archivo.className} grid rounded-2xl p-3 gap-4 grid-cols-[1fr_4fr] grid-rows-[1fr_auto_0.5rem_auto] md:min-h-[calc(50vh-0.75rem)] md:rounded-4xl md:p-6 md:grid-cols-[2fr_2fr_3fr] md:grid-rows-[1fr_auto_3rem_auto] lg:grid-cols-[1fr_2fr_1fr_2fr] lg:grid-rows-[3rem_auto_3rem_auto] xl:gap-15 xl:grid-cols-[3fr_1fr_2fr] xl:grid-rows-[3rem_1fr_3rem_auto]`}
		>
			<div
				className={`h-fit z-150 grid gap-6 col-start-1 col-end-3 row-start-1 row-end-2 md:gap-3 md:col-end-4 lg:row-end-3 lg:my-auto xl:col-end-2`}
			>
				<h1
					className={`uppercase text-5xl sm:text-7xl`}
				>
					The Talent Layer of <span className={`${archivo_black.className} text-super-yellow`}>Solana</span> in <span className={`${archivo_black.className}`}>Malaysia</span>
				</h1>
				<p
					className={`md:max-w-[75%] xl:max-w-none`}
				>
					We help promising projects launch and grow. Find projects, earn through bounties, and collaborate with people shipping the next wave of crypto products.
				</p>
				<div
					className={`flex flex-auto gap-4 w-fit my-2 lg:my-4`}
				>
					<Link
						href={`https://t.me/SuperteamMY`}
						prefetch={`auto`}
						title={`Superteam Malaysia | A community of the best talent learning, earning and building on Solana in Malaysia`}
						target={`_blank`}
						className={`grid grid-cols-[1fr_auto] align-middle content-center font-bold duration-150 uppercase text-5xl mb-48 mt-auto sm:mb-60 md:mb-4 sm:text-6xl hover:animate-pulse hover:text-super-yellow`}
					>
						<Button
							variant={`default`}
							size={`lg`}
							className={`gap-1 p-4 rounded-2xl bg-super-yellow text-foreground font-bold cursor-pointer hover:bg-super-purple hover:text-background hover:scale-110 dark:text-background dark:hover:text-foreground`}
						>
							<span className={`hidden md:inline`}>Join</span>Community
						</Button>
					</Link>
					<Link
						href={`https://earn.superteam.fun/`}
						prefetch={`auto`}
						title={`Superteam Earn | Crypto Bounties, Web3 Jobs & Solana Opportunities`}
						target={`_blank`}
						className={`hover:underline hover:text-super-yellow`}
					>
						<Button
							variant={`default`}
							size={`lg`}
							className={`gap-1 p-4 rounded-2xl bg-foreground text-background font-bold cursor-pointer hover:bg-super-purple hover:text-background hover:scale-110 dark:hover:text-foreground`}
						>
							<span className={`hidden md:inline`}>Explore</span>Opportunities
						</Button>
					</Link>
				</div>
			</div>
			<div
				className={`z-20 grid max-w-full max-h-[90vh] overflow-hidden col-start-2 col-end-3 row-start-2 row-end-5 md:col-start-2 md:col-end-4 lg:col-start-3 lg:col-end-5 lg:row-start-2 xl:row-start-1 xl:col-start-2 xl:col-end-4`}
			>
				<Image
					className={`z-30 ml-auto mt-auto col-start-1 col-end-2 row-start-1 row-end-2 -scale-x-100`}
					src={`/assets/batik/floral-3.svg`}
					alt={`Superteam Malaysia - Floral Batik Motif 2`}
					width={2000}
					height={2000}
				/>
				<Image
					className={`z-40 ml-auto mt-auto mb-12 col-start-1 col-end-2 row-start-1 row-end-2 md:mb-24`}
					src={`/assets/photos/superteam-excited.png`}
					alt={`Superteam Malaysia`}
					width={2000}
					height={2000}
				/>
			</div>
			<div
				className={`z-110 bg-linear-0 from-65% from-background via-80% via-background/50 to-100% to-background/0 col-start-2 col-end-3 row-start-3 row-end-5 md:col-end-4 lg:col-start-3 lg:col-end-5 xl:col-start-2 xl:col-end-4`}
			/>
			<div
				className={`z-110 grid col-start-1 col-end-3 row-start-4 row-end-5 md:col-start-1 md:col-end-4 lg:col-end-5 xl:col-end-4`}
			>
				<Image
					className={`min-w-full mx-auto block dark:hidden`}
					src={`/assets/superteam-lettermark-dark.svg`}
					alt={`Superteam Malaysia`}
					width={3000}
					height={3000}
				/>
				<Image
					className={`min-w-full mx-auto hidden dark:block`}
					src={`/assets/superteam-lettermark-light.svg`}
					alt={`Superteam Malaysia`}
					width={3000}
					height={3000}
				/>
			</div>
		</section>
	);
}