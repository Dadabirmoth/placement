# Plateforme de Placement de Domestiques - Côte d'Ivoire

## Prérequis
- Node.js v18+
- PostgreSQL (local ou cloud)
- Git

## Installation

### 1. Cloner le projet
git clone [URL_DU_REPO]
cd plateforme-placement

### 2. Backend
cd backend
cp ../.env.example .env   # puis modifier les variables
npm install
npm run dev               # démarre sur http://localhost:5000

### 3. Frontend
cd ../frontend
npm install
npm run dev               # démarre sur http://localhost:3000

## Tests
cd backend
npm test