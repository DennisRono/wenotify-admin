'use client'
import { usePathname } from 'next/navigation'
import type * as LucideIcons from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'
import { useTranslate } from '@/i18n/translate'
import DynamicIcon from '@/components/shared/dynamic-icon'
import { useState } from 'react'
import { ChevronDown, ChevronRight, Settings } from 'lucide-react'

type IconName = keyof typeof LucideIcons

interface NavItem {
  title: string
  href: string
  icon: string
  badge?: number | string
  service_name: string
  submenu?: NavItem[]
}

export default function DashboardSidebar() {
  const pathname = usePathname()
  const { translate } = useTranslate()
  const { state } = useSidebar()

  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set())

  const toggleSubmenu = (title: string) => {
    const newOpenSubmenus = new Set(openSubmenus)
    if (newOpenSubmenus.has(title)) {
      newOpenSubmenus.delete(title)
    } else {
      newOpenSubmenus.add(title)
    }
    setOpenSubmenus(newOpenSubmenus)
  }

  const mainNavItems: NavItem[] = [
    {
      title: translate('Analytics'),
      href: '/analytics',
      icon: 'BarChart3',
      service_name: '',
    },
    {
      title: 'Reports',
      href: '/reports',
      icon: 'PieChart',
      service_name: '',
    },
  ]

  const secondaryNavItems: NavItem[] = []

  const renderSubmenuTooltip = (submenu: NavItem[]) => (
    <div className="space-y-1">
      {submenu.map((subItem) => (
        <Link
          key={subItem.title}
          href={subItem.href}
          className={cn(
            'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
            pathname === subItem.href &&
              'bg-accent text-accent-foreground font-medium'
          )}
        >
          <DynamicIcon name={subItem.icon as IconName} className="h-3 w-3" />
          <span>{subItem.title}</span>
          {subItem.badge && (
            <span className="ml-auto rounded-full bg-secondary px-1.5 py-0.5 text-xs text-primary-foreground">
              {subItem.badge}
            </span>
          )}
        </Link>
      ))}
    </div>
  )

  return (
    <TooltipProvider delayDuration={300}>
      <Sidebar
        collapsible="icon"
        className="ml-2 border-none bg-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <SidebarHeader className="border-b border-sidebar-border">
          <SidebarMenuItem className="list-none py-1.5">
            <SidebarTrigger />
          </SidebarMenuItem>
        </SidebarHeader>
        <SidebarContent className="bg-transparent">
          <SidebarGroup>
            <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.submenu ? (
                      <>
                        {state === 'collapsed' ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              {item.submenu && item.submenu.length > 0 ? (
                                <SidebarMenuButton
                                  isActive={pathname.startsWith(item.href)}
                                  tooltip={undefined}
                                  className="rounded-sm text-black dark:text-white hover:rounded-sm"
                                >
                                  <DynamicIcon
                                    name={item.icon as IconName}
                                    className="h-4 w-4"
                                  />
                                  <span>{item.title}</span>
                                </SidebarMenuButton>
                              ) : (
                                <SidebarMenuButton
                                  isActive={pathname.startsWith(item.href)}
                                  tooltip={item.title}
                                  className="rounded-sm text-black dark:text-white"
                                >
                                  <DynamicIcon
                                    name={item.icon as IconName}
                                    className="h-4 w-4"
                                  />
                                  <span>{item.title}</span>
                                </SidebarMenuButton>
                              )}
                            </TooltipTrigger>
                            <TooltipContent
                              side="right"
                              align="start"
                              className="w-48 p-2 bg-secondary text-white"
                              sideOffset={8}
                            >
                              <div className="space-y-1">
                                {item?.submenu && item.submenu.length > 0 ? (
                                  renderSubmenuTooltip(item.submenu)
                                ) : (
                                  <div className="font-medium text-sm border-b pb-1 mb-2">
                                    {item.title}
                                  </div>
                                )}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <SidebarMenuButton
                            onClick={() => toggleSubmenu(item.title)}
                            isActive={pathname.startsWith(item.href)}
                            tooltip={item.title}
                            className="rounded-sm text-black dark:text-white"
                          >
                            <DynamicIcon
                              name={item.icon as IconName}
                              className="h-4 w-4"
                            />
                            <span>{item.title}</span>
                            {openSubmenus.has(item.title) ? (
                              <ChevronDown className="ml-auto h-4 w-4" />
                            ) : (
                              <ChevronRight className="ml-auto h-4 w-4" />
                            )}
                          </SidebarMenuButton>
                        )}
                        {item.badge && (
                          <SidebarMenuBadge className="!bg-secondary">
                            {item.badge}
                          </SidebarMenuBadge>
                        )}
                        {state === 'expanded' &&
                          openSubmenus.has(item.title) && (
                            <div className="ml-4 mt-1 space-y-1">
                              {item.submenu.map((subItem) => (
                                <SidebarMenuButton
                                  key={subItem.title}
                                  asChild
                                  isActive={pathname === subItem.href}
                                  tooltip={subItem.title}
                                  className="rounded-sm text-black dark:text-white text-sm pl-6"
                                >
                                  <Link href={subItem.href}>
                                    <DynamicIcon
                                      name={subItem.icon as IconName}
                                      className="h-3 w-3"
                                    />
                                    <span>{subItem.title}</span>
                                    {subItem.badge && (
                                      <SidebarMenuBadge className="ml-auto">
                                        {subItem.badge}
                                      </SidebarMenuBadge>
                                    )}
                                  </Link>
                                </SidebarMenuButton>
                              ))}
                            </div>
                          )}
                      </>
                    ) : (
                      <>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === item.href}
                          tooltip={item.title}
                          className="rounded-sm text-black dark:text-white hover:rounded-sm"
                        >
                          <Link href={item.href}>
                            <DynamicIcon
                              name={item.icon as IconName}
                              className="h-4 w-4"
                            />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                        {item.badge && (
                          <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                        )}
                      </>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {secondaryNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.title}
                      className="text-black dark:text-white"
                    >
                      <Link href={item.href}>
                        <DynamicIcon
                          name={item.icon as IconName}
                          className="h-4 w-4"
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge
                        className={cn(
                          'bg-secondary text-black dark:text-white',
                          typeof item.badge === 'string' && 'min-w-fit px-1.5'
                        )}
                      >
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t border-sidebar-border">
          <div className="flex items-center justify-start pl-1">
            <Link href="/settings">
              <Settings className="h-6 w-6 hover:bg-accent rounded-[5px] p-1" />
            </Link>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </TooltipProvider>
  )
}
