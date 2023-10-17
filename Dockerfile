FROM oven/bun:1.0 as builder

ENV TZ Europe/Amsterdam

WORKDIR /app

COPY bun.lockb bun.lockb
COPY package.json package.json

RUN bun install

ENV NODE_ENV production

COPY tsconfig.json tsconfig.json
COPY src src

RUN bun run compile

FROM scratch as runner

COPY --from=builder /app/bin /bin

CMD ["/app/bin/abast"]