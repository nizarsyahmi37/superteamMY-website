import { Inter, Archivo_Black, Archivo } from "next/font/google"

export const inter = Inter({
	subsets: [
		"latin"
	]
})

export const archivo = Archivo({
    weight: [
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900"
    ],
    style: [
        "normal",
        "italic"
    ],
    display: "auto",
    preload: true,
	subsets: [
		"latin"
	]
})

export const archivo_black = Archivo_Black({
    weight: [
        "400"
    ],
    style: [
        "normal"
    ],
    display: "auto",
    preload: true,
	subsets: [
		"latin"
	]
})
