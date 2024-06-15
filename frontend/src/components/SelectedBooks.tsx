import { Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { DropdownOption } from '../types/SearchBarTypes'

type SelectedBooksProps = {
   books: Array<DropdownOption>
   onDeleteBook: (book: DropdownOption) => void
}

export default function SelectedBooks({ books, onDeleteBook }: SelectedBooksProps) {
   return (
      <Grid container spacing={4}>
         {books.map((book, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
               <Card sx={{ position: 'relative', backgroundColor: '#CFFAFA' }}>
                  <CardMedia
                     component={'img'}
                     alt={book.bookTitle}
                     image={book.coverPhotoURL}
                     title={book.bookTitle}
                     height={400}
                  />

                  <IconButton
                     aria-label="delete"
                     onClick={() => onDeleteBook(book)}
                     sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        borderRadius: '50%',
                        '&:hover': {
                           backgroundColor: '#CFFAFA',
                           cursor: 'pointer',
                        },
                     }}
                  >
                     <CloseIcon />
                  </IconButton>

                  <CardContent sx={{ height: '5rem' }}>
                     <Typography gutterBottom color={'#335C6E'} variant="h6" component={'h2'}>
                        {book.bookTitle}
                     </Typography>

                     <Typography variant="body2" color={'#4AA088'} component={'p'}>
                        {book.bookAuthor}
                     </Typography>
                  </CardContent>
               </Card>
            </Grid>
         ))}
      </Grid>
   )
}
