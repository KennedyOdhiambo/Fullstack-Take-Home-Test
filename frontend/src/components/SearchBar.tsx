import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { gql, useQuery } from '@apollo/client'
import {
   Avatar,
   Box,
   Container,
   IconButton,
   Typography,
   CircularProgress,
   Alert,
} from '@mui/material'
import { Add, Remove } from '@mui/icons-material'

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

type DropdownOption = {
   bookTitle: string
   bookAuthor: string
   coverPhotoURL: string
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
   const [selectedBooks, setSelectedBooks] = useState<{ title: string; author: string }[]>([])
   const [open, setOpen] = useState(false)
   const { data, loading, error } = useQuery<BooksQuery>(GET_BOOKS)

   const books = data?.books ?? []
   const dropdownOptions: DropdownOption[] = books.map((book) => ({
      bookTitle: book.title,
      bookAuthor: book.author,
      coverPhotoURL: book.coverPhotoURL,
   }))

   console.log(selectedBooks)

   const handleAddBook = (option: DropdownOption) => {
      const { bookTitle, bookAuthor } = option
      setSelectedBooks((prevList) => [...prevList, { title: bookTitle, author: bookAuthor }])
   }

   const handleRemoveBook = (option: DropdownOption) => {
      const { bookTitle, bookAuthor } = option
      setSelectedBooks((prevList) =>
         prevList.filter((b) => b.title !== bookTitle || b.author !== bookAuthor)
      )
   }

   const isBookSelected = (option: DropdownOption) => {
      return selectedBooks.some(
         (b) => b.title === option.bookTitle && b.author === option.bookAuthor
      )
   }

   if (loading) return <CircularProgress />
   if (error) return <Alert severity="error">Error loading books</Alert>

   return (
      <Container
         sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
         }}
      >
         <Autocomplete
            disablePortal
            id="book-searchbox"
            options={dropdownOptions}
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.bookTitle}
            getOptionKey={(option) => `${option.bookTitle} - ${option.bookAuthor}`}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            renderInput={(params) => <TextField {...params} label="Books" />}
            renderOption={(props, option) => (
               <Box
                  component="li"
                  {...props}
                  onClick={() => {
                     if (isBookSelected(option)) {
                        handleRemoveBook(option)
                     } else {
                        handleAddBook(option)
                     }
                  }}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
               >
                  <Box display="flex" flexDirection="row" alignItems="center">
                     <Avatar src={option.coverPhotoURL} sx={{ marginRight: 2 }} />
                     <Box>
                        <Typography variant="body1">{option.bookTitle}</Typography>
                        <Typography variant="body2" color="textSecondary">
                           {option.bookAuthor}
                        </Typography>
                     </Box>
                  </Box>
                  <IconButton>
                     {selectedBooks.some((b) => b.title === option.bookTitle) ? (
                        <Remove />
                     ) : (
                        <Add />
                     )}
                  </IconButton>
               </Box>
            )}
         />
      </Container>
   )
}
