# Nabu — Bibliothèque partagée 57ème Régiment

Dépôt central des utilitaires, composants et outils techniques communs à tous les services de l'écosystème. Le code métier (contrats API, schémas domaine) reste dans les dépôts concernés.

---

## Packages

| Package | Scope | Description |
|---|---|---|
| `@57eme-regiment/nabu-errors` | Backend | `AppError`, `createErrorHandler`, `PRISMA_ERROR_MAP` |
| `@57eme-regiment/nabu-logger` | Backend | `createLogger(name)` — factory tslog |
| `@57eme-regiment/nabu-fastify` | Backend | `declareRoute` — pont ts-rest → Fastify |
| `@57eme-regiment/nabu-frontend-utils` | Frontend | `cn`, `HttpError`, `getQueryClient`, `formatDateTime` |
| `@57eme-regiment/nabu-ui` | Frontend | Composants React (base-ui + Tailwind) + providers |

---

## Intégrer Nabu dans un dépôt consommateur

Nabu est consommé via **git submodule**. Le `dist/` est committé dans Nabu — aucun build step nécessaire après initialisation.

### Première installation (nouveau dépôt)

```bash
# 1. Ajouter le submodule à la racine du repo
git submodule add https://github.com/57eme-Regiment/nabu.git nabu

# 2. Ajouter les références dans package.json
#    (voir section "Références package.json" ci-dessous)

# 3. Installer les dépendances
pnpm install
```

### Cloner un dépôt qui utilise déjà Nabu

```bash
# Option A — clone avec submodule en une commande
git clone --recurse-submodules <url-du-repo>

# Option B — clone classique puis initialisation du submodule
git clone <url-du-repo>
git submodule update --init
```

### Mettre à jour Nabu vers la dernière version

```bash
git submodule update --remote nabu
git add nabu
git commit -m "chore: update nabu to latest"
```

### Références `package.json`

Adapter selon le scope du projet. Le chemin `./nabu/` est relatif à la racine du repo consommateur.

**Services backend** (wan-shi-tong, Renenutet, Krang) :

```json
{
  "dependencies": {
    "@57eme-regiment/nabu-errors":  "portal:./nabu/packages/errors",
    "@57eme-regiment/nabu-logger":  "portal:./nabu/packages/logger",
    "@57eme-regiment/nabu-fastify": "portal:./nabu/packages/fastify"
  }
}
```

**Applications frontend** (Hermes, Foxwatcher) :

```json
{
  "dependencies": {
    "@57eme-regiment/nabu-ui":             "portal:./nabu/packages/ui",
    "@57eme-regiment/nabu-frontend-utils": "portal:./nabu/packages/frontend-utils"
  }
}
```

---

## Contribuer à Nabu

Modifier directement les sources dans `nabu/packages/` depuis n'importe quel repo consommateur :

```bash
cd nabu                          # entrer dans le submodule
# ... faire les modifications ...
pnpm build                       # reconstruire le dist/
git add -A
git commit -m "feat: ..."
git push                         # pousser vers le repo Nabu

cd ..                            # retour dans le repo consommateur
git add nabu                     # mettre à jour le pointeur de commit
git commit -m "chore: update nabu"
```

> Le `dist/` est committé intentionnellement — les repos consommateurs n'ont pas besoin de builder Nabu eux-mêmes.

---

## Développement en local (watch mode)

Pour travailler sur Nabu en temps réel depuis un repo consommateur :

```bash
cd nabu && pnpm dev   # tsc --watch sur tous les packages en parallèle
```

Les changements dans `dist/` sont détectés immédiatement par le bundler du projet consommateur (Vite, etc.).

---

## Backend — `nabu-errors`

```ts
// config/logger.ts
import { createLogger } from '@57eme-regiment/nabu-logger';
export const logger = createLogger('Renenutet');

// app.ts
import { createErrorHandler } from '@57eme-regiment/nabu-errors';
import { logger } from '@/config/logger';
app.setErrorHandler(createErrorHandler(logger));
```

`createErrorHandler(logger)` gère :
- `AppError` → status + code métier
- `PrismaClientKnownRequestError` → P2002 (409), P2025 (404), P2003 (400)
- `ZodError` → 422 VALIDATION_ERROR
- Erreur inconnue → 500 INTERNAL_ERROR

---

## Backend — `nabu-fastify`

Remplace les `server.get/post/...` manuels par une lecture directe du contrat ts-rest.

```ts
// Avant
server.get('/admin/roles', { schema: { response: { 200: z.array(AdminRoleSchema) } } }, handler);

// Après
import { declareRoute } from '@57eme-regiment/nabu-fastify';
declareRoute(server, adminRoleContract.getRoles, ctrl.getAll.bind(ctrl));
```

Les contrats doivent définir des **chemins absolus** (ex. `/admin/roles`). Ne pas utiliser de `{ prefix: '...' }` dans `app.register()` — cela doublerait le chemin.

---

## Frontend — `nabu-ui` et Tailwind CSS

`nabu-ui` est compilé en JS, mais Tailwind a besoin de scanner les **sources TypeScript** pour inclure les classes dans le bundle CSS.

### Tailwind v4 (`@tailwindcss/vite`)

Dans le fichier CSS principal du projet consommateur (ex. `src/globals.css`) :

```css
@import "tailwindcss";
@source "../../nabu/packages/ui/src";   /* ← ajouter */
```

### Tailwind v3 (`tailwind.config.ts`)

```ts
export default {
  content: [
    './src/**/*.{ts,tsx}',
    './nabu/packages/ui/src/**/*.{ts,tsx}',
  ],
}
```

### Variables CSS

`nabu-ui` utilise les variables CSS standard (`--primary`, `--background`, `--card`, `--border`, `--radius`, etc.). Ces variables doivent être définies dans le `globals.css` du projet consommateur — les projets existants les ont déjà.

### Utilisation

```tsx
import {
  Button,
  Card, CardHeader, CardTitle, CardContent,
  Dialog, DialogContent, DialogHeader, DialogTitle,
  ThemeProvider, ThemeToggle,
  LanguageProvider, LanguageToggle,
  useTheme,
} from '@57eme-regiment/nabu-ui';
```

### `LanguageProvider` — passer ses propres locales

```tsx
import { LanguageProvider } from '@57eme-regiment/nabu-ui';
import { en } from '@/locales/en';
import { fr } from '@/locales/fr';

<LanguageProvider dictionaries={{ en, fr }} defaultLanguage="fr" storageKey="hermes-lang">
  <App />
</LanguageProvider>
```

---

## Frontend — `nabu-frontend-utils`

```ts
import { cn, HttpError, getQueryClient, formatDateTime } from '@57eme-regiment/nabu-frontend-utils';
```

---

## Ajouter un composant ou utilitaire

1. Écrire le code dans le package approprié (`packages/ui/src/`, `packages/errors/src/`, etc.)
2. L'exporter dans le `src/index.ts` du package
3. `pnpm build` dans `nabu/`
4. Committer le `dist/` mis à jour et pousser

---

## Structure

```
nabu/
├── packages/
│   ├── errors/          @57eme-regiment/nabu-errors
│   ├── logger/          @57eme-regiment/nabu-logger
│   ├── fastify/         @57eme-regiment/nabu-fastify
│   ├── frontend-utils/  @57eme-regiment/nabu-frontend-utils
│   └── ui/              @57eme-regiment/nabu-ui
├── pnpm-workspace.yaml
└── package.json
```
