FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm@9.15.4

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
ENV DIRECT_URL="postgresql://dummy:dummy@localhost:5432/dummy"

RUN npx prisma generate

EXPOSE 3000

CMD sh -c "npx prisma db push --accept-data-loss && pnpm run dev"