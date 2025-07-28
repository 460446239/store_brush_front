import { Metadata } from "next";
import { Suspense } from 'react';
import { getTranslations } from "next-intl/server";
import SignUp from ".";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();
    return {
      title: t('signup'),
    }
}

const Page = async () => {
    return <Suspense>
                <SignUp />
            </Suspense>
}

export default Page;