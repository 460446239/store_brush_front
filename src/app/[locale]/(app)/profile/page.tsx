import { Metadata } from "next";
import { Suspense } from 'react';
import { getTranslations } from "next-intl/server";
import Profile from ".";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();
    return {
      title: t('tabbar.profile'),
    }
}

const Page = async () => {
    return <Suspense>
                <Profile />
            </Suspense>
}

export default Page;