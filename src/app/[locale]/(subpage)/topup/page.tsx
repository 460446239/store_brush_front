import { Metadata } from "next";
import { Suspense } from 'react';
import { getTranslations } from "next-intl/server";
import Topup from ".";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();
    return {
      title: t('topup.title'),
    }
}

const Page = async () => {
    return <Suspense>
                <Topup />
            </Suspense>
}

export default Page;