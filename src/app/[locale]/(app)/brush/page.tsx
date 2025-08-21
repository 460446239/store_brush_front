import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import http from '@/lib/auth/http';
import { getCurrentUser } from "@/lib/auth/auth-service";
import { Button } from "@/components/ui/button";
import Brush from "./brush";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();
    return {
        title: t('brush.title'),
    }
}

interface BrushData {
    return: {
        // 任务完成 
        bruch_num: number
        // 是否开启了抢单 0否 1是
        bruch_status: number
        // 差额
        debt_fee: number
        // 钱包余额
        now_money: string
        // 利润率
        rebate: string
        // 任务总计
        task_num: number
        // 今日利润
        today_rebate_fee: string
    }
}

const Page = async () => {
    const t = await getTranslations();
    const user = await getCurrentUser();
    const data = await http.get<any, BrushData>('/bruch_page', { params: { uid: user?.uid } });
    return <div className="flex flex-col h-full">
        <div className="pt-30" />
        <div className="m-4 p-4 border-[1px] rounded-lg">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xl font-bold">$ {data.return.today_rebate_fee}</label>
                    <label className="block text-muted-foreground text-sm">{t('brush.today_profit')}</label>
                </div>
                <div>
                    <label className="text-xl font-bold">$ {data.return.now_money}</label>
                    <label className="block text-muted-foreground text-sm">{t('balance')}</label>
                </div>
            </div>
            <div className="border-t-[1px] border-dashed mt-4 pt-4">
                <div className="flex items-center justify-between py-2">
                    <label className="text-sm text-gray-500">{t('brush.taks_num')}</label>
                    <label>{data.return.task_num}</label>
                </div>
                <div className="flex items-center justify-between py-2">
                    <label className="text-sm text-gray-500">{t('brush.bruch_num')}</label>
                    <label>{data.return.bruch_num}</label>
                </div>
            </div>
        </div>
        <Brush />
        <div className="text-center mt-2">
            <label className="text-sm">
                <span className="text-muted-foreground ">{t('profit')}:</span>
                {` ${+data.return.rebate}%`}
            </label>
            <span className="mx-2 border" />
            <label className="text-sm text-muted-foreground">
                {` ${t('brush.debt_fee')}: `}
                <label className="text-primary">${data.return.debt_fee ?? 0}</label>
            </label>
        </div>
    </div>
}

export default Page;