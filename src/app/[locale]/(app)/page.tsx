import Language from "@/components/language";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/navigation";
import { getUser } from "@/lib/auth/server";
import { LogOutIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { signout } from "./actions";
import { MENUS } from "@/app/constant";
import LogoIcon from '@/assests/icons/logo.svg';


export default async function Home() {
    const t = await getTranslations();
    const user = await getUser();

    return (
        <>
            <div className="md:flex md:items-center">
                <div className="flex p-2 w-full">
                    <LogoIcon className="w-20"/>
                    <span className="flex-1" />
                    <Language />
                </div>
                {
                    !user ? <div className="grid grid-cols-2 gap-2 p-2 md:flex">
                        <Link href="/signin">
                            <Button className="w-full">{t('signin')}</Button>
                        </Link>
                        <Link href="/signup">
                            <Button variant="outline" className="border-primary text-primary w-full">{t('signup')}</Button>
                        </Link>
                    </div> : <DropdownMenu>
                        <DropdownMenuTrigger className="hidden md:block mx-2 cursor-pointer" asChild>
                            <Avatar>
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{user.email.split('@')?.[0][0]}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                <div className="flex items-center">
                                    <Avatar>
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback>{user.email.split('@')?.[0][0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-3">
                                        <label className="text-xs">{user.nickname}</label>
                                        <span className="block text-xs mt-1">
                                            <label className="mr-1 text-gray-400">{t('credit_score')}:</label>
                                            {user.credit_score}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-2 py-2">
                                    <span>
                                        <label className="mr-1 text-sm text-gray-400">{t('balance')}:</label>
                                        {user.now_money}
                                    </span>
                                    <Link className="text-primary text-xs ml-2" href="#">{ t('top_up') }</Link>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                {
                                    MENUS.map((menu) => {
                                        if (menu.mobile || menu.path === '/') return null;
                                        return <Link href={menu.path} key={menu.path}>
                                            <DropdownMenuItem>
                                                {menu.icon}
                                                {menu.label ? t(menu.label) : '\u00A0'}
                                            </DropdownMenuItem>
                                        </Link>
                                    })
                                }
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={signout}>
                                <LogOutIcon />
                                {t('signout')}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </div>
            <div className="px-2">
                {
                    user ? <div className="flex flex-col md:hidden">
                        <span className="border-[1px] border-primary rounded-sm p-2 mt-5 mb-2">
                            <label className="text-sm text-secondary-foreground">{t('balance')}</label>
                            <span className="mx-2 border-r-[1px] border-dashed"/>
                            {user.now_money}
                        </span>
                        <div className="flex items-center w-full mt-3">
                            <Link className="flex-1" href="/signin">
                                <Button className="w-full">{t('top_up')}</Button>
                            </Link>
                            <Link className="flex-1 ml-2" href="/signup">
                                <Button variant="outline" className="border-primary text-primary w-full">
                                    {t('withdraw')}
                                </Button>
                            </Link>
                        </div>
                    </div> : null
                }
            </div>
        </>
    );
}
