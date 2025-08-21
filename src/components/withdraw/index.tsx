import { cloneElement, ReactElement, useState } from "react";
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

interface WithdrawProps {
    children: ReactElement;
}

interface Network {
    name: string;
    chain: string;
    fee: string;
}

interface Currency {
    id: string;
    name: string;
    networks: Network[];
}

const Withdraw = (props: WithdrawProps) => {
    const [open, setOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [selectedNetwork, setSelectedNetwork] = useState<string>('');
    const [withdrawalAddress, setWithdrawalAddress] = useState('');
    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const t = useTranslations('_withdraw');

    const getCurrencyInfo = (): Currency[] => {
        return [
            {
                id: 'usdt',
                name: 'USDT',
                networks: [
                    { name: 'TRC20', chain: 'trx', fee: t('low_fees') },
                    { name: 'ERC20', chain: 'eth', fee: t('higher_fees') }
                ]
            },
        ];
    };

    const currencies = getCurrencyInfo();
    const selectedCurrencyInfo = currencies.find(c => c.id === selectedCurrency);
    const selectedNetworkInfo = selectedCurrencyInfo?.networks.find(n => `${selectedCurrency}-${n.chain}` === selectedNetwork);

    // Set default currency to first one and select first network
    React.useEffect(() => {
        if (!selectedCurrency && currencies.length > 0) {
            const firstCurrency = currencies[0];
            setSelectedCurrency(firstCurrency.id);
            if (firstCurrency.networks.length > 0) {
                setSelectedNetwork(`${firstCurrency.id}-${firstCurrency.networks[0].chain}`);
            }
        }
    }, [currencies, selectedCurrency]);

    // Reset network selection when currency changes and select first network
    const handleCurrencyChange = (currency: string) => {
        setSelectedCurrency(currency);
        const currencyInfo = currencies.find(c => c.id === currency);
        if (currencyInfo && currencyInfo.networks.length > 0) {
            setSelectedNetwork(`${currency}-${currencyInfo.networks[0].chain}`);
        } else {
            setSelectedNetwork('');
        }
    };

    // Reset form when dialog opens
    const handleOpenChange = (open: boolean) => {
        setOpen(open);
        if (open) {
            setWithdrawalAddress('');
            setWithdrawalAmount('');
            // Don't reset network here as it will be set by the currency default
        }
    };

    const handleSubmit = async () => {
        if (!selectedNetworkInfo || !withdrawalAddress || !withdrawalAmount) {
            return;
        }

        setIsSubmitting(true);
        try {
            // Handle withdrawal submission here
            const withdrawalData = {
                currency: selectedCurrency,
                network: selectedNetworkInfo.chain,
                address: withdrawalAddress,
                amount: parseFloat(withdrawalAmount)
            };

            console.log('Withdrawal submitted:', withdrawalData);

            // Close dialog after successful submission
            setOpen(false);
        } catch (error) {
            console.error('Withdrawal failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = selectedNetworkInfo && withdrawalAddress.trim() && withdrawalAmount.trim() && parseFloat(withdrawalAmount) > 0;

    return (
        <>
            {cloneElement(props.children, {
                onClick: () => setOpen(true)
            } as any)}
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">{t('title')}</DialogTitle>
                        <DialogDescription>
                            {t('description')}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* Currency Selection */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                {t('select_currency')}
                            </label>
                            <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="w-full">
                                    {currencies.map((currency) => (
                                        <SelectItem key={currency.id} value={currency.id}>
                                            {currency.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Network Selection */}
                        {selectedCurrencyInfo && (
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    {t('select_network')}
                                </label>
                                <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Choose network" />
                                    </SelectTrigger>
                                    <SelectContent className="w-full">
                                        {selectedCurrencyInfo.networks.map((network, index) => (
                                            <SelectItem
                                                key={index}
                                                value={`${selectedCurrency}-${network.chain}`}
                                            >
                                                <div className="flex justify-between items-center w-full">
                                                    <span>{network.name}</span>
                                                    <span className="text-xs text-gray-500 ml-2">
                                                        {network.fee}
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {/* Withdrawal Address */}
                        {selectedNetworkInfo && (
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    {t('withdrawal_address')}
                                </label>
                                <Input
                                    type="text"
                                    placeholder={t('address_placeholder')}
                                    value={withdrawalAddress}
                                    onChange={(e) => setWithdrawalAddress(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                        )}

                        {/* Withdrawal Amount */}
                        {selectedNetworkInfo && (
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    {t('withdrawal_amount')}
                                </label>
                                <Input
                                    type="number"
                                    placeholder={t('amount_placeholder')}
                                    value={withdrawalAmount}
                                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                                    min="0"
                                    step="0.01"
                                    className="w-full"
                                />
                            </div>
                        )}

                        {/* Submit Button */}
                        {selectedNetworkInfo && (
                            <div className="pt-2">
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!isFormValid || isSubmitting}
                                    className="w-full"
                                >
                                    {isSubmitting ? 'Processing...' : t('submit')}
                                </Button>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Withdraw;