"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { archivo, archivo_black } from "@/lib/general/fonts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Achievement {
	type: string;
	info: string;
}

interface Member {
	id: string;
	name: string;
	photoUrl: string;
	roleCompany: string;
	xLink: string;
	skills: string[];
	achievements: Achievement[];
	isFeatured: boolean;
}

const ACHIEVEMENT_LABELS: Record<string, string> = {
	hackathon: "Hackathon Wins",
	project: "Projects Built",
	grant: "Grants Received",
	dao: "DAO Contributions",
	bounty: "Bounties Completed"
};

const ACHIEVEMENT_TYPES = [
	"hackathon",
	"project",
	"grant",
	"dao",
	"bounty"
] as const;

function getAchievementCountByType(achievements: Achievement[], type: string): number {
	return achievements.filter(a => a.type === type).length;
}

function getAchievementsByType(achievements: Achievement[], type: string): Achievement[] {
	return achievements.filter(a => a.type === type);
}

function MemberDialog({ member }: { member: Member }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="group relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-super-yellow transition-all cursor-pointer">
					<Image
						src={member.photoUrl}
						alt={member.name}
						fill
						className="object-cover group-hover:scale-110 transition-transform duration-300"
					/>
					<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
						<span className="text-white text-xs font-medium text-center px-1">
							{member.name.split(" ")[0]}
						</span>
					</div>
				</div>
			</DialogTrigger>
			<DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-4">
						<div className="relative w-20 h-20 rounded-lg md:rounded-xl overflow-hidden bg-muted shrink-0">
							<Image
								className="object-cover"
								src={member.photoUrl}
								alt={member.name}
								fill
								style={{ objectFit: "cover" }}
								sizes="80px"
							/>
						</div>
						<div>
							<p>{member.name}</p>
							<p className="text-sm text-muted-foreground">@{member.xLink}</p>
						</div>
					</DialogTitle>
					<div className="flex flex-col gap-4 pt-4">
						<div>
							<p className="font-semibold">Role</p>
							<p>{member.roleCompany}</p>
						</div>
						<div>
							<p className="font-semibold">Skills</p>
							<div className="flex flex-wrap gap-2 mt-1">
								{member.skills.map((skill, index) => (
									<span
										key={index}
										className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
									>
										{skill}
									</span>
								))}
							</div>
						</div>
						<div>
							<p className="font-semibold">Achievements ({member.achievements.length})</p>
							{member.achievements.length > 0 ? (
								<div className="mt-2 space-y-3">
									{ACHIEVEMENT_TYPES.map(type => {
										const typeAchievements = getAchievementsByType(member.achievements, type);
										if (typeAchievements.length === 0) return null;
										return (
											<div key={type}>
												<p className="capitalize font-bold text-sm text-super-yellow">
													{ACHIEVEMENT_LABELS[type]}
												</p>
												<div className="flex mt-1">
													{typeAchievements.map((achievement, idx) => (
														<p key={idx} className="text-sm text-muted-foreground">
															{achievement.info || "N/A"}{typeAchievements.length > 1 && idx < typeAchievements.length - 1 ? `, ` : ``}
														</p>
													))}
												</div>
											</div>
										);
									})}
								</div>
							) : (
								<p className="text-muted-foreground mt-1">No achievements</p>
							)}
						</div>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export function ViewsLandingMembers() {
	const [members, setMembers] = useState<Member[]>([]);
	const [featuredMember, setFeaturedMember] = useState<Member | null>(null);
	const [displayMembers, setDisplayMembers] = useState<Member[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchMembers = async () => {
			const supabase = createClient();
			const { data, error } = await supabase
				.from("members")
				.select("*")
				.order("created_at", { ascending: false });

			if (!error && data) {
				const mappedMembers = data.map((m) => ({
					id: m.id,
					name: m.name,
					photoUrl: m.photo_url,
					roleCompany: m.role_company,
					xLink: m.x_link,
					skills: m.skills || [],
					achievements: m.achievements || [],
					isFeatured: m.is_featured || false,
				}));

				setMembers(mappedMembers);

				// Find featured member
				const featured = mappedMembers.find(m => m.isFeatured);
				if (featured) {
					setFeaturedMember(featured);
					// Get all non-featured members and randomly select up to 10
					const nonFeaturedMembers = mappedMembers.filter(m => m.id !== featured.id);
					// Shuffle and take up to 10
					const shuffled = [...nonFeaturedMembers].sort(() => Math.random() - 0.5);
					setDisplayMembers(shuffled.slice(0, 10));
				} else {
					// No featured member - show up to 10 random members
					const shuffled = [...mappedMembers].sort(() => Math.random() - 0.5);
					setDisplayMembers(shuffled.slice(0, 10));
				}
			}
			setIsLoading(false);
		};

		fetchMembers();
	}, []);

	if (isLoading || members.length === 0) {
		return null;
	}

	// Calculate remaining members count - exclude featured from total
	const totalToDisplay = featuredMember ? members.length - 1 : members.length;
	const remainingCount = Math.max(0, totalToDisplay - displayMembers.length);

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
					Members
				</h2>
				<div
					className={`grid grid-cols-20 grid-rows-[auto_auto] h-fit gap-4`}
				>
					<h3
						className={`uppercase text-5xl col-start-1 col-end-19 row-start-1 row-end-2 sm:text-6xl lg:col-end-13`}
					>
						<span className={`${archivo_black.className}`}>The People</span> Building the Future
					</h3>
					<p
						className={`col-start-1 col-end-18 row-start-2 row-end-3`}
					>
						Meet the builders and creators driving innovation across the Solana ecosystem in Malaysia.
					</p>
				</div>
			</div>
			<div className="grid lg:grid-cols-2 gap-8">
				{/* Featured Member Column - only show if there's a featured member */}
				{featuredMember && (
					<div>
						<h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
							<span className="w-2 h-2 bg-super-yellow rounded-full animate-pulse" />
							Featured Member
						</h3>
						<div className="bg-card border rounded-2xl overflow-hidden shadow-2xl">
							<div className="grid md:grid-cols-2">
								{/* Photo */}
								<div className="relative h-full min-h-64 md:min-h-80 bg-linear-to-br from-super-yellow/20 to-secondary/20">
									<div className="absolute inset-0 flex items-center justify-center">
										<div className="relative w-40 h-40 md:w-48 md:h-48">
											<Image
												src={featuredMember.photoUrl}
												alt={featuredMember.name}
												fill
												className="object-cover rounded-2xl shadow-2xl border-4 border-background"
											/>
										</div>
									</div>
									{/* Decorative */}
									<div className="absolute top-4 left-4 w-20 h-20 bg-super-yellow/10 rounded-full blur-2xl" />
									<div className="absolute bottom-4 right-4 w-32 h-32 bg-super-yellow/20 rounded-full blur-3xl" />
								</div>

								{/* Info */}
								<div className="p-6 md:p-8 flex flex-col justify-center">
									<div className="mb-4">
										<span className="inline-block px-3 py-1 bg-super-yellow/20 text-super-yellow text-sm font-medium rounded-full mb-3">
											Featured
										</span>
										<h4 className={`${archivo_black.className} text-2xl md:text-3xl font-bold mb-1`}>
											{featuredMember.name}
										</h4>
										<p className="text-muted-foreground">
											{featuredMember.roleCompany}
										</p>
										<a
											href={`https://x.com/${featuredMember.xLink}`}
											target="_blank"
											rel="noopener noreferrer"
											className="text-sm text-super-yellow hover:underline"
										>
											@{featuredMember.xLink}
										</a>
									</div>

									{/* Skills */}
									<div className="mb-4">
										<p className="text-sm text-muted-foreground mb-2">Skills</p>
										<div className="flex flex-wrap gap-2">
											{featuredMember.skills.map((skill, index) => (
												<span
													key={index}
													className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
												>
													{skill}
												</span>
											))}
										</div>
									</div>

									{/* Achievements */}
									{featuredMember.achievements.length > 0 && (
										<div>
											<p className="text-sm text-muted-foreground mb-2">Achievements</p>
											<div className="grid grid-cols-2 gap-2">
												{Object.entries(ACHIEVEMENT_LABELS).map(([type, label]) => {
													const count = getAchievementCountByType(featuredMember.achievements, type);
													if (count === 0) return null;
													return (
														<div key={type} className="flex items-center gap-2">
															<div className="w-2 h-2 bg-super-yellow rounded-full" />
															<span className="text-sm">{count} {label}</span>
														</div>
													);
												})}
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Members Grid - shows other members if featured exists, otherwise shows all members */}
				<div className={featuredMember ? "" : "lg:col-span-2"}>
					<h3 className="text-xl font-semibold mb-4">
						{featuredMember ? `Other Members (${displayMembers.length})` : `Members (${displayMembers.length})`}
					</h3>
					<div className="bg-card border rounded-2xl p-6 shadow-lg">
						{displayMembers.length > 0 ? (
							<>
								<div className={`grid ${featuredMember ? 'grid-cols-4 md:grid-cols-5' : 'grid-cols-4 md:grid-cols-6 lg:grid-cols-8'} gap-3`}>
									{displayMembers.map((member) => (
										<MemberDialog key={member.id} member={member} />
									))}
								</div>
								{/* Show remaining count if more than displayed members exist */}
								{remainingCount > 0 && (
									<p className="text-center text-sm text-muted-foreground mt-4">
										+{remainingCount} more members
									</p>
								)}
							</>
						) : (
							<div className="text-center py-8 text-muted-foreground">
								No members yet
							</div>
						)}

						{/* View All Link */}
						<div className="text-center mt-6">
							<Link
								href="/members"
								className="inline-flex items-center gap-2 text-super-yellow font-medium hover:underline"
							>
								View All Members
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
