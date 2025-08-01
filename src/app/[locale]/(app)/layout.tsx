import { Sidebar } from "@/components/sidebar";
import { HomeIcon, MessageSquareMoreIcon, UserIcon, UsersIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import ButtonIcon from '@/assests/icons/btn.svg';

export default async function Layout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    const t = await getTranslations();
    return <>
        <Sidebar items={[
            {
                path: '/',
                icon: <HomeIcon size={24}/>,
                label: t('tabbar.home'),
            },
            {
                path: '/teams',
                icon: <UsersIcon size={24}/>,
                label: t('tabbar.teams'),
            },
            {
                path: '/brush',
                mobile: true,
                icon: <ButtonIcon />
            },
            {
                path: '/record',
                icon: <MessageSquareMoreIcon size={24}/>,
                label: t('tabbar.record'),
            },
            {
                path: '/profile',
                icon: <UserIcon size={24}/>,
                label: t('tabbar.profile'),
            },
        ]} >
        { children }
        </Sidebar>
        { modal }
    </>;
}
