import React from 'react';
import { useTranslations } from 'next-intl';
import dayjs from 'dayjs';

const OrderItem = ({ order }: { order: BrushOrder }) => {
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

                <div className="grid grid-cols-2 gap-2 text-sm">
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

                    {/* Payment Status */}
                    <div className="col-span-2 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.paid
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}>
                            {order.paid ? t('paid') : t('unpaid')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OrderList = ({ orders, loading }: { orders: BrushOrder[], loading?: boolean }) => {
    const t = useTranslations('orders');

    if (!loading && (!orders || orders.length === 0)) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-500">{t('no_data')}</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 pt-6">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">{t('title')}</h2>
                <p className="text-gray-600 mt-1">{t('total_count', { count: orders.length })}</p>
            </div>

            <div className="overflow-hidden">
                {/* Desktop Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-700">
                    <div className="col-span-2">{t('order_id')}</div>
                    <div className="col-span-3">{t('product_info')}</div>
                    <div className="col-span-1">{t('unit_price')}</div>
                    <div className="col-span-1">{t('total_price')}</div>
                    <div className="col-span-1">{t('outstanding')}</div>
                    <div className="col-span-1">{t('profit')}</div>
                    <div className="col-span-2">{t('status')}</div>
                </div>

                {/* Order List */}
                <div className="divide-y divide-gray-100">
                    {orders.map((order) => (
                        <OrderItem key={order.id} order={order} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export { OrderList, OrderItem };