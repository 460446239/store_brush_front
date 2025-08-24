# 多阶段构建 - 依赖安装阶段
FROM node:22.14.0-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 复制包管理文件
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# 安装依赖，使用 yarn 缓存
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 构建阶段
FROM node:22.14.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 设置环境变量
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV NEXT_PUBLIC_PROJECT_TYPE Tiktok
ENV API_URL http://bruchstore668.us/api
ENV DATABASE_URL mysql://crmeb31:crmeb31@168.231.126.130:3306/crmeb31

# 构建应用
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 运行阶段
FROM node:22.14.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_PUBLIC_PROJECT_TYPE Tiktok
ENV API_URL http://bruchstore668.us/api
ENV DATABASE_URL mysql://crmeb31:crmeb31@168.231.126.130:3306/crmeb31

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制必要的文件
COPY --from=builder /app/public ./public

# 设置正确的权限并复制构建输出
RUN mkdir .next
RUN chown nextjs:nodejs .next

# 复制构建输出和依赖
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# 启动应用
CMD ["node", "server.js"]