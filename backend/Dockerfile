# Etapa builder - para produção
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @nestjs/cli
COPY . .
RUN npm run build

# Imagem para produção
FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]

# Imagem para desenvolvimento
FROM node:20-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @nestjs/cli
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
