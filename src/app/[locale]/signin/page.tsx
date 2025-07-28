import { Metadata } from "next";
import { Suspense } from 'react';
import SignIn from ".";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();
    return {
      title: t('signin'),
    }
}

const Page = async () => {
    return <Suspense>
                <SignIn />
            </Suspense>
}

export default Page;