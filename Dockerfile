FROM public.ecr.aws/docker/library/node:22.12.0-alpine AS install
WORKDIR /app
COPY .npmrc package.json pnpm-lock.yaml ./
RUN npm install --global corepack@latest --no-update-notifier --no-audit --no-fund
RUN pnpm install

FROM install AS build
WORKDIR /app
COPY . ./
RUN npm run build

FROM docker.io/joseluisq/static-web-server:2.41.0-alpine
LABEL org.opencontainers.image.source="https://github.com/henriksommerfeld/food-sveltia"
LABEL org.opencontainers.image.description="Family recipe collection"
WORKDIR /app
COPY --from=build /app/build ./
CMD ["static-web-server", "--port", "8080", "--root", "."]
