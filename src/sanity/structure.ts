// src/sanity/structure.ts
import type { StructureResolver } from 'sanity/structure';
import {
  Home,
  Settings,
  Clapperboard,
  Info,
  Image,
  Users,
  BookOpen,
} from 'lucide-react';

const PAGES = [
  {
    title: 'Accueil',
    icon: Home,
    sections: [
      { type: 'hero', title: 'Hero', icon: Clapperboard },
      { type: 'about', title: 'À propos', icon: Info },
      { type: 'gallery', title: 'Galerie', icon: Image },
      { type: 'testimonials', title: 'Témoignages', icon: Users },
      { type: 'ebook', title: 'Ebook', icon: BookOpen },
    ],
  },
];

const SINGLETON_TYPES = [
  'hero',
  'about',
  'gallery',
  'testimonials',
  'ebook',
  'settings',
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      // Pages
      ...PAGES.map((page) =>
        S.listItem()
          .title(page.title)
          .icon(page.icon)
          .child(
            S.list()
              .title(page.title)
              .items(
                page.sections.map((section) =>
                  S.listItem()
                    .title(section.title)
                    .icon(section.icon)
                    .child(
                      S.document()
                        .schemaType(section.type)
                        .documentId(section.type)
                    )
                )
              )
          )
      ),

      S.divider(),

      // Paramètres
      S.listItem()
        .title('Paramètres')
        .icon(Settings)
        .child(S.document().schemaType('settings').documentId('settings')),

      S.divider(),

      // Autres documents
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETON_TYPES.includes(item.getId() as string)
      ),
    ]);
