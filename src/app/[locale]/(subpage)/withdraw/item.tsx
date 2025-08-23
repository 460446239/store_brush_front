import React from 'react';
import { useTranslations } from 'next-intl';
import dayjs from 'dayjs';

interface WithdrawItemProps {
    item: Withdraw;
}

const WithdrawItem = ({ item }: WithdrawItemProps) => {
    const t = useTranslations('transactions');

    const formatPrice = (price: string) => {
        return `$${price}`;
    };

    const getStatusBadge = (status: number) => {
        switch (status) {
            case 1:
                return (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {t('completed')}
                    </span>
                );
            case 0:
                return (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {t('pending')}
                    </span>
                );
            case -1:
                return (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {t('failed')}
                    </span>
                );
            default:
                return (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Unknown
                    </span>
                );
        }
    };

    const formatAddress = (address: string) => {
        if (address.length > 20) {
            return `${address.slice(0, 8)}...${address.slice(-8)}`;
        }
        return address;
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-3">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">
                            {t('withdraw')}
                        </span>
                        <span className="text-sm font-semibold text-red-600">
                            -{formatPrice(item.extract_price)}
                        </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">
                            {dayjs(item.add_time).format('YYYY-MM-DD HH:mm')}
                        </span>
                        {getStatusBadge(item.status)}
                    </div>
                    
                    <div className="text-xs text-gray-600">
                        {t('address')}: {formatAddress(item.bank_address)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export { WithdrawItem };