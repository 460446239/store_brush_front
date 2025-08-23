'use client'
import { useInfiniteData } from '@/hooks/use-infine';
import InfiniteScroll from 'react-infinite-scroller';
import { RechargeItem } from './item';
import { Loader2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';

const TopupHistory = () => {
    const t = useTranslations();
    const {
        data,
        isLoadingInitialData,
        isLoadingMore,
        isReachingEnd,
        loadMore
    } = useInfiniteData<Rechrage>('/api/recharge_log');

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">{t('transactions.top_up_flow')}</h2>
                <p className="text-gray-600 mt-1">{t('transactions.topup_history')}</p>
            </div>

            <div className="space-y-3">
                <InfiniteScroll 
                    pageStart={0}
                    loadMore={loadMore}
                    hasMore={!isReachingEnd}
                    initialLoad={isLoadingInitialData || isLoadingMore}
                    loader={
                        <div key="loading" className='flex items-center justify-center text-muted-foreground py-4'>
                            <Loader2Icon className="animate-spin mr-3" /> 
                            {t('loading')}
                        </div>
                    }
                >
                    {data.map((item, index) => (
                        <RechargeItem key={`${item._add_time}-${index}`} item={item} />
                    ))}
                </InfiniteScroll>
            </div>

            {data.length === 0 && !isLoadingInitialData && (
                <div className="text-center py-8">
                    <p className="text-gray-500">No top-up records found</p>
                </div>
            )}
        </div>
    );
};

export default TopupHistory;