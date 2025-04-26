FROM node:22-alpine
WORKDIR /app

RUN npm install -g typescript
COPY package*.json ./

RUN npm install
COPY . .

ARG PANDASCORE_TOKEN
ENV PORT=7000
ENV NODE_ENV=production

# Compile les fichiers TypeScript
RUN npm run build

# Définit la commande par défaut pour exécuter le script
CMD ["npm", "run", "start"]
