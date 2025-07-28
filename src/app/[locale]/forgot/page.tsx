import { Metadata } from "next";
import { Suspense } from 'react';
import Forgot from ".";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();
    return {
      title: t('forgot'),
    }
}

const Page = async () => {
    return <Suspense>
                <Forgot />
            </Suspense>
}

export default Page;