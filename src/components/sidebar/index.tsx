'use client'
import {
    Sidebar as SiderBarUI,
    SidebarProvider,
    SidebarGroup,
    SidebarContent,
    SidebarInset,
} from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { Link, usePathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

interface SidebarProps {
    items: { 
        path: string
        icon?: React.ReactNode
        mobile?: boolean
        label?: string
    }[]
    children?: React.ReactNode
}

export function Sidebar(props: SidebarProps) {
    const isMobile = useIsMobile();
    const pathname = usePathname();
    
    return (
        !isMobile ? <SidebarProvider>
                        <SiderBarUI>
                            <SidebarContent>
                                <SidebarGroup className="px-3">
                                    {
                                        props.items.map((item) => {
                                            if (item.mobile) return null;
                                            return <Link href={item.path} key={item.path} className={cn("flex flex-row items-center py-3 text-gray-400 hover:text-primary", { "text-primary": pathname === item.path })}>
                                                        { item.icon }
                                                        <label className="ml-3">{ item.label ?? '\u00A0' }</label> 
                                                    </Link>
                                        })
                                    }
                                </SidebarGroup>
                            </SidebarContent>
                        </SiderBarUI>
                        <SidebarInset>
                            { props.children }
                        </SidebarInset>
                    </SidebarProvider> :
                    <>
                        { props.children }
                        <div className="fixed left-0 bottom-0 right-0 h-12 grid grid-cols-5">
                            {
                                props.items.map((item) => {
                                    return <Link href={item.path} key={item.path} className={cn("flex flex-col items-center text-gray-400", { "text-primary-foreground": pathname === item.path })}>
                                                { item.icon }
                                                <label className="text-xs mt-1">{ item.label ?? '\u00A0' }</label> 
                                            </Link>
                                })
                            }
                        </div>
                    </>
    )
}