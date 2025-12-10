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
  Images,
  Tag,
  FileText,
  SlidersHorizontal,
} from 'lucide-react';

// Liste des types qui ne doivent pas apparaître dans "Autres documents"
// const HIDDEN_DOC_TYPES = [
//   // Sections (accueil)
//   'heroSection',
//   'aboutSection',
//   'gallerySection',
//   'testimonialsSection',
//   'ebookSection',
//   // Pages
//   'ebookPage',
//   'galleryPage',
//   // Documents
//   'gallery',
//   // Taxonomies
//   'galleryCategory',
//   // Settings
//   'settings',
// ];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      // --------------------------------------------------------
      // 1. PAGES
      // --------------------------------------------------------
      S.listItem()
        .title('Pages')
        .icon(FileText)
        .child(
          S.list()
            .title('Mes Pages')
            .items([
              // A. Page Accueil
              S.listItem()
                .title('Accueil')
                .icon(Home)
                .child(
                  S.list()
                    .title('Sections Accueil')
                    .items([
                      S.listItem()
                        .title('Hero')
                        .icon(Clapperboard)
                        .child(
                          S.document()
                            .schemaType('heroSection')
                            .documentId('heroSection')
                        ),
                      S.listItem()
                        .title('À propos')
                        .icon(Info)
                        .child(
                          S.document()
                            .schemaType('aboutSection')
                            .documentId('aboutSection')
                        ),
                      S.listItem()
                        .title('Section Galerie')
                        .icon(Image)
                        .child(
                          S.document()
                            .schemaType('gallerySection')
                            .documentId('gallerySection')
                        ),
                      S.listItem()
                        .title('Témoignages')
                        .icon(Users)
                        .child(
                          S.document()
                            .schemaType('testimonialsSection')
                            .documentId('testimonialsSection')
                        ),
                      S.listItem()
                        .title('Section Ebook')
                        .icon(BookOpen)
                        .child(
                          S.document()
                            .schemaType('ebookSection')
                            .documentId('ebookSection')
                        ),
                    ])
                ),

              // B. Page Galerie
              S.listItem()
                .title('Galerie')
                .icon(Images)
                .child(
                  S.list()
                    .title('Galerie')
                    .items([
                      S.listItem()
                        .title('Paramètres de la page')
                        .icon(Settings)
                        .child(
                          S.document()
                            .schemaType('galleryPage')
                            .documentId('galleryPage')
                        ),
                      S.listItem()
                        .title('Créations')
                        .icon(Image)
                        .child(
                          S.documentTypeList('gallery')
                            .title('Toutes les créations')
                            .defaultOrdering([
                              { field: 'order', direction: 'asc' },
                            ])
                        ),
                    ])
                ),

              // C. Page Ebook
              S.listItem()
                .title('Ebook')
                .icon(BookOpen)
                .child(
                  S.document().schemaType('ebookPage').documentId('ebookPage')
                ),
            ])
        ),

      S.divider(),

      // --------------------------------------------------------
      // 2. CONFIGURATION
      // --------------------------------------------------------
      S.listItem()
        .title('Configuration')
        .icon(SlidersHorizontal)
        .child(
          S.list()
            .title('Configuration')
            .items([
              S.listItem()
                .title('Catégories (Galerie)')
                .icon(Tag)
                .child(
                  S.documentTypeList('galleryCategory').title('Catégories')
                ),
            ])
        ),

      S.divider(),

      // --------------------------------------------------------
      // 3. PARAMÈTRES GLOBAUX
      // --------------------------------------------------------
      S.listItem()
        .title('Paramètres globaux')
        .icon(Settings)
        .child(S.document().schemaType('settings').documentId('settings')),

      S.divider(),

      // // --------------------------------------------------------
      // // 4. AUTRES (debug)
      // // --------------------------------------------------------
      // ...S.documentTypeListItems().filter(
      //   (item) => !HIDDEN_DOC_TYPES.includes(item.getId() as string)
      // ),
    ]);
