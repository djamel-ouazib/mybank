# Plan de Test (OPTP) — MyBank

## 1. Introduction

MyBank est une application de gestion de finances personnelles composée d'un
frontend React, d'un backend Symfony (PHP) exposant une API REST, et d'une
base de données MySQL. L'application est déployée automatiquement sur un VPS
via un pipeline CI/CD GitHub Actions.

Ce document décrit l'ensemble des tests mis en place pour garantir la qualité
du code, la fiabilité de l'API et la stabilité des déploiements.

## 2. Types de tests automatisés

| Type                       | Outil                    | Où                  | Quand                   |
| -------------------------- | ------------------------ | ------------------- | ----------------------- |
| Lint frontend              | ESLint                   | GitHub Actions (CI) | À chaque push / PR      |
| Tests unitaires frontend   | Vitest + Testing Library | GitHub Actions (CI) | À chaque push / PR      |
| Tests fonctionnels backend | PHPUnit                  | GitHub Actions (CI) | À chaque push / PR      |
| Migrations base de données | Doctrine Migrations      | GitHub Actions (CI) | À chaque push / PR      |
| Build Docker               | Docker Buildx            | GitHub Actions (CD) | À chaque merge sur main |
| Scan de vulnérabilités     | Trivy                    | GitHub Actions (CD) | À chaque merge sur main |
| Déploiement                | SSH + docker compose     | VPS (production)    | À chaque merge sur main |

## 3. Cas de tests — Frontend (Vitest)

13 cas de tests répartis sur 5 composants React.

| ID  | Composant         | Scénario                                | Résultat attendu                     | Statut |
| --- | ----------------- | --------------------------------------- | ------------------------------------ | ------ |
| F01 | Button            | Affiche le texte passé en props         | Le texte est visible dans le bouton  | ✅ OK  |
| F02 | Button            | Rendu sans texte fourni                 | Le bouton existe quand même          | ✅ OK  |
| F03 | StateCard         | Affiche le label et la valeur           | Texte et montant visibles avec €     | ✅ OK  |
| F04 | StateCard         | Affiche un montant numérique            | Le montant est préfixé par €         | ✅ OK  |
| F05 | OperationCard     | Affiche label, date, catégorie, montant | Toutes les informations visibles     | ✅ OK  |
| F06 | OperationCard     | Montant absent                          | Affiche 0.00 € par défaut            | ✅ OK  |
| F07 | OperationCard     | Catégorie inconnue                      | Ne plante pas, style neutre appliqué | ✅ OK  |
| F08 | AddOperationModal | Affiche le formulaire complet           | Tous les champs sont visibles        | ✅ OK  |
| F09 | AddOperationModal | Soumission du formulaire vide           | Message d'erreur affiché             | ✅ OK  |
| F10 | AddOperationModal | Clic sur Cancel                         | onClose est appelé                   | ✅ OK  |
| F11 | AddOperationModal | Clic sur l'icône ✕                      | onClose est appelé                   | ✅ OK  |
| F12 | ExpenseList       | Affiche la liste des dépenses           | Chaque libellé est visible           | ✅ OK  |
| F13 | ExpenseList       | Liste vide                              | Message « No expenses » affiché      | ✅ OK  |

## 4. Cas de tests — Backend (PHPUnit)

10 cas de tests fonctionnels couvrant les endpoints de l'API REST.

| ID  | Endpoint                        | Scénario                       | Résultat attendu                      | Statut |
| --- | ------------------------------- | ------------------------------ | ------------------------------------- | ------ |
| B01 | GET /api/expenses               | Liste des dépenses             | Code 200, tableau JSON                | ✅ OK  |
| B02 | POST /api/expenses              | Création nominale              | Code 201, dépense créée avec id       | ✅ OK  |
| B03 | POST /api/expenses              | Sans label (invalide)          | Code 422                              | ✅ OK  |
| B04 | GET /api/expenses/{id}          | Dépense inexistante            | Code 404                              | ✅ OK  |
| B05 | GET /api/operations             | Liste des opérations           | Code 200, tableau JSON                | ✅ OK  |
| B06 | POST /api/operations            | Création nominale              | Code 201, opération créée             | ✅ OK  |
| B07 | POST /api/operations            | Catégorie invalide             | Code 500 (ValueError attendu)         | ✅ OK  |
| B08 | GET /api/operations/{id}        | Opération inexistante          | Code 404                              | ✅ OK  |
| B09 | PUT/DELETE /api/operations/{id} | Cycle complet update + delete  | Mise à jour puis suppression réussies | ✅ OK  |
| B10 | GET /api/operations/summary     | Résumé income/expenses/balance | Code 200, balance = income - expenses | ✅ OK  |

## 5. Tests de sécurité

6 cas de tests de sécurité couvrant les principales vulnérabilités web.

| ID  | Scénario                    | Résultat attendu                      | Statut |
| --- | --------------------------- | ------------------------------------- | ------ |
| S01 | Injection SQL dans label    | Code 422, donnée non exécutée en base | ✅ OK  |
| S02 | XSS dans label (script tag) | Code 422 ou donnée échappée           | ✅ OK  |
| S03 | JSON malformé dans le body  | Code 400                              | ✅ OK  |
| S04 | Méthode HTTP non autorisée  | Code 405                              | ✅ OK  |
| S05 | Montant négatif             | Code 422 (contrainte @Positive)       | ✅ OK  |
| S06 | Catégorie hors enum         | Code 500 (ValueError PHP)             | ✅ OK  |

## 6. Environnements de test

| Environnement       | URL                   | Base de données                 |
| ------------------- | --------------------- | ------------------------------- |
| Local (dev)         | http://localhost:3000 | MySQL (conteneur Docker local)  |
| CI (GitHub Actions) | Runner GitHub Actions | MySQL (service Docker éphémère) |
| Production          | http://157.90.148.37  | MySQL (conteneur Docker, VPS)   |

## 7. Bug détecté et corrigé grâce aux tests

| Bug détecté                                           | Cause                                                           | Correction                                                     |
| ----------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------- |
| GET /api/operations/summary retournait une erreur 404 | La route /{id} était déclarée avant /summary dans le contrôleur | Déplacement de summary() avant show() dans OperationController |

## 8. Résultats CI/CD

-   **CI** (lint + tests + build) : exécutée automatiquement à chaque push et PR
-   **CD** (build Docker + scan Trivy + push GHCR + déploiement VPS) : déclenchée après succès CI sur `main`
-   **Statut actuel** : tous les workflows passent ✅
-   **Dépôt GitHub** : https://github.com/djamel-ouazib/mybank
-   **Application en production** : http://157.90.148.37

## 9. Conclusion

L'ensemble des 29 tests automatisés (13 frontend + 10 backend + 6 sécurité)
passe avec succès. La mise en place de ces tests a permis de détecter et
corriger un bug de production réel sur la route de résumé financier.
L'intégration continue garantit qu'aucune régression ne pourra être introduite
sans être détectée avant déploiement.
