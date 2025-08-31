# Multi-stage build for production deployment
FROM node:18-alpine AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend/ ./
RUN npx tsc

FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
COPY frontend/.npmrc ./
# Install with legacy peer deps to handle React conflicts
RUN npm install --legacy-peer-deps
COPY frontend/ ./
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app
COPY --from=backend-build /app/backend/dist ./backend/dist
COPY --from=backend-build /app/backend/node_modules ./backend/node_modules
COPY --from=backend-build /app/backend/package.json ./backend/
COPY --from=frontend-build /app/frontend/build ./frontend/build

EXPOSE 5000
CMD ["node", "backend/dist/index.js"]