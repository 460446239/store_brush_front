'use client';
import { ProgressProvider } from '@bprogress/next/app';
import { SWRConfig } from 'swr';
import http from '@/lib/client'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ProgressProvider
            height="4px"
            color="var(--primary)"
            options={{ showSpinner: false }}
            shallowRouting>
                <SWRConfig value={{
                    fetcher: http,
                    revalidateIfStale: false,
                    revalidateOnFocus: false,
                }}>
                    { children }
                </SWRConfig>
        </ProgressProvider>
    );
};

export default Providers;