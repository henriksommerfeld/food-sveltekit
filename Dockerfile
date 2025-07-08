FROM public.ecr.aws/docker/library/node:22.12.0-alpine AS install
WORKDIR /app
COPY .nvmrc .npmrc package.json pnpm-lock.yaml ./
RUN npm install --global corepack@latest --no-update-notifier --no-audit --no-fund
RUN pnpm install

FROM install AS build
WORKDIR /app
COPY . ./
RUN npm run build

FROM ghcr.io/nginx-proxy/nginx-proxy:alpine
LABEL org.opencontainers.image.source="https://github.com/henriksommerfeld/food-sveltia"
COPY --from=build /app/build /usr/share/nginx/html
