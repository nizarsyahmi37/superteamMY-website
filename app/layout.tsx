import type { Metadata } from "next";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme";
import { LayoutProvider } from "@/components/general/layout";

import "./globals.css";

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
					defaultTheme="system"
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
