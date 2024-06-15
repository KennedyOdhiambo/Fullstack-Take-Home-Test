import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { CircularProgress, Alert } from '@mui/material'
import BookOption from './BookOption'
import useBooksQuery from '../hooks/useBooksQuery'
import { DropdownOption } from '../types/SearchBarTypes'

type SearchBarProps = {
   isBookSelected: (option: DropdownOption) => boolean
   handleSelectBook: (option: DropdownOption) => void
}

export default function SearchBar({ isBookSelected, handleSelectBook }: SearchBarProps) {
   const [open, setOpen] = useState(false)
   const { dropdownOptions, loading, error } = useBooksQuery()

   if (loading) return <CircularProgress />
   if (error) return <Alert severity="error">Error loading books</Alert>

   return (
      <Autocomplete
         disablePortal
         id="book-searchbox"
         options={dropdownOptions}
         sx={{ width: 400, mt: '2rem' }}
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
   )
}
