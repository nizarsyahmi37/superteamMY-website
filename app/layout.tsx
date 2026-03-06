import type { Metadata } from "next";

import { ReactNode } from "react";

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
		<html lang="en" className={``}>
			<body
				className={`antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
