import { FaTelegramPlane } from "react-icons/fa";
import { FaBars, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ThemeToggle } from "../theme/toggle";

import Image from "next/image";
import Link from "next/link";

export function Header() {
	return (
		<header
			className={`z-200 fixed align-middle content-center grid grid-cols-2 w-[calc(100vw-1.5rem)] text-background bg-super-purple rounded-2xl px-5 py-3 md:w-[calc(100vw-3rem)] md:rounded-4xl dark:text-foreground`}
		>
			<div
				className={`w-fit`}
			>
				<Link
					href={`/`}
					title={`Superteam Malaysia | The Talent Layer of Solana in Malaysia`}
					target={`_self`}
					className={`group`}
				>
					<Image
						className={`max-h-9 duration-100 group-hover:scale-110`}
						src={`/assets/superteam-logo-light.svg`}
						alt={`Superteam Malaysia`}
						width={200}
						height={200}
					/>
				</Link>
			</div>
			<div
				className={`flex gap-6 ml-auto my-auto px-0 md:hidden md:px-3`}
			>
				<Sheet>
					<SheetTrigger asChild>
						<FaBars
							className={`my-auto w-6 h-6 cursor-pointer hover:scale-110 hover:text-super-yellow`}
						/>
					</SheetTrigger>
					<SheetContent
						className={`z-250 grid grid-rows-[auto_1fr_auto] min-h-[calc(100vh)] w-screen py-3 md:w-3/4 md:max-w-sm`}
					>
						{/* <SheetHeader
							className={`h-0`}
						>
							<SheetTitle>
								
							</SheetTitle>
						</SheetHeader> */}
						<div
							className={`px-6 grid h-fit gap-4`}
						>
							<SheetClose
								className={`text-left px-2 py-4 border-b border-b-foreground/15`}
								asChild
							>
								<Link
									href={`/`}
									title={`Superteam Malaysia | The Talent Layer of Solana in Malaysia`}
									target={`_self`}
									className={`group`}
								>
									<Image
										className={`mx-auto max-h-15 duration-100 block dark:hidden group-hover:scale-110`}
										src={`/assets/superteam-logo-dark.svg`}
										alt={`Superteam Malaysia`}
										width={300}
										height={300}
									/>
									<Image
										className={`mx-auto max-h-15 duration-100 hidden dark:block group-hover:scale-110`}
										src={`/assets/superteam-logo-light.svg`}
										alt={`Superteam Malaysia`}
										width={300}
										height={300}
									/>
								</Link>
							</SheetClose>
							<SheetClose
								className={`text-left`}
								asChild
							>
								<Link
									href={`https://superteam.fun`}
									title={`Superteam | The Talent Layer of Solana`}
									target={`_blank`}
									className={`font-bold hover:underline hover:text-super-yellow`}
								>
									Superteam Global
								</Link>
							</SheetClose>
							<SheetClose
								className={`text-left`}
								asChild
							>
								<Link
									href={`https://earn.superteam.fun`}
									title={`Superteam Earn | Crypto Bounties, Web3 Jobs & Solana Opportunities`}
									target={`_blank`}
									className={`font-bold hover:underline hover:text-super-yellow`}
								>
									Superteam Earn
								</Link>
							</SheetClose>
							<SheetClose
								className={`text-left`}
								asChild
							>
								<Link
									href={`https://talent.superteam.fun`}
									title={`Superteam Talent | Your portal to leading Solana jobs`}
									target={`_blank`}
									className={`font-bold hover:underline hover:text-super-yellow`}
								>
									Superteam Talent
								</Link>
							</SheetClose>
							<SheetClose
								className={`text-left`}
								asChild
							>
								<Link
									href={`https://luma.com/mysuperteam/`}
									title={`Superteam Malaysia Luma Events Calendar | Your guide to Superteam Malaysia's upcoming events`}
									target={`_blank`}
									className={`font-bold hover:underline hover:text-super-yellow`}
								>
									Events Calendar
								</Link>
							</SheetClose>
							<SheetClose
								className={`text-left`}
								asChild
							>
								<Link
									href={`/members`}
									title={`Superteam Malaysia Members | Your directory to Superteam Malaysia's members`}
									target={`_self`}
									className={`font-bold hover:underline hover:text-super-yellow`}
								>
									Member Showcase
								</Link>
							</SheetClose>
						</div>
						<SheetFooter
							className={`grid grid-cols-[1fr_auto] gap-4 border-t border-t-foreground/15 pt-6`}
						>
							<div
								className={`flex gap-6`}
							>
								<SheetClose
									asChild
								>
									<Link
										href={`https://x.com/SuperteamMY`}
										title={`Superteam Malaysia on X/Twitter`}
										target={`_blank`}
										className={`font-bold hover:text-super-yellow hover:scale-110`}
									>
										<FaXTwitter
											className={`my-auto w-6 h-6`}
										/>
									</Link>
								</SheetClose>
								<SheetClose
									asChild
								>
									<Link
										href={`https://instagram.com/SuperteamMY`}
										title={`Superteam Malaysia on Instagram`}
										target={`_blank`}
										className={`font-bold hover:text-super-yellow hover:scale-110`}
									>
										<FaInstagram
											className={`my-auto w-6 h-6`}
										/>
									</Link>
								</SheetClose>
								<SheetClose
									asChild
								>
									<Link
										href={`https://t.me/SuperteamMY`}
										title={`Superteam Malaysia on Telegram`}
										target={`_blank`}
										className={`font-bold hover:text-super-yellow hover:scale-110`}
									>
										<FaTelegramPlane
											className={`my-auto w-6 h-6`}
										/>
									</Link>
								</SheetClose>
							</div>
							<ThemeToggle />
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</div>
			<div
				className={`hidden gap-6 ml-auto my-auto px-0 md:flex md:px-3`}
			>
				<Link
					href={`/members`}
					title={`Superteam Malaysia's Member Page`}
					target={`_self`}
					className={`font-bold hover:text-super-yellow`}
				>
					Members
				</Link>
				<ThemeToggle />
				<div
					className={`flex gap-3 border-l-2 border-l-foreground pl-6`}
				>
					<Link
						href={`https://x.com/SuperteamMY`}
						title={`Superteam Malaysia on X/Twitter`}
						target={`_blank`}
						className={`font-bold hover:text-super-yellow`}
					>
						<FaXTwitter
							className={`my-auto w-6 h-6`}
						/>
					</Link>
					<Link
						href={`https://instagram.com/SuperteamMY`}
						title={`Superteam Malaysia on Instagram`}
						target={`_blank`}
						className={`font-bold hover:text-super-yellow`}
					>
						<FaInstagram
							className={`my-auto w-6 h-6`}
						/>
					</Link>
					<Link
						href={`https://t.me/SuperteamMY`}
						title={`Superteam Malaysia on Telegram`}
						target={`_blank`}
						className={`font-bold hover:text-super-yellow`}
					>
						<FaTelegramPlane
							className={`my-auto w-6 h-6`}
						/>
					</Link>
				</div>
			</div>
		</header>
	);
}