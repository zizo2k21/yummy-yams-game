# Utilisation d'une image Node.js comme base
FROM node:latest

# Définition du répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie des fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste des fichiers de l'API dans le conteneur
COPY . .

# Commande par défaut pour démarrer l'API
CMD ["npm", "start"]
