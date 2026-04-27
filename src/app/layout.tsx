import React from 'react'
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { LocaleProvider } from '@/providers'
import LayoutClient from './LayoutClient'

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata = {
    title: {
        default: 'ABET',
        template: '%s | ABET',
    },
    description: 'Sistema ABET',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html
            lang="es"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
        <body className="h-full bg-zinc-50 text-zinc-900">
        <LocaleProvider>
            <LayoutClient>
                {children}
            </LayoutClient>
        </LocaleProvider>
        </body>
        </html>
    )
}