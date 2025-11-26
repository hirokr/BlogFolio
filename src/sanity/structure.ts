import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = S =>
  S.list()
    .title('Blog')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('photo').title('Photos'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        item =>
          item.getId() && !['post', 'category', 'photo'].includes(item.getId()!)
      ),
    ]);
