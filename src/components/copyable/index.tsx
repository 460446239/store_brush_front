'use client'
import { ReactNode, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Copy, Check, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

interface CopyableProps {
    text: string
    children: ReactNode
}

const Copyable = (props: CopyableProps) => {
    const t = useTranslations();
    const [copied, setCopied] = useState(false);

    const onCopied = () => {
        setCopied(true);
        toast.success(t('copy_success'));
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }
    return <CopyToClipboard text={props.text}
                             onCopy={onCopied}>
                <div className="font-medium flex items-center cursor-pointer">
                    { props.children }
                    {
                        copied ? <>
                             <CheckCircle className="w-4 h-4 text-green-600" />
                        </> : <>
                            <Copy className="w-4 h-4 text-gray-600" />
                        </>
                    }
                </div>
            </CopyToClipboard>
}
export default Copyable;