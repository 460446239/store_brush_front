'use client'
import { useInfiniteData } from '@/hooks/use-infine';
import InfiniteScroll from 'react-infinite-scroller';
import { CashFlowItem } from './item';
import { Loader2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';

const CashFlow = () => {
    const t = useTranslations();
    const {
        data,
        isLoadingInitialData,
        isLoadingMore,
        isReachingEnd,
        loadMore
    } = useInfiniteData<ClashFlow>('/api/user/money_log');

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">{t('transactions.cash_flow')}</h2>
                <p className="text-gray-600 mt-1">{t('transactions.transaction_history')}</p>
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
                        <CashFlowItem key={`${item.add_time}-${index}`} item={item} />
                    ))}
                </InfiniteScroll>
            </div>

            {data.length === 0 && !isLoadingInitialData && (
                <div className="text-center py-8">
                    <p className="text-gray-500">{t('transactions.no_transactions')}</p>
                </div>
            )}
        </div>
    );
};

export default CashFlow;