import React from 'react';
import { useTranslations } from 'next-intl';
import dayjs from 'dayjs';

interface CashFlowItemProps {
    item: ClashFlow;
}

const CashFlowItem = ({ item }: CashFlowItemProps) => {
    const t = useTranslations('transactions');

    const formatPrice = (price: string) => {
        return `$${price}`;
    };

    const getTypeInfo = (type: ClashFlow['type']) => {
        switch (type) {
            case 'withdral':
                return {
                    label: t('withdrawal'),
                    color: 'text-red-600',
                    sign: '-'
                };
            case 'extract':
                return {
                    label: t('commission_to_balance'),
                    color: 'text-green-600',
                    sign: '+'
                };
            case 'orderpay':
                return {
                    label: t('order_unfreeze'),
                    color: 'text-blue-600',
                    sign: '+'
                };
            case 'pay_product':
                return {
                    label: t('product_purchase'),
                    color: 'text-red-600',
                    sign: '-'
                };
            default:
                return {
                    label: t('transaction'),
                    color: 'text-gray-600',
                    sign: ''
                };
        }
    };

    const getStatusBadge = (status: 0 | 1) => {
        if (status === 1) {
            return (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {t('completed')}
                </span>
            );
        } else {
            return (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {t('pending')}
                </span>
            );
        }
    };

    const typeInfo = getTypeInfo(item.type);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-3">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">
                            {typeInfo.label}
                        </span>
                        <span className={`text-sm font-semibold ${typeInfo.color}`}>
                            {typeInfo.sign}{formatPrice(item.number)}
                        </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">
                            {dayjs(item.add_time).format('YYYY-MM-DD HH:mm')}
                        </span>
                        {getStatusBadge(item.status)}
                    </div>
                    
                    <div className="text-xs text-gray-600">
                        {t('balance')}: {formatPrice(item.balance)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export { CashFlowItem };