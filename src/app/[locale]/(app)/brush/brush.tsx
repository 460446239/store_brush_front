'use client'
import StarRating from "@/components/rating";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { useState } from "react";
import http from '@/lib/client';
import { toast } from "sonner";

interface BrushOrder {
    id: number
    // 订单ID
    order_id: string
    // 订单总价
    total_price: string
    // 欠款
    pay_price: string
    // 单价
    price: string
    // 付款结果
    paid: boolean
    // 利润
    rebate_fee: string
    // 交易时间
    addtime: string
}
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
    {
        key: 'trasnaction_at',
        data_key: 'addtime',
    },
];

const Brush = () => {
    const t = useTranslations();
    const [order, setOrider] = useState<BrushOrder | undefined>();
    const [rating, setRating] = useState(0);

    const onBrush = async () => {
        try {
            const order = await http<any, BrushOrder>('/api/bruch_order');
            setOrider(order);
        } catch (e: any) {
            toast.error(e);
        }
    }

    const onEvaluate = async () => {
        try {
            await http(`/api/evaluate?id=${order?.id}&evaluate=${rating}`);
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
                    <ul>
                        {
                            BRUSH_ITEMS.map((item) => {
                                return <li key={item.key} className="flex items-center justify-between py-1 text-sm">
                                    <label className="text-muted-foreground">{t(`brush.${item.key}`)}:</label>
                                    <label>{item.unit} {order?.[item.data_key] ?? '\u00A0'}</label>
                                </li>
                            })
                        }
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