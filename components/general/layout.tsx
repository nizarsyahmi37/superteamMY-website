import { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { archivo } from "@/lib/general/fonts";

export function LayoutProvider({
	children
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<div
			className={`${archivo.className} grid gap-4 p-3 md:p-6`}
		>
			<Header />
			<main
				className={`my-24 lg:mt-30`}
			>
				{children}
			</main>
			<Footer />
		</div>
	);
}