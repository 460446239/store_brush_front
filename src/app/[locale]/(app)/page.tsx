import Language from "@/components/language";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getUser } from "@/lib/auth/server";
import { getTranslations } from "next-intl/server";


export default async function Home() {
    const t = await getTranslations();
    const user = await getUser();
    return (
        <div className="md:flex md:items-center">
            <div className="w-full flex p-2">
                <span className="flex-1"/>
                <Language />
            </div>
            { 
                !user ? <div className="grid grid-cols-2 gap-2 p-2 md:flex">
                    <Link href="/signin">
                        <Button className="w-full">{ t('signin') }</Button>
                    </Link>
                    <Link href="/signup">
                        <Button variant="outline" className="border-primary text-primary w-full">{ t('signup') }</Button>
                    </Link>
                </div> : null 
            }
        </div>
    );
}
