'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarNavGroup,
} from '@/shared/components'
import {
  HomeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { useI18n } from '@/providers'

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

export function AppSidebar() {
  const pathname = usePathname()
  const { t } = useI18n()

  const isActive = (href?: string) => (href ? pathname === href : false)

  const navigation: NavItem[] = [
    { name: t('nav.home'), href: '/', icon: HomeIcon },
    {
      name: t('nav.views'),
      icon: ChartBarIcon,
      children: [
        { name: t('nav.charts'), href: '/charts' },
        { name: t('nav.tables'), href: '/tables' },
      ],
    },
    { name: t('nav.tests'), href: '/public', icon: Cog6ToothIcon },
  ]

  return (
      <Sidebar>
        <SidebarHeader />

        <SidebarContent>
          <SidebarGroup>
            {navigation.map((item) => {
              const childActive = item.children?.some((child) => isActive(child.href)) ?? false

              return (
                  <div key={item.name}>
                    {!item.children ? (
                        <Link href={item.href ?? '#'}>
                          <SidebarItem
                              label={item.name}
                              icon={<item.icon className="h-5 w-5" />}
                              active={isActive(item.href)}
                          />
                        </Link>
                    ) : (
                        <SidebarNavGroup
                            label={item.name}
                            icon={<item.icon className="h-5 w-5" />}
                            active={childActive}
                        >
                          {item.children.map((child) => (
                              <Link key={child.name} href={child.href}>
                                <SidebarItem
                                    label={child.name}
                                    icon={null}
                                    active={isActive(child.href)}
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

        <SidebarFooter>
          <SidebarItem
              label={t('nav.logout')}
              icon={<ArrowRightStartOnRectangleIcon className="h-5 w-5" />}
          />
        </SidebarFooter>
      </Sidebar>
  )
}

export default AppSidebar