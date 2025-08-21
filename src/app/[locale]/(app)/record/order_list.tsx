import React from 'react';
import { useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';

interface OrderItemProps {
    order: BrushOrder
    onEvaluate?: (order: BrushOrder) => void
    onPayment?: (order: BrushOrder) => void
}

const OrderItem = ({ order, onEvaluate, onPayment }: OrderItemProps) => {
    const t = useTranslations('orders');

    const formatPrice = (price: string) => {
        return `$${price}`;
    };


    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 border border-gray-100">
            {/* Mobile View */}
            <div className="md:hidden p-4">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <p className="text-sm text-gray-500">{t('order_id')}: {order.order_id}</p>
                        <p className="text-xs text-gray-400 mt-1">{dayjs(order.add_time).format('YYYY-MM-DD HH:mm')}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.paid
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {order.paid ? t('paid') : t('unpaid')}
                    </span>
                </div>

                <div className="flex items-center mb-3">
                    <img
                        src={order.cart_id.goods.image}
                        alt={order.cart_id.goods.store_name}
                        className="w-16 h-16 object-cover rounded-md mr-3"
                    />
                    <div className="flex-1">
                        <h3 className="font-medium text-gray-900 line-clamp-1">{order.cart_id.goods.store_name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{t('quantity')}: {order.cart_id.num}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div>
                        <p className="text-gray-500">{t('unit_price')}</p>
                        <p className="font-medium">{formatPrice(order.cart_id.goods.price)}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">{t('total_price')}</p>
                        <p className="font-medium">{formatPrice(order.total_price)}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">{t('outstanding')}</p>
                        <p className="font-medium text-red-600">{formatPrice(order.pay_price)}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">{t('profit')}</p>
                        <p className="font-medium text-green-600">{formatPrice(order.rebate_fee)}</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    {!order.paid && (
                        <Button
                            onClick={() => onPayment?.(order)}
                            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                            {t('pay_now')}
                        </Button>
                    )}
                    {order.evaluate === '0.0' && (
                        <Button
                            onClick={() => onEvaluate?.(order)}
                            className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors"
                        >
                            {t('rate_now')}
                        </Button>
                    )}
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block">
                <div className="grid grid-cols-12 gap-4 p-4 items-center border-b border-gray-100">
                    {/* Order ID */}
                    <div className="col-span-2">
                        <p className="text-sm text-gray-900 font-medium">{order.order_id}</p>
                        <p className="text-xs text-gray-500 mt-1">{dayjs(order.add_time).format('YYYY-MM-DD HH:mm')}</p>
                    </div>

                    {/* Product Info */}
                    <div className="col-span-3 flex items-center">
                        <img
                            src={order.cart_id.goods.image}
                            alt={order.cart_id.goods.store_name}
                            className="w-12 h-12 object-cover rounded-md mr-3"
                        />
                        <div>
                            <p className="text-sm font-medium text-gray-900">{order.cart_id.goods.store_name}</p>
                            <p className="text-xs text-gray-500">{t('quantity')}: {order.cart_id.num}</p>
                        </div>
                    </div>

                    {/* Unit Price */}
                    <div className="col-span-1">
                        <p className="text-sm text-gray-900">{formatPrice(order.cart_id.goods.price)}</p>
                    </div>

                    {/* Total Price */}
                    <div className="col-span-1">
                        <p className="text-sm text-gray-900">{formatPrice(order.total_price)}</p>
                    </div>

                    {/* Outstanding */}
                    <div className="col-span-1">
                        <p className="text-sm text-red-600">{formatPrice(order.pay_price)}</p>
                    </div>

                    {/* Profit */}
                    <div className="col-span-1">
                        <p className="text-sm text-green-600">{formatPrice(order.rebate_fee)}</p>
                    </div>

                    {/* Payment Status & Actions */}
                    <div className="col-span-2 text-center">
                        <div className="flex flex-col items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.paid
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                                }`}>
                                {order.paid ? t('paid') : t('unpaid')}
                            </span>

                            <div className="flex gap-1">
                                {!order.paid && (
                                    <button
                                        onClick={() => onPayment?.(order)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        {t('pay_now')}
                                    </button>
                                )}
                                {order.evaluate === '0.0' && (
                                    <button
                                        onClick={() => onEvaluate?.(order)}
                                        className="bg-orange-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-orange-700 transition-colors"
                                    >
                                        {t('rate_now')}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { OrderItem };