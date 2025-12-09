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
  FileText, // Icône pour le dossier "Pages"
  SlidersHorizontal, // Icône pour le dossier "Configuration"
} from 'lucide-react';

// Liste des types qui ne doivent pas apparaître dans "Autres documents"
const HIDDEN_DOC_TYPES = [
  'hero',
  'about',
  'gallerySection',
  'testimonials',
  'ebookSection',
  'settings',
  'gallery',
  'category',
  'ebookPage',
  'media.tag', // Souvent généré par les plugins de media
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      // --------------------------------------------------------
      // 1. DOSSIER "PAGES"
      // --------------------------------------------------------
      S.listItem()
        .title('Pages')
        .icon(FileText)
        .child(
          S.list()
            .title('Mes Pages')
            .items([
              // A. Page Accueil (C'est un dossier contenant les sections singletons)
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
                          S.document().schemaType('hero').documentId('hero')
                        ),
                      S.listItem()
                        .title('À propos')
                        .icon(Info)
                        .child(
                          S.document().schemaType('about').documentId('about')
                        ),
                      S.listItem()
                        .title('Section Galerie (Aperçu)')
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
                            .schemaType('testimonials')
                            .documentId('testimonials')
                        ),
                      S.listItem()
                        .title('Section Ebook (Aperçu)')
                        .icon(BookOpen)
                        .child(
                          S.document()
                            .schemaType('ebookSection')
                            .documentId('ebookSection')
                        ),
                    ])
                ),

              // B. Page Galerie (C'est directement la liste des images/albums)
              S.listItem()
                .title('Galerie')
                .icon(Images)
                .child(
                  S.documentTypeList('gallery')
                    .title('Tous les éléments de galerie')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]) // Si vous avez un champ 'order'
                ),

              // C. Page Ebook (Singleton ou Liste selon votre besoin)
              S.listItem().title('Ebook').icon(BookOpen).child(
                // Si c'est une page unique de présentation du Ebook :
                S.document().schemaType('ebookPage').documentId('ebookPage')
              ),
            ])
        ),

      S.divider(),

      // --------------------------------------------------------
      // 2. DOSSIER "CONFIGURATION"
      // --------------------------------------------------------
      S.listItem()
        .title('Configuration')
        .icon(SlidersHorizontal)
        .child(
          S.list()
            .title('Configuration')
            .items([
              // Catégories
              S.listItem()
                .title('Catégories')
                .icon(Tag)
                .child(S.documentTypeList('category').title('Catégories')),

              // Vous pouvez ajouter d'autres listes de configuration ici (ex: Auteurs, Tags...)
            ])
        ),

      S.divider(),

      // --------------------------------------------------------
      // 3. PARAMÈTRES (Singleton direct à la racine)
      // --------------------------------------------------------
      S.listItem()
        .title('Paramètres globaux')
        .icon(Settings)
        .child(S.document().schemaType('settings').documentId('settings')),

      S.divider(),

      // --------------------------------------------------------
      // 4. AUTRES (Pour le débogage ou les types oubliés)
      // --------------------------------------------------------
      ...S.documentTypeListItems().filter(
        (item) => !HIDDEN_DOC_TYPES.includes(item.getId() as string)
      ),
    ]);
