"use client"

import type { EmblaCarouselType } from "embla-carousel";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export function CarouselAdaptive({
	className,
	children
} : {
	className: string;
	children: ReactNode;
}) {
	const [api, setApi] = useState<EmblaCarouselType | undefined>();
	const contentRef = useRef<HTMLDivElement>(null);

	const updateHeight = useCallback(() => {
		if (!api || !contentRef.current) return;

		const selectedIndex = api.selectedScrollSnap();
		const slide = contentRef.current.children[selectedIndex] as HTMLElement;

		if (slide) {
			contentRef.current.style.height = `${slide.offsetHeight}px`;
		}
	}, [api]);

	useEffect(() => {
		if (!api) return;

		updateHeight();
		api.on("select", updateHeight);
		api.on("reInit", updateHeight);

		return () => {
			api.off("select", updateHeight);
			api.off("reInit", updateHeight);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
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