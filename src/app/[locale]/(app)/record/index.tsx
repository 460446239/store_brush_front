'use client'
import { useInfiniteData } from '@/hooks/use-infine';
import InfiniteScroll from 'react-infinite-scroller';
import { OrderItem } from './order_list';
import { Loader2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BrushItem } from '../brush/brush';
import StarRating from '@/components/rating';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import http from '@/lib/client';
import { toast } from 'sonner';

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

const Record = () => {
    const t = useTranslations();
    const {
        data,
        isLoadingInitialData,
        isLoadingMore,
        isReachingEnd,
        loadMore,
        refresh
    } = useInfiniteData<BrushOrder>('/api/order/list');
    const [order, setOrder] = useState<BrushOrder | undefined>();
    const [rating, setRating] = useState(0);

     const handlePayment = async (order: BrushOrder) => {
        try {
            await http<any, BrushOrder>('/api/pay_border');
            setOrder(order);
        } catch (e: any) {
            toast.error(e);
        }
    };

    const handleEvaluate = async () => {
        try {
            await http(`/api/evaluate?id=${order?.id}&evaluate=${rating}`);
            setOrder(undefined);
            await refresh()
            toast.success(t('brush.brush_success'));
        } catch (e: any) {
            toast.error(e);
        }
    };
    


    return <div className="max-w-6xl mx-auto px-4 pt-6 w-full">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900">{t('orders.title')}</h2>
                    <p className="text-gray-600 mt-1">{t('orders.total_count', { count: data.length })}</p>
                </div>
    
                <div className="overflow-hidden">
                    {/* Desktop Table Header */}
                    <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-700">
                        <div className="col-span-2">{t('orders.order_id')}</div>
                        <div className="col-span-3">{t('orders.product_info')}</div>
                        <div className="col-span-1">{t('orders.unit_price')}</div>
                        <div className="col-span-1">{t('orders.total_price')}</div>
                        <div className="col-span-1">{t('orders.outstanding')}</div>
                        <div className="col-span-1">{t('orders.profit')}</div>
                        <div className="col-span-2">{t('orders.status')}</div>
                    </div>
    
                    {/* Order List */}
                    <div className="divide-y divide-gray-100">
                        <InfiniteScroll pageStart={0}
                            loadMore={loadMore}
                            hasMore={!isReachingEnd}
                            initialLoad={isLoadingInitialData || isLoadingMore}
                            loader={<div key="loading" className='flex items-center justify-center text-muted-foreground'>
                                        <Loader2Icon className="animate-spin mr-3" /> 
                                        { t('loading') }
                                    </div>} >
                        {data.map((order) => (<OrderItem key={order.id} order={order} onPayment={handlePayment} onEvaluate={setOrder}/>))}
                    </InfiniteScroll>
                    </div>
                </div>
                <Dialog open={Boolean(order)} onOpenChange={(open) => { if (!open) setOrder(undefined) }}>
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
                                <Button className="w-full mt-4" disabled={rating === 0} onClick={handleEvaluate}>
                                    {t('confirm')}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
}
export default Record;