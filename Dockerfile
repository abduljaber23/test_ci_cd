# Étape 1 : image de base légère
FROM node:20-alpine

# Étape 2 : définir le répertoire de travail dans le conteneur
WORKDIR /app

# Étape 3 : copier les fichiers de dépendances et les installer
COPY package*.json ./
RUN npm install --omit=dev

# Étape 4 : copier le code source
COPY src/ ./src/

# Étape 5 : exposer le port
EXPOSE 3000

# Étape 6 : lancer l'application
CMD ["node", "src/index.js"]
