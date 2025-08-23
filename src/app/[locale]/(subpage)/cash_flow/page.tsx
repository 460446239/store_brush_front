import { Metadata } from "next";
import { Suspense } from 'react';
import { getTranslations } from "next-intl/server";
import Record from ".";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();
    return {
      title: t('transactions.cash_flow'),
    }
}

const Page = async () => {
    return <Suspense>
                <Record />
            </Suspense>
}

export default Page;