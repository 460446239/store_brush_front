import { Metadata } from "next";
import { Suspense } from 'react';
import { getTranslations } from "next-intl/server";
import Teams from ".";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();
    return {
      title: t('tabbar.teams'),
    }
}

const Page = async () => {
    return <Suspense>
                <Teams />
            </Suspense>
}

export default Page;