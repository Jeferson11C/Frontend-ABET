'use client'

import React, { ReactNode } from 'react'
import { Navbar } from '@/shared/components'
import AppSidebar from '@/app/components/app-sidebar'
import { usePathname } from 'next/navigation'
import { useAuthGuard } from '@/shared/hooks'
import { ABETProvider, SidebarProvider } from '@/providers'

type LayoutClientProps = {
    children: ReactNode
}

export default function LayoutClient({ children }: LayoutClientProps) {
    const pathname = usePathname()
    const isAuthRoute = pathname?.startsWith('/auth') ?? false

    if (isAuthRoute) {
        return <>{children}</>
    }

    const checking = useAuthGuard()

    if (checking) {
        return <div>Cargando...</div>
    }

    return (
        <ABETProvider>
            <SidebarProvider>
                <div className="flex h-screen w-full overflow-hidden">
                    <div data-layout-sidebar="true">
                        <AppSidebar />
                    </div>

                    <div className="flex flex-col flex-1 h-full overflow-hidden">
                        <div data-layout-navbar="true">
                            <Navbar />
                        </div>

                        <main className="flex-1 p-8 overflow-y-auto bg-white">
                            <div className="max-w-7xl mx-auto">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </SidebarProvider>
        </ABETProvider>
    )
}