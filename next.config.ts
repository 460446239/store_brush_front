import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    output: 'standalone',
    /* config options here */
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        }
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
