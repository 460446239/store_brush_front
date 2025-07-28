import Fastify from 'fastify'
import next from 'next'

const fastify = Fastify({
  logger: false
});

// 健康检查
fastify.get('/healthz', (_, reply) => {
    reply.send();
});

const next_app = next({ dev: process.env.NODE_ENV !== 'production' });

// 创建nextjs路由
next_app.prepare().then(() => {
    // Run nextjs
    const handle = next_app.getRequestHandler();
    fastify.all('*', async (req, reply) => {
        await handle(req.raw, reply.raw);
        reply.hijack();
    });

    // Run the server!
    (async () => {
        try {
            await fastify.listen({ port: 3000 });
            fastify.log.info('Starting Nextjs server at http://0.0.0.0:3000');
        } catch (e) {
            fastify.log.error(e);
            process.exit(1);
        }
    })()
});