# AGENTS.md: VICAR portfolio (vicardev.digital)

## Hosting y despliegue

Hosting: GitHub Pages (apex A records to 185.199.108-111.153, www CNAME to itsgabo22.github.io). Pushing to main deploys to production.

- Método: **GitHub Actions** (`.github/workflows/deploy.yml`, "Deploy Astro to GitHub Pages"). Se ejecuta en cada push a `main` (o manualmente con `workflow_dispatch`): `npm ci` → `npm run build` → publica `dist/` con `actions/deploy-pages`. No hay despliegue desde rama (`gh-pages`).
- El workflow usa Node 18. Verifica que las dependencias nuevas lo soporten.
- Dominio: `public/CNAME` (`vicardev.digital`). `www` redirige al apex.
- **Nunca hagas push directo a `main`.** Trabaja en una rama y abre un PR.

## Stack

- Astro 5 con View Transitions, sitio estático de una página (`src/pages/index.astro`).
- Fuentes Inter y Syne servidas localmente con `@fontsource` (subset latin). No uses Google Fonts.
- Sitemap con `@astrojs/sitemap`, `public/robots.txt`, JSON-LD y Open Graph en `src/layouts/Layout.astro`.
- Formulario de contacto: Formspree (`xlggelwg`) enviado con `fetch` desde `src/components/Contact.astro`.

## Reglas de contenido

- Todo el texto visible va en **español**. El titular "Software que respira." no se cambia.
- Conserva la paleta (`src/styles/global.css`) y las fuentes. No rediseñes.
- **Nada inventado:** cada funcionalidad y etiqueta de stack de un proyecto debe verificarse en el sitio en producción (código fuente, cabeceras, páginas visibles). No uses métricas sin respaldo.
- Las cifras (proof strip, comentario del snippet, "N proyectos en producción") se calculan desde la colección de proyectos. No las escribas a mano.

## Proyectos (casos de éxito)

- Fuente única: `src/data/projects.json`, validada por el esquema de `src/content.config.ts`.
- Agregar un proyecto = agregar una entrada (con `order`). No hace falta editar componentes.
- `badge`: `E-commerce` | `Landing Page`. De 3 a 4 `features` verificadas. `bgVideo` es opcional; si falta, el fondo es la captura desenfocada.

## Imágenes

- Capturas de proyectos: Playwright a 1440x900 (espera `networkidle` y unos segundos más por videos/animaciones; cierra popups), guardadas como WebP en `public/images/projects/`, **< 150 KB**, con `width`/`height` explícitos y `alt` descriptivo en español.
- Sin imágenes externas ni de stock.
- `og:image`: `public/og-image.jpg` (1200x630, JPEG).

## Verificación antes de un PR

- `npm run build` debe terminar con código 0.
- Sin desbordes horizontales entre 320 y 1440 px.
- Lighthouse móvil (mediana de varias corridas): Performance ≥ 98, SEO 100, CLS ≤ 0.048.
