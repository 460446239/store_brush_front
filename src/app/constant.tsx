import { HomeIcon, MessageSquareMoreIcon, UserIcon, UsersIcon } from "lucide-react";
import ButtonIcon from '@/assests/icons/btn.svg';
export const MENUS = [
    {
        path: '/',
        icon: <HomeIcon size={24}/>,
        label: 'tabbar.home',
    },
    {
        path: '/teams',
        icon: <UsersIcon size={24}/>,
        label: 'tabbar.teams',
    },
    {
        path: '/brush',
        mobile: true,
        icon: <ButtonIcon className="w-12"/>
    },
    {
        path: '/record',
        icon: <MessageSquareMoreIcon size={24}/>,
        label: 'tabbar.record',
    },
    {
        path: '/profile',
        icon: <UserIcon size={24}/>,
        label: 'tabbar.profile',
    },
]