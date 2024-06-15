import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Container, CircularProgress, Alert } from '@mui/material'
import BookOption from './BookOption'
import { DropdownOption } from '../types/SearchBarTypes'
import useBooksQuery from '../hooks/useBooksQuery'

export default function SearchBar() {
   const [selectedBooks, setSelectedBooks] = useState<{ title: string; author: string }[]>([])
   const [open, setOpen] = useState(false)
   const { dropdownOptions, loading, error } = useBooksQuery()

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

   const handleSelectBook = (option: DropdownOption) => {
      if (isBookSelected(option)) {
         handleRemoveBook(option)
      } else {
         handleAddBook(option)
      }
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
            sx={{ width: 400 }}
            getOptionLabel={(option) => option.bookTitle}
            getOptionKey={(option) => `${option.bookTitle} - ${option.bookAuthor}`}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            renderInput={(params) => <TextField {...params} label="Books" />}
            renderOption={(props, option) => (
               <BookOption
                  {...props}
                  key={`${option.bookTitle} - ${option.bookAuthor}`}
                  coverPhotoURL={option.coverPhotoURL}
                  bookTitle={option.bookTitle}
                  bookAuthor={option.bookAuthor}
                  selected={isBookSelected(option)}
                  onSelect={() => handleSelectBook(option)}
               />
            )}
         />
      </Container>
   )
}
