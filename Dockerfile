# syntax=docker/dockerfile:1
# ==============================================================================
# Production Dockerfile pour Google Cloud Run - Portail Officiel de NTOLO
# Multi-stage build optimisé avec Node.js 22 LTS Alpine
# ==============================================================================

# --- Étape 1 : Construction (Builder) ---
FROM node:22-alpine AS builder

WORKDIR /app

# Dépendances système minimales pour la compilation si nécessaire
RUN apk add --no-cache libc6-compat

# Installation des dépendances avec cache efficace des couches Docker
COPY package.json package-lock.json* bun.lock* ./
RUN npm install

# Copie intégrale des sources du portail
COPY . .

# Définition des arguments de build et variables d'environnement
ARG VITE_SITE_URL=https://ais-pre-3gqq6sd22pp7gwmfoa4eav-911714323826.europe-west2.run.app
ARG GEMINI_API_KEY=""
ARG VITE_APP_ENV=production

ENV VITE_SITE_URL=$VITE_SITE_URL
ENV GEMINI_API_KEY=$GEMINI_API_KEY
ENV VITE_APP_ENV=$VITE_APP_ENV
ENV NODE_ENV=production

# Compilation du bundle optimisé (minification, chunk splitting, Tailwind v4)
RUN npm run build

# --- Étape 2 : Runtime Haute Performance pour Cloud Run ---
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copie de l'artefact de build et des configurations
COPY package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Exécution sous l'utilisateur non-root standard de Node pour la sécurité
USER node

# Port d'écoute standard pour Cloud Run / conteneur conteneurisé
EXPOSE 3000

# Démarrage du serveur preview lié à 0.0.0.0 et respectant la variable d'environnement $PORT de Cloud Run
CMD ["sh", "-c", "npx vite preview --port ${PORT:-3000} --host 0.0.0.0"]
