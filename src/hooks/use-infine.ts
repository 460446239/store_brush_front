import useSWRInfinite from 'swr/infinite'
import { useCallback, useRef } from 'react'

export function useInfiniteData<T extends any>(url: string, pageSize = 10) {
    const loadingRef = useRef(false)

    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data.length) return null
        return `${url}?page=${pageIndex + 1}&limit=${pageSize}`
    }

    const {
        data,
        error,
        size,
        setSize,
        isValidating,
        mutate
    } = useSWRInfinite<Paginate<T>>(
        getKey,
        {
            revalidateFirstPage: false,
            revalidateOnMount: true,
            revalidateOnFocus: false,
        }
    )

    // 合并所有页面的数据
    const allData: T[] = data 
        ? ([] as T[]).concat(...data.map(page => page.data))
        : []

    const isLoadingInitialData = !data && !error
    const isLoadingMore = isLoadingInitialData ||
        (size > 0 && data && typeof data[size - 1] === 'undefined')
    const isEmpty = data?.[0]?.data?.length === 0
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.data?.length < pageSize)
    const totalItems = data?.[0]?.count || 0

    // 刷新数据
    const refresh = useCallback(async () => {
        try {
            const newData = await mutate()
            return newData
        } catch (err) {
            console.error('Refresh failed:', err)
        }
    }, [mutate])

    // 加载更多
    const loadMore = useCallback(async () => {
        if (loadingRef.current || isReachingEnd || isLoadingMore) return

        loadingRef.current = true
        try {
            setSize(prev => prev + 1)
        } finally {
            loadingRef.current = false
        }
    }, [isReachingEnd, isLoadingMore, setSize])

    return {
        data: allData,
        error,
        size,
        setSize,
        isValidating,
        isLoadingInitialData,
        isLoadingMore,
        isEmpty,
        isReachingEnd,
        totalItems,
        refresh,
        loadMore
    }
}