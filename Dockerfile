# Fase 1: Construcción
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/ 
# ^ IMPORTANTE: Copiar la carpeta prisma antes del install

RUN npm install
COPY . .

# Generar el cliente de Prisma para Linux Alpine
RUN npx prisma generate
RUN npm run build

# Fase 2: Ejecución
FROM node:20-alpine
WORKDIR /app

# Necesitamos las dependencias de producción y el cliente de Prisma generado
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Render asigna el puerto automáticamente, EXPOSE es más informativo
EXPOSE 3000

# Ejecutamos las migraciones antes de iniciar (opcional pero recomendado)
# O simplemente iniciamos la app
CMD ["node", "dist/main"]
