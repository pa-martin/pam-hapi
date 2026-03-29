FROM node:24-alpine
WORKDIR /app

RUN npm install -g typescript
COPY package*.json ./

RUN npm install
COPY . .

ENV tokens.pandascore
ENV application.port=7000
ENV application.env=production
ENV elasticsearch.index.base=metrics-pamihapi.
ENV log.level=trace

# Compile les fichiers TypeScript
RUN npm run build

# Définit la commande par défaut pour exécuter le script
CMD ["npm", "run", "start"]
