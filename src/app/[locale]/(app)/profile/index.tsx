'use client'
import Copyable from "@/components/copyable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth/context";
import { useTranslations } from "next-intl";
import { signout } from "../actions";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Topup from "@/components/topup";
import Withdraw from "@/components/withdraw";

const Profile = () => {
    const t =  useTranslations();
    const { user } = useAuth();
    return <div className="flex-1 flex flex-col"
                style={{ background: 'url(/bg1.3983be8b.png)' }}>
        <div className="flex items-center px-4 py-6">
            <Avatar className="size-14">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.email.split('@')?.[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
                <label className="font-bold text-primary-foreground">{user?.nickname}</label>
                <span className="flex items-center text-xs mt-1 text-primary-foreground">
                    <label className="mr-1">{t('invite_code')}:</label>
                    <Copyable text={user?.invite_code ?? ''} className="text-white">
                        { user?.invite_code }
                    </Copyable>
                </span>
            </div>
        </div>
        <div className="mx-4 relative">
            <label className="block mr-1 text-sm mb-2 text-primary-foreground">{t('credit_score')}</label>
            <label className="absolute bottom-0 text-xs -translate-x-2/3 translate-y-1/3 z-10 bg-primary text-white rounded-full px-2 py-1" 
                style={{ left: `${user?.credit_score ?? 0}%` }}>
                { user?.credit_score }
            </label>
            <Progress value={user?.credit_score ?? 0}/>
        </div>
        <div className="flex-1 bg-primary-foreground mt-6 pt-5 rounded-t-2xl">
            <div className="px-3 flex flex-col h-full">
                <div className="flex flex-col">
                    <span className="border-[1px] border-primary rounded-sm p-2  mb-2">
                        <label className="text-sm text-secondary-foreground">{t('balance')}</label>
                        <span className="mx-2 border-r-[1px] border-dashed"/>
                        {`$ ${user?.now_money}`}
                    </span>
                    <div className="w-full mt-3 grid grid-cols-2 gap-6">
                        <Topup>
                            <Button className="flex-1">{t('top_up')}</Button>
                        </Topup>
                        <Withdraw>
                            <Button variant="outline" className="border-primary text-primary w-full">
                                {t('withdraw')}
                            </Button>
                        </Withdraw>
                    </div>
                </div>
                <ul className="flex-1 mt-5">
                    <li className="py-2 flex items-center">
                        <label className="flex-1">{ t('profile.cash_flow') }</label>
                        <ChevronRight />
                    </li>
                    <li className="py-2 flex items-center">
                        <label className="flex-1">{ t('profile.top_up_flow') }</label>
                        <ChevronRight />
                    </li>
                    <li className="py-2 flex items-center">
                        <label className="flex-1">{ t('profile.withdraw_flow') }</label>
                        <ChevronRight />
                    </li>
                </ul>
                <Button className="w-full my-3" onClick={signout}>{t('signout')}</Button>
            </div>
        </div>
    </div>
}
export default Profile;