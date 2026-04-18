'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarItem,
  SidebarNavGroup
} from '@/shared/components/ui'
import {
  HomeIcon,
  ChartBarIcon,
  TableCellsIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

type NavChild = {
  name: string
  href: string
}

type NavItem = {
  name: string
  href?: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  children?: NavChild[]
}

const navigation: NavItem[] = [
  { name: 'Inicio', href: '/', icon: HomeIcon },
  {
    name: 'Vistas',
    icon: ChartBarIcon,
    children: [
      { name: 'Graficos', href: '/charts' },
    ],

  },
  { name: 'Tablas', href: '/tables', icon: TableCellsIcon },
  { name: 'Pruebas', href: '/public', icon: Cog6ToothIcon }
]

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (href?: string) => (href ? pathname === href : false)

  return (
    <Sidebar className="bg-zinc-900 border-r border-zinc-700 text-zinc-100 shrink-0">
      <SidebarHeader className="p-6 border-b border-zinc-800"/>

      <SidebarContent className="mt-4 px-2">
        <SidebarGroup>
          {navigation.map((item) => {
            const childActive = item.children?.some((child) => isActive(child.href)) ?? false

            return (
              <div key={item.name} className="mb-1">
                {!item.children ? (
                  <Link href={item.href ?? '#'} className="block group">
                    <SidebarItem
                      label={item.name}
                      icon={<item.icon className={`h-5 w-5 ${isActive(item.href) ? 'text-red-500' : 'text-zinc-400 group-hover:text-red-500'} transition-colors`} />}
                      className={`${isActive(item.href) ? 'bg-zinc-800 text-red-500' : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'} rounded-md transition-all text-sm font-semibold`}
                    />
                  </Link>
                ) : (
                  <SidebarNavGroup label={item.name} icon={<item.icon className="h-5 w-5" />} active={childActive}>
                    {item.children.map((child) => (
                      <Link key={child.name} href={child.href} className="block group">
                        <SidebarItem
                          label={child.name}
                          icon={
                            <span className="h-5 w-5 flex items-center justify-center">
                              <span className={`h-1.5 w-1.5 rounded-full ${isActive(child.href) ? 'bg-red-500' : 'bg-zinc-600'}`} />
                            </span>
                          }
                          className={`${isActive(child.href) ? 'bg-zinc-800 text-red-500' : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'} rounded-md transition-all text-sm font-semibold`}
                        />
                      </Link>
                    ))}
                  </SidebarNavGroup>
                )}
              </div>
            )
          })}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
