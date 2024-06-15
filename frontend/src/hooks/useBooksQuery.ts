import { gql, useQuery } from '@apollo/client'
import { BooksQuery, DropdownOption } from '../types/SearchBarTypes'

export default function useBooksQuery() {
   const GET_BOOKS = gql`
      query Books {
         books {
            author
            coverPhotoURL
            readingLevel
            title
         }
      }
   `

   const { data, loading, error } = useQuery<BooksQuery>(GET_BOOKS)
   const books = data?.books ?? []
   const dropdownOptions: DropdownOption[] = books.map((book) => ({
      bookTitle: book.title,
      bookAuthor: book.author,
      coverPhotoURL: book.coverPhotoURL,
   }))

   return { dropdownOptions, loading, error, data }
}
