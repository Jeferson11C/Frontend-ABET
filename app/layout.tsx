'use client'

import React from 'react'
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from '@/providers'
import { Navbar } from '@/shared/components/ui'
import AppSidebar from '@/app/Components/app-sidebar'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="h-full bg-zinc-50 text-zinc-900">
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          <AppSidebar />

          <div className="flex flex-col flex-1 h-full overflow-hidden">
            <Navbar />
            <main className="flex-1 p-8 overflow-y-auto bg-zinc-50/50">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>

        </div>
      </SidebarProvider>
      </body>
      </html>
  )
}