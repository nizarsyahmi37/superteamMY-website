import type { Metadata } from "next";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme";

import "./globals.css";
import { LayoutProvider } from "@/components/general/layout";

export const metadata: Metadata = {
	title: "Superteam Malaysia",
	description: "The Talent Layer of Solana in Malaysia"
};

export default function RootLayout({
	children
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en" className={``} suppressHydrationWarning>
			<body
				className={`antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<LayoutProvider>
						{children}
					</LayoutProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
