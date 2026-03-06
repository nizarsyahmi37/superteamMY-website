import type { Metadata } from "next";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme";

import "./globals.css";

export const metadata: Metadata = {
	title: "Superteam Malaysia",
	description: "Superteam Malaysia"
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
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
