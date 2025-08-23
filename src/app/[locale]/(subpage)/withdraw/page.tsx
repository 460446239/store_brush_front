import { Metadata } from "next";
import { Suspense } from 'react';
import { getTranslations } from "next-intl/server";
import Withdraw from ".";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();
    return {
      title: t('_withdraw.title'),
    }
}

const Page = async () => {
    return <Suspense>
                <Withdraw />
            </Suspense>
}

export default Page;