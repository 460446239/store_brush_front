import { cloneElement, ReactElement, useState } from "react";
import React from "react";
import useSWR from "swr";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Copy, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import QRCode from "qrcode";

interface Address {
    address: string;
    chain: string;
}

interface TopupProps {
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

const Topup = (props: TopupProps) => {
    const { data } = useSWR<{ addresses: Address[] }>('/api/coin_address');
    const [open, setOpen] = useState(false);
    const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [selectedNetwork, setSelectedNetwork] = useState<string>('');
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
    const t = useTranslations('topup');

    const copyToClipboard = async (address: string) => {
        try {
            await navigator.clipboard.writeText(address);
            setCopiedAddress(address);
            setTimeout(() => setCopiedAddress(null), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const generateQRCode = async (address: string) => {
        try {
            const url = await QRCode.toDataURL(address, {
                width: 200,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });
            setQrCodeUrl(url);
        } catch (err) {
            console.error('Failed to generate QR code: ', err);
        }
    };

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
            {
                id: 'trx',
                name: 'TRX',
                networks: [
                    { name: 'TRC20', chain: 'trx', fee: t('native_network') }
                ]
            },
            {
                id: 'eth',
                name: 'ETH',
                networks: [
                    { name: 'ERC20', chain: 'eth', fee: t('native_network') }
                ]
            },
            {
                id: 'btc',
                name: 'BTC',
                networks: [
                    { name: 'Bitcoin', chain: 'btc', fee: t('bitcoin_network') }
                ]
            }
        ];
    };

    const getAddressForChain = (chain: string): string => {
        return data?.addresses?.find(addr => addr.chain === chain)?.address || '';
    };

    const currencies = getCurrencyInfo();
    const selectedCurrencyInfo = currencies.find(c => c.id === selectedCurrency);
    const selectedNetworkInfo = selectedCurrencyInfo?.networks.find(n => `${selectedCurrency}-${n.chain}` === selectedNetwork);
    const depositAddress = selectedNetworkInfo ? getAddressForChain(selectedNetworkInfo.chain) : '';

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

    // Generate QR code when address changes
    React.useEffect(() => {
        if (depositAddress) {
            generateQRCode(depositAddress);
        } else {
            setQrCodeUrl('');
        }
    }, [depositAddress]);

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

    return (
        <>
            {cloneElement(props.children, {
                onClick: () => setOpen(true)
            } as any)}
            <Dialog open={open} onOpenChange={(open) => { if (!open) setOpen(open) }}>
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
                                    {getCurrencyInfo().map((currency) => (
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

                        {/* QR Code and Deposit Address */}
                        {selectedNetworkInfo && depositAddress && (
                            <div className="text-center space-y-4">
                                {/* QR Code */}
                                {qrCodeUrl && (
                                    <div className="flex justify-center">
                                        <img
                                            src={qrCodeUrl}
                                            alt="Deposit Address QR Code"
                                            className="w-48 h-48 border rounded-lg"
                                        />
                                    </div>
                                )}

                                {/* Deposit Address */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        {t('deposit_address')}
                                    </label>
                                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
                                        <code className="flex-1 text-sm font-mono break-all">
                                            {depositAddress}
                                        </code>
                                        <button
                                            onClick={() => copyToClipboard(depositAddress)}
                                            className="p-2 hover:bg-gray-200 rounded transition-colors"
                                            title={t('copy_address')}
                                        >
                                            {copiedAddress === depositAddress ? (
                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                            ) : (
                                                <Copy className="w-4 h-4 text-gray-600" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Topup;