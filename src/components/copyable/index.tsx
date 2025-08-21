'use client'
import { ReactNode, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Copy, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface CopyableProps {
    text: string
    className?: string
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
                <div className={cn("font-medium flex items-center cursor-pointer text-gray-600", props.className)}>
                    { props.children }
                    {
                        copied ? <>
                             <CheckCircle className="ml-2 w-4 h-4 text-green-600" />
                        </> : <>
                            <Copy className="ml-2 w-4 h-4" />
                        </>
                    }
                </div>
            </CopyToClipboard>
}
export default Copyable;