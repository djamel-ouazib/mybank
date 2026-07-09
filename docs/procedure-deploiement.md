# Procédure de Déploiement — MyBank

## 1. Introduction

Ce document décrit la procédure de mise en production de l'application MyBank,
depuis le code source jusqu'au déploiement sur le serveur de production (VPS),
ainsi que la procédure de retour en arrière (rollback) en cas d'incident.

## 2. Architecture de déploiement

L'application est conteneurisée avec Docker et orchestrée via Docker Compose.
Trois services composent l'environnement de production :

| Service  | Image / Technologie                      | Rôle                                                       |
| -------- | ---------------------------------------- | ---------------------------------------------------------- |
| frontend | nginx:alpine (build React + Vite)        | Sert les fichiers statiques et proxy /api/ vers le backend |
| backend  | php:8.4-fpm-alpine + nginx + supervisord | API REST Symfony (PHP-FPM + nginx dans le même conteneur)  |
| db       | mysql:8.0                                | Base de données de production                              |

Les images Docker sont construites automatiquement par le pipeline CI/CD
et publiées sur GitHub Container Registry (GHCR).

## 3. Prérequis

-   Un VPS sous Ubuntu avec Docker et Docker Compose installés
-   Un utilisateur dédié au déploiement (`deploy`) avec accès SSH par clé
-   Un dépôt GitHub avec les workflows `CI MyBank` et `CD MyBank` configurés
-   Les secrets GitHub suivants renseignés dans Settings → Secrets and variables → Actions :

| Secret GitHub   | Description                                        |
| --------------- | -------------------------------------------------- |
| SERVER_HOST     | Adresse IP publique du VPS                         |
| SERVER_USER     | Utilisateur SSH de déploiement (deploy)            |
| SSH_PRIVATE_KEY | Clé privée SSH dédiée au déploiement               |
| GHCR_PAT        | Personal Access Token GitHub (scope read:packages) |

## 4. Déploiement automatisé (CI/CD)

### 4.1 Pipeline CI (ci.yml)

Déclenché à chaque push ou pull request sur les branches `main` et `develop`.

**Frontend :**

-   Installation des dépendances (`npm ci`)
-   Build de production (`npm run build`)
-   Analyse statique du code (`npm run lint`)
-   Tests unitaires (`npm run test`)

**Backend :**

-   Installation des dépendances Composer
-   Création de la base de test et exécution des migrations
-   Exécution des tests fonctionnels PHPUnit

### 4.2 Pipeline CD (cd.yml)

Déclenché automatiquement après le succès de la CI sur la branche `main`.
Deux jobs successifs :

-   **build-and-push** : construction des images Docker et publication sur `ghcr.io`
-   **deploy** : copie du fichier `docker-compose.prod.yml` sur le VPS, puis exécution via SSH

Script exécuté sur le VPS lors du déploiement :

```bash
echo "$GHCR_PAT" | docker login ghcr.io -u <github_actor> --password-stdin
cd /home/deploy/mybank
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d --remove-orphans
```

## 5. Déploiement manuel (procédure de secours)

En cas d'indisponibilité du pipeline CI/CD :

```bash
# 1. Connexion SSH
ssh deploy@<IP_VPS>

# 2. Se positionner dans le dossier de déploiement
cd /home/deploy/mybank

# 3. Vérifier le fichier .env
# (MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_ROOT_PASSWORD, APP_SECRET)

# 4. S'authentifier au registre
docker login ghcr.io

# 5. Récupérer les dernières images
docker compose -f docker-compose.prod.yml pull

# 6. Relancer les conteneurs
docker compose -f docker-compose.prod.yml up -d --remove-orphans

# 7. Exécuter les migrations si nécessaire
docker compose -f docker-compose.prod.yml exec backend php bin/console doctrine:migrations:migrate --no-interaction

# 8. Vérifier l'état des conteneurs
docker compose -f docker-compose.prod.yml ps
```

## 6. Vérification post-déploiement

-   Les trois conteneurs (db, backend, frontend) affichent le statut `Up`
-   L'application est accessible depuis un navigateur à l'adresse du VPS
-   L'ajout d'une opération fonctionne correctement depuis l'interface
-   Les logs ne montrent pas d'erreur critique :

```bash
docker compose -f docker-compose.prod.yml logs backend --tail=50
```

## 7. Procédure de rollback

### 7.1 Rollback par tag d'image

Cibler une version antérieure dans `docker-compose.prod.yml` via le SHA de commit,
puis relancer `docker compose pull` et `up -d`.

### 7.2 Rollback par redéploiement du commit précédent

```bash
# Identifier le dernier commit stable
git log --oneline

# Créer un revert ou réinitialiser sur ce commit
git revert <commit-sha>
git push origin main
# Le pipeline CI/CD se déclenche automatiquement
```

## 8. Sauvegarde de la base de données

Avant tout déploiement majeur :

```bash
docker compose -f docker-compose.prod.yml exec db \
  mysqldump -u root -p mybank > backup_$(date +%Y%m%d).sql
```

## 9. Conclusion

Le déploiement de MyBank repose sur une chaîne CI/CD entièrement automatisée :
chaque merge sur `main` déclenche la construction des images, leur publication
sur GHCR, puis leur déploiement sur le VPS via SSH.
Une procédure manuelle de secours et une stratégie de rollback garantissent
la continuité de service en cas d'incident.
