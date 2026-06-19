# MyBank

MyBank est une application de gestion de finances personnelles qui permet de suivre ses revenus et dépenses, avec calcul automatique du solde et des totaux entrants/sortants.

## Accès à l'application en production

L'application est accessible publiquement à l'adresse :

**http://157.90.148.37**

-   Frontend : http://157.90.148.37
-   API backend : http://157.90.148.37/api/operations (via le proxy nginx du frontend)

## Sommaire

-   [Stack technique](#stack-technique)
-   [Architecture](#architecture)
-   [Installation du backend](#installation-du-backend)
-   [Installation du frontend](#installation-du-frontend)
-   [CI/CD](#cicd)
-   [Déploiement](#déploiement)
-   [Structure du projet](#structure-du-projet)
-   [Sécurité](#sécurité)

## Stack technique

**Frontend**

-   React 19 + Vite
-   Tailwind CSS
-   Vitest + Testing Library (tests unitaires)
-   ESLint

**Backend**

-   PHP 8.4 + Symfony 8
-   Doctrine ORM / Doctrine Migrations
-   MySQL 8.0
-   PHPUnit (tests fonctionnels et sécurité)
-   NelmioCorsBundle

**Infrastructure**

-   Docker / Docker Compose
-   GitHub Actions (CI/CD)
-   GitHub Container Registry (GHCR)
-   Trivy (scan de vulnérabilités des images)
-   Déploiement automatisé sur VPS via SSH

## Architecture

```
┌─────────────┐      /api/*      ┌─────────────┐      SQL      ┌──────────┐
│  frontend   │ ───────────────► │   backend   │ ────────────► │    db    │
│ React+nginx │                  │ Symfony+    │               │  MySQL   │
│  (port 80)  │                  │ nginx+fpm   │               │  (3306)  │
└─────────────┘                  └─────────────┘               └──────────┘
```

Le frontend est servi par nginx, qui fait également office de reverse proxy vers le backend pour toutes les requêtes `/api/`. Le backend exécute nginx et PHP-FPM dans le même conteneur, pilotés par supervisord, sous un utilisateur non privilégié.

## Installation du backend

1. Installer les dépendances PHP

```bash
cd backend && composer install
```

2. Configurer l'environnement

```bash
cp .env .env.local
```

Modifier `DATABASE_URL` dans `.env.local` :

```
DATABASE_URL="mysql://mybank:mybank@127.0.0.1:3306/mybank?serverVersion=8.0&charset=utf8mb4"
```

3. Créer la base et exécuter les migrations

```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```

4. Démarrer le serveur Symfony

```bash
symfony server:start
```

Ou via Docker (recommandé) :

```bash
docker compose up -d --build
docker compose exec backend composer install
docker compose exec backend php bin/console doctrine:database:create --if-not-exists
docker compose exec backend php bin/console doctrine:migrations:migrate --no-interaction
```

## Installation du frontend

1. Installer les dépendances

```bash
cd frontend && npm install
```

2. Lancer en mode développement

```bash
npm run dev
```

3. Lancer les tests (33 tests doivent passer : 13 frontend + 20 backend)

```bash
npm run test
```

4. Vérifier le code (lint)

```bash
npm run lint
```

5. Build de production

```bash
npm run build
```

L'application est accessible sur `http://localhost:3000` (frontend) et l'API sur `http://localhost:8000/api` en développement local.

### Lancer les tests backend

```bash
docker compose exec backend php bin/console doctrine:database:create --env=test --if-not-exists
docker compose exec backend php bin/console doctrine:migrations:migrate --env=test --no-interaction
docker compose exec backend php bin/phpunit
```

## CI/CD

Deux workflows GitHub Actions automatisent l'intégration et le déploiement continus :

### CI (`ci.yml`)

Déclenché à chaque push ou pull request sur `main` et `develop` :

-   Lint et tests unitaires du frontend (ESLint, Vitest)
-   Build de production du frontend
-   Tests fonctionnels et de sécurité du backend (PHPUnit) avec base MySQL éphémère

### CD (`cd.yml`)

Déclenché automatiquement après le succès de la CI sur `main` :

1. Construction des images Docker (frontend et backend), taguées `latest` et par SHA de commit
2. Scan de vulnérabilités des images avec Trivy
3. Publication des images sur GitHub Container Registry (GHCR)
4. Déploiement automatique sur le VPS de production via SSH (`docker compose pull` + `up -d`)

## Déploiement

Le déploiement en production est entièrement automatisé. La procédure complète (architecture, secrets requis, déploiement manuel de secours, rollback, sauvegarde de la base de données) est détaillée dans le document **Procédure de Déploiement**.

Variables d'environnement requises sur le serveur de production (fichier `.env` non versionné, à la racine du dossier de déploiement) :

```dotenv
MYSQL_DATABASE=mybank
MYSQL_USER=mybank
MYSQL_PASSWORD=
MYSQL_ROOT_PASSWORD=
APP_SECRET=
```

## Structure du projet

```
mybank/
├── frontend/                  # Application React
│   ├── src/
│   │   ├── components/ui/     # Composants réutilisables (Button, OperationCard, StateCard...)
│   │   ├── components/__tests__/  # Tests Vitest
│   │   └── pages/              # Pages (Dashboard...)
│   ├── nginx.conf
│   └── Dockerfile
├── backend/                    # API Symfony
│   ├── src/
│   │   ├── Controller/         # OperationController, ExpenseController
│   │   ├── Entity/             # Operation, Expense
│   │   ├── Enum/                # CategoryEnum, OperationTypeEnum
│   │   └── Repository/
│   ├── tests/Api/               # Tests fonctionnels et sécurité PHPUnit
│   ├── docker/                  # nginx.conf, supervisord.conf
│   └── Dockerfile
├── docker-compose.yml           # Environnement de développement
├── docker-compose.prod.yml      # Environnement de production
└── .github/workflows/
    ├── ci.yml
    └── cd.yml
```

## Sécurité

-   Conteneurs exécutés sous un utilisateur non privilégié (non-root)
-   Validation stricte des entrées côté backend (Symfony Validator)
-   Requêtes SQL paramétrées via Doctrine ORM (protection contre les injections SQL)
-   Scan automatisé des images Docker (Trivy) à chaque déploiement
-   Secrets gérés exclusivement via GitHub Secrets, jamais en dur dans le code
-   Tests de sécurité fonctionnels (injection SQL, XSS, JSON malformé, méthodes HTTP non autorisées)

Pour le détail de la démarche de veille et des limitations identifiées, voir le document **Veille Technologique**.
