"use client";

import { archivo_black } from "@/lib/general/fonts";
import Image from "next/image";

interface HeroProps {
	totalMembers: number;
	totalAchievements: number;
}

export function ViewsMembersHero({ totalMembers, totalAchievements }: HeroProps) {
	return (
		<section className="relative overflow-hidden py-16 md:py-24">
			{/* Background decoration */}
			<div className="absolute inset-0 bg-gradient-to-br from-background via-background to-super-yellow/5" />
			<div className="absolute top-0 right-0 w-96 h-96 bg-super-yellow/10 rounded-full blur-3xl animate-pulse-soft" />
			<div className="absolute bottom-0 left-0 w-64 h-64 bg-super-yellow/5 rounded-full blur-2xl animate-pulse-soft" />

			{/* Decorative floral SVG */}
			<Image
				className="absolute top-10 left-4 w-32 h-32 opacity-20 animate-float-reverse hidden md:block"
				src="/assets/batik/floral-2.svg"
				alt="Decorative floral"
				width={200}
				height={200}
			/>
			<Image
				className="absolute bottom-10 right-4 w-40 h-40 opacity-20 animate-float hidden md:block"
				src="/assets/batik/floral-1.svg"
				alt="Decorative floral"
				width={250}
				height={250}
			/>

			<div className="container mx-auto px-4 relative z-10">
				<div className="max-w-3xl mx-auto text-center">
					{/* Title */}
					<h1 className={`${archivo_black.className} text-4xl md:text-5xl lg:text-6xl font-bold mb-6`}>
						Our <span className="text-super-yellow">Members</span>
					</h1>

					{/* Description */}
					<p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
						Meet the incredible builders driving innovation in the ecosystem.
						From developers to designers, creators to contributors —
						our community is shaped by passionate individuals.
					</p>

					{/* Stats */}
					<div className="flex justify-center gap-8 md:gap-16">
						<div className="text-center">
							<p className={`${archivo_black.className} text-4xl md:text-5xl text-super-yellow`}>
								{totalMembers}+
							</p>
							<p className="text-muted-foreground mt-1">Active Members</p>
						</div>
						<div className="text-center">
							<p className={`${archivo_black.className} text-4xl md:text-5xl text-super-yellow`}>
								{totalAchievements}+
							</p>
							<p className="text-muted-foreground mt-1">Achievements</p>
						</div>
					</div>

					{/* Decorative elements */}
					<div className="mt-12 flex justify-center gap-2">
						{[...Array(5)].map((_, i) => (
							<div
								key={i}
								className="w-2 h-2 bg-super-yellow/30 rounded-full"
								style={{
									animationDelay: `${i * 0.1}s`,
									animation: 'pulse 2s ease-in-out infinite'
								}}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Bottom wave */}
			<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
		</section>
	);
}
