'use client'
import { useState } from "react";
import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const Languages = [
    { key: 'en-us', label: 'English' },
    { key: 'de-de', label: 'Deutsch' },
    { key: 'fr-fr', label: 'Français' },
    { key: 'ru-ru', label: 'Русский' },
    { key: 'it-it', label: 'Italiano' },
    { key: 'es-es', label: 'Español' },
    { key: 'pt-pt', label: 'Português' },
    { key: 'ro-ro', label: 'Română' },
    { key: 'ja-jp', label: '日本語' },
    { key: 'ko-kr', label: '한국어' },
    { key: 'zh-cn', label: '简体中文' },
];

interface LanguageProps {
    className?: string
}

const Language = (props: LanguageProps) => {
    const t = useTranslations();
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const locale = useLocale();

    return <>
                <Globe className={cn("cursor-pointer hover:text-primary", props.className)} onClick={() => setOpen(true)} />
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{ t('language') }</DialogTitle>
                            <DialogDescription>{ t('language_desc') }</DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="h-[60vh]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {
                                    Languages.map((language) => {
                                        return <Link href={pathname} locale={language.key} key={language.key} className={cn("cursor-pointer hover:text-primary", { 'text-primary': locale === language.key })}>
                                                { language.label }
                                                </Link>
                                    })
                                }
                            </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </>
}

export default Language;