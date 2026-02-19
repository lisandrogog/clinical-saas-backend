# Fase 1: Construcción
FROM node:20-alpine AS builder
WORKDIR /app

# No necesitamos ARG NPM_TOKEN ni .npmrc si no hay paquetes privados
COPY package*.json ./
COPY prisma ./prisma/ 

# OPCIONAL: Si sospechas del .npmrc, esta línea lo borra dentro de la imagen
# antes de intentar instalar nada, asegurando que use el registro público.
RUN rm -f .npmrc && npm install

COPY . .

RUN npx prisma generate
RUN npm run build

# Fase 2: Ejecución (Se mantiene igual)
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["node", "dist/main"]