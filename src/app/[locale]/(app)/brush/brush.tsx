'use client'
import StarRating from "@/components/rating";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { useState } from "react";
import http from '@/lib/client';
import { toast } from "sonner";
import dayjs from 'dayjs';
import { useSWRConfig } from 'swr'

export type BrushItem = {
    key: string;
    data_key: keyof BrushOrder;
    unit?: string
};

const BRUSH_ITEMS: BrushItem[] = [
    {
        key: 'order_no',
        data_key: 'order_id',
    },
    {
        key: 'amount',
        data_key: "total_price",
        unit: "$"
    },
    {
        key: 'profit',
        data_key: "rebate_fee",
        unit: "$"
    },
];

const Brush = () => {
    const t = useTranslations();
    const { mutate } = useSWRConfig();
    const [order, setOrider] = useState<BrushOrder | undefined>();
    const [rating, setRating] = useState(0);

    const onBrush = async () => {
        try {
            const order = await http<any, BrushOrder>('/api/bruch_order');
            await mutate(
                key => typeof key === 'string' && (key.startsWith('/api/team_log') || key.startsWith('/api/order/list')),
                undefined,
                { revalidate: true }
            );
            setOrider(order);
        } catch (e: any) {
            toast.error(e);
        }
    }

    const onEvaluate = async () => {
        try {
            await http(`/api/evaluate?id=${order?.id}&evaluate=${rating}`);
            await mutate(
                key => typeof key === 'string' && (key.startsWith('/api/team_log') || key.startsWith('/api/order/list')),
                undefined,
                { revalidate: true }
            );
            setOrider(undefined);
            toast.success(t('brush.brush_success'));
            location.reload();
        } catch (e: any) {
            toast.error(e);
        }
    }

    return <>
        <Button className="mx-6" onClick={onBrush}>{t('brush.follow')}</Button>
        <Dialog open={Boolean(order)} onOpenChange={(open) => { if (!open) setOrider(undefined) }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="w-full">
                    <div className="flex">
                        <img className="size-24 shrink-0 border mr-2 rounded-sm" src={order?.cart_id.goods.image} alt={order?.cart_id.goods.store_name}/>
                        <div>
                            <label>{ order?.cart_id.goods.store_name }</label>
                            <div className="text-muted-foreground flex items-center justify-between">
                                <label>${ order?.cart_id.goods.price }</label>
                                <label>x{ order?.cart_id.num }</label>
                            </div>
                        </div>
                    </div>
                    <ul className="mt-6">
                        {
                            BRUSH_ITEMS.map((item) => {
                                return <li key={item.key} className="flex items-center justify-between py-1 text-sm">
                                    <label className="text-muted-foreground">{t(`brush.${item.key}`)}:</label>
                                    {/* @ts-ignore */}
                                    <label>{item.unit} {order?.[item.data_key] ?? '\u00A0'}</label>
                                </li>
                            })
                        }
                        <li className="flex items-center justify-between py-1 text-sm">
                            <label className="text-muted-foreground">{t('brush.trasnaction_at')}:</label>
                            <label>{ dayjs(order?.add_time).format("YYYY-MM-DD HH:mm") }</label>
                        </li>
                    </ul>
                    <span className="border-t-[1px] my-6 block" />
                    <div className="flex justify-center flex-col items-center">
                        <StarRating size="large" onRatingChange={setRating} />
                        <Button className="w-full mt-4" disabled={rating === 0} onClick={onEvaluate}>
                            {t('confirm')}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    </>
}

export default Brush;