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
        {children}
        {modal}
        <Tabbar items={MENUS} />
    </>;
}
