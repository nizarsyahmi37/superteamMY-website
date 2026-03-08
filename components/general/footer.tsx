import { LuArrowUpRight } from "react-icons/lu";
import { archivo } from '@/lib/general/fonts';

import Image from "next/image";
import Link from "next/link";

export function Footer() {
	return (
		<footer
			className={`text-background grid grid-rows-[1fr_1.2rem_auto] grid-cols-2 bg-super-purple rounded-2xl p-3 md:min-h-[calc(50vh-0.75rem)] md:rounded-4xl md:p-6 lg:grid-cols-[2fr_1fr] dark:text-foreground`}
		>
			<div
				className={`z-110 grid gap-2 grid-rows-[auto_1fr] col-start-1 row-start-1 col-end-3 row-end-2 md:col-end-2`}
			>
				<Image
					src={`/assets/superteam-icon-light.svg`}
					alt={`Superteam Malaysia`}
					width={100}
					height={100}
				/>
				<div>
					<p>
						Superteam Malaysia is focused on helping Solana developers and creators earn and grow.
					</p>
					<div
						className={`grid grid-cols-2 gap-12 w-fit mt-8 mb-12`}
					>
						<div>
							<h3
								className={`font-bold text-lg`}
							>
								Resources
							</h3>
							<div
								className={`my-3 grid gap-1`}
							>
								<Link
									href={`https://superteam.fun/`}
									title={`Superteam | The Talent Layer of Solana`}
									target={`_blank`}
									className={`hover:underline hover:text-super-yellow`}
								>
									Global
								</Link>
								<Link
									href={`https://earn.superteam.fun/`}
									title={`Superteam Earn | Crypto Bounties, Web3 Jobs & Solana Opportunities`}
									target={`_blank`}
									className={`hover:underline hover:text-super-yellow`}
								>
									Earn
								</Link>
								<Link
									href={`https://talent.superteam.fun/`}
									title={`Superteam Talent | Your portal to leading Solana jobs`}
									target={`_blank`}
									className={`hover:underline hover:text-super-yellow`}
								>
									Talent
								</Link>
								<Link
									href={`https://luma.com/mysuperteam/`}
									title={`Superteam Malaysia Luma Events Calendar | Your guide to Superteam Malaysia's upcoming events`}
									target={`_blank`}
									className={`hover:underline hover:text-super-yellow`}
								>
									Events
								</Link>
							</div>
						</div>
						<div>
							<h3
								className={`font-bold text-lg`}
							>
								Connects
							</h3>
							<div
								className={`my-3 grid gap-1`}
							>
								<Link
									href={`https://x.com/SuperteamMY/`}
									title={`Superteam Malaysia on X/Twitter`}
									target={`_blank`}
									className={`hover:underline hover:text-super-yellow`}
								>
									X / Twitter
								</Link>
								<Link
									href={`https://www.instagram.com/superteammy/`}
									title={`Superteam Malaysia on Instagram`}
									target={`_blank`}
									className={`hover:underline hover:text-super-yellow`}
								>
									Instagram
								</Link>
								<Link
									href={`https://t.me/SuperteamMY/`}
									title={`Superteam Malaysia on Telegram`}
									target={`_blank`}
									className={`hover:underline hover:text-super-yellow`}
								>
									Telegram
								</Link>
							</div>
						</div>
					</div>
				</div>
				<Link
					href={`https://t.me/SuperteamMY`}
					prefetch={`auto`}
					title={`Superteam Malaysia | A community of the best talent learning, earning and building on Solana in Malaysia`}
					target={`_blank`}
					className={`grid grid-cols-[1fr_auto] align-middle content-center font-bold duration-150 uppercase text-5xl mb-48 mt-auto sm:mb-60 md:mb-4 sm:text-6xl hover:animate-pulse hover:text-super-yellow`}
				>
					<h2
						className={`${archivo.className} my-auto`}
					>
						Join Us
					</h2>
					<LuArrowUpRight
						className={`w-18 h-18`}
					/>
				</Link>
			</div>
			<div
				className={`flex align-bottom col-start-1 row-start-1 col-end-3 row-end-3 lg:col-start-2 lg:col-end-3`}
			>
				<Image
					className={`hidden xl:block ml-auto mt-auto`}
					src={`/assets/batik/floral-3.svg`}
					alt={`Superteam Malaysia - Floral Batik Motif 2`}
					width={400}
					height={400}
				/>
				<Image
					className={`hidden md:block xl:hidden ml-auto mt-auto`}
					src={`/assets/batik/floral-3.svg`}
					alt={`Superteam Malaysia - Floral Batik Motif 3`}
					width={360}
					height={360}
				/>
				<Image
					className={`hidden sm:block md:hidden mx-auto mt-auto`}
					src={`/assets/batik/floral-2.svg`}
					alt={`Superteam Malaysia - Floral Batik Motif 2`}
					width={500}
					height={500}
				/>
				<Image
					className={`block sm:hidden mx-auto mt-auto`}
					src={`/assets/batik/floral-2.svg`}
					alt={`Superteam Malaysia - Floral Batik Motif 2`}
					width={400}
					height={400}
				/>
			</div>
			<div
				className={`col-start-1 row-start-2 col-end-3 row-end-4 border-t-2 pt-4 grid gap-2 grid-cols-1 md:grid-cols-[1fr_auto]`}
			>
				<div
					className={`text-sm text-background/75 mx-auto flex flex-col gap-0 align-middle items-center sm:flex-row sm:gap-1 md:mx-0 dark:text-foreground/75`}
				>
					<p>
						© 2026 SuperteamMY. All rights reserved.
					</p>
					<Link
						href={`https://nizarsyahmi37.com`}
						prefetch={`auto`}
						title={`NizarSyahmi37 | Designer, Programmer, Strategist & Writer`}
						target={`_blank`}
						className={`group`}
					>
						Made by <span className={`font-bold group-hover:text-super-yellow`}>NizarSyahmi37</span>
					</Link>
				</div>
				<div
					className={`text-sm grid grid-cols-2 gap-4 max-w-fit mx-auto`}
				>
					<Link
						href={`/privacy`}
						title={`Privacy`}
						target={`_self`}
						className={`font-bold hover:text-super-yellow`}
					>
						Privacy
					</Link>
					<Link
						href={`/terms`}
						title={`Terms`}
						target={`_self`}
						className={`font-bold hover:text-super-yellow`}
					>
						Terms
					</Link>
				</div>
			</div>
		</footer>
	);
}