"use client"

import { useTheme } from "next-themes"
import { LuMoon, LuSun } from "react-icons/lu"

export function ThemeToggle() {
	const { setTheme } = useTheme()

	return (
		<div
			className={`grid`}
		>
			<LuMoon
				className="h-6 w-6 my-auto cursor-pointer block rotate-0 transition-all dark:hidden dark:-rotate-90 hover:text-super-yellow hover:rotate-12"
				onClick={() => setTheme("dark")}
			/>
			<LuSun
				className="h-6 w-6 my-auto cursor-pointer hidden rotate-90 transition-all dark:block dark:rotate-0 hover:text-super-yellow dark:hover:rotate-12"
				onClick={() => setTheme("light")}
			/>
		</div>
	)
}
