'use client'
import { ReactNode, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Copy, Check } from 'lucide-react';
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
                            <Check className="ml-2" size={12} />
                        </> : <>
                            <Copy className="ml-2" size={12} />
                        </>
                    }
                </div>
            </CopyToClipboard>
}
export default Copyable;