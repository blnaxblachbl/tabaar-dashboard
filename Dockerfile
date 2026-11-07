# Stage 1: Build
FROM node:26-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

# Stage 2: Runner
FROM node:26-alpine AS runner
WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json /app/vite.config.ts ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "run", "preview"]
