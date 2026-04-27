# 🚀 Demo CI/CD — Projet de pratique GitHub Actions

Un projet **Node.js/Express** minimaliste conçu pour apprendre et pratiquer
l'intégration et le déploiement continu (CI/CD) avec **GitHub Actions** et **Docker**.

---

## 📁 Structure du projet

```
demo-cicd/
├── .github/
│   └── workflows/
│       └── ci-cd.yml       ← Le pipeline CI/CD (le fichier le plus important !)
├── src/
│   ├── app.js              ← Application Express (routes)
│   └── index.js            ← Point d'entrée (démarre le serveur)
├── tests/
│   └── app.test.js         ← Tests automatisés (Jest + Supertest)
├── Dockerfile              ← Pour conteneuriser l'application
├── .dockerignore
├── .gitignore
└── package.json
```

---

## 🔄 Le Pipeline CI/CD (3 jobs)

```
Push sur GitHub
      │
      ▼
┌─────────────┐     ❌ fail → Pipeline s'arrête
│ 1. TEST     │──────────────────────────────────
│  npm test   │
└──────┬──────┘
       │ ✅ pass
       ▼
┌─────────────┐     ❌ fail → Pipeline s'arrête
│ 2. BUILD    │──────────────────────────────────
│ docker build│
└──────┬──────┘
       │ ✅ pass  (seulement si branche = main)
       ▼
┌─────────────┐
│ 3. DEPLOY   │
│ docker push │
└─────────────┘
```

---

## 🛠️ Lancer le projet en local

### Prérequis
- Node.js 20+
- Docker (optionnel)

### Installation
```bash
cd demo-cicd
npm install
```

### Démarrer le serveur
```bash
npm start
# → http://localhost:3000
```

### Lancer les tests
```bash
npm test
```

---

## 🌐 Les routes de l'API

| Route           | Description                    | Exemple                          |
|-----------------|--------------------------------|----------------------------------|
| `GET /`         | Message de bienvenue           | `curl localhost:3000/`           |
| `GET /health`   | Health check                   | `curl localhost:3000/health`     |
| `GET /add`      | Additionne deux nombres        | `curl "localhost:3000/add?a=5&b=3"` |
| `GET /hello/:name` | Salue par le nom            | `curl localhost:3000/hello/Alice` |

---

## 🐳 Docker

```bash
# Construire l'image
docker build -t demo-cicd .

# Lancer le conteneur
docker run -p 3000:3000 demo-cicd

# Tester
curl http://localhost:3000/health
```

---

## ⚙️ Configurer le déploiement (GitHub Secrets)

Pour que le job **Deploy** fonctionne, tu dois configurer deux **secrets** dans ton dépôt GitHub :

> **GitHub → Settings → Secrets and variables → Actions → New repository secret**

| Secret               | Valeur                          |
|----------------------|---------------------------------|
| `DOCKERHUB_USERNAME` | Ton nom d'utilisateur Docker Hub |
| `DOCKERHUB_TOKEN`    | Ton token d'accès Docker Hub    |

> 💡 Pour créer un token Docker Hub : **hub.docker.com → Account Settings → Security → New Access Token**

---

## 🧪 Exercices pratiques

1. **Modifier un test** pour qu'il échoue → Observer le pipeline bloqué sur GitHub Actions
2. **Ajouter une nouvelle route** dans `app.js` + écrire son test → Push et voir le pipeline passer au vert
3. **Casser le Dockerfile** (ex: mauvaise commande) → Observer l'échec du job "Build"
4. **Configurer les secrets Docker Hub** → Voir le déploiement automatique sur Docker Hub
5. **Créer une branche `develop`** → Observer que le job "Deploy" ne se déclenche pas

---

## 📚 Liens utiles

- [Documentation GitHub Actions](https://docs.github.com/en/actions)
- [Marketplace des Actions](https://github.com/marketplace?type=actions)
- [Docker Hub](https://hub.docker.com)
