import { Tabbar } from "@/components/tabbar";
import { getTranslations } from "next-intl/server";
import { MENUS } from "@/app/constant";

export default async function Layout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    const t = await getTranslations();
    return <>
        <div className="h-[calc(100vh-3.5rem)] flex flex-col">
            {children}
        </div>
        {modal}
        <Tabbar items={MENUS} />
    </>;
}
