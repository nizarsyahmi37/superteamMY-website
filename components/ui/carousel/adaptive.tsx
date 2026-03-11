"use client"

import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ReactNode, useEffect, useRef, useState } from "react";

export function CarouselAdaptive({
	className,
	children
} : {
	className: string;
	children: ReactNode;
}) {
	const [api, setApi] = useState<any>();
	const contentRef = useRef<HTMLDivElement>(null);

	const updateHeight = () => {
		if (!api || !contentRef.current) return;

		const selectedIndex = api.selectedScrollSnap();
		const slide = contentRef.current.children[selectedIndex] as HTMLElement;

		if (slide) {
		contentRef.current.style.height = `${slide.offsetHeight}px`;
		}
	};

	useEffect(() => {
		if (!api) return;

		updateHeight();
		api.on("select", updateHeight);
		api.on("reInit", updateHeight);

		return () => {
			api.off("select", updateHeight);
			api.off("reInit", updateHeight);
		};
	}, [api]);

	return (
		<Carousel
			opts={{
				align: "start",
			}}
			className={className}
			setApi={setApi}
		>
			<CarouselContent
				ref={contentRef}
			>
				{children}
			</CarouselContent>
			<CarouselPrevious
				className={`top-2 cursor-pointer right-12 left-auto border-2 border-super-purple dark:border-super-yellow hover:scale-110`}
			/>
			<CarouselNext
				className={`top-2 cursor-pointer right-0 border-2 border-super-purple dark:border-super-yellow hover:scale-110`}
			/>
		</Carousel>
	);
}