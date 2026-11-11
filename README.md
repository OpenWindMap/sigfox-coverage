# Sigfox-coverage

Carte de couverture publique Sigfox, avec fonds OpenStreetMap / OpenTopoMap et recherche d'adresse (Nominatim).
Basé sur l'exemple officiel Sigfox. Node.js + Express + Pug + Leaflet.

## Configuration (variables d'environnement)

| Variable | Description |
|---|---|
| `SIGFOX_API_USER` | ID de l'accès API Sigfox (profil lecture couverture uniquement) |
| `SIGFOX_API_PASSWORD` | Mot de passe de l'accès API |
| `SIGFOX_API_SITE` | Optionnel, défaut `api.sigfox.com` |
| `SIGFOX_PUBLIC_MAP_PATH` | Optionnel, défaut `/v2/tiles/public-coverage` |
| `SIGFOX_API_HTTPS` | Optionnel, `false` pour un mock en http |

## Lancer en local

```
cp .env.example .env   # puis renseigner les identifiants
npm install
npm run dev
```
Ouvrir <http://localhost:3000/>. Le port se règle avec `PORT`.

## Déploiement (Coolify / Docker)

Un `Dockerfile` est fourni (port 3000, healthcheck sur `/healthz`).
Définir `SIGFOX_API_USER` et `SIGFOX_API_PASSWORD` dans les variables d'environnement de Coolify.
