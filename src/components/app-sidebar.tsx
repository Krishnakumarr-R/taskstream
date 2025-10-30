"use client";

import {
  FolderOpen,
  CreditCard,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  Star,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const menuItems = [
  {
    title: "main",
    items: [
      { title: "Workflows", icon: FolderOpen, url: "/workflows" },
      { title: "Credentials", icon: KeyIcon, url: "/credentials" },
      { title: "Executions", icon: HistoryIcon, url: "/executions" },
    ],
  },
];

export const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="h-10 px-4 gap-x-2">
            <Link href="/workflows" prefetch>
              <Image
                src="/logos/logo.svg"
                width={40}
                height={40}
                alt="taskstream"
              />
              <span className="font-semibold">TaskStream</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>

      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={pathname.startsWith(item.url)}
                    asChild
                    className="gap-x-4 h-10 px-4"
                  >
                    <Link href={item.url} prefetch>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="upgrade to pro"
              className="gap-x-4 h-10 px-4"
            >
              <Star className="h-4 w-4" />
              <span>Upgrade to Pro</span>
            </SidebarMenuButton>

            <SidebarMenuButton
              tooltip="billing portal"
              className="gap-x-4 h-10 px-4"
            >
              <CreditCard className="h-4 w-4" />
              <span>Billing Portal</span>
            </SidebarMenuButton>

            <SidebarMenuButton
              tooltip="sign out"
              className="gap-x-4 h-10 px-4"
              onClick={async () => {
                await authClient.signOut();
                router.push("/login");
              }}
            >
              <LogOutIcon className="h-4 w-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
