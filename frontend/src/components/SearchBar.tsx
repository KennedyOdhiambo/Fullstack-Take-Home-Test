import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { gql, useQuery } from '@apollo/client'
import { Avatar, Box, Container, Typography } from '@mui/material'

type Book = {
   __typename: 'Books'
   author: string
   coverPhotoURL: string
   readingLevel: string
   title: string
}

type BooksQuery = {
   books: Array<Book>
}

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

export default function SearchBar() {
   const { data } = useQuery<BooksQuery>(GET_BOOKS)
   const books = data?.books
   const dropdownOptions = books?.map((book) => ({
      bookTitle: book.title,
      bookAuthor: book.author,
      coverPhotoUrl: book.coverPhotoURL,
   }))

   return (
      <Container>
         <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={dropdownOptions ?? []}
            getOptionLabel={(option) => option.bookTitle}
            getOptionKey={(option) => `${option.bookAuthor}-${option.bookTitle}`}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Books" />}
            renderOption={(props, option) => (
               <Box
                  component="li"
                  key={`${option.bookAuthor}-${option.bookTitle}`}
                  {...props}
                  display="flex"
                  alignItems="center"
               >
                  <Avatar src={option.coverPhotoUrl} sx={{ marginRight: 2 }} />
                  <Box>
                     <Typography variant="body1">{option.bookTitle}</Typography>
                     <Typography variant="body2" color="textSecondary">
                        {option.bookAuthor}
                     </Typography>
                  </Box>
               </Box>
            )}
         />
      </Container>
   )
}
