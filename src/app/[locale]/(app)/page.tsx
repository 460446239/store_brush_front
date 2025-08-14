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
import prisma from "@/lib/prisma/client";
import LogoIcon from '@/assests/icons/logo.svg';
import Carousel from "@/components/carousel";

const FAKE_WITHDRAW = [
    {
        "user": "Alice",
        "amount": 100.50
    },
    {
        "user": "Bob",
        "amount": 75.25
    },
    {
        "user": "Charlie",
        "amount": 200.00
    },
    {
        "user": "David",
        "amount": 15.75
    },
    {
        "user": "Eve",
        "amount": 500.00
    },
    {
        "user": "Frank",
        "amount": 99.99
    },
    {
        "user": "Grace",
        "amount": 125.50
    },
    {
        "user": "Heidi",
        "amount": 30.20
    },
    {
        "user": "Ivan",
        "amount": 450.10
    },
    {
        "user": "Judy",
        "amount": 180.00
    },
    {
        "user": "Kevin",
        "amount": 88.88
    },
    {
        "user": "Linda",
        "amount": 250.75
    },
    {
        "user": "Mike",
        "amount": 65.40
    },
    {
        "user": "Nancy",
        "amount": 175.30
    },
    {
        "user": "Oscar",
        "amount": 320.60
    },
    {
        "user": "Pam",
        "amount": 10.00
    },
    {
        "user": "Quentin",
        "amount": 199.90
    },
    {
        "user": "Rachel",
        "amount": 45.55
    },
    {
        "user": "Sam",
        "amount": 600.25
    },
    {
        "user": "Tina",
        "amount": 110.00
    }
];

export default async function Home() {
    const t = await getTranslations();
    const user = await getUser();
    const products = await prisma.product.findMany();

    return (
        <>
            <div className="md:flex md:items-center">
                <div className="flex p-2 w-full">
                    <LogoIcon className="w-20" />
                    <span className="flex-1" />
                    <Language />
                </div>

                {/* PC端用户相关 */}
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
                                        {`$ ${user.now_money}`}
                                    </span>
                                    <Link className="text-primary text-xs ml-2" href="#">{t('top_up')}</Link>
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
            {/* 提现轮播 */}
            <Carousel className="mx-2 mt-2" items={FAKE_WITHDRAW.map((w) =>  t('withdraw_carousel', w))} />
            {/* 移动端用户钱包 */}
            {
                user ? <div className="px-2 md:hidden">
                    <div className="flex flex-col">
                        <span className="border-[1px] border-primary rounded-sm p-2 mt-5 mb-2">
                            <label className="text-sm text-secondary-foreground">{t('balance')}</label>
                            <span className="mx-2 border-r-[1px] border-dashed" />
                            {`$ ${user.now_money}`}
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
                    </div>
                </div> : null
            }

            {/* 产品相关 */}
            <div className="mt-4 px-2">
                <label className="border-l-4 border-primary pl-2 font-bold">{t('product.title')}</label>
                <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mt-2">
                    {
                        products.map((product) => {
                            return <div key={product.id} className="break-inside-avoid bg-white rounded-xs shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                                <div className=" aspect-w-1 aspect-h-1">
                                    <img src={product.image ?? ''}
                                        alt={product.storeName}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                                <div className="pt-4 px-2">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                                        {product.storeName}
                                    </h3>
                                    <div className="flex justify-between items-center mt-1 mb-2">
                                        <span className="text-base font-bold text-red-600">
                                            ${product.price.toString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    );
}
