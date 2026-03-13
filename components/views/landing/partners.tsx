"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { archivo, archivo_black } from "@/lib/general/fonts";

import Image from "next/image";

interface Partner {
	id: string;
	name: string;
	logoUrl: string;
	logoUrlDark: string;
	websiteUrl: string | null;
}

export function ViewsLandingPartners() {
	const [partners, setPartners] = useState<Partner[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isDark, setIsDark] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// Check for dark mode
	useEffect(() => {
		const isDarkMode = document.documentElement.classList.contains("dark");
		setIsDark(isDarkMode);

		const observer = new MutationObserver(() => {
			setIsDark(document.documentElement.classList.contains("dark"));
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const fetchPartners = async () => {
			const supabase = createClient();
			const { data, error } = await supabase
				.from("partners")
				.select("*")
				.order("created_at", { ascending: true });

			if (!error && data) {
				setPartners(
					data.map((p) => ({
						id: p.id,
						name: p.name,
						logoUrl: p.logo_url,
						logoUrlDark: p.logo_url_dark || p.logo_url,
						websiteUrl: p.website_url,
					}))
				);
			}
			setIsLoading(false);
		};

		fetchPartners();
	}, []);

	if (isLoading || partners.length === 0) {
		return null;
	}

	// Create enough duplicates to fill the screen + extra for smooth scrolling
	const totalPartners = [...partners, ...partners, ...partners];

	return (
		<section className={`${archivo.className} py-16 bg-background overflow-hidden`}>
			<div
				className={`grid gap-6 grid-cols-1 grid-rows-[auto_auto] h-fit lg:gap-24 lg:grid-cols-[auto_1fr]`}
			>
				<div
					className={`grid grid-cols-20 grid-rows-[auto_auto] h-fit gap-4`}
				>
					<h3
						className={`uppercase text-2xl col-start-1 col-end-19 row-start-1 row-end-2 sm:text-3xl lg:col-end-13`}
					>
						<span className={`${archivo_black.className}`}>Partners</span> Powering Our Mission
					</h3>
					<p
						className={`col-start-1 col-end-18 row-start-2 row-end-3`}
					>
						We collaborate with leading projects, organizations, and communities to empower builders and strengthen the ecosystem.
					</p>
				</div>
			</div>
			<div className="relative">
				{/* Fade masks on left and right */}
				<div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
				<div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

				{/* Marquee container */}
				<div ref={containerRef} className="overflow-hidden">
					<div className="flex animate-marquee">
						{totalPartners.map((partner, index) => (
							<a
								key={`${partner.id}-${index}`}
								href={partner.websiteUrl || "#"}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center mx-8 transition-opacity hover:opacity-80 shrink-0"
							>
								<div className="relative h-12 w-32 grayscale dark:grayscale-0 hover:grayscale-0 transition-all duration-300">
									<Image
										src={isDark ? partner.logoUrlDark : partner.logoUrl}
										alt={partner.name}
										fill
										className="object-contain"
										sizes="128px"
									/>
								</div>
							</a>
						))}
					</div>
				</div>
			</div>

			{/* Add keyframe animation via style tag */}
			<style jsx>{`
				@keyframes marquee {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-33.333%);
					}
				}
				.animate-marquee {
					animation: marquee 40s linear infinite;
					width: max-content;
				}
				.animate-marquee:hover {
					animation-play-state: paused;
				}
			`}</style>
		</section>
	);
}
