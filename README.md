# 🗞️ Que Pasa en PA — Revista Digital

Revista digital bilingüe (Español/Inglés) sobre noticias de Pennsylvania.

## Stack
- Next.js 14 App Router
- next-intl (detección automática de idioma)
- Tailwind CSS
- TypeScript

## Setup local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Deploy en Vercel

1. Sube este proyecto a GitHub
2. Ve a [vercel.com/new](https://vercel.com/new)
3. Importa el repositorio
4. Click **Deploy** — Vercel detecta Next.js automáticamente
5. Tu sitio estará en `tu-proyecto.vercel.app`

## Agregar Logo

Reemplaza el texto en `components/Header.tsx` con tu logo:
```tsx
<Image src="/logo.png" alt="Que Pasa en PA" width={200} height={60} />
```
Y coloca tu logo en `/public/logo.png`

## Agregar Artículos

Edita `data/articles.json` y agrega nuevos artículos siguiendo la estructura existente.
