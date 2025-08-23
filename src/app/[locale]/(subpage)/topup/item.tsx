import React from 'react';
import { useTranslations } from 'next-intl';
import dayjs from 'dayjs';

interface RechargeItemProps {
    item: Rechrage;
}

const RechargeItem = ({ item }: RechargeItemProps) => {
    const t = useTranslations('transactions');

    const formatPrice = (price: string) => {
        return `$${price}`;
    };

    const getCurrencyDisplay = (currency: string) => {
        switch (currency.toLowerCase()) {
            case 'usdt':
                return 'USDT';
            case 'btc':
                return 'Bitcoin';
            case 'eth':
                return 'Ethereum';
            case 'trx':
                return 'Tron';
            default:
                return currency.toUpperCase();
        }
    };

    const getCurrencyIcon = (currency: string) => {
        switch (currency.toLowerCase()) {
            case 'usdt':
                return '₮';
            case 'btc':
                return '₿';
            case 'eth':
                return 'Ξ';
            case 'trx':
                return 'T';
            default:
                return '$';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-3">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                            <span className="text-lg mr-2">{getCurrencyIcon(item.currency)}</span>
                            <span className="text-sm font-medium text-gray-900">
                                {getCurrencyDisplay(item.currency)} {t('top_up')}
                            </span>
                        </div>
                        <span className="text-sm font-semibold text-green-600">
                            +{formatPrice(item.price)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                            {dayjs(item._add_time).format('YYYY-MM-DD HH:mm')}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {t('completed')}
                        </span>
                    </div>

                    <div className="text-xs text-gray-600 mt-1">
                        {t('currency')}: {getCurrencyDisplay(item.currency)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export { RechargeItem };