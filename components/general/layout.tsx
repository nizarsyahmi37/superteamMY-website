import { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";

export function LayoutProvider({
	children
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<div>
			<Header />
			<main>
				{children}
			</main>
			<Footer />
		</div>
	);
}