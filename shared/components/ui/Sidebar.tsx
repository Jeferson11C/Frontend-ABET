'use client'
import React, { createContext, useContext, useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

type SidebarContextType = {
    open: boolean
    setOpen: (v: boolean) => void
    toggle: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({
                                    children,
                                    defaultOpen = true,
                                }: {
    children: React.ReactNode
    defaultOpen?: boolean
}) {
    const [open, setOpen] = useState<boolean>(defaultOpen)
    const toggle = () => setOpen(v => !v)

    return (
        <SidebarContext.Provider value={{ open, setOpen, toggle }}>
            {children}
        </SidebarContext.Provider>
    )
}

export function useSidebar() {
    const ctx = useContext(SidebarContext)
    if (!ctx) throw new Error('useSidebar must be used within SidebarProvider')
    return ctx
}

export function Sidebar({
                            children,
                            className = '',
                            overlay = true,
                        }: {
    children?: React.ReactNode
    className?: string
    overlay?: boolean
}) {
    const { open } = useSidebar()

    return (
        <>
            {/* Overlay móvil */}
            {overlay && open && (
                <div className="fixed inset-0 bg-black/50 z-30 md:hidden" />
            )}

            <aside
                className={`
          fixed md:relative z-40 h-screen
          transition-all duration-300 ease-in-out
          ${open ? 'w-64' : 'w-20'}
          rounded-r-2xl shadow-xl
          bg-sidebar border-sidebar
          ${className}
        `}
            >
                {children}
            </aside>
        </>
    )
}

export function SidebarHeader({
                                  children,
                                  className = '',
                              }: {
    children?: React.ReactNode
    className?: string
}) {
    const { open, toggle } = useSidebar()

    return (
        <div
            className={`flex items-center justify-between px-4 py-4 border-b border-sidebar ${className}`}
        >
            {open && <div className="font-semibold text-sidebar-foreground">Mi App</div>}

            <button
                onClick={toggle}
                aria-label={open ? 'Cerrar sidebar' : 'Abrir sidebar'}
                className="p-2 rounded-lg hover:bg-sidebar-hover transition"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-sidebar-foreground"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                >
                    {open ? (
                        <path strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>
        </div>
    )
}

export function SidebarContent({
                                   children,
                                   className = '',
                               }: {
    children?: React.ReactNode
    className?: string
}) {
    return (
        <div className={`flex-1 overflow-y-auto p-3 space-y-2 ${className}`}>
            {children}
        </div>
    )
}

export function SidebarFooter({
                                  children,
                                  className = '',
                              }: {
    children?: React.ReactNode
    className?: string
}) {
    return (
        <div className={`p-4 border-t border-sidebar ${className}`}>
            {children}
        </div>
    )
}

export function SidebarItem({
                                icon,
                                label,
                                active = false,
                                onClick,
                                className = '',
                            }: {
    icon: React.ReactNode
    label: string
    active?: boolean
    onClick?: () => void
    className?: string
}) {
    const { open } = useSidebar()

    return (
        <div
            onClick={onClick}
            className={`
        flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer
        transition-all duration-200
        ${
                active
                    ? 'bg-sidebar-active text-sidebar-foreground'
                    : 'text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-foreground'
            }
        ${className}
      `}
        >
            <div className="text-lg">{icon}</div>
            {open && <span className="text-sm font-medium">{label}</span>}
        </div>
    )
}

export function SidebarGroup({
                                 label,
                                 children,
                                 className = '',
                             }: {
    label?: string
    children?: React.ReactNode
    className?: string
}) {
    const { open } = useSidebar()

    return (
        <div className={`mt-4 ${className}`}>
            {label && open && (
                <div className="px-3 mb-2 text-xs uppercase text-sidebar-muted">
                    {label}
                </div>
            )}
            <div className="space-y-1">{children}</div>
        </div>
    )
}

export function SidebarNavGroup({
  label,
  icon,
  defaultOpen = true,
  active = false,
  children,
}: {
  label: string
  icon: React.ReactNode
  defaultOpen?: boolean
  active?: boolean
  children?: React.ReactNode
}) {
  const { open } = useSidebar()
  const [expanded, setExpanded] = useState(defaultOpen)

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all text-sm font-semibold ${expanded || active ? 'text-white' : 'text-zinc-300'} hover:bg-zinc-800 hover:text-white`}
      >
        <span className={`h-5 w-5 flex items-center justify-center ${active ? 'text-red-500' : 'text-zinc-400'}`}>{icon}</span>
        {open && <span className="flex-1 text-left">{label}</span>}
        {open && (
          <ChevronRightIcon className={`h-4 w-4 transition-transform ${expanded ? 'rotate-90 text-zinc-300' : 'text-zinc-500'}`} />
        )}
      </button>

      {open && expanded && (
        <div className="space-y-1">
          {children}
        </div>
      )}
    </div>
  )
}

export default Sidebar
