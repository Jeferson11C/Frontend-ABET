'use client'

import React from 'react'
import Link from 'next/link'
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarItem
} from '@/shared/components/ui'

// Importamos los iconos
import {
  HomeIcon,
  ChartBarIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// Configuración de navegación centralizada
const navigation = [
  { name: 'Inicio', href: '/', icon: HomeIcon },
  { name: 'Gráficos', href: '/charts', icon: ChartBarIcon },
  { name: 'Tablas', href: '/tables', icon: TableCellsIcon },
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
        <div className="flex h-screen w-full">

          {/* SIDEBAR: Forzamos fondo oscuro y texto claro */}
          <Sidebar className="bg-zinc-900 border-r border-zinc-700 text-zinc-100">

            <SidebarHeader className="p-6 border-b border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-bold text-white text-sm">
                    A
                  </div>
                  <span className="font-bold text-lg tracking-tight text-white uppercase">
                      UPC ABET
                    </span>
                </div>
              </div>
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

          {/* ÁREA DE CONTENIDO: Aquí se inyectan las páginas */}
          <main className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>

        </div>
      </SidebarProvider>
      </body>
      </html>
  )
}