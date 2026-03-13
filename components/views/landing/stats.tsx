"use client";

import { useState, useEffect, useRef } from "react";
import { archivo_black } from "@/lib/general/fonts";
import { Reveal } from "@/components/ui/reveal";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface CounterProps {
	end: number;
	suffix?: string;
	duration?: number;
}

function Counter({ end, suffix = "", duration = 2000 }: CounterProps) {
	const [count, setCount] = useState(0);
	const [isInView, setIsInView] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!isInView) return;

		let startTime: number;
		let animationFrame: number;

		const animate = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / duration, 1);

			// Easing function for smooth animation
			const easeOutQuart = 1 - Math.pow(1 - progress, 4);
			setCount(Math.floor(easeOutQuart * end));

			if (progress < 1) {
				animationFrame = requestAnimationFrame(animate);
			}
		};

		animationFrame = requestAnimationFrame(animate);

		return () => {
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
		};
	}, [isInView, end, duration]);

	return (
		<span ref={ref} className={archivo_black.className}>
			{count}
			{suffix}
		</span>
	);
}

const stats = [
	{ label: "Members", value: 200, suffix: "+", description: "Developers, designers, founders, and operators building the future of Solana in Malaysia." },
	{ label: "Events", value: 150, suffix: "+", description: "Workshops, hackathons, and meetups across Malaysia." },
	{ label: "Projects", value: 50, suffix: "+", description: "Startups, tools, and open-source products launched by members." },
	{ label: "Bounties", value: 30, suffix: "+", description: "Paid opportunities completed by Malaysian builders." },
	{ label: "Reaches", value: 500, suffix: "+", description: "Developers, founders, and creators engaged across our ecosystem." },
];

function StatCard({ label, value, suffix, description, bgClass }: { label: string; value: number; suffix: string; description: string; bgClass?: string }) {
	return (
		<div className={`h-full grid grid-rows-[1fr_auto] ${bgClass} rounded-xl p-4 md:rounded-2xl`}>
			<div>
				<h4 className={`${archivo_black.className} text-base text-super-purple dark:text-super-yellow lg:text-xl`}>
					{label}
				</h4>
				<p className={`${archivo_black.className} text-5xl my-2 lg:text-6xl`}>
					<Counter end={value} suffix={suffix} />
				</p>
			</div>
			<p>
				{description}
			</p>
		</div>
	);
}

export function ViewsLandingStats() {
	return (
		<section className="grid gap-4 rounded-2xl p-3 md:min-h-[calc(50vh-0.75rem)] md:rounded-4xl md:p-6 md:gap-24">
			<Reveal>
			<div className="grid gap-6 grid-cols-1 lg:gap-24 lg:grid-cols-[auto_1fr]">
				<h2 className="font-bold rounded-full bg-super-yellow text-foreground w-fit h-fit px-4 py-1 mt-3 dark:text-background">
					Highlights
				</h2>
				<h3 className="uppercase text-5xl sm:text-6xl max-w-[85vw]">
					Real <span className={archivo_black.className}>impact</span>.
					<br className="block xl:hidden" /> Real <span className={archivo_black.className}>builders</span>.
					<br /> Real <span className={archivo_black.className}>results</span>.
				</h3>
			</div>
			</Reveal>
			<Reveal delay={200}>
			<div className="grid grid-cols-9 gap-4 lg:gap-8">
				<p className="col-start-1 col-end-10 row-start-1 row-end-2 rounded-xl p-0 sm:col-end-9 md:p-4 md:rounded-2xl md:col-start-2 md:col-end-6 md:row-start-1 md:row-end-2 lg:col-start-3">
					Superteam Malaysia is built on collaboration, experience, and a deep understanding of the Solana ecosystem. Every project we support is driven by efficiency, precision, and long-term impact.
				</p>
				<p className="col-start-1 col-end-10 row-start-2 row-end-3 rounded-xl p-0 sm:col-end-9 md:p-4 md:rounded-2xl md:col-start-7 md:col-end-10 md:row-start-1 md:row-end-2 lg:col-start-8 ">
					We don&apos;t just help projects launch — we ensure they grow and succeed, project after project.
				</p>

				{/* Mobile Carousel */}
				<Carousel
					opts={{ align: "start" }}
					className="col-start-1 col-end-10 row-start-3 row-end-4 rounded-xl py-4 md:hidden"
				>
					<CarouselContent>
						<CarouselItem className="sm:basis-1/2">
							<div className="p-2">
								<StatCard {...stats[0]} bgClass="bg-foreground/5" />
							</div>
						</CarouselItem>
						<CarouselItem className="sm:basis-1/2">
							<div className="p-2">
								<StatCard {...stats[1]} bgClass="bg-foreground/15" />
							</div>
						</CarouselItem>
						<CarouselItem className="sm:basis-1/2">
							<div className="p-2">
								<StatCard {...stats[2]} bgClass="bg-foreground/10" />
							</div>
						</CarouselItem>
						<CarouselItem className="sm:basis-1/2">
							<div className="p-2">
								<StatCard {...stats[3]} bgClass="bg-foreground/15" />
							</div>
						</CarouselItem>
						<CarouselItem className="sm:basis-1/2">
							<div className="p-2">
								<StatCard {...stats[4]} bgClass="bg-foreground/5" />
							</div>
						</CarouselItem>
					</CarouselContent>
					<CarouselPrevious className="cursor-pointer -left-4 disabled:hidden border-2 border-super-purple dark:border-super-yellow hover:scale-110" />
					<CarouselNext className="cursor-pointer -right-4 disabled:hidden border-2 border-super-purple dark:border-super-yellow hover:scale-110" />
				</Carousel>

				{/* Desktop Grid Layout */}
				{/* Members */}
				<div className="hidden grid-rows-[1fr_auto] bg-foreground/5 col-start-1 col-end-5 row-start-2 row-end-3 rounded-xl p-4 md:grid md:rounded-2xl lg:col-start-1 lg:col-end-4 lg:row-start-2 lg:row-end-3">
					<StatCard {...stats[0]} />
				</div>

				{/* Events */}
				<div className="hidden grid-rows-[1fr_auto] bg-foreground/15 col-start-5 col-end-9 row-start-2 row-end-3 rounded-xl p-4 md:grid md:rounded-2xl lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3 ">
					<StatCard {...stats[1]} />
				</div>

				{/* Projects */}
				<div className="hidden grid-rows-[1fr_auto] bg-foreground/10 col-start-2 col-end-6 row-start-3 row-end-4 rounded-xl p-4 md:grid md:rounded-2xl lg:col-start-8 lg:col-end-10 lg:row-start-2 lg:row-end-3">
					<StatCard {...stats[2]} />
				</div>

				{/* Bounties */}
				<div className="hidden grid-rows-[1fr_auto] bg-foreground/15 col-start-6 col-end-10 row-start-3 row-end-4 rounded-xl p-4 md:grid md:rounded-2xl lg:col-start-4 lg:col-end-6 lg:row-start-3 lg:row-end-4">
					<StatCard {...stats[3]} />
				</div>

				{/* Reaches */}
				<div className="hidden grid-rows-[1fr_auto] bg-foreground/5 col-start-3 col-end-7 row-start-4 row-end-5 rounded-xl p-4 md:grid md:rounded-2xl lg:col-start-6 lg:col-end-8 lg:row-start-3 lg:row-end-4">
					<StatCard {...stats[4]} />
				</div>
			</div>
			</Reveal>
		</section>
	);
}
