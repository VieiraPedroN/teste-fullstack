# Etapa de build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @nestjs/cli
COPY . .
RUN npm run build

# Etapa final
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
RUN npm install -g @nestjs/cli --only=production
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/main"]
