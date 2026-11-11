# Sigfox-coverage

Carte de couverture publique Sigfox, avec fonds OpenStreetMap / OpenTopoMap et recherche d'adresse (Nominatim).
Basé sur l'exemple officiel Sigfox. Node.js + Express + Pug + Leaflet.

## Configuration (variables d'environnement)

| Variable | Obligatoire | Défaut | Description |
|---|---|---|---|
| `SIGFOX_API_USER` | oui | – | ID de l'accès API Sigfox |
| `SIGFOX_API_PASSWORD` | oui | – | Mot de passe de l'accès API |
| `PORT` | non | `3000` | Port d'écoute du serveur |

Sans `SIGFOX_API_USER` et `SIGFOX_API_PASSWORD`, la page répond par une erreur 502.

**Accès API recommandé** : créer dans le backend Sigfox un accès dédié avec un seul profil de couverture
(par exemple `TAP_PUBLIC_COVERAGE_READ`), sans droit sur les appareils ni les messages.

## Lancer en local

```
cp .env.example .env   # puis renseigner les identifiants
npm install
npm run dev
```
Ouvrir <http://localhost:3000/>.
`npm run dev` charge `.env` (Node 20.6 ou plus). `npm start` ne le charge pas : les variables doivent venir de l'environnement.

## Déploiement (Coolify / Docker)

Un `Dockerfile` est fourni (port 3000, healthcheck sur `/healthz`).
Définir les variables ci-dessus (au minimum `SIGFOX_API_USER` et `SIGFOX_API_PASSWORD`) dans l'environnement de Coolify.
Ne jamais commiter le fichier `.env`.
