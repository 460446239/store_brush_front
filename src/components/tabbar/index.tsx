'use client'
import { useIsMobile } from "@/hooks/use-mobile"
import { Link, usePathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

interface TabbarProps {
    items: { 
        path: string
        icon?: React.ReactNode
        mobile?: boolean
        label?: string
    }[]
    children?: React.ReactNode
}

export function Tabbar(props: TabbarProps) {
    const t = useTranslations();
    const isMobile = useIsMobile();
    const pathname = usePathname();
    
    return (
        isMobile ?  <div className="fixed left-0 bottom-0 right-0 h-12 grid grid-cols-5">
                        {
                            props.items.map((item) => {
                                return <Link href={item.path} key={item.path} className={cn("flex flex-col items-center text-foreground", { "text-primary": pathname === item.path })}>
                                            { item.icon }
                                            <label className="text-xs mt-1">{ item.label ? t(item.label) : '\u00A0' }</label> 
                                        </Link>
                            })
                        }
                    </div> : null
    )
}