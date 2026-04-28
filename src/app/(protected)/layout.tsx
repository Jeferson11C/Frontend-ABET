'use client'

import LayoutClient from '../LayoutClient'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return <LayoutClient>{children}</LayoutClient>
}
