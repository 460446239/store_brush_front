'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Users, TrendingUp, DollarSign, Target } from 'lucide-react';
import useSWR from 'swr';

interface TeamData {
    team_rebate_fee: string;
    team_task_num: number;
    under_rebate_fee: string;
    under_num: number;
}

const Teams: React.FC = () => {
    const t = useTranslations('teams');
    const { data } = useSWR<any, { team: TeamData }>('/api/team_log');

    const formatCurrency = (amount: string | number) => {
        const num = typeof amount === 'string' ? parseFloat(amount.replace(/,/g, '')) : amount;
        return `$${num?.toFixed(2)}`;
    };
    if (!data && (!data?.team?.team_rebate_fee && !data?.team?.team_task_num)) {
        return (
            <div className="flex items-center justify-center p-4">
                <div className="bg-white p-8 text-center">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">{t('no_data')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Team Rebate Fee */}
                <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600 mb-2">{t('team_rebate_fee')}</p>
                            <p className="text-2xl font-bold text-green-600">{formatCurrency(data?.team.team_rebate_fee)}</p>
                        </div>
                        <div className="p-3 rounded-full bg-green-50 text-green-600 ml-4">
                            <DollarSign className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* Team Task Number */}
                <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600 mb-2">{t('team_task_num')}</p>
                            <p className="text-2xl font-bold text-blue-600">{data?.team?.team_task_num.toLocaleString()}</p>
                        </div>
                        <div className="p-3 rounded-full bg-blue-50 text-blue-600 ml-4">
                            <Target className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* Under Rebate Fee */}
                <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600 mb-2">{t('under_rebate_fee')}</p>
                            <p className="text-2xl font-bold text-purple-600">{formatCurrency(data?.team.under_rebate_fee)}</p>
                        </div>
                        <div className="p-3 rounded-full bg-purple-50 text-purple-600 ml-4">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* Under Number */}
                <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600 mb-2">{t('under_num')}</p>
                            <p className="text-2xl font-bold text-orange-600">{data?.team.under_num}</p>
                        </div>
                        <div className="p-3 rounded-full bg-orange-50 text-orange-600 ml-4">
                            <Users className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Teams;