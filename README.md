# 📅 Habit Tracker

Une application web moderne pour suivre vos habitudes quotidiennes avec une architecture client-serveur découplée. Construite avec Fastify côté backend et Vite côté frontend, utilisant un fichier JSON comme base de données.

## 📝 Description

- Marquez vos habitudes comme accomplies chaque jour d'un simple clic
- Ajoutez de nouvelles habitudes via une modale interactive
- Visualisez votre historique complet dans un tableau chronologique
- Interface responsive avec feedback visuel immédiat
- Stockage des données dans un fichier JSON sans base de données traditionnelle
- API REST complète pour toutes les opérations CRUD

## 🚀 Fonctionnalités

- **Interface principale** : liste des habitudes du jour avec statut visuel
- **Ajout d'habitudes** : modale native HTML5 avec validation de formulaire
- **Historique détaillé** : tableau scrollable avec émojis de statut (✅/❌)
- **Persistence des données** : sauvegarde automatique dans [`database.json`](./backend/database.json)
- **Communication temps réel** entre frontend et backend via API REST

## 🗂️ Structure du projet

```
.
├── backend/
│   ├── routes/
│   │   └── habits.js
│   ├── database.json
│   ├── habits.helper.js
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── config.js
│   │   ├── input.css
│   │   ├── main.js
│   │   ├── output.css
│   │   └── style.css
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.js
└── node_modules/
```

- **`/backend`** : serveur Fastify avec API REST et logique métier
- **`/backend/routes`** : endpoints organisés par domaine fonctionnel
- **`/frontend/src`** : code JavaScript modulaire en classes + styles Tailwind
- **`/frontend/public`** : assets statiques servis par Vite

## 🧠 Techniques utilisées

- **ES6 Classes** pour une architecture orientée objet (`TodayHabit`, `History`, `AddHabit`)
- **HTML Dialog Element** pour les modales natives sans bibliothèque
- **Fetch API** avec gestion d'erreurs pour la communication client-serveur
- **ES6 Modules** avec import/export pour la modularité
- **Array Methods** avancées (`map()`, `find()`, `reduce()`, `forEach()`)
- **Promises Chain** pour les opérations asynchrones séquentielles
- **Dynamic DOM Manipulation** pour la création d'éléments en temps réel
- **Node.js fs.promises** pour la manipulation asynchrone de fichiers JSON

## 🛠️ Technologies utilisées

- ⚡ **Fastify** — Framework web pour Node.js
- 🔄 **@fastify/cors** — Middleware CORS pour requêtes cross-origin
- ⚡ **Vite** — Build tool
- 🎨 **Tailwind CSS** — Framework CSS utility-first
- ☁️ **Render** — Déploiement cloud
- 🟨 **JavaScript** — Classes, modules, async/await, manipulation DOM
- 📄 **HTML5** — Éléments sémantiques et Dialog API
- 🗃️ **JSON** — Base de données fichier pour simplicité de déploiement

## 📡 API Endpoints

- `GET /habits` — Récupère toutes les habitudes avec historique complet
- `POST /habits` — Crée une nouvelle habitude
- `PATCH /habits/:id` — Bascule le statut d'une habitude pour aujourd'hui
- `GET /habits/today` — Récupère les habitudes avec statut du jour

La logique métier est centralisée dans [`habits.helper.js`](./backend/habits.helper.js) qui gère toutes les opérations CRUD sur le fichier JSON.

---

Développé pour apprendre l'architecture client-serveur moderne, les API REST et la manipulation avancée du DOM sans framework.
