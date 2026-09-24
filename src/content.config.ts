import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

// Casos de éxito: agregar un proyecto = agregar una entrada en src/data/projects.json
const projects = defineCollection({
  loader: file('src/data/projects.json'),
  schema: z.object({
    order: z.number().int(),
    title: z.string(),
    badge: z.enum(['E-commerce', 'Landing Page']),
    description: z.string().max(160),
    // Solo funcionalidades verificadas en el sitio en producción
    features: z.array(z.string()).min(3).max(4),
    stack: z.array(z.string()).min(1),
    image: z.object({
      src: z.string().startsWith('/images/projects/'),
      alt: z.string(),
      width: z.number().int(),
      height: z.number().int(),
    }),
    url: z.string().url(),
    // Fondo opcional en video; si no hay, se usa la captura desenfocada
    bgVideo: z
      .object({ src: z.string(), poster: z.string() })
      .optional(),
  }),
});

export const collections = { projects };
