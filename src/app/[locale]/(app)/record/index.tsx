'use client'
import { useInfiniteData } from '@/hooks/use-infine';
import InfiniteScroll from 'react-infinite-scroller';
import { OrderList } from './order_list';
import { Loader2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Record = () => {
    const t = useTranslations();
    const {
        data,
        isLoadingInitialData,
        isLoadingMore,
        isReachingEnd,
        loadMore
    } = useInfiniteData<BrushOrder>('/api/order/list');

    return <InfiniteScroll pageStart={0}
                            loadMore={loadMore}
                            hasMore={!isReachingEnd}
                            initialLoad={isLoadingInitialData || isLoadingMore}
                            loader={<div key="loading" className='flex items-center justify-center text-muted-foreground'>
                                        <Loader2Icon className="animate-spin mr-3" /> 
                                        { t('loading') }
                                    </div>} >
                <OrderList key="order_list" orders={data} loading={isLoadingInitialData}/>
            </InfiniteScroll>
}
export default Record;