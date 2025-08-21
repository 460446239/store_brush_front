import { Tabbar } from "@/components/tabbar";
import { MENUS } from "@/app/constant";

export default async function Layout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return <>
        <div className="h-[calc(100vh-3.5rem)] md:h-[100vh] overflow-auto flex flex-col">
            {children}
        </div>
        {modal}
        <Tabbar items={MENUS} />
    </>;
}
