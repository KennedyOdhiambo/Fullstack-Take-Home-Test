import { Container } from '@mui/material'
import './App.css'
import SearchBar from './components/SearchBar'
import SelectedBooks from './components/SelectedBooks'
import { useState } from 'react'
import { DropdownOption } from './types/SearchBarTypes'

function App() {
   const [selectedBooks, setSelectedBooks] = useState<Array<DropdownOption>>([])

   const handleAddBook = (option: DropdownOption) => {
      setSelectedBooks((prevList) => [...prevList, option])
   }

   const handleRemoveBook = (option: DropdownOption) => {
      const { bookTitle, bookAuthor } = option
      setSelectedBooks((prevList) =>
         prevList.filter((b) => b.bookTitle !== bookTitle || b.bookAuthor !== bookAuthor)
      )
   }

   const isBookSelected = (option: DropdownOption) => {
      return selectedBooks.some(
         (b) => b.bookTitle === option.bookTitle && b.bookAuthor === option.bookAuthor
      )
   }

   const handleSelectBook = (option: DropdownOption) => {
      if (isBookSelected(option)) {
         handleRemoveBook(option)
      } else {
         handleAddBook(option)
      }
   }
   return (
      <Container
         sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
         }}
      >
         <SearchBar handleSelectBook={handleSelectBook} isBookSelected={isBookSelected} />
         <SelectedBooks books={selectedBooks} onDeleteBook={handleRemoveBook} />
      </Container>
   )
}

export default App
