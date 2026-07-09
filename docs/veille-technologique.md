# Veille Technologique et Résolution de Problèmes — MyBank

## 1. Objectif de la veille

Dans le cadre du développement et du déploiement de MyBank, une veille
technologique régulière est menée sur trois axes principaux :

-   Les évolutions et failles de sécurité de l'écosystème Symfony (backend)
-   La sécurité des conteneurs Docker (déploiement)
-   La sécurité des pipelines CI/CD GitHub Actions

## 2. Sources suivies

| Thématique                       | Source                                         | Fréquence       |
| -------------------------------- | ---------------------------------------------- | --------------- |
| Sécurité Symfony                 | symfony.com/blog/category/security-advisories  | Hebdomadaire    |
| Sécurité Symfony (CVE)           | github.com/symfony/symfony/security/advisories | Hebdomadaire    |
| Actualité hebdo Symfony          | symfony.com/blog (A Week of Symfony)           | Hebdomadaire    |
| Sécurité conteneurs Docker       | OWASP Docker Security Cheat Sheet              | Mensuelle       |
| Sécurité GitHub Actions / CI-CD  | docs.github.com (Security for GitHub Actions)  | Mensuelle       |
| Veille supply-chain CI/CD        | stepsecurity.io/blog                           | Mensuelle       |
| Documentation officielle Symfony | symfony.com/doc                                | À chaque besoin |
| Documentation officielle React   | react.dev                                      | À chaque besoin |
| Documentation Docker             | docs.docker.com                                | À chaque besoin |

## 3. Journal de veille

### Semaine du 23/06/2026

-   **Symfony Security Advisories** : vérification des CVE publiées sur le composant
    Security (contournement de pare-feu) et Routing. Aucune CVE critique sur la
    version 8.0.x utilisée. Maintien de la version stable recommandée.
-   **OWASP Docker Cheat Sheet** : identification du problème des conteneurs
    exécutés en root. Application du correctif : passage à un utilisateur non
    privilégié dans le Dockerfile du backend.

### Semaine du 30/06/2026

-   **GitHub Actions Security** : vérification que toutes les actions tierces sont
    épinglées à une version explicite (ex: `actions/checkout@v4`, `v1.2.0`).
    Correction appliquée sur les workflows `ci.yml` et `cd.yml`.
-   **StepSecurity Blog** : lecture de l'article sur les attaques GhostAction et
    Shai-Hulud. Confirmation que les secrets (SSH, GHCR) sont bien dans
    GitHub Secrets et jamais en dur dans les fichiers YAML.

### Semaine du 07/07/2026

-   **Trivy** : intégration d'un scan de vulnérabilités des images Docker dans le
    pipeline CD. Les images frontend et backend sont désormais scannées avant
    le push sur GHCR.
-   **Symfony Blog** : lecture du résumé hebdomadaire "A Week of Symfony".
    Aucune mise à jour critique à appliquer cette semaine.

## 4. Constats et actions appliquées

| Sujet identifié                      | Risque / constat                                                    | Action appliquée sur MyBank                                                      |
| ------------------------------------ | ------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| CVE Symfony (Security, Routing)      | Plusieurs CVE publiées en 2026 sur le composant Security et Routing | Maintien de Symfony 8.0.x et vérification des advisories avant montée de version |
| Conteneurs exécutés en root          | L'OWASP recommande de ne jamais exécuter un conteneur en root       | Passage à un utilisateur non privilégié dans le Dockerfile backend               |
| Secrets en clair dans les workflows  | Attaques supply-chain exploitent des secrets mal gérés              | Tous les secrets stockés dans GitHub Secrets, jamais en dur dans les YAML        |
| Versions d'actions GitHub non figées | Risque de compromission si une action tierce est modifiée           | Actions épinglées à une version explicite (v4, v1.2.0)                           |
| Images Docker non scannées           | Vulnérabilités potentielles non détectées dans les images           | Intégration de Trivy dans le pipeline CD pour scan automatique                   |

## 5. Démarche de résolution de problème

Face à un dysfonctionnement, la démarche suivante est appliquée :

1. **Reproduire** le problème de façon isolée
2. **Lire les logs** détaillés (GitHub Actions, Docker, Symfony)
3. **Vérifier les hypothèses** une par une (config, env, réseau, versions)
4. **Consulter** la documentation officielle ou les sources de veille
5. **Appliquer** un correctif minimal et ciblé
6. **Revalider** l'ensemble de la chaîne (tests + déploiement)
7. **Documenter** la cause et la correction pour éviter la régression

### Exemple concret — Bug route /summary

La route `GET /api/operations/summary` retournait systématiquement une erreur 404.

**Démarche appliquée :**

-   Reproduction via `curl` direct sur le serveur
-   Lecture des logs Symfony → tentative de résolution de `summary` comme identifiant
-   Cause identifiée : collision de routes, `/{id}` déclarée avant `/summary`
-   Correction : déplacement de `summary()` avant `show()` dans `OperationController`
-   Validation : tests fonctionnels PHPUnit relancés → tous passent

## 6. Conclusion

La veille technologique mise en place permet de maintenir MyBank aligné avec
les pratiques de sécurité actuelles de l'écosystème Symfony, Docker et GitHub Actions.
Deux axes d'amélioration ont été identifiés et traités :

-   Passage à un utilisateur non privilégié dans le conteneur backend ✅
-   Intégration d'un scan Trivy dans le pipeline CD ✅
