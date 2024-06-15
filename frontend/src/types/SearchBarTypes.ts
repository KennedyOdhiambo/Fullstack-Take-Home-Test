export type Book = {
  __typename: 'Books';
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
  title: string;
};

export type BooksQuery = {
  books: Array<Book>;
};

export type DropdownOption = {
  bookTitle: string;
  bookAuthor: string;
  coverPhotoURL: string;
};
