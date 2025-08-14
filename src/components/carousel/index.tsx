'use client'
import { cn } from '@/lib/utils'
import React, { useState, useEffect, useRef } from 'react'

interface AnimatedVerticalCarouselProps {
    items: string[]
    height?: string
    duration?: number
    pauseOnHover?: boolean
    className?: string
}

const AnimatedVerticalCarousel: React.FC<AnimatedVerticalCarouselProps> = ({
    items,
    height = 'h-10',
    duration = 2500,
    pauseOnHover = true,
    className
}) => {
    const [position, setPosition] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])
    const totalItems = items.length
    const itemHeight = 40 // h-10 = 40px

    // 三倍列表
    const tripledItems = [...items, ...items, ...items]

    // 设置 itemRefs 的正确方式
    const setItemRef = (index: number) => (el: HTMLDivElement | null) => {
        itemRefs.current[index] = el
    }

    // 自动滚动
    useEffect(() => {
        if (totalItems <= 1) return

        let interval: NodeJS.Timeout

        if (!isPaused) {
            interval = setInterval(() => {
                setPosition(prev => prev + 1)
            }, duration)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [totalItems, duration, isPaused])

    // 页面可见性检测 - 当切换标签页时暂停/恢复
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsPaused(true)
            } else {
                setIsPaused(false)
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [])

    // 无缝循环：当 position 到达 items.length 时，瞬间跳回 0
    useEffect(() => {
        if (totalItems <= 1) return

        const handleTransitionEnd = () => {
            if (position >= totalItems) {
                // 瞬间跳回第一组的相同位置
                const newPosition = position - totalItems
                setPosition(newPosition)

                // 强制重绘以避免动画
                if (containerRef.current) {
                    containerRef.current.style.transition = 'none'
                    containerRef.current.style.transform = `translateY(${-newPosition * itemHeight}px)`
                    // 强制浏览器重绘
                    containerRef.current.offsetHeight
                    containerRef.current.style.transition = ''
                }
            }
        }

        const container = containerRef.current
        container?.addEventListener('transitionend', handleTransitionEnd)

        return () => {
            container?.removeEventListener('transitionend', handleTransitionEnd)
        }
    }, [position, totalItems, itemHeight])

    if (totalItems === 0) return null

    return (
        <div className={cn("mx-auto", className)}>
            <div
                className={`relative ${height} overflow-hidden bg-gradient-to-r from-primary/10 to-primary/10 rounded-sm border border-primary/10 shadow-sm`}
                onMouseEnter={pauseOnHover ? () => setIsPaused(true) : undefined}
                onMouseLeave={pauseOnHover ? () => setIsPaused(false) : undefined}>

                <div className="px-4 h-full">
                    <div className="relative h-full overflow-hidden">
                        <div
                            ref={containerRef}
                            className="absolute inset-0 transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateY(${-position * itemHeight}px)` }}
                        >
                            {tripledItems.map((item, index) => (
                                <div
                                    key={`${index}`}
                                    ref={setItemRef(index)}
                                    className="h-10 flex items-center"
                                >
                                    <div className="flex items-center space-x-2">
                                        <span className="text-primary/80 font-medium text-sm truncate">
                                            {item}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnimatedVerticalCarousel