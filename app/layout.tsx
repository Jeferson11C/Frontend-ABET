'use client'

import React from 'react'
import Link from 'next/link'
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from '@/providers'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarItem,
  Navbar
} from '@/shared/components/ui'

import {
  HomeIcon,
  ChartBarIcon,
  TableCellsIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const navigation = [
  { name: 'Inicio', href: '/', icon: HomeIcon },
  { name: 'Gráficos', href: '/charts', icon: ChartBarIcon },
  { name: 'Tablas', href: '/tables', icon: TableCellsIcon },
  { name: 'Pruebas', href: '/public', icon: Cog6ToothIcon }
]

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

          {/* SIDEBAR: Fijo a la izquierda */}
          <Sidebar className="bg-zinc-900 border-r border-zinc-700 text-zinc-100 shrink-0">
            <SidebarHeader className="p-6 border-b border-white-800">
            </SidebarHeader>

            <SidebarContent className="mt-4 px-2">
              <SidebarGroup>
                {navigation.map((item) => (
                    <Link key={item.name} href={item.href} className="block group">
                      <SidebarItem
                          label={item.name}
                          icon={<item.icon className="h-5 w-5 text-zinc-400 group-hover:text-red-500 transition-colors" />}
                          className="text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-md transition-all"
                      />
                    </Link>
                ))}
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <div className="flex flex-col flex-1 h-full overflow-hidden">

            {/* NAVBAR SUPERIOR */}
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