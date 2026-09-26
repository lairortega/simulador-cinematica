# Usar imagen ligera oficial de Node.js
FROM node:20-alpine

# Definir directorio de trabajo
WORKDIR /app

# Copiar manifiestos e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto configurado en Express
EXPOSE 3000

# Variables de entorno por defecto
ENV PORT=3000
ENV NODE_ENV=development

# Comando predeterminado (puede ser sobrescrito por docker-compose)
CMD ["npm", "run", "dev"]
