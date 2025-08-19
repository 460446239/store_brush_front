import { validateSession } from '@/lib/auth/auth-service';
import { AUTH_COOKIE_NAME } from '@/lib/auth/cookies';
import { getTranslations } from 'next-intl/server';
import { NextResponse, type NextRequest } from 'next/server';

// 重新构建请求，并转发到目标 URL
async function proxyRequest(request: NextRequest): Promise<Response> {
    const API_URL = process.env.API_URL;

    // 验证 API_URL 是否配置
    if (!API_URL) {
        console.error('API_URL environment variable is not configured');
        return new NextResponse('API configuration error', { status: 500 });
    }

    try {
        // 获取请求的路径和参数
        const url = new URL(request.url);
        let api_url = new URL(API_URL);
        api_url.pathname = api_url.pathname + url.pathname.replace('/api', '');
        api_url.search = url.search;
        

        // 复制请求头，过滤掉一些不需要的头部
        const headers = new Headers();

        // 复制重要的请求头
        const headersToForward = [
            'content-type',
            'accept',
            'accept-language',
            'user-agent',
            'x-forwarded-for',
            'x-real-ip'
        ];

        headersToForward.forEach(headerName => {
            const value = request.headers.get(headerName);
            if (value) {
                headers.set(headerName, value);
            }
        });

        // 添加认证头
       const session = request.cookies.get(AUTH_COOKIE_NAME)?.value;
        if (session) {
            const user = await validateSession(session);
            if (user) {
                api_url.searchParams.set('uid', user.uid.toString());
            }
        }

        // 构建转发所需的请求配置
        const options: RequestInit = {
            method: request.method,
            headers: headers,
            cache: 'no-store', // 禁用缓存
        };

        // 如果请求有 body，将其添加到配置中
        if (request.method !== 'GET' && request.method !== 'HEAD') {
            const body = await request.arrayBuffer();
            if (body.byteLength > 0) {
                options.body = body;
            }
        }
        // 发起转发请求
        const response = await fetch(api_url.toString(), options);

        // 创建新的响应，复制状态和头部
        const responseHeaders = new Headers();

        // 复制响应头，过滤掉一些不需要的头部
        const headersToKeep = [
            'content-type',
            'content-length',
            'cache-control',
            'expires',
            'last-modified',
            'etag'
        ];

        headersToKeep.forEach(headerName => {
            const value = response.headers.get(headerName);
            if (value) {
                responseHeaders.set(headerName, value);
            }
        });

        // 添加 CORS 头部（如果需要）
        responseHeaders.set('Access-Control-Allow-Origin', '*');
        responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
        // 返回响应
        const data = await response.json();
        if (data.status === 200) {
            return NextResponse.json(data?.data ?? {}, { 
                status: response.status,
                statusText: response.statusText,
                headers: responseHeaders 
            });
        }
        const t = await getTranslations();
        return new NextResponse(
            JSON.stringify({
                message: t(`errors.${data.status ?? 'server'}`)
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                error: 'Proxy request failed',
                message: error instanceof Error ? error.message : 'Unknown error'
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}

// 为不同的 HTTP 方法导出相应的函数
export async function GET(request: NextRequest): Promise<Response> {
    return proxyRequest(request);
}

export async function POST(request: NextRequest): Promise<Response> {
    return proxyRequest(request);
}

export async function PUT(request: NextRequest): Promise<Response> {
    return proxyRequest(request);
}

export async function DELETE(request: NextRequest): Promise<Response> {
    return proxyRequest(request);
}

export async function PATCH(request: NextRequest): Promise<Response> {
    return proxyRequest(request);
}

export async function OPTIONS(request: NextRequest): Promise<Response> {
    // 处理 CORS 预检请求
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
            'Access-Control-Max-Age': '86400', // 24小时
        },
    });
}